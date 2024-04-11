import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import uploadFile from "../utils/uploadFile.js";
import {
  sendMail,
  getCurrentUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router
  .get("/details", authenticate, getCurrentUser)
  .delete("/delete/:userId", deleteUser)
  .post("/send-message", sendMail)
  .put("/edit", authenticate, uploadFile.single("avatar"), updateUserProfile);

export default router;
