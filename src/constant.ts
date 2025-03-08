export const PORT = 3000;
export const ORIGIN = process.env.NODE_ENV === 'production' ? process.env.ORIGIN! : `http://localhost:${PORT}`;