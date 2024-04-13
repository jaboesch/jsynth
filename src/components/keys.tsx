"use client";

import React from "react";
import {
  AMSynth,
  FMSynth,
  Loop,
  Part,
  PolySynth,
  Sequence,
  Synth,
  Time,
  Transport,
  now,
} from "tone";

type Props = {};

type JNote = {
  target: string | string[];
  duration: string;
  // velocity: number,
};

type JPart = Array<JNote | Array<JNote>>;

const Keys = (props: Props) => {
  const generateRests = (notes: JPart) => {
    const sigTicks = Time("4n").toTicks();
    const newNoteArray: JPart = [];
    notes.forEach((note) => {
        newNoteArray.push(note);
        // if it is an array, it is subdivided and therefore smaller than the time sig
        if (!Array.isArray(note)) {
            const noteTicks = Time(note.duration).toTicks();
            if (noteTicks > sigTicks) {
              const numSigRests = noteTicks / sigTicks;
              for (let i = 0; i < numSigRests; i++) {
                newNoteArray.push({
                  target: "rest",
                  duration: "4n", // only halfway true
                });
              }
            }
        }
    });
    return newNoteArray;
  };

  const xyz = () => {
    //create a synth and connect it to the main output (your speakers)

    //play a middle 'C' for the duration of an 8th note
    // create two monophonic synths
    const synthA = new FMSynth().toDestination();
    const synthB = new AMSynth().toDestination();
    //play a note every quarter-note
    // const loopA = new Loop((time) => {
    //   synthA.triggerAttackRelease("C2", "8n", time);
    // }, "4n").start(0);
    // //play another note every off quarter-note, by starting it "8n"
    // const loopB = new Loop((time) => {
    //   synthB.triggerAttackRelease("C4", "8n", time);
    // }, "4n").start("8n");

    // const loopC = new Loop((time) => {
    //   synthB.triggerAttackRelease("G4", "8n", time);
    // }, "4n").start("1:0:0");
    // const loopD = new Loop((time) => {
    //   synthB.triggerAttackRelease("A4", "8n", time);
    // }, "4n").start("2:0:0");
    /**
     * THESE STACK upon click click click
     */
    // all loops start until the Transport is started
    Transport.start();

    const synth = new PolySynth({options: {oscillator: {type: "square"}}}).toDestination();

    const arr: JPart = [
      {
        target: "C4",
        duration: "4n", // only halfway true
      },
      [
        {
          target: "E4",
          duration: "8n", // only halfway true
        },
        {
          target: "G4",
          duration: "8n", // only halfway true
        },
      ],
      {
        target: ["C4", "E4", "G4"],
        duration: "4n", // only halfway true
      },
      [
        {
          target: "G4",
          duration: "8n", // only halfway true
        },
        {
          target: "B4",
          duration: "8n", // only halfway true
        },
      ],
      {
        target: "C4",
        duration: "1m", // only halfway true
      },
      {
        target: "D4",
        duration: "1m", // only halfway true
      },
    ];

    const sequence = new Sequence({
      callback: (time, note) => {
        // console.log(time, note);
        if (note.target !== "rest") {
          const myNote = synth.triggerAttackRelease(
            note.target,
            note.duration,
            time
          );
        //   console.log(myNote);
        }
      },
      events: generateRests(arr),
      subdivision: "4n",
      loop: true,
    });
    sequence.start();
  };

  return (
    <div>
      <button onClick={xyz}>play</button>
    </div>
  );
};

export default Keys;
