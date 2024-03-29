import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ListEntree: { name: string; description: string; price: number }[] = [
  {
    name: "Planchette de charcuterie",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 15,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 18,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 8,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 21,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 20,
  },
];

const Carte = () => {
  return (
    <div className="flex flex-col w-full pb-12 px-8 border shadow-black shadow-lg rounded-lg gap-8">
      <h2 className="text-3xl font-bold self-center">Carte</h2>
      <h3 className="text-lg font-bold self-start">Entrée</h3>
      <div className="flex gap-8">
        <div
          id="tapas"
          className="self-center border rounded pointer-events-none"
        >
          <Table className="max-w-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="">Nos Tapas</TableHead>
                <TableHead className="text-right w-[4rem] ">Prix*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ListEntree.map((entree) => (
                <TableRow key={entree.name} className="border-none">
                  <TableCell>
                    <p className="font-bold ">{entree.name}</p>
                    <p className="text-muted-foreground ">
                      {entree.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-right ">{entree.price}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>* TVA incl.</TableCaption>
          </Table>
        </div>

        <div
          id="tapas"
          className="self-center border rounded pointer-events-none"
        >
          <Table className="max-w-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="">Nos Tapas</TableHead>
                <TableHead className="text-right w-[4rem] ">Prix*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ListEntree.map((entree) => (
                <TableRow key={entree.name} className="border-none">
                  <TableCell>
                    <p className="font-bold ">{entree.name}</p>
                    <p className="text-muted-foreground ">
                      {entree.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-right ">{entree.price}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>* TVA incl.</TableCaption>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Carte;
