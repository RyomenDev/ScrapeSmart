import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

export const fetchProduct = async (url) => {
  try {
    const response = await axios.get(API_BASE_URL);
    // const response = await axios.post("http://localhost:5000/api/scrape", {
    //   //   url: "https://www.amazon.in/rts-Universal-Adapter-International-Worldwide/dp/B082WYMTWF?th=1",
    //   url: url,
    // });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const saveProduct = async (product) => {
  try {
    await axios.post(`${API_BASE_URL}/save`, product);
    return { success: true, message: "Product saved successfully!" };
  } catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
};

export const fetchAllSavedProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/saved`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching saved products:", error);
    throw error;
  }
};
