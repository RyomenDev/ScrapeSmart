import express from "express";
import { getProducts } from "../controllers/coupon.controller.js";

router.get("/", getProducts);

export default router;
