const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment App Api",
      version: "1.0.0",
      description: "API documentation for your Node.js backend",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change if you use another port
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
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  if (process.env.NODE_ENV !== "production"||true) {
    // Serve Swagger docs at /api-docs
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        persistAuthorization: true, // ✅ keeps JWT even after page reload
        // customize storage (optional)
        swaggerOptions: {
          authAction: {
            bearerAuth: {
              name: "bearerAuth",
              schema: { type: "apiKey", in: "header", name: "Authorization" },
              value: "Bearer <token>", // default value
            },
          },
        },
      })
    );
  }
}
module.exports = setupSwagger;
