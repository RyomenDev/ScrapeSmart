// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import conf from "../../conf.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ScrapeSmart API",
      version: "1.0.0",
      description:
        "API Documentation for ScrapeSmart - A Web Scraping & Product Management System",
    },
    servers: [
      {
        url: `http://localhost:${conf.PORT || 5000}`,
        description: "Development Server",
      },
    ],
  },
  apis: ["./controller/*.js"],
  //   apis: ["./controller/swagger.controller.js"],
};

export default swaggerOptions;

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// const swaggerDocs = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   console.log(
//     `📄 Swagger Docs available at http://localhost:${
//       conf.PORT || 5000
//     }/api-docs`
//   );
// };

// export default swaggerDocs;
