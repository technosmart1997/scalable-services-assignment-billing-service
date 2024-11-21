import { Payment } from "../db/models/payment.js";

export const APPOINTMENT_TYPES = Object.freeze({
  REGULAR: "regular",
  EMERGENCY: "emergency",
});

export const APPOINTMENT_GST = 18;

export const calculateFee = (fee, policyId) => {
  if (policyId) {
    return {
      basic: 0,
      gst: 0,
      total: 0,
    };
  }
  if (Number(fee) > 0) {
    const gst = Math.round(fee * (APPOINTMENT_GST / 100));
    const total = Math.round(fee + gst);
    return {
      basic: +fee,
      gst,
      total,
    };
  }
};

export const generateBill = async (data) => {
  // Validate User in database
  const { patientName, policyId, fees } = data;

  try {
    const processedFees = calculateFee(fees, policyId);

    let amountPaid = 0;
    if (!policyId) {
      amountPaid = processedFees.total;
    }
    // In case of emergeny 50% extra will be charged on top of base fees
    // Direct bill the patient based on the doctor fees and appointment type
    // Get doctor fees

    // Apply policy and generate bill
    await Payment.insertMany([
      {
        patientName,
        policyId: policyId || null,
        fees: amountPaid == 0 ? 0 : processedFees.total,
        amountPaid,
        policyApplied: amountPaid == 0 ? true : false,
      },
    ]);

    return {
      status: true,
      code: 200,
      message: "Bill generated!",
      data: processedFees,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error in generating bill", error?.message);
  }
};
