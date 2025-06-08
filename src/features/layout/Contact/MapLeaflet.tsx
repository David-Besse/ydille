import { asapFont } from "@/components/fonts/fonts";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { cn } from "../../../lib/utils";
import { ArrowBigRightDash, Mail, Phone } from "lucide-react";

import "./styles_map.css";

export default function MapLeaflet() {
  return (
    <MapContainer
      preferCanvas={true}
      center={[44.456244745841765, -1.1998075297139543]}
      zoom={11}
      scrollWheelZoom={false}
      className="w-[250px] h-[300px] md:w-[600px] rounded-xl border border-white z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[44.456244745841765, -1.1998075297139543]}
        alt="Emplacement de l'Idylle"
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
        }}
        keyboard={true}
      >
        <Popup autoPan={true} closeButton={false} className="p-0">
          <div className="px-2 text-black">
            <p
              className={cn(
                asapFont.className,
                "flex pl-3 justify-center items-center text-2xl text-[#e2321f] tracking-[0.6rem] border-t-2 border-b-2 border-[#e2321f] font-bold my-0"
              )}
            >
              IDYLLE
            </p>
            <p
              className={cn(
                asapFont,
                "flex text-end justify-center items-center font-semibold"
              )}
            >
              18 chemin de Maguide
              <br />
              40600 Biscarosse
              <br />
              France
              <br />
            </p>
            <p className="flex justify-around items-center">
              <a
                href="tel:+33585098714"
                aria-label="téléphoner au (+33) 5 58 09 87 14"
                className="flex justify-center items-center hover:scale-125"
                title="téléphoner au (+33) 5 58 09 87 14"
              >
                <Phone />
              </a>
              <a
                href="mailto:event@idylle.club"
                aria-label="envoyer un email à event@idylle.club"
                className="flex justify-center items-center hover:scale-125"
                title="envoyer un email à event@idylle.club"
              >
                <Mail />
              </a>
              <a
                href="https://www.google.com/maps/dir//L'Idylle,+18+Chem.+de+Maguide,+40600+Biscarrosse/@44.4559847,-1.1999474,19.25z/data=!4m8!4m7!1m0!1m5!1m1!1s0xd5481f40f2ff351:0xa219b4240f87f592!2m2!1d-1.200073!2d44.456145?entry=ttu"
                target="_blank"
                className="flex justify-center items-center hover:scale-125"
                aria-label="Voir sur Google Maps"
                title="Voir sur Google Maps"
                rel="noreferrer"
              >
                <ArrowBigRightDash />
              </a>
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
