import { app } from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
dotenv.config();

const PORT = Number(process.env.PORT) || 55000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
