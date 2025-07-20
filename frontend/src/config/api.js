export const API_BASE_URL = import.meta.env.PROD  // Always reliable
  ? "/api"
  : "http://localhost:3000/api";