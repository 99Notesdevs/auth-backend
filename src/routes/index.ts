import { Router } from "express";
import { prisma } from "../config/prisma";
import userRouter from "./User";

const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log("Health check api hit");
  res.status(200).json({
    message: "Working fine!",
  });
});

// User Operations
router.use("/user", userRouter);

export default router;