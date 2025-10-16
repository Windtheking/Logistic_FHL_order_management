/**
 * Order Controller
 * -----------------------------------
 * Handles CRUD operations for the Order model.
 */

import { Request, Response } from "express";
import * as orderDao from "./order.dao";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";

/**
 * Create a new order.
 * POST /api/orders
 */
export const createOrderHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateOrderDto = req.body;
    const newOrder = await orderDao.createOrder(dto);
    return res.status(201).json(newOrder);
  } catch (err: any) {
    console.error("Error creating order:", err.message);
    return res.status(500).json({ error: "Failed to create order: " + err.message });
  }
};

/**
 * Retrieve all orders.
 * GET /api/orders
 */
export const getOrdersHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await orderDao.getOrders();
    return res.json(orders);
  } catch (err: any) {
    console.error("Error fetching orders:", err.message);
    return res.status(500).json({ error: "Failed to retrieve orders." });
  }
};

/**
 * Retrieve a single order by ID.
 * GET /api/orders/:id
 */
export const getOrderByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }
    const order = await orderDao.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.json(order);
  } catch (err: any) {
    console.error("Error fetching order:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order." });
  }
};

/**
 * Update an order by ID.
 * PATCH /api/orders/:id
 */
export const updateOrderHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }
    const dto: UpdateOrderDto = req.body;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "At least one field is required for update." });
    }
    const updatedOrder = await orderDao.updateOrder(id, dto);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.json(updatedOrder);
  } catch (err: any) {
    console.error("Error updating order:", err.message);
    return res.status(500).json({ error: "Failed to update order." });
  }
};
