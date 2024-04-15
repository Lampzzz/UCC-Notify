import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  addComment,
  removeComment,
  showComment,
} from "../controllers/commentController.js";

const router = express.Router();

router
  .post("/add", authenticate, addComment)
  .delete("/remove/:userID", authenticate, removeComment)
  .get("/show/:announcementID", showComment);

export default router;
