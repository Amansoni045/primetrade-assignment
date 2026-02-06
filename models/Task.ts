import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Task || mongoose.model("Task", TaskSchema);
