"use server";

import { prisma } from "@/lib/prisma";

export async function checkUsername(
  username: string
): Promise<{ available: boolean; message: string }> {
  try {
    const sanitizedUsername = username.trim().toLowerCase();

    if (sanitizedUsername.length > 20) {
      return {
        available: false,
        message: "Username must not exceed 20 characters",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: sanitizedUsername },
    });

    if (existingUser) {
      return { available: false, message: "This username is already taken" };
    }

    return { available: true, message: "Username is available" };
  } catch (error) {
    console.error("Error checking username:", error);
    return {
      available: false,
      message: "An error occurred while checking the username",
    };
  }
}
