import { KeyCategory, KeyProps } from "./key";

export const minLettersIds = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const majLettersIds = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const minLettersKeysProps = minLettersIds.map((label): KeyProps => {
  return {
    id: label,
    keyCategory: KeyCategory.letter,
    label: label,
    labelType: "tex",
    mathfieldInstructions: { content: label, method: "write" },
  };
});

export const majLettersKeysProps = majLettersIds.map((label): KeyProps => {
  return {
    id: label,
    keyCategory: KeyCategory.letter,
    label: label,
    labelType: "tex",
    mathfieldInstructions: { content: label, method: "write" },
  };
});