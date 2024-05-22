import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8080; 
export const DATABASE_URI = process.env.DATABASE_URI;

export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;