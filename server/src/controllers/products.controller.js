import { Product } from "../models/product.model.js";

export const scrapeProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Fetch Failed" });
  }
};
