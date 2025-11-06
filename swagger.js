const swaggerJsDoc = require("swagger-jsdoc");
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
        url: "https://appointment-app-neon.vercel.app", // ✅ Deployed base URL
      },
      {
        url: "http://localhost:3000", // optional for local testing
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

  // Serve custom HTML that loads Swagger UI from CDN
  app.get("/api-docs", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment App API</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css" />
        <style>
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="swagger-ui"> </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-standalone-preset.min.js"></script>
        <script>
          window.onload = function() {
            SwaggerUIBundle({
              url: "/api-docs.json",
              dom_id: '#swagger-ui',
              deepLinking: true,
              persistAuthorization: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: "StandaloneLayout"
            });
          };
        </script>
      </body>
      </html>
    `);
  });

  console.log("Swagger UI available at /api-docs");
  console.log("Swagger JSON available at /api-docs.json");
}

module.exports = setupSwagger;
