/**
 * It is the real entrypoint of the application.
 * It is responsible for:
 * - Load environment variables (dotenv).
 * - Start the database (sequelize.authenticate + sequelize.sync).
 * - Start the server (app.listen).
 * - It's the one you actually run when you run npm run dev or docker-compose up.
 */

// import { runAllSeeders } from "./seeders";


import 'dotenv/config';
import app from "./server";
import { syncDB } from "././modules/models_index/index";
import { envConfig, validateEnvConfig } from "./config/env";

const PORT = envConfig.PORT;

const start = async () => {
  try {
    validateEnvConfig();
    
    await syncDB();

    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error conecting with DB :", error);
    process.exit(1);
  }
};

start();
