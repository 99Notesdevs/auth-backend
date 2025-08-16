import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { AuthTokenRepository } from '../../repositories/AuthTokenRepository';
import { UserRepository } from '../../repositories/UserRepository';

const AUTH_PROTO_PATH = path.join(__dirname, '../proto/auth.proto');
const USER_PROTO_PATH = path.join(__dirname, '../proto/user.proto');

const authPackageDefinition = protoLoader.loadSync(AUTH_PROTO_PATH);
const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH);

const authProto = grpc.loadPackageDefinition(authPackageDefinition).Authenticate as any;
const userProto = grpc.loadPackageDefinition(userPackageDefinition).User as any;

const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
  GetAuthToken: async (call: any, callback: any) => {
    const token = call.request.token;
    const response = await AuthTokenRepository.getAuthToken(token);
    callback(null, response);
  },
});

server.addService(userProto.UserService.service, {
  GetUserRating: async (call: any, callback: any) => {
    try {
      const { userId } = call.request;
      const rating = await UserRepository.getUserRating(userId);
      callback(null, { rating });
    } catch (err: any) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: err.message || 'User not found',
      });
    }
  },
  UpdateUserRating: async (call: any, callback: any) => {
    try {
      const { userId, rating } = call.request;
      const success = await UserRepository.updateUserRating(userId, rating);
      callback(null, { success });
    } catch (err: any) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: err.message || 'User not found',
      });
    }
  },
});

export const startUserGrpcServer = () => {
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('User gRPC server running on port 50051');
  });
};
