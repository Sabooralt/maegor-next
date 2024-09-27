import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json({ isVerified: user.emailVerified });
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
}
