import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../interface/user.interface";
import { AuthTokenRepository } from "../repositories/AuthTokenRepository";
import logger from "../utils/logger";

export class UserService {
  static async getUserDetails(id: number) {
    logger.info("Entering getUserDetails service");
    const user = await UserRepository.getUser(id);
    if (!user) throw new Error("User not found");
    logger.info("Exiting getUserDetails service");
    return user;
  }

  static googlAuthLogin = async ({
    email,
    name,
    oauthId,
    oauthProvider,
  }: {
    email: string;
    name: string;
    oauthId: string;
    oauthProvider: string;
  }) => {
    logger.info("Entering googlAuthLogin service");
    let user: { id: number; password?: string } | null =
      await UserRepository.getUserByEmail(email);
    if (!user) {
      user = await UserRepository.createUser({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
        email,
        password: "",
        oauthId,
        oauthProvider,
      });
      if (!user || !user.id) throw new Error("User not created");
    }

    const cookie =
      "Bearer " + jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
    const authtoken = cookie.split(" ")[1];
    await AuthTokenRepository.createAuthToken(authtoken, "User");
    logger.info("Exiting googlAuthLogin service");
    return cookie;
  };

  static async registerUser({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: IUser) {
    logger.info("Entering registerUser service");
    const hash = await bcrypt.hash(password, 10);
    const user = await UserRepository.createUser({
      firstName,
      lastName,
      email,
      phone,
      password: hash,
    });
    if (!user || !user.id) throw new Error("User not created");
    const cookie = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
    await AuthTokenRepository.createAuthToken(cookie, "User");
    logger.info("Exiting registerUser service");
    return cookie;
  }

  static async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    logger.info("Entering loginUser service");
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");
    const cookie = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || "");
    await AuthTokenRepository.createAuthToken(cookie, "User");
    logger.info("Exiting loginUser service");
    return cookie;
  }

  static async logoutUser({ token }: { token: string }) {
    logger.info("Entering logoutUser service");
    const logout = await AuthTokenRepository.deleteAuthToken(token);
    if (!logout) throw new Error("Cannot logout from services");
    logger.info("Exiting logoutUser service");
    return logout;
  }

  static async updateUser({ id, password }: { id: number; password: string }) {
    logger.info("Entering updateUser service");
    const hash = await bcrypt.hash(password, 10);
    const user = await UserRepository.updateUser(id, hash);
    if (!user) throw new Error("User not updated");
    logger.info("Exiting updateUser service");
    return user;
  }

  static async deleteUser({ id }: { id: number }) {
    logger.info("Entering deleteUser service");
    const user = await UserRepository.deleteUser(id);
    if (!user) throw new Error("User not deleted");
    logger.info("Exiting deleteUser service");
    return user;
  }

  static async validateUser(id: number) {
    logger.info("Entering validateUser service");
    const user = await UserRepository.getUser(id);
    if (!user) throw new Error("User not found");
    const payments = await UserRepository.getValidation(id);
    if (payments.paidUser !== true) throw new Error("Not a paid user");
    if (!payments.validTill || payments.validTill.getTime() <= Date.now())
      throw new Error("Time expired");
    logger.info("Exiting validateUser service");
    return { ...user, ...payments };
  }

  static async updateUserData({
    id,
    data,
  }: {
    id: number;
    data: { paidUser?: boolean; validTill?: Date; tagsCovered?: string[] };
  }) {
    logger.info("Entering updateUserData service");
    const user = await UserRepository.updateUserData(id, data);
    if (!user) throw new Error("User not updated");
    logger.info("Exiting updateUserData service");
    return user;
  }
}
