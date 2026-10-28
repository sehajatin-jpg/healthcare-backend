
import { Patient, Doctor, PatientDoctor } from "../models/index.js";

export const assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    if (!patientId || !doctorId) {
      return res.status(400).json({
        message: "Patient ID and Doctor ID are required",
      });
    }

    // User can assign doctors only to their own patients
    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const mapping = await PatientDoctor.create({
      patientId,
      doctorId,
    });

    res.status(201).json({
      message: "Doctor assigned successfully",
      mapping,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMappings = async (req, res) => {
  try {
    const mappings = await PatientDoctor.findAll({
      include: [
        {
          model: Patient,
          where: { userId: req.user.id },
        },
        Doctor,
      ],
    });

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientDoctors = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.patient_id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const mappings = await PatientDoctor.findAll({
      where: { patientId: patient.id },
      include: [Doctor],
    });

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMapping = async (req, res) => {
  try {
    const mapping = await PatientDoctor.findByPk(req.params.id, {
      include: [Patient],
    });

    if (!mapping || mapping.Patient.userId !== req.user.id) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    await mapping.destroy();

    res.json({ message: "Doctor assignment removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
