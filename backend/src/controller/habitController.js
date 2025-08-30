// controllers/habitController.js
import Habit from "../models/Habit.js";

export async function getAllHabits(req, res) {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(habits);
  } catch (error) {
    console.log("Error in getAllHabits", error);
    res.status(500).json({ message: "Error fetching habits" });
  }
}

export async function getHabitById(req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findOne({ _id: id, user: req.user.id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (error) {
    console.log("Error in getHabitById", error);
    res.status(500).json({ message: "Error fetching habit" });
  }
}

export async function createHabit(req, res) {
  try {
    const count = await Habit.countDocuments({ user: req.user.id }); //we get the amount of habits we have
    if (count >= 3) {
      // we check if the user has more than 3 habits
      return res
        .status(400)
        .json({ message: "Habit limit reached (3 per user)" });
    }

    const { title, description = "", startDate, endDate, frequency } = req.body;

    const newHabit = await Habit.create({
      user: req.user.id,
      title,
      description,
      startDate,
      endDate,
      frequency,
    });

    res.status(201).json(newHabit);
  } catch (error) {
    console.log("Error in createHabit", error);
    res.status(500).json({ message: "Error creating habit" });
  }
}

export async function updateHabit(req, res) {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, frequency } = req.body;

    const updated = await Habit.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, startDate, endDate, frequency },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.log("Error in updateHabit", error);
    res.status(500).json({ message: "Error updating habit" });
  }
}

export async function deleteHabit(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Habit.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.log("Error in deleteHabit", error);
    res.status(500).json({ message: "Error deleting habit" });
  }
}
