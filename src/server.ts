import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import logger from "./utils/logger";
import { startUserGrpcServer } from "./grpc/server/server";

const PORT = Number(process.env.PORT) || 55000;

// start the gRPC server
startUserGrpcServer();

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
