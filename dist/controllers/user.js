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
exports.User = void 0;
const UserService_1 = require("../services/UserService");
const logger_1 = __importDefault(require("../utils/logger"));
const google_auth_library_1 = require("google-auth-library");
const user_validation_1 = require("../validations/user.validation");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const domain = process.env.DOMAIN || ".main.local";
const production = process.env.ENV === "production";
class User {
    static check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Checking user authentication");
                res.status(200).json({ success: true, message: "User is authenticated" });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in check method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in check user method");
                    res
                        .status(400)
                        .json({ success: false, message: "Something went wrong in check" });
                }
            }
        });
    }
    static googleOneTapLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { credential } = req.body;
                if (!credential)
                    throw new Error("No credential provided");
                const ticket = yield client.verifyIdToken({
                    idToken: credential,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                logger_1.default.info("Google One Tap token verified successfully");
                const payload = ticket.getPayload();
                const email = payload === null || payload === void 0 ? void 0 : payload.email;
                const name = payload === null || payload === void 0 ? void 0 : payload.name;
                const sub = payload === null || payload === void 0 ? void 0 : payload.sub;
                if (!email)
                    throw new Error("Invalid token");
                const data = {
                    email,
                    name: name || "",
                    oauthId: sub || "",
                    oauthProvider: "google",
                };
                const token = yield UserService_1.UserService.googlAuthLogin(data);
                logger_1.default.info("User logged in successfully via Google One Tap");
                res.cookie("token", token, {
                    domain: `${domain}`, // critical: enables subdomain sharing
                    // path: "/",
                    httpOnly: !production,
                    secure: production, // for HTTP in local dev
                    sameSite: "lax",
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in googleOneTapLogin method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in googleOneTapLogin method");
                    res
                        .status(500)
                        .json({
                        success: false,
                        message: "Something went wrong in googleOneTapLogin",
                    });
                }
            }
        });
    }
    static userDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Fetching user details");
                const id = req.authUser;
                const user = yield UserService_1.UserService.getUserDetails(Number(id));
                if (!user)
                    throw new Error("User not found");
                logger_1.default.info("User details fetched successfully");
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in userDetails method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in userDetails method");
                    res
                        .status(400)
                        .json({
                        success: false,
                        message: "Something went wrong in userDetails",
                    });
                }
            }
        });
    }
    static adminUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Fetching user details");
                const id = req.params.id;
                logger_1.default.info("Token verified successfully");
                const user = yield UserService_1.UserService.getUserDetails(Number(id));
                if (!user)
                    throw new Error("User not found");
                logger_1.default.info("User details fetched successfully");
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in userDetails method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in userDetails method");
                    res
                        .status(400)
                        .json({
                        success: false,
                        message: "Something went wrong in userDetails",
                    });
                }
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Registering a new user");
                const body = req.body;
                if (!body.firstName || !body.lastName || !body.email || !body.password)
                    throw new Error("Invalid body on register");
                const data = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                };
                const success = user_validation_1.userDetailsValidation.safeParse(data);
                if (!success.success)
                    throw new Error("Parsing failed");
                const user = yield UserService_1.UserService.registerUser(data);
                if (!user)
                    throw new Error("User cannot be registered");
                logger_1.default.info("User registered successfully");
                res.cookie("token", user, {
                    domain: `${domain}`, // critical: enables subdomain sharing
                    // path: "/",
                    httpOnly: !production,
                    secure: production, // for HTTP in local dev
                    sameSite: "lax",
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error in register user method ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in register method");
                    res
                        .status(400)
                        .json({
                        success: false,
                        message: "Something went wrong in register",
                    });
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Logging in user");
                const body = req.body;
                if (!body.email || !body.password)
                    throw new Error("Invalid body on login");
                const data = {
                    email: body.email,
                    password: body.password,
                };
                const { success } = user_validation_1.userLoginValidation.safeParse(data);
                if (!success)
                    throw new Error("Invalid email or password to login");
                const user = yield UserService_1.UserService.loginUser(data);
                if (!user)
                    throw new Error("User cannot be logged in");
                logger_1.default.info("User logged in successfully");
                res.cookie("token", user, {
                    domain: domain, // critical: enables subdomain sharing
                    // path: "/",
                    httpOnly: !production,
                    secure: production, // for HTTP in local dev
                    sameSite: "lax",
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error in login user method ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in login method");
                    res
                        .status(400)
                        .json({ success: false, message: "Something went wrong in login" });
                }
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Logging out user");
                const body = req.body;
                const data = {
                    token: req.cookies['token'] || "",
                };
                const user = yield UserService_1.UserService.logoutUser(data);
                if (!user)
                    throw new Error("Cannot logout");
                logger_1.default.info("User logged out successfully");
                res.clearCookie("token", {
                    domain: domain, // critical: enables subdomain sharing
                    // path: "/",
                    httpOnly: !production,
                    secure: production, // for HTTP in local dev
                    sameSite: "lax",
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in logout user method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in logout method");
                    res
                        .status(400)
                        .json({ success: false, message: "Something went wrong" });
                }
            }
        });
    }
    static userUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Updating user details");
                const body = req.body;
                if (!body.password || !req.authUser)
                    throw new Error("Invalid body on userUpdate");
                const data = {
                    id: parseInt(req.authUser),
                    password: body.password,
                };
                logger_1.default.info("User update data prepared");
                const { success } = user_validation_1.userUpdateValidation.safeParse(data);
                if (!success)
                    throw new Error("Invalid password to update");
                const user = yield UserService_1.UserService.updateUser(data);
                if (!user)
                    throw new Error("User cannot be updated");
                logger_1.default.info("User updated successfully");
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in userUpdate method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in userUpdate method");
                    res
                        .status(400)
                        .json({
                        success: false,
                        message: "Something went wrong in userUpdate",
                    });
                }
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Deleting user");
                const body = req.body;
                if (!req.authUser)
                    throw new Error("Invalid body on deleteUser");
                const data = {
                    id: parseInt(req.authUser),
                };
                logger_1.default.info("User delete data prepared");
                const user = yield UserService_1.UserService.deleteUser(data);
                if (!user)
                    throw new Error("User cannot be deleted");
                logger_1.default.info("User deleted successfully");
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteUser method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in deleteUser method");
                    res
                        .status(400)
                        .json({
                        success: false,
                        message: "Something went wrong in deleteUser",
                    });
                }
            }
        });
    }
    static validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Validating user token");
            try {
                const id = req.authUser;
                if (!id)
                    throw new Error("Token not found");
                logger_1.default.info("Token verified successfully");
                const user = yield UserService_1.UserService.validateUser(Number(id));
                if (!user)
                    throw new Error("Validation not found");
                logger_1.default.info("User validated successfully");
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in validate method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in validate user method");
                    res
                        .status(500)
                        .json({
                        success: false,
                        message: "Something went wrong in validate",
                    });
                }
            }
        });
    }
    static updateUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating user data");
            try {
                const body = req.body;
                const id = req.authUser;
                if (!id)
                    throw new Error("Token not found");
                const data = {};
                if (body.paidUser)
                    data.paidUser = body.paidUser === "true" || body.paidUser === true;
                if (body.validTill)
                    data.validTill = new Date(body.validTill);
                if (body.tagsCovered)
                    data.tagsCovered = body.tagsCovered;
                logger_1.default.info("User update data prepared");
                const updatedUser = yield UserService_1.UserService.updateUserData({
                    id: Number(id),
                    data,
                });
                if (!updatedUser)
                    throw new Error("User data cannot be updated");
                logger_1.default.info("User data updated successfully");
                res.status(200).json({ success: true, data: updatedUser });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateUserData method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateUserData method");
                    res
                        .status(500)
                        .json({
                        success: false,
                        message: "Something went wrong in updateUserData",
                    });
                }
            }
        });
    }
    static adminUpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating user data");
            try {
                const body = req.body;
                const id = req.params.id;
                if (!id)
                    throw new Error("Token not found");
                const data = {};
                if (body.paidUser)
                    data.paidUser = body.paidUser === "true" || body.paidUser === true;
                if (body.validTill)
                    data.validTill = new Date(body.validTill);
                if (body.tagsCovered)
                    data.tagsCovered = body.tagsCovered;
                logger_1.default.info("User update data prepared");
                const updatedUser = yield UserService_1.UserService.updateUserData({
                    id: Number(id),
                    data,
                });
                if (!updatedUser)
                    throw new Error("User data cannot be updated");
                logger_1.default.info("User data updated successfully");
                res.status(200).json({ success: true, data: updatedUser });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateUserData method");
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateUserData method");
                    res
                        .status(500)
                        .json({
                        success: false,
                        message: "Something went wrong in updateUserData",
                    });
                }
            }
        });
    }
}
exports.User = User;
