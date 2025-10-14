/**
 * OrderAddress Controller
 * -----------------------------------
 * Manages CRUD operations for order addresses.
 */

import { Request, Response } from "express";
import * as orderAddressDao from "./orderAdress.dao";
import { CreateOrderAddressDto, UpdateOrderAddressDto } from "./orderAdress.dto";

/**
 * Create a new order address.
 * POST /api/order-addresses
 */
export const createOrderAddressHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateOrderAddressDto = req.body;
    const newAddress = await orderAddressDao.createOrderAddress(dto);
    return res.status(201).json(newAddress);
  } catch (err: any) {
    console.error("Error creating order address:", err.message);
    return res.status(500).json({ error: "Failed to create order address: " + err.message });
  }
};

/**
 * Retrieves all order addresses.
 * GET /api/order-addresses
 */
export const getOrderAddressesHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const addresses = await orderAddressDao.getOrderAddresses();
    return res.json(addresses);
  } catch (err: any) {
    console.error("Error fetching order addresses:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order addresses." });
  }
};

/**
 * Retrieves a single order address by ID.
 * GET /api/order-addresses/:id
 */
export const getOrderAddressByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order address ID." });
    }
    const address = await orderAddressDao.getOrderAddressById(id);
    if (!address) {
      return res.status(404).json({ error: "Order address not found." });
    }
    return res.json(address);
  } catch (err: any) {
    console.error("Error fetching order address:", err.message);
    return res.status(500).json({ error: "Failed to retrieve order address." });
  }
};

/**
 * Update an existing order address by ID.
 * PATCH /api/order-addresses/:id
 */
export const updateOrderAddressHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order address ID." });
    }
    const dto: UpdateOrderAddressDto = req.body;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "At least one field is required for update." });
    }
    const updated = await orderAddressDao.updateOrderAddress(id, dto);
    if (!updated) {
      return res.status(404).json({ error: "Order address not found." });
    }
    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating order address:", err.message);
    return res.status(500).json({ error: "Failed to update order address." });
  }
};
