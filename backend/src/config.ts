import dotenv from "dotenv";

dotenv.config();

export const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, JWT_SECRET } =
  process.env;

const requiredEnv = [
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASSWORD",
  "DB_PORT",
  "JWT_SECRET",
];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`${env} is not defined. Please check your .env file.`);
  }
});
