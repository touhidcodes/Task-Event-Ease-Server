import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { eventRoutes } from "../modules/Event/event.routes";
import { attendeeRoutes } from "../modules/Attendee/attendee.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/events",
    route: eventRoutes,
  },
  {
    path: "/attendees",
    route: attendeeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
