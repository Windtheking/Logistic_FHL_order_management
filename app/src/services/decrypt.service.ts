// src/services/decrypt.service.ts

import { privateDecrypt, createDecipheriv } from 'crypto';

// Load the private RSA key
// const privateKey = readFileSync('./private.pem', 'utf-8') || process.env.PUBLIC_KEY as string;
const privateKey: string = process.env.PRIVATE_KEY as string;

/**
 * Decrypts a message encrypted with AES-GCM, using an AES key
 * that itself was encrypted with RSA.
 *
 * @param params - Object containing the encrypted data and encryption metadata:
 *   - encryptedKey: The AES key encrypted with the recipient's RSA public key (base64 string).
 *   - iv: Initialization vector used for AES-GCM encryption (base64 string).
 *   - authTag: Authentication tag from AES-GCM encryption (base64 string).
 *   - data: The actual encrypted message data (base64 string).
 *
 * @returns {string} - The decrypted plaintext message as a UTF-8 string.
 *
 * @example
 * const decrypted = decryptMessage({
 *   encryptedKey: "base64-encoded-encrypted-key",
 *   iv: "base64-encoded-iv",
 *   authTag: "base64-encoded-auth-tag",
 *   data: "base64-encoded-message"
 * });
 * console.log(decrypted); // Outputs the original plaintext
 *
 * @throws {Error} - Throws if decryption fails (e.g., invalid key, corrupted data, or authentication failure).
 */
export function decryptMessage({
    encryptedKey,
    iv,
    authTag,
    data,
}: {
    encryptedKey: string;
    iv: string;
    authTag: string;
    data: string;
}): string {
    
    // Decrypt the AES key using the RSA private key
    const aesKey = privateDecrypt(
        privateKey,
        Buffer.from(encryptedKey, 'base64')
    );

    // Create AES-GCM decipher
    const decipher = createDecipheriv(
        'aes-256-gcm',
        aesKey,
        Buffer.from(iv, 'base64')
    );

    // Set the authentication tag for AES-GCM
    decipher.setAuthTag(Buffer.from(authTag, 'base64'));

    // Decrypt the message
    const decryptedMessage = Buffer.concat([
        decipher.update(Buffer.from(data, 'base64')),
        decipher.final(),
    ]);

    console.log('Decrypt:', decryptedMessage.toString('utf8'));
    
    return decryptedMessage.toString('utf8');
}