import express from "express";
import { PlayerController } from "./player.controller.js";

const router = express.Router();

router.get("/all", PlayerController.getAllPlayerWithElementId);

export const PlayerRoutes = router;
