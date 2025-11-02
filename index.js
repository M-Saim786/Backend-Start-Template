import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";  // <-- New: Express 5 compatible XSS
import { connectDB } from "./config/dbConnect.js";
import router from "./routes/routes.js";

// import "express-async-errors"; 

// Load env vars
dotenv.config();

const app = express();

// 🔧 Core Middlewares
app.use(express.json()); // prevent large payload attacks
// app.use(express.json({ limit: "10kb" })); // prevent large payload attacks
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // allow local dev
    credentials: true, // if using cookies/auth headers
}));
app.use(morgan("dev"));

// 🛡️ Security Middlewares
app.use(helmet()); // sets various secure HTTP headers
// app.use(mongoSanitize()); // prevents NoSQL injection
app.use(xss()); // sanitizes user input from XSS
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again later.",
    })
);


app.use("/api", router); // mount root router at /api


app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "API is running 🚀" });
});

// ❌ 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ⚠️ Global Error Handler (for unhandled errors)
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});


// 🟢 Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {

    // console.log(process.env);

    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS);
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);


    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
