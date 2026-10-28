
import User from "./User.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";
import PatientDoctor from "./PatientDoctor.js";

// User → Patients
User.hasMany(Patient, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Patient.belongsTo(User, {
  foreignKey: "userId",
});

// Patients ↔ Doctors
Patient.belongsToMany(Doctor, {
  through: PatientDoctor,
  foreignKey: "patientId",
  otherKey: "doctorId",
  onDelete: "CASCADE",
});
Doctor.belongsToMany(Patient, {
  through: PatientDoctor,
  foreignKey: "doctorId",
  otherKey: "patientId",
  onDelete: "CASCADE",
});

export { User, Patient, Doctor, PatientDoctor };
