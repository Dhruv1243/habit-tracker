import express from "express";
const router = express.Router();
import * as habitController from "../controller/habitController.js";

router.get("/", habitController.getAllHabits);
router.get("/:id", habitController.getHabit);
router.post("/", habitController.createHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);

export default router;
