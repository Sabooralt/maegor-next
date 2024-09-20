import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const UsernameExist = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (UsernameExist) {
      return NextResponse.json(
        { message: "Username not available!" },
        { status: 409 }
      );
    }
    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
