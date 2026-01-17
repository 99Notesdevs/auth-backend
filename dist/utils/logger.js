"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const pino_loki_1 = __importDefault(require("pino-loki"));
// Loki transport setup
const transport = (0, pino_loki_1.default)({
    host: "http://loki:3100",
    labels: { app: "auth-service" },
});
const logger = (0, pino_1.default)({
    level: "info",
    formatters: {
        level(label) {
            return { level: label };
        }
    },
}, transport);
exports.default = logger;
