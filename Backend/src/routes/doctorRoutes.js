
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
