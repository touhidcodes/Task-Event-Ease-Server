import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { attendeeServices } from "./attendee.service";

const registerForEventController = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const { eventId } = req.params;

    const attendee = await attendeeServices.registerForEvent(userId, eventId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully registered for the event",
      data: attendee,
    });
  }
);

const getAttendeesByEventController = catchAsync(
  async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const attendees = await attendeeServices.getAttendeesByEvent(eventId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Attendees retrieved successfully!",
      data: attendees,
    });
  }
);

const getMyAttendedEventsController = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    const events = await attendeeServices.getMyAttendedEvents(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My attended events retrieved successfully!",
      data: events,
    });
  }
);

export const attendeeControllers = {
  registerForEventController,
  getAttendeesByEventController,
  getMyAttendedEventsController,
};
