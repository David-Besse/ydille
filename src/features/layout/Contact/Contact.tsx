"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/features/layout/Contact/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="px-2 text-center font-bold tracking-wider">
        Appuyez ou cliquez sur le point bleu au milieu de la carte
      </span>
      <LazyMap />
    </div>
  );
};
