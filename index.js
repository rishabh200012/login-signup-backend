import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDb from "./src/configDB/mongo.js";
import userRoutes from "./src/routes/user.routes.js";
import errorHandler from "./src/middleware/error.middleware.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/user", userRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected event fired");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose error:", err);
    });
    await connectDb();
    app.listen(process.env.Port || 5000, () => console.log("server listening"));
  } catch (error) {
    process.exit(1);
  }
};

startServer();
