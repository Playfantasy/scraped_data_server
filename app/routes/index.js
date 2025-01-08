import express from "express";

// routes
import { PlayerRoutes } from "../modules/player/player.route.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/player",
    route: PlayerRoutes,
  },
  // {
  //     path: '/users',
  //     route: UserRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
