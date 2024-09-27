import { Button } from "@/components/ui/button";
import { auth, signOut } from "../../../../auth";
import { logout } from "../../../../actions/logout";

const Settings = async () => {
  const session = await auth();
  return (
    <div className="w-full h-screen grid place-items-center bg-red-200">
      <h1 className="text-4xl">run properply  die young lets live forever</h1>

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <Button type="submit"></Button>
      </form>

      <div>
        <h1>{JSON.stringify(session)}</h1>
      </div>
    </div>
  );
};

export default Settings;
