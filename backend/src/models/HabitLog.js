// models/HabitLog.js
import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    date: { type: Date, required: true }, // store day in UTC midnight
    value: { type: Number, default: 1 }, // 1 = done, could use intensity
  },
  { timestamps: true }
);

habitLogSchema.index({ user: 1, habit: 1, date: 1 }, { unique: true });

export default mongoose.model("HabitLog", habitLogSchema);
