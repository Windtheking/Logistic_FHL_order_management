/**
 * Warehouses Controller
 * -----------------------------------
 * Handles CRUD operations for the Warehouse model.
 */

import { Request, Response } from "express";
import * as warehouseDao from "./warehouse.dao";
import { CreateWarehouseDto, UpdateWarehouseDto } from "./warehouse.dto";

/**
 * Create a new warehouse.
 * POST /api/warehouses
 */
export const createWarehouseHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateWarehouseDto = req.body;
    const newWarehouse = await warehouseDao.createWarehouse(dto);
    return res.status(201).json(newWarehouse);
  } catch (err: any) {
    console.error("Error creating warehouse:", err.message);
    return res.status(500).json({ error: "Failed to create warehouse: " + err.message });
  }
};

/**
 * Get all warehouses.
 * GET /api/warehouses
 */
export const getWarehousesHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const warehouses = await warehouseDao.getWarehouses();
    return res.json(warehouses);
  } catch (err: any) {
    console.error("Error fetching warehouses:", err.message);
    return res.status(500).json({ error: "Failed to retrieve warehouses." });
  }
};

/**
 * Get a warehouse by ID.
 * GET /api/warehouses/:id
 */
export const getWarehouseByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid warehouse ID." });
    }
    const warehouse = await warehouseDao.getWarehouseById(id);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    return res.json(warehouse);
  } catch (err: any) {
    console.error("Error fetching warehouse:", err.message);
    return res.status(500).json({ error: "Failed to retrieve warehouse." });
  }
};

/**
 * Update a warehouse by ID.
 * PATCH /api/warehouses/:id
 */
export const updateWarehouseHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid warehouse ID." });
    }
    const dto: UpdateWarehouseDto = req.body;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "At least one field is required for update." });
    }
    const updatedWarehouse = await warehouseDao.updateWarehouse(id, dto);
    if (!updatedWarehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    return res.json(updatedWarehouse);
  } catch (err: any) {
    console.error("Error updating warehouse:", err.message);
    return res.status(500).json({ error: "Failed to update warehouse." });
  }
};
