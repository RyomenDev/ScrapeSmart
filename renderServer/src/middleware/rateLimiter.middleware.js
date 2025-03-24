import rateLimit from "express-rate-limit";

const rateLimiter = (windowMs, maxRequests, message) => {
//   console.log("rateLimit");

  return rateLimit({
    windowMs,
    max: maxRequests,
    message: message || "❌ Too many requests, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable X-RateLimit headers
  });
};

export default rateLimiter;
