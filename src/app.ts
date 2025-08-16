import express from "express";
import cors from "cors";
import main from "./routes/index";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: [
      "http://main.main.local:3000",
      "http://tests.main.local:5173",
      "http://shop.main.local:5173",
      "http://localhost:44275",
      "http://13.126.229.93:5173",
      "http://13.126.229.93",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "X-Auth-Type", "x-auth-type"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use("/api/v1", main);
