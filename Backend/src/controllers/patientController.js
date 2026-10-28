
import { Patient } from "../models/index.js";

export const createPatient = async (req, res) => {
  try {
    const { name, age, gender, address } = req.body;

    if (!name || age === undefined || !gender || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      address,
      userId: req.user.id,
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.user.id },
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const { name, age, gender, address } = req.body;

    await patient.update({ name, age, gender, address });

    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.destroy();

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
