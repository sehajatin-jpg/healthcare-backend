
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

import {
  assignDoctor,
  getMappings,
  getPatientDoctors,
  removeMapping,
} from "../controllers/mappingController.js";

const router = express.Router();

router.use(authenticate);

router.post("/", assignDoctor);
router.get("/", getMappings);
router.get("/:patient_id", getPatientDoctors);
router.delete("/:id", removeMapping);

export default router;
