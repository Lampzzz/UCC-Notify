import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/forgot-password", forgotPassword)
  .put("/reset-password", resetPassword)
  .post("/logout", logout);

export default router;
