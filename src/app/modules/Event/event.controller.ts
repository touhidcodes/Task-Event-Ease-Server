import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { eventServices } from "./event.service";
import queryPickers from "../../utils/queryPickers";
import { eventFilterableFields, eventQueryFields } from "./event.constants";

const createEvent = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await eventServices.createEvent(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event created successfully!",
    data: result,
  });
});

const getEvents = catchAsync(async (req, res) => {
  const filters = queryPickers(req.query, eventFilterableFields);
  const options = queryPickers(req.query, eventQueryFields);

  const result = await eventServices.getEvents(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const result = await eventServices.getSingleEvent(eventId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event retrieved successfully!",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { eventId } = req.params;

  const result = await eventServices.updateEvent(eventId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully!",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { eventId } = req.params;

  const result = await eventServices.deleteEvent(eventId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully!",
    data: result,
  });
});

export const eventControllers = {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
