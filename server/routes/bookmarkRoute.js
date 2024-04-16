import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  toggleBookmark,
  checkBookmark,
  getBookmarkByUserID,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router
  .post("/toggle", authenticate, toggleBookmark)
  .get("/check/:userID/:announcementID", authenticate, checkBookmark)
  .get("/get/:userID", authenticate, getBookmarkByUserID);

export default router;
