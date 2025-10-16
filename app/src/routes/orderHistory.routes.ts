import { Router } from "express";
import {createOrderHistoryHandler,getOrderHistoryByClientIdHandler,getOrderHistoryByOrderIdHandler,updateOrderHistoryHandler} from "../controllers/orderHistory.controller";
import { validateDtoMiddleware } from "../../src/core/middleware/validate-dto.middleware";
import { CreateOrderHistoryDto, UpdateOrderHistoryDto } from "../modules/orderHistory/orderHistory.dto";

const router = Router();

/**
 * @swagger
 * /order-history:
 *   post:
 *     summary: Create a new order history entry
 *     tags: [OrderHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderHistoryDto'
 *           example:
 *             client_id: 1
 *             order_id: 10
 *     responses:
 *       201:
 *         description: Order history created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error during creation
 */
router.post(
  "/",
  validateDtoMiddleware(CreateOrderHistoryDto),
  createOrderHistoryHandler,
);

/**
 * @swagger
 * /order-history:
 *   get:
 *     summary: Get all order history entries for a client
 *     tags: [OrderHistory]
 *     parameters:
 *       - in: query
 *         name: client_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID to filter the order history
 *     responses:
 *       200:
 *         description: List of order history entries
 *       400:
 *         description: client_id query parameter missing or invalid
 *       500:
 *         description: Internal server error retrieving order history
 */
router.get("/", getOrderHistoryByClientIdHandler);

/**
 * @swagger
 * /order-history/order/{order_id}:
 *   get:
 *     summary: Get order history entries by order ID
 *     tags: [OrderHistory]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: List of order history entries matching the order ID
 *       400:
 *         description: Invalid order ID
 *       500:
 *         description: Internal server error retrieving order history
 */
router.get("/order/:order_id", getOrderHistoryByOrderIdHandler);

/**
 * @swagger
 * /order-history/{client_id}/{order_id}:
 *   patch:
 *     summary: Update an order history entry
 *     tags: [OrderHistory]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID of the order history entry
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID of the order history entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderHistoryDto'
 *           example:
 *             order_id: 20
 *     responses:
 *       200:
 *         description: Order history updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Order history entry not found
 *       500:
 *         description: Internal server error during update
 */
router.patch(
  "/:client_id/:order_id",
  validateDtoMiddleware(UpdateOrderHistoryDto),
  updateOrderHistoryHandler,
);

export default router;
