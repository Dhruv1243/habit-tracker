import express from "express"; //if you're using import just make sure that type is set to modul in package.json

const app = express(); //this is to make it run

app.get("/api/habits", (req, res) => {
  res.status(200).send("You got 10 habits"); //this is what will be sent and displayed
});
app.post("/api/habits", (req, res) => {
  res.status(201).json({ message: "Habit created" }); //this will send when its succesfully created
});
app.put("/api/habit:id", (req, res) => {
  res.status(201).json({ message: "Habit updated successfully" }); //this will send when its succesfully updated
});
app.delete("/api/habit:id", (req, res) => {
  res.status(201).json({ message: "Habit deleted successfully" }); //this will send when its succesfully deleted
});
app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
