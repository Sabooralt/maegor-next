"use client";

import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { useSearchParams } from "next/navigation";
import { PrimaryButton } from "../ui/primary-button";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <PrimaryButton
      onClick={() => onClick("google")}
      className="w-full"
      text="Continue with google"
    >
      <FaGoogle className="mr-1 size-4 text-white" />
    </PrimaryButton>
  );
};

export default GoogleButton;
