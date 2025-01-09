import express from "express";
import { PlayerController } from "./player.controller.js";

const router = express.Router();

router.post("/all", PlayerController.getAllPlayerWithElementId);

router.post(
  "/predicted-points",
  PlayerController.getAllPlayerWithElementIdByGameweek
);

export const PlayerRoutes = router;
