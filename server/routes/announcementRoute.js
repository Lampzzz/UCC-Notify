import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  createAnnouncement,
  getAllAnnouncement,
  getAnnouncement,
} from "../controllers/announcementController.js";
import uploadFile from "../utils/uploadFile.js";

const router = express.Router();

router
  .post("/create", uploadFile.single("image"), createAnnouncement)
  .get("/data", getAllAnnouncement)
  .get("/data/:id", getAnnouncement);

export default router;
