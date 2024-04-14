"use client";

import MidiKeyboard from "@/components/midiKeyboard";
import TapeDeck from "@/components/tapeDeck";
import { useEffect, useState } from "react";
import { PolySynth, Reverb, now } from "tone";

export default function Home() {
  const [synth, setSynth] = useState(new PolySynth().toDestination());

  useEffect(() => {
    const reverb = new Reverb(10).toDestination();
    synth.connect(reverb);
  }, [synth])

  const getNote = (note: number) => {
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];

    return notes[note % 12];
  };

  const getOctave = (note: number) => {
    return Math.floor(note / 12);
  };

  const convertMidiEventToSynthEvent = (event: MidiEvent) => {
    const frequency = `${getNote(event.note)}${getOctave(event.note)}`;
    return {
      frequency,
      normalVelo: event.velocity / 127,
      isAttack: event.command === 144,
    };
  };

  const onMidiEvent = (event: MidiEvent) => {
    const synthEvent = convertMidiEventToSynthEvent(event);
    console.log(synthEvent);
    if (synth) {
      if (synthEvent.isAttack) {
        synth.triggerAttack(synthEvent.frequency, now(), synthEvent.normalVelo);
      } else {
        synth.triggerRelease(synthEvent.frequency);
      }
    }
  };

  return (
    <main className="flex min-w-[1200px] min-h-screen flex-col items-center justify-between py-12">
      <div className="z-10 w-full max-w-[1100px] items-center justify-center flex flex-col gap-[100px] h-full">
        <div className="metal p-[25px] mt-[50px] w-full">
          <div className="flex flex-row">
            <TapeDeck />
          </div>
          <MidiKeyboard
            onMidiEvent={onMidiEvent}
            keyboardOctave={4}
            keyboardVelocity={80}
          />
        </div>
        {/* <Keys /> */}
      </div>
    </main>
  );
}
