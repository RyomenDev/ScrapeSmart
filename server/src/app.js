import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";
import conf from "../conf.js";
import http from "http";
import { initializeSocket } from "./controllers/coupon.controller.js"; // Import WebSocket logic
// import { initializeSocket, io }
// import { Server } from "socket.io";

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.io
// const io = new Server(server, { cors: { origin: conf.FRONTEND_URL } });
const io = initializeSocket(server);
// initializeSocket(server);

// if (!io) {
//   console.error("❌ Failed to initialize Socket.io");
// } else {
//   console.log("✅ Socket.io initialized successfully");
// }
// console.log({ io });

// ✅ Middleware to attach "io" instance to req
app.use((req, res, next) => {
  if (!io) {
    // console.error("❌ io is undefined in middleware");
  } else {
    req.io = io;
    // console.log(
    //   `📌 socket io attached to request for: ${req.method} ${req.url}`
    // );
  }
  next();
});

// ✅ Log every incoming request for debugging
// app.use((req, res, next) => {
//   console.log(`📢 Incoming Request: ${req.method} ${req.url}`);
//   next();
// });

// ✅ Middleware for parsing JSON and cookies
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Apply security headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// ✅ CORS configuration
// app.use(cors({ origin: conf.FRONTEND_URL, credentials: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        conf.FRONTEND_URL,
        // conf.CORS_ORIGIN1.replace(/\/$/, ""),
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ✅ Additional security headers
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

// Middleware for parsing JSON, cookies, and serving static files
app.set("trust proxy", "loopback"); // Trust only localhost

// ✅ Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// ✅ Debugging: Log if io is attached
// app.use((req, res, next) => {
//   console.log(
//     "Inside Middleware, req.io:",
//     req.io ? "✅ Defined" : "❌ Undefined"
//   );
//   next();
// });

// app.use((req, res, next) => {
//   console.log(`🔍 Checking Middleware: ${req.method} ${req.url}`);
//   console.log("✅ io in middleware:", io ? "Defined" : "❌ Undefined");
//   console.log(
//     "✅ req.io before assignment:",
//     req.io ? "Defined" : "❌ Undefined"
//   );
//   req.io = io;
//   console.log(
//     "✅ req.io after assignment:",
//     req.io ? "Defined" : "❌ Undefined"
//   );
//   next();
// });

// ✅ Routes
import Routes from "./routes/index.js";
app.use("/api", Routes);

// ✅ Test routes
app.post("/testing", (req, res) => {
  console.log("✅ /testing route hit!");
  res.send("Hello, testing completed");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server with Security Measures!");
});

export { app, server };
