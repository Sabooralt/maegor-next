"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { SmallLoading } from "@/components/ui/small-loading";
import { LoaderCircle } from "lucide-react";
import { useResendTimer } from "@/hooks/useResendTimer";
import Image from "next/image";
import axios from "axios";
import { auth } from "../../../auth";

const VerifyEmail = async () => {
  const router = useRouter();
  const [value, setValue] = useState<string | "">("");
  const session = await auth();
  const [isPending, startTransition] = useTransition();
  const { canResend, timer, setCanResend, setTimer } = useResendTimer();

  const handleResendClick = async () => {
    try {
      if (timer > 0) {
        return null;
      }

      if (session?.user) {
        startTransition(async () => {
          const response = await fetch("/api/send-verification-code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session.user.email,
              id: session.user.id,
            }),
          });

          const json = await response.json();

          if (response.ok) {
            toast(json.message);
            setTimer(60);
            setCanResend(false);
          }
        });
      }
    } catch (err: any) {
      if (err.response) {
        toast.error("An error occurred.", {
          description: err.response.data.message,
        });
      } else if (err.request) {
        toast.error(
          "No response received. Please check your internet connection."
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  const submitOtp = async () => {
    try {
      const response = await axios.post("/api/verify-code", {
        verifyCode: value,
        id: session?.user.id,
      });

      if (response.status === 200) {
        toast.success("Email Verified Successfully!");

        router.push("/");
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  return (
    <div className="h-screen w-full relative font-geist">
      <div className="size-fit relative top-5 left-5">
        <Logo size={50} />
      </div>
      <div className="grid gap-5 w-fit py-10  mx-auto place-items-center">
        <Image
          alt="verify-email"
          height={240}
          width={240}
          src="/images/verify-email.png"
        />

        <h1 className="text-4xl font-semibold text-center text-neutral-900">
          OTP Verification
        </h1>

        <p className="text-center">
          One Time Password (OTP) has been sent via Email to <br />
          <span className="font-semibold">{session?.user.email}</span>
        </p>
        <p>Enter the otp below to verify it.</p>

        <div className="size-fit grid gap-1 relative">
          <InputOTP maxLength={6} value={value} onChange={(e) => setValue(e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div className="text-xs relative ml-auto size-fit">
            {isPending ? (
              <LoaderCircle className="size-5" />
            ) : canResend ? (
              <button
                disabled={!canResend}
                className="font-semibold"
                onClick={handleResendClick}
              >
                Resend OTP
              </button>
            ) : (
              <>
                <span className="text-neutral-600">Resend OTP in:</span>{" "}
                <span>{formatTime(timer)}</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
          disabled={value.length !== 6}
          onClick={submitOtp}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
