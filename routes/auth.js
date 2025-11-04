const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');
const ErrorCodes = require('../constants/errorCodes');
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: auth operations
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for auth
 *       400:
 *         description: Invalid input or email already exists
 */
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Demo validation - in real app, you would check if email exists
  if (!name || !email || !password) {
    return errorResponse(res, 'All fields are required', ErrorCodes.INVALID_INPUT, 400);
  }

  // Demo registration - in real app, you would hash password and save to database
  const token = generateToken({ id: 2, name, email });
  return successResponse(res, { token }, 201);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for auth
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Demo validation
  if (email === 'test@example.com' && password === '123456') {
    const token = generateToken({ id: 1, name: 'John Doe', email });
    return successResponse(res, { token });
  }

  return errorResponse(res, 'Invalid credentials', ErrorCodes.INVALID_CREDENTIALS, 401);
});

module.exports = router;
