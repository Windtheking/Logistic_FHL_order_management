// src/services/encryption.service.ts

import { readFileSync } from 'fs';
import { publicEncrypt, randomBytes, createCipheriv } from 'crypto';

// Load the RSA public key
// const publicKey: string = readFileSync('./private.pem', 'utf-8');
const publicKey: string = process.env.PUBLIC_KEY as string;

/**
 * Type definition for the encrypted result returned by `encryptMessage`.
 */
export interface EncryptResult {
    /**
     * AES key encrypted with the recipient's RSA public key (base64 string).
     */
    encryptedKey: string;

    /**
     * Initialization vector used for AES-GCM encryption (base64 string).
     */
    iv: string;

    /**
     * Authentication tag from AES-GCM encryption (base64 string).
     */
    authTag: string;

    /**
     * The encrypted message data (base64 string).
     */
    data: string;
}

/**
 * Service responsible for encrypting messages using a hybrid approach:
 * - Message is encrypted with AES-256-GCM.
 * - AES key is encrypted with RSA.
 *
 * This ensures both confidentiality and integrity of the message.
 */
export class CryptoService {
    /**
     * Encrypts a plaintext message using AES-256-GCM and RSA.
     *
     * @param message - The plaintext message to encrypt.
     * @returns {EncryptResult} - The encrypted result containing:
     *   - `encryptedKey`: AES key encrypted with RSA (base64)
     *   - `iv`: AES initialization vector (base64)
     *   - `authTag`: AES-GCM authentication tag (base64)
     *   - `data`: Encrypted message data (base64)
     *
     * @example
     * const result = CryptoService.encryptMessage("Hello, world!");
     * console.log(result);
     */
    static encryptMessage(message: string): EncryptResult {
        // Generate a random 256-bit AES key
        const aesKey: Buffer = randomBytes(32);

        // Generate a random 12-byte IV
        const iv: Buffer = randomBytes(12);

        // Create AES-GCM cipher
        const cipher = createCipheriv('aes-256-gcm', aesKey, iv);

        // Encrypt the message
        const encryptedMessage: Buffer = Buffer.concat([
            cipher.update(message, 'utf8'),
            cipher.final()
        ]);

        // Get authentication tag
        const authTag: Buffer = cipher.getAuthTag();

        // Encrypt the AES key with RSA
        const encryptedKey: Buffer = publicEncrypt(publicKey, aesKey);

        return {
            encryptedKey: encryptedKey.toString('base64'),
            iv: iv.toString('base64'),
            authTag: authTag.toString('base64'),
            data: encryptedMessage.toString('base64'),
        };
    }
}