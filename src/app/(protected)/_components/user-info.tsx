import { asapFont } from "@/components/fonts/fonts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full sm:w-[600px]">
      <CardHeader>
        <p className="text-xl font-bold">{label}</p>
      </CardHeader>
      <CardContent className={cn("space-y-4", asapFont.className)}>
        <div className="flex flex-row items-center justify-between rounded-lg border shadow-sm">
          <p className="text-sm font-medium p-1">Id :</p>
          <span className="truncate text-sm max-w-[200px] p-1 bg-slate-100 rounded-sm">
            {user?.id}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border shadow-sm">
          <p className="text-sm font-medium p-1">Nom d&apos;utilisateur :</p>
          <span className="truncate text-sm max-w-[200px] p-1 bg-slate-100 rounded-sm">
            {user?.name}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border shadow-sm">
          <p className="text-sm font-medium p-1">Email :</p>
          <span className="truncate text-sm max-w-[200px] p-1 bg-slate-100 rounded-sm">
            {user?.email}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border shadow-sm">
          <p className="text-sm font-medium p-1">Rôle :</p>
          <span className="truncate text-sm max-w-[200px] p-1 bg-slate-100 rounded-sm">
            {user?.role}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border shadow-sm">
          <p className="text-sm font-medium p-1">
            Authentification à deux facteurs :
          </p>
          <span className="flex items-center justify-center truncate text-sm max-w-[200px] p-1  rounded-sm gap-x-2">
            <Badge
              variant={user?.isTwoFactorEnabled ? "default" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "Active" : "Inactif"}
            </Badge>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
