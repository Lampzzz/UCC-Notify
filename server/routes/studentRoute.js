import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import uploadFile from "../utils/uploadFile.js";
import {
  studentRegistration,
  editStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router
  .post(
    "/register",
    authenticate,
    authorizeAdmin,
    uploadFile.single("picture"),
    studentRegistration
  )
  .put(
    "/edit/:id",
    authenticate,
    authorizeAdmin,
    uploadFile.single("picture"),
    editStudent
  )
  .delete("/delete/:id", deleteStudent);

export default router;
