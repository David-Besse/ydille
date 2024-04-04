"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/features/layout/Contact/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Contact = () => {
  return <LazyMap />;
};

export default Contact;
