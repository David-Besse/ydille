"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "../../../../hooks/useCurrentUser";
import { Key, KeyIcon, KeyRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { asapFont } from "@/components/fonts/fonts";
import { RoleGate } from "../_components/role-gate";
import { FormSuccess } from "@/features/layout/form-sucess";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "../../../../actions/admin";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.status === 200) {
        toast.success("API route worked");
      } else {
        toast.error("API route failed");
      }
    });
  };

  return (
    <Card className="w-full sm:w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
          <KeyRoundIcon /> Admin
        </p>
      </CardHeader>
      <CardContent className={cn("space-y-4", asapFont.className)}>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Vous avez le droit d'accéder à cette page" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Tester</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server action</p>
          <Button onClick={onServerActionClick}>Tester</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
