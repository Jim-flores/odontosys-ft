/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
export const env = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_KEY: import.meta.env.VITE_APP_KEY,
};
