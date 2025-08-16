import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class AuthTokenRepository {
  static async createAuthToken(token: string, type: string) {
    logger.info("Entering createAuthToken repository method");
    const result = await prisma.authToken.create({
      data: { token, type },
      select: { token: true, type: true },
    });
    logger.info("Exiting createAuthToken repository method");
    return result;
  }

  static async getAuthToken(token: string) {
    logger.info("Entering getAuthToken repository method");
    const result = await prisma.authToken.findUnique({
      where: { token },
      select: { token: true, type: true },
    });
    logger.info("Exiting getAuthToken repository method");
    return result;
  }

  static async deleteAuthToken(token: string) {
    logger.info("Entering deleteAuthToken repository method");
    const exists = await prisma.authToken.findUnique({ where: { token } });
    if (!exists) throw new Error("Token not found");

    const result = await prisma.authToken.delete({
      where: { token },
      select: { token: true },
    });
    logger.info("Exiting deleteAuthToken repository method");
    return result;
  }
}
