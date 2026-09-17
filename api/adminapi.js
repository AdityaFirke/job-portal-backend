import exp from "express";
import { UserModel } from "../models/usermodel.js";
import { JobModel } from "../models/Jobmodel.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
export const adminRouter = exp.Router();
// Get all users 
adminRouter.get("/users", verifyToken, allowRoles("admin"), async (req, res) => {
  let allUsers = await UserModel.find().select("-password").sort({ createdAt: -1 });
  res.status(200).json({ success: true, message: "All registered users", data: allUsers });
});

// Change user account status 
adminRouter.patch("/users/:userId/status", verifyToken, allowRoles("admin"), async (req, res) => {
  let { status } = req.body;
  if (!["active", "blocked"].includes(status)) {
    return res.status(400).json({ success: false, message: "Status must be 'active' or 'blocked'" });
  }

  let modifiedUser = await UserModel.findByIdAndUpdate(
    req.params.userId,
    { status },
    { new: true }
  ).select("-password");

  if (!modifiedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: `User status changed to ${status}`, data: modifiedUser });
});

// Delete non-compliant job post 
adminRouter.delete("/jobs/:jobId", verifyToken, allowRoles("admin"), async (req, res) => {
  let removedJob = await JobModel.findByIdAndDelete(req.params.jobId);
  if (!removedJob) {
    return res.status(404).json({ success: false, message: "Job post not found" });
  }

  res.status(200).json({ success: true, message: "Job post removed by admin" });
});
