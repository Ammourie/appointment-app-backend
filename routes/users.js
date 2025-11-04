var express = require("express");
var router = express.Router();
const { successResponse, errorResponse } = require("../utils/response");
const requireAuth = require("../middlewares/authentication");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval operations
 */

/**
 * @swagger
 * /users/list:
 *   get:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     description: Returns a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.get("/list", requireAuth, (req, res) => {
  successResponse(res, {
    message: `Hello ${req.user.name}, you are authorized!`,
  });
});
/**
 * @swagger
 * /users/get:
 *   get:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       404:
 *         description: User not found
 */
router.get("/details", requireAuth, (req, res) => {
  const id = parseInt(req.query.id);
  if (id === 1) successResponse(res, { id: 1, name: "John Doe" });
  else errorResponse(res, "User not found", "USER_NOT_FOUND");
});
/**
 * @swagger
 * /users/create:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 */
router.post("/create", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 2, name });
});
/**
 * @swagger
 * /users/update:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated User
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/update", (req, res) => {
  const id = req.query.id;
  const { name } = req.body;
  res.json({ id, name });
});
/**
 * @swagger
 * /users/patch:
 *   patch:
 *     tags: [Users]
 *     summary: Partially update a user
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New name
 *     responses:
 *       200:
 *         description: User updated partially
 */
router.patch("/patch", (req, res) => {
  const { id } = req.query;
  const { name } = req.body;
  res.json({ id, name: name || "No change" });
});
/**
 * @swagger
 * /users/delete:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete", (req, res) => {
  const { id } = req.query;
  res.json({ message: `User ${id} deleted` });
});
module.exports = router;
