import express from "express";
import * as habitController from "../controller/habitController.js";
import auth from "../middleware/auth.js";
import habitLogRoutes from "./habitLogRoutes.js";

const router = express.Router();

router.use(auth); //this ensures that only if the user is logged in he can access the routes

router.get("/", habitController.getAllHabits);
router.get("/:id", habitController.getHabitById);
router.post("/", habitController.createHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);

// logs for a given habit
router.use("/:habitId/logs", habitLogRoutes);

export default router;
