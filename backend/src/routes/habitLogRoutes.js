// routes/habitLogRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  toggleLog,
  setLog,
  getLogs,
  getYear,
} from "../controller/habitLogController.js";

const router = express.Router({ mergeParams: true });

router.use(auth); // protect all log routes

router.post("/toggle", toggleLog);
router.put("/", setLog);
router.get("/", getLogs);
router.get("/year", getYear);

export default router;
