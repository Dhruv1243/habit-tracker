import express from "express"; //if you're using import just make sure that type is set to modul in package.json

const app = express(); //this is to make it run

import habitRoutes from "./routes/habitRoutes.js";

app.use("/api/habits", habitRoutes); //For any request that starts with /api/habits, use the routes defined in habitRoutes

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
