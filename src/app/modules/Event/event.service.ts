import { Event, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utils/paginationHelpers";

const createEvent = async (eventData: Event, userId: string) => {
  const data = {
    ...eventData,
    createdById: userId,
  };
  const result = await prisma.event.create({
    data,
  });
  return result;
};

const getEvents = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, location, date, ...filterData } = params;

  const andConditions: Prisma.EventWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    });
  }

  if (location) {
    andConditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  // if (date) {
  //   andConditions.push({
  //     date: {
  //       gte: new Date(date),
  //     },
  //   });
  // }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map((key) => ({
  //       [key]: {
  //         equals: (filterData as any)[key],
  //       },
  //     })),
  //   });
  // }

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.event.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.event.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getSingleEvent = async (eventId: string) => {
//   const result = await prisma.event.findUniqueOrThrow({
//     where: {
//       id: eventId,
//     },
//     include: {
//       attendees: true,
//     },
//   });
//   return result;
// };

const getMyEvents = async (userId: string) => {
  const result = await prisma.event.findMany({
    where: {
      createdById: userId,
    },
  });
  return result;
};

const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
  const result = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: eventData,
  });
  return result;
};

const deleteEvent = async (eventId: string) => {
  const result = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const eventServices = {
  createEvent,
  getEvents,
  // getSingleEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
};
