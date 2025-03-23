import axios from "axios";
import conf from "../../conf.js";

const API_BASE_URL = `${conf.SERVER_URL}/api/products`;

export const saveProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, product);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error("Error saving product:", error?.response?.data);
    throw error?.response?.data || error?.message || "Unknown error";
  }
};

export const fetchAllSavedProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching saved products:", error);
    throw error;
  }
};
