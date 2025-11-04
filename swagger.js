const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment App API",
      version: "1.0.0",
      description: "API documentation for your Node.js backend",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production" ? "Production" : "Development",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  // Serve the swagger spec as JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Setup Swagger UI with explicit asset handling
  const swaggerUiOptions = {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Appointment App API",
    swaggerOptions: {
      persistAuthorization: true,
      url: "/api-docs.json",
    },
  };

  // IMPORTANT: Use this pattern for Vercel
  app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerSpec, swaggerUiOptions),
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );

  console.log("Swagger UI available at /api-docs");
  console.log("Swagger JSON available at /api-docs.json");
}

module.exports = setupSwagger;
