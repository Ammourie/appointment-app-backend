const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path"); // Add this import

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
        description: process.env.NODE_ENV === "production" ? "Production" : "Development",
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
  // Fix: Use absolute path
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  // Remove the ||true for production
  if (process.env.NODE_ENV !== "production" || true) {
    // Serve Swagger docs at /api-docs
    app.use(
      "/api-docs",
      swaggerUi.serve,
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
    
    console.log("Swagger UI available at /api-docs");
  }
}

module.exports = setupSwagger;