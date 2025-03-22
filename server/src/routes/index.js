import express from "express";
const router = express.Router();

import scrapperRoutes from "./scrapper.routes.js";
import productRoutes from "./products.routes.js";

router.use("/scrapper", scrapperRoutes);
router.use("/products", productRoutes);

export default router;
