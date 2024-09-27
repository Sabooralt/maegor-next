"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import { MessageCircle, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getInitials } from "@/lib/getInitials";
import { UserDropdown } from "./user-dropdown";

export const Navuser = () => {
  const { data } = useSession();
  return (
    <div className="flex flex-row items-center gap-5">
      {data && (
        <>
          <Link href="#">
            <Button className="flex flex-row items-center gap-2">
              <Plus /> Create
            </Button>
          </Link>
          <Link href="/chat">
            <Button className="flex flex-row items-center gap-2">
              <MessageCircle /> Chat
            </Button>
          </Link>
        </>
      )}

      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-8 cursor-pointer bg-neutral-950">
              <AvatarImage
                src={data.user.image || "User Image"}
                alt="user image"
              />
              <AvatarFallback> {getInitials(data.user.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <UserDropdown />
        </DropdownMenu>
      ) : (
        <Link href="/auth/register">
          <button className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
            Sign up
          </button>
        </Link>
      )}
    </div>
  );
};
