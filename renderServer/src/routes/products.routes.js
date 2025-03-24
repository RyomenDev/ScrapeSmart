import express from "express";
import {
  getProducts,
  saveProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.post("/save", saveProduct);
router.get("/", getProducts);

export default router;
