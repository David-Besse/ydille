import * as React from "react";
import Image from "next/image";

const galleryImgList = [
  { id: 2, name: "chipirons-a-la-plancha.jpg", alt: "chipirons à la plancha" },
  { id: 3, name: "cosy.jpg", alt: "vue d'une table cosy" },
  { id: 4, name: "coucher-de-soleil.jpeg", alt: "coucher de soleil" },
  { id: 5, name: "entree-cote-route.jpg", alt: "entrée cote route" },
  { id: 6, name: "envie-de-rose.jpg", alt: "envie de vin rosé" },
  { id: 7, name: "notre-table-privee-sur.jpg", alt: "coin prive VIP" },
  { id: 8, name: "pieds-dans-le-sable.jpg", alt: "pieds dans le sable" },
  { id: 9, name: "pilotis.jpg", alt: "pilotis" },
  {
    id: 10,
    name: "salade-idyllique-saumon.jpg",
    alt: "salade de fruits de mer",
  },
  { id: 11, name: "sous-nos-pergolas-et.jpg", alt: "vue sous nos pergolas" },
  {
    id: 12,
    name: "une-de-nos-soiree-blanche.jpg",
    alt: "vue du restaurant lors d'une soirée blanche au coucher du soleil",
  },
  {
    id: 13,
    name: "une-soiree-d-exception.jpg",
    alt: "vue du coin VIP lors d'un feu d'artifice",
  },
  { id: 15, name: "chipirons-a-la-plancha.jpg", alt: "chipirons à la plancha" },
  { id: 16, name: "cosy.jpg", alt: "vue d'une table cosy" },
  { id: 17, name: "coucher-de-soleil.jpeg", alt: "coucher de soleil" },
  { id: 18, name: "entree-cote-route.jpg", alt: "entrée cote route" },
  { id: 19, name: "envie-de-rose.jpg", alt: "envie de vin rosé" },
  { id: 20, name: "notre-table-privee-sur.jpg", alt: "coin prive VIP" },
  { id: 21, name: "pieds-dans-le-sable.jpg", alt: "pieds dans le sable" },
  { id: 22, name: "pilotis.jpg", alt: "pilotis" },
  {
    id: 23,
    name: "salade-idyllique-saumon.jpg",
    alt: "salade de fruits de mer",
  },
  { id: 24, name: "sous-nos-pergolas-et.jpg", alt: "vue sous nos pergolas" },
  {
    id: 25,
    name: "une-de-nos-soiree-blanche.jpg",
    alt: "vue du restaurant lors d'une soirée blanche au coucher du soleil",
  },
  {
    id: 26,
    name: "une-soiree-d-exception.jpg",
    alt: "vue du coin VIP lors d'un feu d'artifice",
  },
];

export const Gallery = () => {
  return (
    <div
      id="gallery"
      className="min-h-[100vh] flex items-center justify-center"
    >
      {galleryImgList.length > 0 &&
        galleryImgList.map((img) => (
          <div className="w-fit h-fit" key={img.name + img.id}>
            <Image
              src={`/img/${img.name}`}
              alt={img.alt}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        ))}
    </div>
  );
};
