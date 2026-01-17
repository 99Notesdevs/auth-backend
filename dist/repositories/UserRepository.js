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
exports.UserRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class UserRepository {
    static isUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering isUserById repository method");
            const user = yield prisma_1.prisma.user.findUnique({
                where: { id },
                select: { id: true },
            });
            logger_1.default.info("Exiting isUserById repository method");
            return user;
        });
    }
    static getUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findMany({
                where: {
                    id: { in: ids },
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    userData: {
                        select: {
                            rating: true,
                        },
                    },
                },
            });
            return users.map((u) => {
                var _a, _b;
                return ({
                    userId: u.id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    rating: (_b = (_a = u.userData) === null || _a === void 0 ? void 0 : _a.rating) !== null && _b !== void 0 ? _b : 0,
                });
            });
        });
    }
    static createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstName, lastName, email, password, oauthId, oauthProvider, }) {
            logger_1.default.info("Entering createUser repository method");
            const user = yield prisma_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const uid = yield tx.user.create({
                    data: { firstName, lastName, email, password, oauthId, oauthProvider },
                    select: { id: true },
                });
                yield tx.userData.create({
                    data: { userId: uid.id },
                    select: { id: true },
                });
                yield tx.wishList.create({
                    data: { userId: uid.id },
                    select: { id: true },
                });
                yield tx.cart.create({
                    data: { userId: uid.id, totalAmount: 0 },
                    select: { id: true },
                });
                return uid;
            }));
            logger_1.default.info("Exiting createUser repository method");
            return user;
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUser repository method");
            const user = yield prisma_1.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    userData: {
                        select: {
                            paidUser: true,
                            validTill: true,
                            rating: true,
                            tagsCovered: true,
                        },
                    },
                },
            });
            logger_1.default.info("Exiting getUser repository method");
            return user;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserByEmail repository method");
            const user = yield prisma_1.prisma.user.findUnique({
                where: { email },
                select: { id: true, password: true },
            });
            logger_1.default.info("Exiting getUserByEmail repository method");
            return user;
        });
    }
    static updateUser(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateUser repository method");
            const user = yield prisma_1.prisma.user.update({
                where: { id },
                data: { password },
                select: { id: true, email: true },
            });
            logger_1.default.info("Exiting updateUser repository method");
            return user;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteUser repository method");
            const exists = yield prisma_1.prisma.user.findUnique({
                where: { id },
                select: { id: true, email: true },
            });
            if (!exists)
                throw new Error("User not found");
            const user = yield prisma_1.prisma.user.delete({
                where: { id },
                select: { id: true },
            });
            logger_1.default.info("Exiting deleteUser repository method");
            return user;
        });
    }
    static getUserRating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserRating repository method");
            const user = yield prisma_1.prisma.userData.findUnique({
                where: { userId: id },
                select: { rating: true },
            });
            if (!user)
                throw new Error("User not found");
            logger_1.default.info("Exiting getUserRating repository method");
            return user.rating;
        });
    }
    static updateUserRating(id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateUserRating repository method");
            const user = yield prisma_1.prisma.userData.update({
                where: { userId: id },
                data: { rating },
                select: { id: true },
            });
            if (!user)
                throw new Error("User not found");
            logger_1.default.info("Exiting updateUserRating repository method");
            return true;
        });
    }
    static getValidation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getValidation repository method");
            const payments = yield prisma_1.prisma.userData.findUnique({
                where: { userId: id },
                select: { paidUser: true, validTill: true },
            });
            if (!payments)
                throw new Error("Payments not found");
            logger_1.default.info("Exiting getValidation repository method");
            return payments;
        });
    }
    static updateUserData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateUserData repository method");
            const user = yield prisma_1.prisma.userData.update({
                where: { userId: id },
                data: Object.assign({}, data),
                select: { id: true },
            });
            logger_1.default.info("Exiting updateUserData repository method");
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
