import React, { useEffect, useState } from "react";
import { DCMeter, Meter } from "tone";

type Props = {
  meter: Meter;
};

function linearToLog(value: number) {
  const minDb = -20; // Minimum dB value on the meter
  const maxDb = 3; // Maximum dB value on the meter
  if (value <= 0) {
    return minDb;
  }
  const normalizedValue = 20 * Math.log10(value); 
  return Math.max(minDb, Math.min(maxDb, normalizedValue));
}

const DialMeter = ({ meter }: Props) => {
  const [value, setValue] = useState(-60);

  useEffect(() => {
    setInterval(() => {
      const val = meter.getValue() as number;
      if (val < 0.1) {
        setValue(-60);
        return;
      }
      const logValue = linearToLog(val);
      const rangeDb = 3 - -20; // Total dB range
      const rotation = ((logValue + 20) / rangeDb) * 120 - 60;
      setValue(rotation);
    }, 100);
  }, [meter]);

  return (
    <div className="meter">
      <div
        className="dial"
        style={{
          transform: `rotate(${value}deg)`,
        }}
      ></div>
    </div>
  );
};

export default DialMeter;
