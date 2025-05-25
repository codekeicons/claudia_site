
import { useEffect, useState } from "react";

import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

export const RingProgress = ()=> {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 100;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="rgb(255 255 255)"
      gaugeSecondaryColor="rgb(66, 66, 66)"
    />
  );
}
