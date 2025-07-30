import express from "express"; //if you're using import just make sure that type is set to modul in package.json
import { connectDB } from "../config/db.js";
import habitRoutes from "./routes/habitRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config(); //this is to be able to use environment variables

const app = express(); //this is to make it run
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json()); //this middeleware is to be able to use json

app.use("/api/habits", habitRoutes); //For any request that starts with /api/habits, use the routes defined in habitRoutes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server started on PORT: 5001");
});

//
