export const letters = {
  A: { key: 1, letter: "A", sound: "/audios/letra-a.mp3" },
  U: { key: 2, letter: "U", sound: "/audios/letra-u.mp3" },
  I: { key: 3, letter: "I", sound: "/audios/letra-i.mp3" },
  O: { key: 4, letter: "O", sound: "/audios/letra-o.mp3" },
  E: { key: 5, letter: "E", sound: "/audios/letra-e.mp3" },
  OI: { key: 6, letter: "OI", sound: "/audios/oi.mp3" },
  UI: { key: 7, letter: "UI", sound: "/audios/ui.mp3" },
  OU: { key: 8, letter: "OU", sound: "/audios/ou.mp3" },
  EI: { key: 9, letter: "EI", sound: "/audios/ei.mp3" },
  AU: { key: 10, letter: "AU", sound: "/audios/au.mp3" },
  AO: { key: 11, letter: "AO", sound: "/audios/ao.mp3" },
  AI: { key: 12, letter: "AI", sound: "/audios/ai.mp3" },
  EU: { key: 13, letter: "EU", sound: "/audios/eu.mp3" },
  UAU: { key: 14, letter: "UAU", sound: "/audios/uau.mp3" },
  UAI: { key: 15, letter: "UAI", sound: "/audios/uai.mp3" },
};

const { A, U, I, O, E, OI, UI, OU, EI, AU, AO, AI, EU, UAU, UAI } = letters;

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

const phase8 = [
  [O, I, OI],
  [U, I, UI],
  [O, U, OU],
];
const phase9 = [
  [E, I, EI],
  [A, U, AU],
  [E, U, EU],
];

const phase10 = [
  [A, I, AI],
  [E, U, EU],
  [U, A, UAU],
  [U, A, UAI],
];
export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8, phase9, phase10];
