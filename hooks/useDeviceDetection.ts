import { useState, useEffect } from "react";


export const useDeviceDetection = (): boolean => {
  const [device, setDevice] = useState<boolean>(window.innerWidth < 426);

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 426);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};
