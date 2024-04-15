import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  addBookmark,
  removeBookmark,
  checkBookmark,
  getBookmarkByUserID,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router
  .post("/add", authenticate, addBookmark)
  .delete("/remove/:userID/:announcementID", authenticate, removeBookmark)
  .get("/check/:userID/:announcementID", authenticate, checkBookmark)
  .get("/get/:userID", authenticate, getBookmarkByUserID);

export default router;
