import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  addComment,
  removeComment,
  getComment,
} from "../controllers/commentController.js";

const router = express.Router();

router
  .post("/add", authenticate, addComment)
  .delete("/remove/:userID", authenticate, removeComment)
  .get("/get/:announcementID", getComment);

export default router;
