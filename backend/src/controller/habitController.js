import Habit from "../../models/Habit.js";
export async function getAllHabits(req, res) {
  try {
    const habits = await Habit.find(); //this fetches all the habits from the database
    res.status(200).json(habits);
  } catch (error) {
    console.log("Error in get all habits", error);
    res.status(500).json({ message: "Error fetching habits" });
  }
}
export async function getHabitById(req, res) {
  try {
    id = req.params.id;
    const habit = await Habit.findById(id);
    res.status(200).json(habit);
  } catch (error) {
    console.log("Error in get habit", error);
    res.status(500).json({ message: "Error fetching habit" });
  }
}

export async function getHabit(req, res) {
  try {
    id = req.params.id;
    const habit = await Habit.findById(id);
    res.status(200).json(habit);
  } catch (error) {
    console.log("Error in get habit", error);
    res.status(500).json({ message: "Error fetching habit" });
  }
}

export async function createHabit(req, res) {
  try {
    const { title, description, startDate, endDate, frequency } = req.body; //here we are getting the data from the request
    const newHabit = new Habit({
      //then we're using that data to create a new habit
      title,
      description,
      startDate,
      endDate,
      frequency,
    });
    await newHabit.save(); //this saves it to the database
    res.status(201).json(newHabit);
  } catch (error) {
    console.log("Error in create habit", error);
    res.status(500).json({ message: "Error creating habit" });
  }
}

export async function updateHabit(req, res) {
  try {
    const { title, description, startDate, endDate, frequency } = req.body; //this is just getting the data from the request
    await Habit.findByIdAndUpdate(req.params.id, {
      //this is finding the habit by id and updating it
      title,
      description,
      startDate,
      endDate,
      frequency,
    });
    if (!updateHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating habit" });
  }
}

export async function deleteHabit(req, res) {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.log("Error in delete habit", error);
    res.status(500).json({ message: "Error deleting habit" });
  }
}
