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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const AuthTokenRepository_1 = require("../repositories/AuthTokenRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class UserService {
    static getUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserDetails service");
            const user = yield UserRepository_1.UserRepository.getUser(id);
            if (!user)
                throw new Error("User not found");
            logger_1.default.info("Exiting getUserDetails service");
            return user;
        });
    }
    static registerUser(_b) {
        return __awaiter(this, arguments, void 0, function* ({ firstName, lastName, email, phone, password, }) {
            logger_1.default.info("Entering registerUser service");
            const hash = yield bcrypt_1.default.hash(password, 10);
            const user = yield UserRepository_1.UserRepository.createUser({
                firstName,
                lastName,
                email,
                phone,
                password: hash,
            });
            if (!user || !user.id)
                throw new Error("User not created");
            const cookie = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
            yield AuthTokenRepository_1.AuthTokenRepository.createAuthToken(cookie, "User");
            logger_1.default.info("Exiting registerUser service");
            return cookie;
        });
    }
    static loginUser(_b) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            logger_1.default.info("Entering loginUser service");
            const user = yield UserRepository_1.UserRepository.getUserByEmail(email);
            if (!user)
                throw new Error("User not found");
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match)
                throw new Error("Invalid password");
            const cookie = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
            yield AuthTokenRepository_1.AuthTokenRepository.createAuthToken(cookie, "User");
            logger_1.default.info("Exiting loginUser service");
            return cookie;
        });
    }
    static logoutUser(_b) {
        return __awaiter(this, arguments, void 0, function* ({ token }) {
            logger_1.default.info("Entering logoutUser service");
            const logout = yield AuthTokenRepository_1.AuthTokenRepository.deleteAuthToken(token);
            if (!logout)
                throw new Error("Cannot logout from services");
            logger_1.default.info("Exiting logoutUser service");
            return logout;
        });
    }
    static updateUser(_b) {
        return __awaiter(this, arguments, void 0, function* ({ id, password }) {
            logger_1.default.info("Entering updateUser service");
            const hash = yield bcrypt_1.default.hash(password, 10);
            const user = yield UserRepository_1.UserRepository.updateUser(id, hash);
            if (!user)
                throw new Error("User not updated");
            logger_1.default.info("Exiting updateUser service");
            return user;
        });
    }
    static deleteUser(_b) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            logger_1.default.info("Entering deleteUser service");
            const user = yield UserRepository_1.UserRepository.deleteUser(id);
            if (!user)
                throw new Error("User not deleted");
            logger_1.default.info("Exiting deleteUser service");
            return user;
        });
    }
    static validateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering validateUser service");
            const user = yield UserRepository_1.UserRepository.getUser(id);
            if (!user)
                throw new Error("User not found");
            const payments = yield UserRepository_1.UserRepository.getValidation(id);
            if (payments.paidUser !== true)
                throw new Error("Not a paid user");
            if (!payments.validTill || payments.validTill.getTime() <= Date.now())
                throw new Error("Time expired");
            logger_1.default.info("Exiting validateUser service");
            return Object.assign(Object.assign({}, user), payments);
        });
    }
    static updateUserData(_b) {
        return __awaiter(this, arguments, void 0, function* ({ id, data, }) {
            logger_1.default.info("Entering updateUserData service");
            const user = yield UserRepository_1.UserRepository.updateUserData(id, data);
            if (!user)
                throw new Error("User not updated");
            logger_1.default.info("Exiting updateUserData service");
            return user;
        });
    }
}
exports.UserService = UserService;
_a = UserService;
UserService.googlAuthLogin = (_b) => __awaiter(void 0, [_b], void 0, function* ({ email, name, oauthId, oauthProvider, }) {
    logger_1.default.info("Entering googlAuthLogin service");
    let user = yield UserRepository_1.UserRepository.getUserByEmail(email);
    if (!user) {
        user = yield UserRepository_1.UserRepository.createUser({
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1] || "",
            email,
            password: "",
            oauthId,
            oauthProvider,
        });
        if (!user || !user.id)
            throw new Error("User not created");
    }
    const cookie = "Bearer " + jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
    const authtoken = cookie.split(" ")[1];
    yield AuthTokenRepository_1.AuthTokenRepository.createAuthToken(authtoken, "User");
    logger_1.default.info("Exiting googlAuthLogin service");
    return authtoken;
});
