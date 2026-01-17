"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const logger_1 = __importDefault(require("./utils/logger"));
const server_1 = require("./grpc/server/server");
const PORT = Number(process.env.PORT) || 55000;
// start the gRPC server
(0, server_1.startUserGrpcServer)();
app_1.app.listen(PORT, "0.0.0.0", () => {
    logger_1.default.info(`Server is running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
