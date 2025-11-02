import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";
import { otpTemplate } from "../template/otpTemplate.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/response.js";

dotenv.config();

function generate6DigitOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return errorResponse(res, 400, "Email & password are required");

        const userFind = await userModel.findOne({ email });
        if (userFind) return errorResponse(res, 400, "User already exists");

        const hashPassword = await bcrypt.hash(password, 12);
        const otp = generate6DigitOTP();

        const user = await userModel.create({
            ...req.body,
            password: hashPassword,
            otp,
        });

        const token = JWT.sign({ user_id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
        });

        await sendEmail(email, "OTP Verification", otpTemplate(otp));

        return successResponse(res, 200, `OTP sent to ${email}`, {
            user,
            token
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};


// === Resend OTP ===
export const resendOTP = async (req, res) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return errorResponse(res, 401, "Token not provided");

        const token = authorization.replace(/^Bearer\s+/, "");
        let decoded;

        try {
            decoded = JWT.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return errorResponse(res, 401, "Invalid or expired token");
        }

        const user = await userModel.findById(decoded.user_id);
        if (!user) return errorResponse(res, 404, "User not found");

        // Rate limit: max 3 attempts
        if (user.otpAttempts >= 3) {
            return errorResponse(res, 429, "Too many attempts. Try again later.");
        }

        // Check if last OTP is still valid
        if (user.otpExpires > Date.now()) {
            const timeLeft = Math.ceil((user.otpExpires - Date.now()) / 1000);
            return errorResponse(res, 429, `Please wait ${timeLeft}s before requesting again`);
        }

        // Generate new OTP
        const otp = generate6DigitOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user.otp = otp;
        user.otpExpires = otpExpires;
        user.otpAttempts += 1;
        await user.save();

        await sendEmail(user.email, "Your New OTP - Health Vault", otpTemplate(otp));

        return successResponse(res, 200, "New OTP sent", {
            expiresIn: "10 minutes",
            attemptsLeft: 3 - user.otpAttempts,
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const { authorization } = req.headers;
        if (!authorization) return errorResponse(res, 401, "Token not provided");
        if (!otp) return errorResponse(res, 404, "OTP not found");
        if (otp.toString().length !== 6) return errorResponse(res, 400, "OTP must be 6 digits");

        const token = authorization.replace(/^Bearer\s+/, "");
        JWT.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) return errorResponse(res, 401, "Invalid Token");

            const user = await userModel.findById(decoded.user_id);
            if (!user || otp != user.otp) return errorResponse(res, 401, "Invalid OTP");

            user.isVerify = true;
            await user.save();

            return successResponse(res, 200, "OTP verified", { status: true });
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return errorResponse(res, 400, "Email & password are required");

        const user = await userModel.findOne({ email });
        if (!user) return errorResponse(res, 404, "User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return errorResponse(res, 401, "Incorrect Password");

        const token = JWT.sign({ user_id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
        });

        return successResponse(res, 200, "Login Successful", { user, token });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return errorResponse(res, 400, "Email not provided");

        const user = await userModel.findOne({ email });
        if (!user) return errorResponse(res, 404, "User not found");

        const token = JWT.sign({ user_id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
        });

        await sendEmail(
            email,
            "Forget Password",
            `<div>
                <h1>Reset Password</h1>
                <p>Your password reset token is: <b>${token}</b></p>
            </div>`
        );

        return successResponse(res, 200, `Email sent to ${email}`);
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { authorization } = req.headers;

        if (!authorization) return errorResponse(res, 401, "Token not provided");
        if (!password) return errorResponse(res, 400, "Password not provided");

        const token = authorization.replace(/^Bearer\s+/, "");
        JWT.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) return errorResponse(res, 401, "Invalid Token");

            const user = await userModel.findById(decoded.user_id);
            if (!user) return errorResponse(res, 404, "User not found");

            user.password = await bcrypt.hash(password, 12);
            await user.save();

            return successResponse(res, 200, "Password updated successfully", { user });
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};
