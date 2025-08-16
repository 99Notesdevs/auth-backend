import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

console.log("Prisma client created");
logger.info("Prisma client created");
export const prisma = new PrismaClient();