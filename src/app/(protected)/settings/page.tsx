import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="bg-white flex flex-col h-full p-4 w-[600px] items-center justify-center text-lg flex-wrap gap-2 overflow-auto">
      <p>{JSON.stringify(session?.user, null, 2)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
