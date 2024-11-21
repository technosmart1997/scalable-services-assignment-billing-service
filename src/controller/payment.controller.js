import Joi from "joi";
import { generateBill } from "../services/payment.service.js";

export const generateBillHandler = async (req, res, next) => {
  try {
    const schema = Joi.object({
      patientName: Joi.string().required(),
      policyId: Joi.string().optional().allow(null),
      fees: Joi.number().required(),
    });
    await schema.validateAsync(req.body);

    // Make Service call
    const response = await generateBill(req.body);
    return res.json(response);
  } catch (error) {
    next(error);
  }
};
