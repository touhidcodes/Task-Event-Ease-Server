import prisma from "../../utils/prisma";

interface RegisterForEventInput {}

const registerForEvent = async (userId: string, eventId: string) => {
  const event = await prisma.event.findUniqueOrThrow({
    where: { id: eventId },
  });

  // Check if the event has reached maximum capacity
  const attendeeCount = await prisma.attendee.count({
    where: { eventId },
  });
  if (attendeeCount >= event.maxAttendees) {
    throw new Error("Event has reached maximum capacity.");
  }

  // Check if the user is already registered for the event
  const existingAttendee = await prisma.attendee.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });
  if (existingAttendee) {
    throw new Error("User is already registered for this event.");
  }

  // Register the user for the event
  const attendee = await prisma.attendee.create({
    data: {
      userId,
      eventId,
    },
  });
  return attendee;
};

const getAttendeesByEvent = async (eventId: string) => {
  const attendees = await prisma.attendee.findMany({
    where: { eventId },
    include: { user: true },
  });
  return attendees;
};

const getMyAttendedEvents = async (userId: string) => {
  const events = await prisma.attendee.findMany({
    where: { userId },
    include: { event: true },
  });
  return events;
};

export const attendeeServices = {
  registerForEvent,
  getAttendeesByEvent,
  getMyAttendedEvents,
};
