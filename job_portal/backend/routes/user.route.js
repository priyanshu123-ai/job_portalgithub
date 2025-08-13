import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { verifyOtpController } from "../controllers/verify.controller.js"; // 👈 import this
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Auth routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// OTP verification route
router.route("/verify-otp").post(verifyOtpController); // 👈 add this route

// Profile update
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;
