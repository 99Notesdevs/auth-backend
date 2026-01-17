"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.userLoginValidation = exports.userDetailsValidation = void 0;
const zod_1 = require("zod");
exports.userDetailsValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(2, { message: "First name must be atleast 2 characters" }),
    lastName: zod_1.z.string().min(2, { message: "Last name must be atleast 2 characters" }),
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(8, { message: "Password must be atleast 8 characters" }),
});
exports.userLoginValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(8, { message: "Password must be atleast 8 characters" }),
});
exports.userUpdateValidation = zod_1.z.object({
    id: zod_1.z.string().uuid({ message: "Invalid user id" }),
    password: zod_1.z.string().min(8, { message: "Password must be atleast 8 characters" }),
});
