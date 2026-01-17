"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class AuthTokenRepository {
    static createAuthToken(token, type) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createAuthToken repository method");
            const result = yield prisma_1.prisma.authToken.create({
                data: { token, type },
                select: { token: true, type: true },
            });
            logger_1.default.info("Exiting createAuthToken repository method");
            return result;
        });
    }
    static getAuthToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAuthToken repository method");
            const result = yield prisma_1.prisma.authToken.findUnique({
                where: { token },
                select: { token: true, type: true },
            });
            logger_1.default.info("Exiting getAuthToken repository method");
            return result;
        });
    }
    static deleteAuthToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteAuthToken repository method");
            const exists = yield prisma_1.prisma.authToken.findUnique({ where: { token } });
            if (!exists)
                throw new Error("Token not found");
            const result = yield prisma_1.prisma.authToken.delete({
                where: { token },
                select: { token: true },
            });
            logger_1.default.info("Exiting deleteAuthToken repository method");
            return result;
        });
    }
}
exports.AuthTokenRepository = AuthTokenRepository;
