import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  const { verifyCode, id } = await req.json();

  try {
    const [user, updatedUser] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id },
      }),

      prisma.user.update({
        where: { id },
        data: { verified: true, verifyCode: null, verifyCodeExpiry: null },
      }),
    ]);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const isCodeValid = user.verifyCode === verifyCode;
    const isCodeNotExpired = user.verifyCodeExpiry
      ? new Date(user.verifyCodeExpiry) > new Date()
      : false;

    if (isCodeValid && isCodeNotExpired) {
      return Response.json(
        { message: "Email verified successfully" },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          message: isCodeValid
            ? "Verification code has expired"
            : "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
