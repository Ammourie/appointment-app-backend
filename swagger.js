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
        url: "/",
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
  if (process.env.NODE_ENV !== "production" || true) {
    // IMPORTANT: Setup Swagger BEFORE other routes
    app.use("/api-docs", swaggerUi.serve);
    app.get(
      "/api-docs",
      swaggerUi.setup(swaggerSpec, {
        persistAuthorization: true,
        swaggerOptions: {
          authAction: {
            bearerAuth: {
              name: "bearerAuth",
              schema: { type: "apiKey", in: "header", name: "Authorization" },
              value: "Bearer <token>",
            },
          },
        },
      })
    );

    console.log("✅ Swagger UI available at /api-docs");
  }
}

module.exports = setupSwagger;
