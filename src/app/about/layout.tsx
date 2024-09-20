import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  type ItemsType = {
    label: string;
    link: string;
  };

  const items: ItemsType[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Contact",
      link: "/about/contact",
    },
  ];
  return (
    <div className="h-screen w-full bg-black text-white">
      <div className="bg-indigo-700 py-2 grid place-items-center">
        <ul className="flex flex-row gap-10 justify-center items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex bg-white/75 p-2 rounded-md border-red-100 border cursor-pointer hover:bg-white flex-row justify-center items-center"
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Layout;
