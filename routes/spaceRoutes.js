const express = require('express');
const router = express.Router();
const spaceControllers = require('../controllers/spaceControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Spaces
 *   description: API endpoints for managing spaces
 */

/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Register a new space
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the space
 *               description:
 *                 type: string
 *                 description: A brief description of the space
 *               location:
 *                 type: string
 *                 description: The location of the space
 *               category:
 *                 type: string
 *                 description: The category of the space
 *                 enum: [Office, Event, Retail, Co-Working, Other]
 *     responses:
 *       201:
 *         description: Space registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized
 */
router.post('/spaces', spaceControllers.registerSpace);

/**
 * @swagger
 * /spaces:
 *   get:
 *     summary: Get all spaces
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of results per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Filter by category
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: Filter by name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *           description: Filter by location
 *     responses:
 *       200:
 *         description: A list of spaces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSpaces:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 spaces:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Space'
 *       401:
 *         description: Not authorized
 */
router.get('/spaces', spaceControllers.getAllSpaces);

/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *     summary: Get a space by ID
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the space
 *     responses:
 *       200:
 *         description: Space found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       404:
 *         description: Space not found
 *       401:
 *         description: Not authorized
 */
router.get('/spaces/:id', protect, spaceControllers.getSpaceById);

/**
 * @swagger
 * /spaces/{id}:
 *   put:
 *     summary: Update a space by ID
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the space to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Office, Event, Retail, Co-Working, Other]
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       200:
 *         description: Space updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       404:
 *         description: Space not found
 *       401:
 *         description: Not authorized
 */
router.put('/spaces/:id', protect, authorize('admin'), spaceControllers.updateSpace);

/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Soft delete a space by ID
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the space to delete
 *     responses:
 *       200:
 *         description: Space deleted successfully
 *       404:
 *         description: Space not found
 *       401:
 *         description: Not authorized
 */
router.delete('/spaces/:id', protect, authorize('admin'), spaceControllers.deleteSpace);

/**
 * @swagger
 * /spaces/{id}/restore:
 *   post:
 *     summary: Restore a soft-deleted space by ID
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the space to restore
 *     responses:
 *       200:
 *         description: Space restored successfully
 *       404:
 *         description: Space not found or not deleted
 *       401:
 *         description: Not authorized
 */
router.post('/spaces/:id/restore', protect, authorize('admin'), spaceControllers.restoreSpace);

module.exports = router;
