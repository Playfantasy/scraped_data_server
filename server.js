import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("PORT:", process.env.PORT);
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    console.log(`trying to connect to the server`);
    const server = app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();

process.on("SIGTERM", () => {
  console.log(`SIGTERM RECEIVED`);
  if (server) {
    server.close();
  }
});
