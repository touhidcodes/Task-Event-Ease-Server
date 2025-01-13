import express from "express";
import auth from "../../middlewares/auth";
import { attendeeControllers } from "./attendee.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Route to register for an event
router.post(
  "/:eventId/register",
  auth(UserRole.USER, UserRole.ADMIN),
  attendeeControllers.registerForEventController
);

// Route to get all attendees of a specific event
router.get("/:eventId", attendeeControllers.getAttendeesByEventController);

// Route to get all events of a specific user
router.get(
  "/my-events",
  auth(UserRole.USER, UserRole.ADMIN),
  attendeeControllers.getMyAttendedEventsController
);

export const attendeeRoutes = router;
