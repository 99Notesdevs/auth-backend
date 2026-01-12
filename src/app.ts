import express from "express";
import cors from "cors";
import main from "./routes/index";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: [
      "http://74.225.194.245:3000",
      "http://74.225.194.245:5173",
      "http://74.225.194.245:5174",
      "http://74.225.194.245",
      "http://20.40.45.204",
      "https://99notes.org"
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
