import { Product } from "../models/product.model.js";

export const singleProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Fetch Failed" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Fetch Failed" });
  }
};

export const saveProduct = async (req, res) => {
  try {
    const data = req.body;
    const newProduct = new Product({ ...data });
    // console.log({newProduct});

    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully" });
  } catch (error) {
    console.log("Error saving product:", error?.message);

    res.status(500).json({ error: "Failed to save product" });
  }
};
