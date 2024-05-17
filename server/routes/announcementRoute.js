import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import uploadFile from "../utils/uploadFile.js";
import {
  createAnnouncement,
  getAllAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router
  .post(
    "/create",
    uploadFile.single("image"),
    authenticate,
    authorizeAdmin,
    createAnnouncement
  )
  .get("/data", getAllAnnouncement)
  .get("/data/:id", getAnnouncement)
  .put(
    "/update/:announcementID",
    uploadFile.single("image"),
    authenticate,
    authorizeAdmin,
    updateAnnouncement
  )
  .delete(
    "/delete/:announcementID",
    authenticate,
    authorizeAdmin,
    deleteAnnouncement
  );

export default router;
