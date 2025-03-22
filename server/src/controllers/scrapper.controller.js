import { Product } from "../models/product.model.js";
import scraper from "../utils/Scrapper.js";

export const scrapeProduct = async (req, res) => {
  try {
    const { url } = req.body;
    const data = await scraper(url);
    const product = new Product(data);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Scraping failed" });
  }
};
