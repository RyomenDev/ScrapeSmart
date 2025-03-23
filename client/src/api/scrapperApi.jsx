import axios from "axios";
import conf from "../../conf.js";

const API_BASE_URL = `${conf.SERVER_URL}/api/scrape`;

export const fetchProduct = async (url) => {
  // console.log("requestBody", url);

  try {
    // const response = await axios.get(API_BASE_URL);
    // return response.data[0];
    const response = await axios.post(`${API_BASE_URL}`, {
      //   url: "https://www.amazon.in/rts-Universal-Adapter-International-Worldwide/dp/B082WYMTWF?th=1",
      url: url,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
