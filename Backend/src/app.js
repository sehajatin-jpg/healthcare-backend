import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import mappingRoutes from "./routes/mappingRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthcare API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

// Error handling (must come after routes)
app.use(notFound);
app.use(errorHandler);

export default app;
