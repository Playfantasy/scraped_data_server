import express from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import httpStatus from "http-status";

const corsHandler = cors();

const app = express();

app.use(corsHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found path",
    errorMessages: [],
  });
});

export default app;
