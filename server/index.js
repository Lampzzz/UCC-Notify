import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Importing custom modules
import connection from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import announcementRoute from "./routes/announcementRoute.js";
import userRoute from "./routes/userRoute.js";
import bookmarkRoute from "./routes/bookmarkRoute.js";
import commentRoute from "./routes/commentRoute.js";
import studentRoute from "./routes/studentRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connection();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5174", ["http://localhost:5173"]],
    credentials: true,
  })
);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/image", express.static(path.join(__dirname, "upload/image")));

// Routes
app.use("/auth", authRoutes);
app.use("/announcement", announcementRoute);
app.use("/user", userRoute);
app.use("/bookmark", bookmarkRoute);
app.use("/comment", commentRoute);
app.use("/student", studentRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
