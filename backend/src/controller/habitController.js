export function getAllHabits(req, res) {
  res.status(200).send("You got 10 habits");
}

export function getHabit(req, res) {
  res.status(200).send("You got 1 habit");
}

export function createHabit(req, res) {
  res.status(201).json({ message: "Habit created" });
}

export function updateHabit(req, res) {
  res.status(200).json({ message: "Habit updated successfully" });
}

export function deleteHabit(req, res) {
  res.status(200).json({ message: "Habit deleted successfully" });
}
