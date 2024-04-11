import * as React from "react";
import { asapFont, majorFont } from "@/components/fonts/fonts";
import { cn } from "../../lib/utils";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col p-2 w-full justify-center items-center">
        <h1
          id="logo_title"
          className={cn(
            majorFont.className,
            "text-[2.8rem] sm:text-[4rem] md:text-[4rem] lg:text-[6rem] md:tracking-[0.8rem]"
          )}
        >
          L&apos;IDYLLE
        </h1>
        <span
          id="logo_subtitle"
          className={cn(
            asapFont.className,
            "text-black text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] font-extrabold text-center tracking-wider lg:tracking-[0.8rem]"
          )}
        >
          Restaurant &bull; Bar
          <br /> Transats
          <br /> Evènementiels
        </span>
      </div>
    </div>
  );
};

export default Home;
