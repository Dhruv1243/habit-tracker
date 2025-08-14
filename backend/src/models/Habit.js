// models/Habit.js
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // This just ties the habit to a user
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "custom"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);
