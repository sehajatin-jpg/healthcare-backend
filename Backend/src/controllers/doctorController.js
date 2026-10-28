
import { Doctor } from "../models/index.js";

export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, email, phone } = req.body;

    if (!name || !specialization || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const doctor = await Doctor.create({
      name,
      specialization,
      email,
      phone,
    });

    res.status(201).json(doctor);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(400).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { name, specialization, email, phone } = req.body;

    await doctor.update({ name, specialization, email, phone });

    res.json(doctor);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(400).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.destroy();

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
