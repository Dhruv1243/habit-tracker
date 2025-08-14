// controllers/habitLogController.js
import Habit from "../../models/Habit.js";
import HabitLog from "../../models/HabitLog.js";
import { toUtcMidnight } from "../../utils/date.js";

// Ensure the habit is owned by the current user
async function assertHabitOwnership(userId, habitId) {
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    const err = new Error("Habit not found");
    err.status = 404;
    throw err;
  }
}

// POST /api/habits/:habitId/logs/toggle  body: { date?: 'YYYY-MM-DD' }
export async function toggleLog(req, res) {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;
    const day = toUtcMidnight(req.body.date || new Date());

    await assertHabitOwnership(userId, habitId);

    const existing = await HabitLog.findOne({
      user: userId,
      habit: habitId,
      date: day,
    });

    if (existing) {
      await HabitLog.deleteOne({ _id: existing._id });
      return res
        .status(200)
        .json({ toggled: "off", date: day.toISOString().slice(0, 10) });
    }

    const created = await HabitLog.create({
      user: userId,
      habit: habitId,
      date: day,
      value: 1,
    });
    return res.status(201).json({ toggled: "on", log: created });
  } catch (err) {
    console.error("toggleLog error", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error toggling log" });
  }
}

// PUT /api/habits/:habitId/logs  body: { date: 'YYYY-MM-DD', value: 0..3 }
export async function setLog(req, res) {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;
    const { date, value = 1 } = req.body;

    if (!date) return res.status(400).json({ message: "date is required" });
    const day = toUtcMidnight(date);

    await assertHabitOwnership(userId, habitId);

    const updated = await HabitLog.findOneAndUpdate(
      { user: userId, habit: habitId, date: day },
      { $set: { value } },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("setLog error", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error setting log" });
  }
}

// GET /api/habits/:habitId/logs?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function getLogs(req, res) {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;
    const { from, to } = req.query;

    if (!from || !to)
      return res.status(400).json({ message: "from and to are required" });

    const fromDay = toUtcMidnight(from);
    const toDay = toUtcMidnight(to);

    await assertHabitOwnership(userId, habitId);

    const logs = await HabitLog.find({
      user: userId,
      habit: habitId,
      date: { $gte: fromDay, $lte: toDay },
    }).select("date value -_id");

    // Return dates in YYYY-MM-DD for frontend heatmap libs
    const data = logs.map((l) => ({
      date: l.date.toISOString().slice(0, 10),
      count: l.value,
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error("getLogs error", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error fetching logs" });
  }
}

// GET /api/habits/:habitId/logs/year (last 365 days)
export async function getYear(req, res) {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;

    const todayUtc = toUtcMidnight(new Date());
    const yearAgoUtc = new Date(todayUtc);
    yearAgoUtc.setUTCDate(yearAgoUtc.getUTCDate() - 364);

    await assertHabitOwnership(userId, habitId);

    const logs = await HabitLog.find({
      user: userId,
      habit: habitId,
      date: { $gte: yearAgoUtc, $lte: todayUtc },
    }).select("date value -_id");

    const data = logs.map((l) => ({
      date: l.date.toISOString().slice(0, 10),
      count: l.value,
    }));

    res.status(200).json({
      from: yearAgoUtc.toISOString().slice(0, 10),
      to: todayUtc.toISOString().slice(0, 10),
      data,
    });
  } catch (err) {
    console.error("getYear error", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error fetching year logs" });
  }
}
