import { Resend } from "resend";
import VerifyEmail from "../../../../email/verificationEmail";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  console.log("User EMail", email);

  try {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verifyExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    if (!email) {
      console.error("no email provided!");
      return null;
      // Find the user by email
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user exists, update verification code and expiry
    if (user) {
      await prisma.user.update({
        where: { email },
        data: {
          verifyCode: verificationCode,
          verifyCodeExpiry: verifyExpiry,
        },
      });

      // Send email with Resend
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Verify Your Maegor Account",
        react: VerifyEmail({ verificationCode }), // Send the verification code to the email template
      });

      // Handle errors from Resend email service
      if (error) {
        return Response.json({ error: "Failed to send verification email" });
      }

      // Return success if email was sent
      return Response.json({
        success: true,
        message: "Verification code sent successfully",
      });
    }

    // User not found
    return Response.json({ success: false, message: "User not found" });
  } catch (error) {
    console.error("Error occurred:", error);
    return Response.json({ error: "Internal server error" });
  }
}
