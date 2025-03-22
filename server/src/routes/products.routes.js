import express from "express";
import {
  getProducts,
  saveProduct,
  singleProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", singleProduct);
router.post("/save", saveProduct);
router.get("/saved", getProducts);

export default router;
