"use client";


import { logout } from "../../actions/logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="grid w-full h-screen place-items-center">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Welcome to the dashboard
        </h1>

        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
