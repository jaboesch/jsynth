import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Meter as ToneMeter } from "tone";

type Props = {
  meter: ToneMeter;
};

const LedMeter = ({ meter }: Props) => {
  const [value, setValue] = useState(-60);
  const [ledValues, setLedValues] = useState(
    Array.from(
      { length: Math.ceil((0 - -60) / 3) + 1 },
      (_, index) => -60 + index * 3
    )
  );

  useEffect(() => {
    setInterval(() => {
      const val = meter.getValue();
      if (typeof val === "number" && val > -60) {
        setValue(val);
      } else {
        setValue(-60);
      }
    }, 100);
  }, [meter]);

  const getLightColor = (threshold: number) => {
    if (threshold > -12) {
      return "led-red";
    }
    if (threshold > -30) {
      return "led-yellow";
    }
    return "led-green";
  };

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <div className="flex flex-row gap-[24px]">
        {ledValues.map((threshold) => {
          return (
            <div
              key={`led-row-1-meter-${threshold}`}
              className={clsx(
                "led-light",
                value > threshold && getLightColor(threshold)
              )}
            />
          );
        })}
      </div>
      <div className="flex flex-row gap-[24px]">
        {ledValues.map((threshold) => {
          return (
            <div
              key={`led-row-2-meter-${threshold}`}
              className={clsx(
                "led-light",
                value > threshold && getLightColor(threshold)
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LedMeter;
