/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

const TapeDeck = (props: Props) => {
  return (
    <div className="h-[200px] w-[200px]  relative">
      <div className="absolute rounded-full overflow-hidden shadow-lg h-[200px] w-[200px] left-[-60px] top-[-60px]" />
      <div className="absolute rounded-full overflow-hidden h-[200px] w-[200px] left-[-60px] top-[-60px]">
        <div className="justify-center items-center flex absolute h-[200px] w-[200px] z-10">
          <div className="tape-dent rounded-full my-auto w-[50px] h-[50px]" />
        </div>
        <div className="animate-spin-slow flex relative justify-center tape h-[200px] w-[200px]">
          {/* <div className="tape-dent rounded-full p-[5px] my-auto">
            <img src="/j.svg" className="w-[20px] h-[20px]" />
          </div> */}
          {/* <div className="tape-dent rounded-full my-auto p-[10px]">
            <div className="logo-mask my-auto">
              <div className="tape-accent-texture w-[30px] h-[30px]" />
            </div>
          </div> */}
          <div className="logo-mask my-auto">
            <div className="tape-accent-texture w-[30px] h-[30px]" />
          </div>
          <div className="trap-mask w-[100px] trapezoid">
            <div className="tape-accent-texture w-[100px] h-[100px]" />
          </div>
          <div
            className="trap-mask w-[100px] trapezoid"
            style={{ transform: "rotate(120deg)" }}
          >
            <div className="tape-accent-texture w-[100px] h-[100px]" />
          </div>
          <div
            className="trap-mask w-[100px] trapezoid"
            style={{ transform: "rotate(240deg)" }}
          >
            <div className="tape-accent-texture w-[100px] h-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapeDeck;
