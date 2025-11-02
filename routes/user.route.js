import express from "express";
import {
  signUp,
  verifyOTP,
  login,
  forgetPassword,
  updatePassword,
  resendOTP
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/verifyOtp", verifyOTP);
userRouter.post("/login", login);
userRouter.post("/forgetPassword", forgetPassword);
userRouter.post("/resetPassword", updatePassword);
userRouter.post("/resend-otp", resendOTP);

export default userRouter;
