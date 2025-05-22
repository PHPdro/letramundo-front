const A = { key: 1, letter: "A", sound: "/audios/letra-a.mp3" };
const U = { key: 2, letter: "U", sound: "/audios/letra-u.mp3" };
const I = { key: 3, letter: "I", sound: "/audios/letra-i.mp3" };
const O = { key: 4, letter: "O", sound: "/audios/letra-o.mp3" };
const E = { key: 5, letter: "E", sound: "/audios/letra-e.mp3" };

const phase1 = [
  [A, E],
  [A, I],
  [A, O],
  [A, U],
  [E, A],
];

const phase2 = [
  [U, A],
  [U, E],
  [U, I],
  [U, O],
  [O, U],
];

const phase3 = [
  [I, A],
  [I, E],
  [I, O],
  [I, U],
  [E, I],
];

const phase4 = [
  [A, U],
  [I, A],
  [U, I],
  [A, I],
  [U, A],
];
const phase5 = [
  [E, A],
  [E, I],
  [E, O],
  [E, A],
  [I, E],
];

const phase6 = [
  [O, A],
  [O, E],
  [O, I],
  [O, U],
  [E, O],
];

const phase7 = [
  [E, O],
  [O, I],
  [I, A],
  [O, U],
  [E, U],
];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7];
