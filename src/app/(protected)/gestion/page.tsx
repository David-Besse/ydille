import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BookOpenCheck,
  GalleryVertical,
  NotebookTextIcon,
  User,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const GestionPage = () => {
  return (
    <div className="h-full w-full sm:w-[1000px] flex flex-col items-center justify-center space-y-14 py-10 sm:py-0">
      <h1 className="text-4xl text-center">
        Que faisons nous aujourd&apos;hui ?
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-8 text-center">
        <Link href="/gestion/evenements">
          <Card className="w-[90vw] hover:scale-105 sm:w-[400px] hover:bg-sky-200 bg-sky-400 hover:text-gray-600">
            <CardHeader>
              <p className="text-xl font-bold">Gérer les évènements</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <BookOpenCheck className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/galerie">
          <Card className="w-[90vw] hover:scale-105 sm:w-[400px] hover:bg-orange-200 bg-orange-400 hover:text-gray-600">
            <CardHeader>
              <p className="text-xl font-bold">Gérer la galerie</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <GalleryVertical className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/carte">
          <Card className="w-[90vw] hover:scale-105 sm:w-[400px] hover:bg-emerald-200 bg-emerald-400 hover:text-gray-600">
            <CardHeader>
              <p className="text-xl font-bold">Gérer la carte</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <UtensilsCrossed className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/profil">
          <Card className="w-[90vw] hover:scale-105 sm:w-[400px] hover:bg-red-200 bg-red-400 hover:text-gray-600">
            <CardHeader>
              <p className="text-xl font-bold">Mon profil</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <User className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default GestionPage;
