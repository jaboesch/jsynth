import { NOTE } from "@/constants/keys";

/**
 * In this case, 1 semitone is a "half step" and
 * 2 semitones is a "whole step"
 */
const semitoneIntervals = {
  major: [2, 2, 1, 2, 2, 2, 1],
  harmonicMinor: [2, 1, 2, 2, 1, 2, 2],
};

export const createMajorScale = (tonic: NOTE) => {
  //whole, whole, half, whole, whole, whole, half.
};

export const createNaturalMinorScale = (tonic: NOTE) => {};

//whole, half, whole, whole, half, whole, whole.

export const midiNoteToFrequency = (midiNote: number): number => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};
