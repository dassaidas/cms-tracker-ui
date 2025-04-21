import logger from "../utils/logger";
export function isTokenExpired(token) {
  if (!token || typeof token !== "string") return true;

  const parts = token.split(".");
  if (parts.length !== 3) return true; // 🔐 must be a proper JWT

  const base64Url = parts[1];

  try {
    const payload = JSON.parse(atob(base64Url));
    const now = Math.floor(Date.now() / 1000);

    if (!payload.exp) return true; // no expiry? treat as expired

    return payload.exp < now;
  } catch (error) {
    logger.error("Failed to decode JWT:", error?.response || error);
    return true;
  }
}
