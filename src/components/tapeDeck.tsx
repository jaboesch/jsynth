/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

const TapeDeck = (props: Props) => {
  return (
    <div className="h-[200px] w-[200px]  relative">
      <div className="absolute rounded-full overflow-hidden shadow-lg h-[200px] w-[200px] left-[-60px] top-[-60px]" />
      <div className="absolute rounded-full overflow-hidden h-[200px] w-[200px] left-[-60px] top-[-60px]">
        <div className="animate-spin-slow flex justify-center items-center tape h-[200px] w-[200px]">
          <div className=" logo-mask w-[100px]">
            <div className="tape-dent w-[100px] h-[100px]" />
          </div>
          {/* <img src="/jsynth.svg" className="tape-logo w-[100px]" /> */}
        </div>
      </div>
    </div>
  );
};

export default TapeDeck;
