import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connectDB from "./src/config/db.js";
import { app } from "./src/app.js";

import conf from "./conf.js";
const PORT = conf.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ScrapeSmart API",
      description: "Simple API for user authentication",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${conf.SERVER_URL}`,
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/swaggerApi/controller/*.js"], // Documentation source
};

const swaggerDocs = swaggerJSDoc(swaggerOptions); // Match the casing here
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    // app.listen(PORT, () => {
    //   console.log(`⚙️ Server is running at port: ${PORT}`);
    // });
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
      console.log(`⚙️ Allowed Client : ${conf.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
