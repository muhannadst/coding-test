import {config} from "dotenv";
config();

export const PORT = parseInt(process.env.PORT as string, 10) || 4000;
export const ENVIRONMENT = process.env.ENVIRONMENT || "production"