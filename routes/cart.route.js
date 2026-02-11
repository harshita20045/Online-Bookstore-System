import express from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart.controller.js";
import { auth, isUser } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       400:
 *         description: Bad request
 */
router.post("/", auth, isUser, addToCart);

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get the cart of a specific user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *       404:
 *         description: Cart not found
 */
router.get("/:userId", auth, isUser, getCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart or item not found
 */
router.put("/", auth, isUser, updateCartItem);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart or item not found
 */
router.delete("/", removeCartItem);

export default router;
