/**
 * Zero-knowledge encryption for PII.
 * All encryption/decryption happens client-side.
 * Server stores only encrypted blobs — never plaintext.
 *
 * Uses Web Crypto API (SubtleCrypto):
 * - Key derivation: PBKDF2 from user email + salt
 * - Encryption: AES-GCM 256-bit
 * - Each record gets a unique IV
 */

const PBKDF2_ITERATIONS = 600_000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
// App-level pepper adds entropy beyond the user secret (email).
// Not a replacement for a high-entropy secret, but raises the bar
// significantly against offline brute-force of encrypted blobs.
const APP_PEPPER = 'benefind:v1:client-encryption';

/** Derive an AES-GCM key from user secret + app pepper */
export async function deriveKey(
  secret: string,
  salt: Uint8Array<ArrayBuffer>,
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(`${APP_PEPPER}:${secret}`),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Encrypt plaintext data. Returns base64 string: salt + iv + ciphertext */
export async function encrypt(
  plaintext: string,
  userSecret: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(userSecret, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext),
  );

  // Combine: salt (16) + iv (12) + ciphertext
  const combined = new Uint8Array(
    salt.length + iv.length + new Uint8Array(ciphertext).length,
  );
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

  return btoa(Array.from(combined, (b) => String.fromCharCode(b)).join(''));
}

/** Decrypt a base64 encrypted string */
export async function decrypt(
  encrypted: string,
  userSecret: string,
): Promise<string> {
  const combined = new Uint8Array(
    atob(encrypted)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );

  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);

  const key = await deriveKey(userSecret, salt);

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plaintext);
}

/** Encrypt a screening result object */
export async function encryptScreeningData(
  data: Record<string, unknown>,
  userEmail: string,
): Promise<string> {
  return encrypt(JSON.stringify(data), userEmail);
}

/** Decrypt a screening result object */
export async function decryptScreeningData<T>(
  encrypted: string,
  userEmail: string,
): Promise<T> {
  const json = await decrypt(encrypted, userEmail);
  return JSON.parse(json) as T;
}
