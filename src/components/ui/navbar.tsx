import { Input } from "./input";
import { Logo } from "./Logo";

import { Navuser } from "./nav-user";

export const Navbar = () => {
  return (
    <div className="fixed top-0 bg-slate-50 z-50 flex w-full flex-row items-center justify-between border-b border-slate-400 px-10 py-2 shadow-sm">
      <div>
        <Logo size={40} />
      </div>

      <div>
        <Input type="search" className="flex w-full flex-auto" />
      </div>

      <Navuser />
    </div>
  );
};
