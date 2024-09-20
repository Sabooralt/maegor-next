import { Logo } from "@/components/ui/Logo";

import React from "react";
import { Boat } from "@/components/ui/boat";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen w-full relative overflow-hidden ">
      <div className="absolute top-5 left-7">
        <Logo size={45} />
      </div>
      <div className="md:grid-cols-2 grid">
        <div className="col-span-1 font-apercu pt-10 w-full">{children}</div>
        <div
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
          className="col-span-1 relative hidden md:grid place-items-start place-content-end bg-cover bg-center size-full"
        >
          <div className="flex flex-col relative top-5 lg:w-[70%] md:w-[80%] xl:w-[50%] justify-end gap-0 left-10">
            <Boat />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginLayout;
