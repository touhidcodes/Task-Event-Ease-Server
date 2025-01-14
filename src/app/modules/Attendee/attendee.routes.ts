import express from "express";
import auth from "../../middlewares/auth";
import { attendeeControllers } from "./attendee.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Route to register for an event
router.post(
  "/register",
  auth(UserRole.USER, UserRole.ADMIN),
  attendeeControllers.registerForEventController
);

// Route to get all attendees
router.get("/all", auth(UserRole.ADMIN), attendeeControllers.getAllAttendees);

// Route to get all events of a specific user
router.get(
  "/my-events",
  auth(UserRole.USER, UserRole.ADMIN),
  attendeeControllers.getMyAttendedEvents
);

export const attendeeRoutes = router;
