import { IUser } from "../interface/user.interface";
import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class UserRepository {
  static async isUserById(id: number) {
    logger.info("Entering isUserById repository method");

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    logger.info("Exiting isUserById repository method");
    return user;
  }

  static async createUser({
    firstName,
    lastName,
    email,
    password,
    oauthId,
    oauthProvider,
  }: IUser) {
    logger.info("Entering createUser repository method");
    const user = await prisma.$transaction(async (tx) => {
      const uid = await tx.user.create({
        data: { firstName, lastName, email, password, oauthId, oauthProvider },
        select: { id: true },
      });

      await tx.userData.create({
        data: { userId: uid.id },
        select: { id: true },
      });
      await tx.wishList.create({
        data: { userId: uid.id },
        select: { id: true },
      });
      await tx.cart.create({
        data: { userId: uid.id, totalAmount: 0 },
        select: { id: true },
      });
      return uid;
    });

    logger.info("Exiting createUser repository method");
    return user;
  }

  static async getUser(id: number) {
    logger.info("Entering getUser repository method");

    const user = await prisma.user.findUnique({
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

    logger.info("Exiting getUser repository method");
    return user;
  }

  static async getUserByEmail(email: string) {
    logger.info("Entering getUserByEmail repository method");

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    logger.info("Exiting getUserByEmail repository method");
    return user;
  }

  static async updateUser(id: number, password: string) {
    logger.info("Entering updateUser repository method");
    const user = await prisma.user.update({
      where: { id },
      data: { password },
      select: { id: true, email: true },
    });

    logger.info("Exiting updateUser repository method");
    return user;
  }

  static async deleteUser(id: number) {
    logger.info("Entering deleteUser repository method");
    const exists = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });
    if (!exists) throw new Error("User not found");

    const user = await prisma.user.delete({
      where: { id },
      select: { id: true },
    });

    logger.info("Exiting deleteUser repository method");
    return user;
  }

  static async getUserRating(id: number) {
    logger.info("Entering getUserRating repository method");
    const user = await prisma.userData.findUnique({
      where: { userId: id },
      select: { rating: true },
    });
    if (!user) throw new Error("User not found");
    logger.info("Exiting getUserRating repository method");
    return user.rating;
  }

  static async updateUserRating(id: number, rating: number) {
    logger.info("Entering updateUserRating repository method");
    const user = await prisma.userData.update({
      where: { userId: id },
      data: { rating },
      select: { id: true },
    });
    if (!user) throw new Error("User not found");
    logger.info("Exiting updateUserRating repository method");
    return true;
  }

  static async getValidation(id: number) {
    logger.info("Entering getValidation repository method");
    const payments = await prisma.userData.findUnique({
      where: { userId: id },
      select: { paidUser: true, validTill: true },
    });

    if (!payments) throw new Error("Payments not found");
    logger.info("Exiting getValidation repository method");
    return payments;
  }

  static async updateUserData(
    id: number,
    data: { paidUser?: boolean; validTill?: Date; tagsCovered?: string[] }
  ) {
    logger.info("Entering updateUserData repository method");
    const user = await prisma.userData.update({
      where: { userId: id },
      data: { ...data },
      select: { id: true },
    });

    logger.info("Exiting updateUserData repository method");
    return user;
  }
}
