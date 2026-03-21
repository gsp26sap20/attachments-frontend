const env = import.meta.env;

export const IS_DEV = env.DEV;
export const IS_PROD = env.PROD;
export const VITE_MODE = env.MODE;

const ODATA_ORIGIN = env.VITE_ODATA_ORIGIN;

if (!ODATA_ORIGIN) {
  throw new Error('VITE_ODATA_ORIGIN is not defined in .env file');
}

export const ODATA_BASE_URL = IS_DEV ? '/api' : ODATA_ORIGIN;
