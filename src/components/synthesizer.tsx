"use client";

import DialMeter from "@/components/dialMeter";
import LedMeter from "@/components/ledMeter";
import MidiKeyboard from "@/components/midiKeyboard";
import TapeDeck from "@/components/tapeDeck";
import { midiNoteToFrequency } from "@/engines/theoryEngine";
import { useEffect, useState } from "react";
import { PolySynth, Reverb, now, Meter, Analyser } from "tone";

type Props = {};

const Synthesizer = (props: Props) => {
  const [meter] = useState(new Meter());
  const [normalMeter] = useState(new Meter({ normalRange: true }));
  const [analyzer] = useState(new Analyser("waveform", 256));
  const [freqHz, setFreqHz] = useState(0);
  const [synth, setSynth] = useState(
    new PolySynth({
      options: {
        oscillator: {
          type: "sine",
        },
      },
    }).toDestination()
  );

  useEffect(() => {
    const reverb = new Reverb(20).toDestination();
    // const tremolo = new Tremolo(9, 0.75).toDestination().start();
    synth.connect(reverb);
    synth.connect(meter);
    synth.connect(normalMeter);
    synth.connect(analyzer);
    // synth.connect(tremolo);
  }, [synth]);

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
    const noteFrequencyHz = midiNoteToFrequency(event.note);
    console.log(noteFrequencyHz);
    setFreqHz(noteFrequencyHz);
    const synthEvent = convertMidiEventToSynthEvent(event);
    if (synth) {
      if (synthEvent.isAttack) {
        synth.triggerAttack(synthEvent.frequency, now(), synthEvent.normalVelo);
      } else {
        synth.triggerRelease(synthEvent.frequency);
      }
    }
  };

  return (
    <div className="z-10 w-full max-w-[1100px] items-center justify-center flex flex-col gap-[100px] h-full">
      <div className="metal p-[25px] mt-[50px] w-full">
        <div className="flex flex-row gap-[15px]">
          <TapeDeck />
          <div className="flex flex-col gap-[15px] w-full">
            <LedMeter meter={meter} />
            <div className="flex flex-row gap-[15px]">
              <DialMeter meter={normalMeter} />
              <DialMeter meter={normalMeter} />
              <DialMeter meter={normalMeter} />
            </div>
          </div>
        </div>
        <MidiKeyboard
          onMidiEvent={onMidiEvent}
          keyboardOctave={4}
          keyboardVelocity={80}
        />
      </div>
      {/* <Keys /> */}
    </div>
  );
};

export default Synthesizer;
