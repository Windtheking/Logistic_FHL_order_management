// src/controllers/encryption.controller.ts

import { Request, Response } from "express";
import { CryptoService } from "../services/encrypt.service";
import { decryptMessage } from "../services/decrypt.service";

/**
 * Controller responsible for encryption-related operations.
 * -------------------------------------------------------
 * This file defines controllers that handle HTTP requests
 * for encrypting and decrypting messages.
 *
 * Pattern used:
 * - Service Layer: Handles the business logic for encryption/decryption.
 *
 * Controllers defined:
 * - EncryptController.encrypt: Encrypts a plaintext message.
 * - DecryptController.decrypt: Decrypts a message using the provided encryption data.
 */

/**
 * EncryptController
 * -----------------
 * Handles message encryption.
 */
export class EncryptController {
  /**
   * Encrypts a given message.
   *
   * @param req - HTTP request object, expects a JSON body: { message: string }.
   * @param res - HTTP response object.
   *
   * @returns {Promise<Response>} - Returns the encrypted message as JSON.
   *
   * @example
   * POST /api/encrypt
   * {
   *   "message": "Hello, world!"
   * }
   */
  static encrypt(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          error: 'The "message" field is required and must be a string.',
        });
      }

      const result = CryptoService.encryptMessage(message);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error while encrypting the message." });
    }
  }
}

/**
 * DecryptController
 * -----------------
 * Handles message decryption.
 */
export class DecryptController {
  /**
   * Decrypts a message using the provided encryption data.
   *
   * @param req - HTTP request object, expects a JSON body with:
   *   {
   *     encryptedKey: string,
   *     iv: string,
   *     authTag: string,
   *     data: string
   *   }
   * @param res - HTTP response object.
   *
   * @returns {Promise<Response>} - Returns the decrypted plaintext as JSON.
   *
   * @example
   * POST /api/decrypt
   * {
   *   "encryptedKey": "...",
   *   "iv": "...",
   *   "authTag": "...",
   *   "data": "..."
   * }
   */
  static decrypt(req: Request, res: Response) {
    try {
      const { encryptedKey, iv, authTag, data } = req.body;

      // Validate required fields
      if (!encryptedKey || !iv || !authTag || !data) {
        return res.status(400).json({
          error: "Missing required fields: encryptedKey, iv, authTag, or data.",
        });
      }

      const decrypted = decryptMessage({ encryptedKey, iv, authTag, data });
      console.log("decrypt:", { encryptedKey, iv, authTag, data });

      return res.json({ decrypted });
    } catch (err) {
      console.error(err);
      console.log('error:', err)
      return res
        .status(500)
        .json({ error: "Error while decrypting the message." });
    }
  }
}