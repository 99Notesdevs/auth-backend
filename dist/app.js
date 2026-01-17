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
        "http://main.main.local:3000",
        "http://tests.main.local:5173",
        "http://shop.main.local:5173",
        "http://auth.main.local:5174",
        "http://localhost:44275",
        "http://13.126.229.93:5173",
        "http://13.126.229.93",
        "http://community.main.local:8080"
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
