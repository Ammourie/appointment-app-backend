# Appointment App Backend

A RESTful API backend service for managing appointments, built with Node.js and Express.js.

## Features

- 🔐 JWT Authentication
- 📝 User Management
- 📚 API Documentation with Swagger
- 🔄 Hot Reload for Development
- 🛡️ Error Handling Middleware
- 🎯 Response Standardization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appointment-app/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
# Add other environment variables as needed
```

## Available Scripts

- **Start Production Server:**
  ```bash
  npm start
  ```

- **Start Development Server (with hot reload):**
  ```bash
  npm run dev
  ```

## Project Structure

```
backend/
├── app.js              # Application entry point
├── bin/
│   └── www            # Server configuration
├── constants/
│   └── errorCodes.js  # Error code definitions
├── middlewares/
│   └── authentication.js # JWT authentication middleware
├── routes/
│   ├── auth.js        # Authentication routes
│   ├── index.js       # Main router
│   └── users.js       # User management routes
├── utils/
│   ├── AppError.js    # Error handling utility
│   ├── jwt.js         # JWT utility functions
│   └── response.js    # Response formatting utility
└── swagger.js         # API documentation configuration
```

## API Documentation

The API documentation is available through Swagger UI. After starting the server, visit:
```
http://localhost:3000/api-docs
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Obtain a JWT token by logging in
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_token_here>
   ```

## Error Handling

The application includes a centralized error handling system with standardized error codes and messages defined in `constants/errorCodes.js`.

## Development

For development, the project uses nodemon for hot reloading. Run the development server using:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.