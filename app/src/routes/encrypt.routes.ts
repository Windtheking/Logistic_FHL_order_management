// src/routes/encrypt.routes.ts

/**
 * Encryption & Decryption Routes
 * -------------------------------
 * This file defines HTTP routes for encrypting and decrypting messages.
 * 
 * Available Endpoints:
 *  - `POST /encrypt` : Encrypt a plaintext message.
 *  - `POST /decrypt` : Decrypt an encrypted message.
 * 
 * Each route connects to its respective controller.
 */

import { Router } from 'express';
import { DecryptController, EncryptController } from '../controllers/encryption.controller';

const router = Router();

/**
 * POST /encrypt
 * -------------
 * Encrypts a plaintext message using AES-256-GCM and RSA.
 * 
 * Request Body:
 *  - `message`: string (required) — the plaintext message to encrypt.
 * 
 * Response:
 *  - 200 OK: Returns the encrypted message in JSON format.
 *  - 400 Bad Request: If the `message` field is missing or invalid.
 *  - 500 Internal Server Error: If encryption fails.
 * 
 * @swagger
 * /encrypt:
 *   post:
 *     summary: Encrypt a plaintext message
 *     tags: [Encryption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello, world!"
 *     responses:
 *       200:
 *         description: Message encrypted successfully
 *         content:
 *           application/json:
 *             example:
 *               encryptedKey: "base64-encrypted-key"
 *               iv: "base64-iv"
 *               authTag: "base64-auth-tag"
 *               data: "base64-encrypted-message"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             example:
 *               error: "The 'message' field is required and must be a string."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error while encrypting the message."
 */
router.post('/encrypt', EncryptController.encrypt);

/**
 * POST /decrypt
 * -------------
 * Decrypts a message using the provided AES key and AES-GCM metadata.
 * 
 * Request Body:
 *  - `encryptedKey`: string (required) — AES key encrypted with RSA.
 *  - `iv`: string (required) — AES-GCM initialization vector.
 *  - `authTag`: string (required) — AES-GCM authentication tag.
 *  - `data`: string (required) — Encrypted message data.
 * 
 * Response:
 *  - 200 OK: Returns the decrypted plaintext message.
 *  - 400 Bad Request: If any required field is missing.
 *  - 500 Internal Server Error: If decryption fails.
 * 
 * @swagger
 * /decrypt:
 *   post:
 *     summary: Decrypt an encrypted message
 *     tags: [Encryption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - encryptedKey
 *               - iv
 *               - authTag
 *               - data
 *             properties:
 *               encryptedKey:
 *                 type: string
 *                 example: "base64-encrypted-key"
 *               iv:
 *                 type: string
 *                 example: "base64-iv"
 *               authTag:
 *                 type: string
 *                 example: "base64-auth-tag"
 *               data:
 *                 type: string
 *                 example: "base64-encrypted-message"
 *     responses:
 *       200:
 *         description: Message decrypted successfully
 *         content:
 *           application/json:
 *             example:
 *               decrypted: "Hello, world!"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             example:
 *               error: "Missing required fields: encryptedKey, iv, authTag, or data."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error while decrypting the message."
 */
router.post('/decrypt', DecryptController.decrypt);

export default router;