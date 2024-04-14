import clsx from "clsx";
import React, { useEffect, useState } from "react";
import KeyboardButton from "./keyboardButton";

type Props = {
  onMidiEvent: (event: MidiEvent) => void;
  keyboardVelocity: number;
  keyboardOctave: number;
};

const MidiKeyboard = ({
  onMidiEvent,
  keyboardOctave,
  keyboardVelocity,
}: Props) => {
  const [activeNotes, setActiveNotes] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  });

  const keyboardToMIDIMap: { [key: string]: number } = {
    KeyA: 0, // C
    KeyW: 1, // C#
    KeyS: 2, // D
    KeyE: 3, // D#
    KeyD: 4, // E
    KeyF: 5, // F
    KeyT: 6, // F#
    KeyG: 7, // G
    KeyY: 8, // G#
    KeyH: 9, // A
    KeyU: 10, // A#
    KeyJ: 11, // B
    //   KeyK: 12, // C
    //   KeyO: 13, // C#
    //   KeyL: 14, // D
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code in keyboardToMIDIMap) {
      const note = keyboardToMIDIMap[event.code];
      if (!activeNotes[note]) {
        console.log("hit", activeNotes[note], note);
        setActiveNotes((curr) => ({ ...curr, [note]: true }));
        onMidiEvent({
          command: 144,
          note: note + keyboardOctave * 12,
          velocity: keyboardVelocity,
        });
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code in keyboardToMIDIMap) {
      const note = keyboardToMIDIMap[event.code];
      setActiveNotes((curr) => ({ ...curr, [note]: false }));
      onMidiEvent({
        command: 128,
        note: note + keyboardOctave * 12,
        velocity: 0,
      });
    }
  };

  const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
      input.onmidimessage = getMIDIMessage;
    });
  };

  const onMIDIFailure = () => {
    console.log("Could not access your MIDI devices.");
  };

  const getMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
    const command = message.data[0];
    const note = message.data[1];
    const velocity = message.data[2];
    onMidiEvent({ command, note, velocity });
  };

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, onMidiEvent]);

  return (
    <div className="flex w-min mx-auto flex-col gap-[1px] keyboard-surface p-[1px]">
      <div className="flex flex-row gap-[1px]">
        <KeyboardButton isPressed={false} className="!w-[151px] h-[75px]">
          on/off
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px] font-thin">
          1
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px] font-thin">
          2
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          3
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          4
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          5
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          6
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          7
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          8
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          ↓
        </KeyboardButton>
        <KeyboardButton isPressed={false} className=" h-[75px]">
          ↑
        </KeyboardButton>
      </div>
      <div className="flex flex-row gap-[1px]">
        {Object.values(activeNotes).map((noteActive, index) => (
          <KeyboardButton
            key={`key-button-${index}`}
            isPressed={noteActive}
            className="h-[150px]"
          />
        ))}
      </div>
    </div>
  );
};

export default MidiKeyboard;
