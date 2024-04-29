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
          <Card className="w-[90vw] sm:w-[400px] hover:bg-sky-400 bg-sky-200 border-0 hover:border-sky-600 hover:shadow-[0_0_4px_4px_rgb(186,230,253,1)]">
            <CardHeader>
              <p className="text-xl font-bold">Gérer les évènements</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <BookOpenCheck className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/galerie">
          <Card className="w-[90vw] sm:w-[400px] hover:bg-orange-400 bg-orange-200 border-0 hover:border-orange-600 hover:shadow-[0_0_4px_4px_rgb(254,215,170,1)]">
            <CardHeader>
              <p className="text-xl font-bold">Gérer la galerie</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <GalleryVertical className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/carte">
          <Card className="w-[90vw] sm:w-[400px] hover:bg-emerald-400 bg-emerald-200 border-0 hover:border-emerald-600 hover:shadow-[0_0_4px_4px_rgb(167,243,208,1)]">
            <CardHeader>
              <p className="text-xl font-bold">Gérer la carte</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <UtensilsCrossed className="h-28 w-28" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/gestion/profil">
          <Card className="w-[90vw] sm:w-[400px] hover:bg-red-400 bg-red-300 border-0 hover:border-red-600 hover:shadow-[0_0_4px_4px_rgb(252,165,165,1)]">
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
