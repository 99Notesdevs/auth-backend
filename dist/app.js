"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: [
        "https://99notes.org",
        "http://99notes.org",
        "https://test.99notes.org",
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "X-Auth-Type", "x-auth-type"],
    optionsSuccessStatus: 200,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json({ limit: "25mb" }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: "25mb" }));
exports.app.use("/api/v1", index_1.default);
