import express from "express";
import { generateBillHandler } from "../controller/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/generate", generateBillHandler);

export default paymentRouter;
