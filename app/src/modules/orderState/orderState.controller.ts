/**
 * OrderState Controller
 * -----------------------------------
 * Handles CRUD operations for OrderState model.
 */

import { Request, Response } from "express";
import * as orderStateDao from "./orderState.dao";
import { CreateOrderStateDto, UpdateOrderStateDto } from "./orderState.dto";

/**
 * Create a new OrderState.
 * POST /api/order-states
 */
export const createOrderStateHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateOrderStateDto = req.body;
    const newOrderState = await orderStateDao.createOrderState(dto);
    return res.status(201).json(newOrderState);
  } catch (err: any) {
    console.error("Error creating order state:", err.message);
    return res.status(500).json({ error: "Failed to create order state: " + err.message });
  }
};

/**
 * Get all order states.
 * GET /api/order-states
 */
export const getOrderStatesHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const orderStates = await orderStateDao.getOrderStates();
    return res.json(orderStates);
  } catch (err: any) {
    console.error("Error fetching order states:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order states." });
  }
};

/**
 * Get an order state by ID.
 * GET /api/order-states/:id
 */
export const getOrderStateByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order state ID." });
    }
    const orderState = await orderStateDao.getOrderStateById(id);
    if (!orderState) {
      return res.status(404).json({ error: "Order state not found." });
    }
    return res.json(orderState);
  } catch (err: any) {
    console.error("Error fetching order state:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order state." });
  }
};

/**
 * Update an order state by ID.
 * PATCH /api/order-states/:id
 */
export const updateOrderStateHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order state ID." });
    }
    const dto: UpdateOrderStateDto = req.body;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "At least one field is required to update." });
    }
    const updated = await orderStateDao.updateOrderState(id, dto);
    if (!updated) {
      return res.status(404).json({ error: "Order state not found." });
    }
    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating order state:", err.message);
    return res.status(500).json({ error: "Failed to update order state." });
  }
};
