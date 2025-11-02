// routes/index.js
import express from "express";
import userRouter from "./user.route.js";

const router = express.Router();

// Mount all module routers
router.use("/auth", userRouter);       // Handles /api/auth/register, /api/auth/login

export default router;