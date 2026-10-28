
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PatientDoctor = sequelize.define("PatientDoctor", {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default PatientDoctor;
