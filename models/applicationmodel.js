import { Schema, model } from "mongoose";
const applicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "job",
      required: true
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: ["applied", "reviewed", "interviewed", "rejected", "hired"],
      default: "applied"
    },
    resumeLink: {
      type: String,
      trim: true
    },
    coverLetter: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw"
  }
);
applicationSchema.index({jobId: 1, applicantId: 1 }, { unique: true });
export const ApplicationModel = model("application", applicationSchema);
