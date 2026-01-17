"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.startUserGrpcServer = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const path_1 = __importDefault(require("path"));
const AuthTokenRepository_1 = require("../../repositories/AuthTokenRepository");
const UserRepository_1 = require("../../repositories/UserRepository");
const AUTH_PROTO_PATH = path_1.default.join(__dirname, '../proto/auth.proto');
const USER_PROTO_PATH = path_1.default.join(__dirname, '../proto/user.proto');
const authPackageDefinition = protoLoader.loadSync(AUTH_PROTO_PATH);
const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH);
const authProto = grpc.loadPackageDefinition(authPackageDefinition).Authenticate;
const userProto = grpc.loadPackageDefinition(userPackageDefinition).User;
const server = new grpc.Server();
server.addService(authProto.AuthService.service, {
    GetAuthToken: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const token = call.request.token;
        const response = yield AuthTokenRepository_1.AuthTokenRepository.getAuthToken(token);
        callback(null, response);
    }),
});
server.addService(userProto.UserService.service, {
    GetUserRating: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = call.request;
            const rating = yield UserRepository_1.UserRepository.getUserRating(userId);
            callback(null, { rating });
        }
        catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message || 'User not found',
            });
        }
    }),
    UpdateUserRating: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, rating } = call.request;
            const success = yield UserRepository_1.UserRepository.updateUserRating(userId, rating);
            callback(null, { success });
        }
        catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message || 'User not found',
            });
        }
    }),
    GetUsersDetails: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { ids } = call.request;
            const users = yield UserRepository_1.UserRepository.getUsers(ids);
            callback(null, { users });
        }
        catch (err) {
            callback({
                code: grpc.status.NOT_FOUND,
                message: err.message || "Not found users details"
            });
        }
    })
});
const startUserGrpcServer = () => {
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('User gRPC server running on port 50051');
    });
};
exports.startUserGrpcServer = startUserGrpcServer;
