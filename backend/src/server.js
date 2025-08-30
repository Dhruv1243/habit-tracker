// server.js
import "dotenv/config"; // <-- runs before other imports

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import habitRoutes from "./routes/habitRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

// Since you're using Authorization headers (not cookies), you don't need credentials:true:
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));

app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
