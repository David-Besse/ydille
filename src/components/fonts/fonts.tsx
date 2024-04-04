import { Asap, Handlee, Major_Mono_Display } from "next/font/google";

export const asapFont = Asap({
  subsets: ["latin"],
  preload: true,
  variable: "--font-asap",
});

export const handleeFont = Handlee({
  weight: "400",
  style: "normal",
  preload: true,
  subsets: ["latin"],
  variable: "--font-handlee",
});

export const majorFont = Major_Mono_Display({
  weight: "400",
  preload: true,
  subsets: ["latin"],
  variable: "--font-major",
});
