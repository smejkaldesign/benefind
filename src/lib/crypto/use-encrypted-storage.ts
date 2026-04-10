"use client";

import { useCallback } from "react";
import { encryptScreeningData, decryptScreeningData } from "./encryption";

/**
 * Hook for encrypted localStorage operations.
 * All data is encrypted with the user's email before storage.
 *
 * Threat model: protects against casual localStorage inspection,
 * browser extension snooping, and physical device access to stored data.
 * Does NOT protect against active XSS (attacker can access userEmail
 * in the JS heap and derive the same key). Web Crypto has no
 * hardware-backed key isolation in browsers. For PII that must survive
 * XSS, use server-side encryption with a per-user server secret.
 */
export function useEncryptedStorage(userEmail: string | null) {
  const save = useCallback(
    async (key: string, data: Record<string, unknown>) => {
      if (!userEmail) return;
      try {
        const encrypted = await encryptScreeningData(data, userEmail);
        localStorage.setItem(`bf_${key}`, encrypted);
      } catch (err) {
        console.error("[encrypted-storage] Failed to encrypt:", err);
      }
    },
    [userEmail],
  );

  const load = useCallback(
    async <T>(key: string): Promise<T | null> => {
      if (!userEmail) return null;
      try {
        const encrypted = localStorage.getItem(`bf_${key}`);
        if (!encrypted) return null;
        return await decryptScreeningData<T>(encrypted, userEmail);
      } catch (err) {
        console.error("[encrypted-storage] Failed to decrypt:", err);
        return null;
      }
    },
    [userEmail],
  );

  const remove = useCallback((key: string) => {
    localStorage.removeItem(`bf_${key}`);
  }, []);

  const clearAll = useCallback(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("bf_"));
    keys.forEach((k) => localStorage.removeItem(k));
  }, []);

  return { save, load, remove, clearAll };
}
