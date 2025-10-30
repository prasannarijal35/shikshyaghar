import myAxios from "@/services/apiServices"; // your preconfigured axios instance

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// -----------------------------
// Create Subscription Payment
// -----------------------------
const createSubscriptionPayment = async (data: {
  userId: number;
  subscriptionId: number;
  amount: number;
}) => {
  try {
    const res = await myAxios.post(`${API_BASE_URL}/payments`, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// -----------------------------
// Verify Khalti Payment
// -----------------------------
const verifyKhalti = async (token: string, amount: number) => {
  try {
    const res = await myAxios.get(`${API_BASE_URL}/payments/verify`, {
      params: { token, amount },
    });
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const paymentService = {
  createSubscriptionPayment,
  verifyKhalti,
};

export default paymentService;
