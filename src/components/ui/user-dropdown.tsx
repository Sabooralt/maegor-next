import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Undo2 } from "lucide-react";
import { logout } from "../../../actions/logout";

export function UserDropdown() {
  const handleLogout = async () => {
    logout();
  };
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="p-0">
        <button
          onClick={handleLogout}
          className="w-full px-2 cursor-pointer py-1 flex flex-row gap-2 items-center justify-start"
        >
          <Undo2 className="size-4" />
          Logout
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
