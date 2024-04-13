"use client";

import Keys from "@/components/keys";
import MidiKeyboard from "@/components/midiKeyboard";
import Image from "next/image";

export default function Home() {
  const onMidiEvent = (event: MidiEvent) => {
    console.log(event);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center flex flex-col gap-5">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          JSynth
        </p>
        <div className="metal w-full p-[25px]">
          <MidiKeyboard
            onMidiEvent={onMidiEvent}
            keyboardOctave={0}
            keyboardVelocity={80}
          />
        </div>
        {/* <Keys /> */}
      </div>
    </main>
  );
}
