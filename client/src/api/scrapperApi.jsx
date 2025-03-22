import axios from "axios";

// Set up base URL for the API
const API_BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/coupons`;

// Create an Axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get auth token and attach it to requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  return { Authorization: `Bearer ${token}` };
};

// Handle API errors
const handleError = (error) => {
  //   console.error("API Error:", error);
  throw (
    error?.response?.data?.message ||
    error?.response?.data ||
    "An error occurred"
  );
};

// Add a new coupon
export const claimSingleCoupon = async ({ couponId }) => {
  //   console.log({ couponId });
  try {
    const response = await apiClient.post(
      "/claim",
      { couponId }, // Send coupon ID in the request body
      {
        headers: getAuthHeaders(),
      }
    );
    // console.log("Response",response);

    return response.data;
  } catch (error) {
    // console.log("Error", error.response.data);
    handleError(error);
  }
};

// Get all coupons
export const getCoupons = async () => {
  //   console.log("fetching");
  try {
    const response = await apiClient.get("/", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// // Update a coupon
// export const updateCoupon = async (couponId, couponData) => {
//   try {
//     const response = await apiClient.put(`/update/${couponId}`, couponData, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };
