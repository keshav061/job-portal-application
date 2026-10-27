import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register route with file upload
router.route("/register").post(singleUpload, register);

// Login route
router.route("/login").post(login);

// Logout route
router.route("/logout").get(logout);

// Update profile route
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// Saved Jobs routes (Temporarily disabled due to missing controller functions)
// router.route("/profile/save/:id").post(isAuthenticated, toggleSavedJob);
// router.route("/profile/saved").get(isAuthenticated, getSavedJobs);

// Forgot/Reset Password routes (Temporarily disabled due to missing controller functions)
// router.route("/forgot-password").post(forgotPassword);
// router.route("/reset-password/:token").post(resetPassword);

export default router;