import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "./prisma";
import config from "../config/config";

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistAdmin) {
      console.log("Admin is live now!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.admin.admin_password as string,
      12
    );

    const adminData = {
      email: config.admin.admin_email as string,
      password: hashedPassword,
      role: UserRole.ADMIN,
      username: config.admin.admin_username as string,
    };

    if (!isExistAdmin) {
      const admin = await prisma.$transaction(async (transactionClient) => {
        const createdUserData = await transactionClient.user.create({
          data: adminData,
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        const userId = createdUserData.id;

        await transactionClient.userProfile.create({
          data: {
            userId: userId,
          },
        });
      });
      return admin;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
