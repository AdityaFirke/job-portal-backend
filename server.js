import exp from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { userRouter } from "./api/userapi.js";
import { jobRouter } from "./api/jobapi.js";
import { applicationRouter } from "./api/applicationapi.js";
import { adminRouter } from "./api/adminapi.js";

dotenv.config();

const app = exp();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Global Middleware
app.use(exp.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/admin", adminRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// Database Connection & Server Startup
if (!MONGO_URI) {
  console.error("Fatal Error: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });