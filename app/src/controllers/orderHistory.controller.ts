/**
 * OrderHistory Controller
 * -----------------------------------
 * Manages all CRUD (Create, Read, Update) requests related to 'OrderHistory' entity,
 * following DAO/DTO pattern and clean code principles.
 */

import { Request, Response } from "express";
import * as orderHistoryDao from "../modules/orderHistory/orderHsitory.dao";
import { CreateOrderHistoryDto, UpdateOrderHistoryDto } from "../modules/orderHistory/orderHistory.dto";

/**
 * Create a new order history record
 * POST /api/order-history
 */
export const createOrderHistoryHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateOrderHistoryDto = req.body;
    const created = await orderHistoryDao.createOrderHistory(dto);
    return res.status(201).json(created);
  } catch (err: any) {
    console.error("Error creating order history:", err.message);
    return res.status(500).json({ error: "Failed to create order history: " + err.message });
  }
};

/**
 * Get all order history entries for a client by client_id query param
 * GET /api/order-history?client_id=#
 */
export const getOrderHistoryByClientIdHandler = async (req: Request, res: Response): Promise<Response> => {
  const clientId = Number(req.query.client_id);
  if (!clientId || isNaN(clientId)) {
    return res.status(400).json({ error: "client_id query parameter is required and must be a valid number" });
  }
  try {
    const orderHistories = await orderHistoryDao.getOrderHistoryByClientId(clientId);
    return res.json(orderHistories);
  } catch (err: any) {
    console.error("Error getting order history by client ID:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order history." });
  }
};

/**
 * Get all order history entries by order_id path param
 * GET /api/order-history/order/:order_id
 */
export const getOrderHistoryByOrderIdHandler = async (req: Request, res: Response): Promise<Response> => {
  const orderId = Number(req.params.order_id);
  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ error: "order_id parameter must be a valid number" });
  }
  try {
    const orderHistories = await orderHistoryDao.getOrderHistoryByOrderId(orderId);
    return res.json(orderHistories);
  } catch (err: any) {
    console.error("Error getting order history by order ID:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order history." });
  }
};

/**
 * Update an existing order history entry identified by client_id and order_id
 * PATCH /api/order-history/:client_id/:order_id
 */
export const updateOrderHistoryHandler = async (req: Request, res: Response): Promise<Response> => {
  const clientId = Number(req.params.client_id);
  const orderId = Number(req.params.order_id);
  if (!clientId || isNaN(clientId) || !orderId || isNaN(orderId)) {
    return res.status(400).json({ error: "client_id and order_id must be valid numbers" });
  }
  try {
    const dto: UpdateOrderHistoryDto = req.body;
    const updated = await orderHistoryDao.updateOrderHistory(clientId, orderId, dto);
    if (!updated) {
      return res.status(404).json({ error: `Order history entry not found for client_id=${clientId} and order_id=${orderId}` });
    }
    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating order history:", err.message);
    return res.status(500).json({ error: "Failed to update order history." });
  }
};
