// src/BaseService.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pingMongodb } from "./db/index.js";
import paymentRouter from "./routes/payment.router.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
  });
});

app.use("/billing", paymentRouter);

app.use("**", (req, res) => {
  res.status(500).json({
    status: "Route not found",
    timestamp: new Date(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await pingMongodb();
  console.log(`Server is running on port ${PORT}`);
});

// Handle termination signals for graceful shutdown
process.on("SIGTERM", () => {
  console.log(
    "Got SIGTERM. Graceful shutdown initiated",
    new Date().toISOString()
  );
  if (this.server) {
    this.server.close(() => {
      console.log("Process terminated w/ SIGTERM");
      process.exit(0);
    });
  }
});

process.on("SIGINT", () => {
  console.log(
    "Got SIGINT. Graceful shutdown initiated",
    new Date().toISOString()
  );
  if (this.server) {
    this.server.close(() => {
      console.log("Process interrupted w/ SIGINT");
      process.exit(0);
    });
  }
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection at:", err.stack || err);
  if (this.server) {
    this.server.close(() => {
      console.log("Process terminated w/ Unhandled Rejection");
      process.exit(0);
    });
  }
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err.stack || err);
  if (this.server) {
    this.server.close(() => {
      console.log("Process terminated w/ Uncaught Exception");
      process.exit(0);
    });
  }
});
