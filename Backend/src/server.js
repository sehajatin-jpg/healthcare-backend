
import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

try {
  await sequelize.authenticate();
  console.log("PostgreSQL connected");

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error(error.message);
}
