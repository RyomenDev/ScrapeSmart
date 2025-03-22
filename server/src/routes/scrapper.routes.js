import express from "express";
import { scrapeProduct } from "../controllers/scrapper.controller.js";
import rateLimiter from "../middleware/rateLimiter.middleware.js";

const claimCooldown = 30 * 1000; // 30 sec cooldown
const router = express.Router();

// Apply rate limiter middleware (1 request per minute)
router.post(
  "/",
  //   rateLimiter(
  //     claimCooldown,
  //     1,
  //     "❌ You can only scrap one item in once per 30 second."
  //   ),
  scrapeProduct
);


// router.post("/some-route", rateLimiter(30000, 5), someController);

export default router;
