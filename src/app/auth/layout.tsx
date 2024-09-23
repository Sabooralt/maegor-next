"use client";

import { Logo } from "@/components/ui/Logo";

import React from "react";
import { Boat } from "@/components/ui/boat";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname === "/auth/new-verification") {
    return <>{children}</>;
  }
  return (
    <div className="grid w-full h-screen relative overflow-hidden ">
      <div className="absolute top-5 left-7">
        <Logo size={45} />
      </div>
      <div className="md:grid-cols-12 grid">
        <div className="col-span-5  h-screen overflow-y-auto font-apercu pt-10 w-full">{children}</div>
        <div
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
          className="col-span-7 relative hidden md:grid place-items-start place-content-end bg-cover bg-center size-full"
        >
          <Image
            alt="login-bg"
            fill
            src={"/images/login-bg.jpg"}
            fetchPriority="high"
          />
          <div className="flex flex-col relative top-5 lg:w-[50%] md:w-[70%] xl:w-[30%] justify-end gap-0 left-10">
            <Boat />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginLayout;
