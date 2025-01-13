import express from "express";
import auth from "../../middlewares/auth";
import { eventControllers } from "./event.controller";
import validateRequest from "../../middlewares/validateRequest";
import { eventValidationSchemas } from "./event.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

// Public route to get all events
router.get("/all", eventControllers.getEvents);

// Public route to get a single event by ID
router.get("/:eventId", eventControllers.getSingleEvent);

// Route for authenticated users to get their created events
router.get(
  "/my-events",
  auth(UserRole.USER, UserRole.ADMIN),
  eventControllers.getMyEvent
);

// Route for creating a new event (only authenticated users allowed)
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(eventValidationSchemas.createEventSchema),
  eventControllers.createEvent
);

// Route for updating an event (only creator or admin can update)
router.put(
  "/:eventId",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(eventValidationSchemas.updateEventSchema),
  eventControllers.updateEvent
);

// Route for deleting an event (only creator or admin can delete)
router.delete(
  "/:eventId",
  auth(UserRole.USER, UserRole.ADMIN),
  eventControllers.deleteEvent
);

export const eventRoutes = router;
