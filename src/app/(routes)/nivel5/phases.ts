export const letters = {
  MA: { key: 1, letter: "MA", sound: "/audios/ma.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  MI: { key: 3, letter: "MI", sound: "/audios/mi.mp3" },
  FI: { key: 4, letter: "FI", sound: "/audios/fi.mp3" },
  MU: { key: 5, letter: "MU", sound: "/audios/mu.mp3" },
  NU: { key: 6, letter: "NU", sound: "/audios/nu.mp3" },
  ME: { key: 7, letter: "ME", sound: "/audios/me.mp3" },
  JE: { key: 8, letter: "JE", sound: "/audios/je.mp3" },
  MO: { key: 9, letter: "MO", sound: "/audios/mo.mp3" },
  NO: { key: 10, letter: "NO", sound: "/audios/no.mp3" },
  MEU: { key: 11, letter: "MEU", sound: "/audios/meu.mp3" },
  MEIA: { key: 12, letter: "MEIA", sound: "/audios/meia.mp3" },
  AMA: { key: 13, letter: "AMA", sound: "/audios/ama.mp3" },
  MIAU: { key: 14, letter: "MIAU", sound: "/audios/miau.mp3" },
  MALA: { key: 15, letter: "MALA", sound: "/audios/mala.mp3" },
  MOLA: { key: 16, letter: "MOLA", sound: "/audios/mola.mp3" },
  LAMA: { key: 17, letter: "LAMA", sound: "/audios/lama.mp3" },
  FOME: { key: 18, letter: "FOME", sound: "/audios/fome.mp3" },
  MEIO: { key: 19, letter: "MEIO", sound: "/audios/meio.mp3" },
  MOVE: { key: 20, letter: "MOVE", sound: "/audios/move.mp3" },
  MOLE: { key: 21, letter: "MOLE", sound: "/audios/mole.mp3" },
  MIMO: { key: 22, letter: "MIMO", sound: "/audios/mimo.mp3" },
  LEME: { key: 23, letter: "LEME", sound: "/audios/leme.mp3" },
  MULA: { key: 24, letter: "MULA", sound: "/audios/mula.mp3" },
  LILOMOVEOOVO: { key: 25, letter: "LILO MOVE O OVO", sound: "/audios/lilo-move-o-ovo.mp3" },
  VIVIAMAOVAVA: { key: 26, letter: "VIVI AMA O VAVA", sound: "/audios/vivi-ama-o-vava.mp3" },
  FUFULEVAAMALA: { key: 27, letter: "FUFU LEVA A MALA", sound: "/audios/fufu-leva-a-mala.mp3" },
  EVAMOVEAMOLA: { key: 28, letter: "EVA MOVE A MOLA", sound: "/audios/eva-move-a-mola.mp3" },
  EULEVOOMIMO: { key: 29, letter: "EU LEVO O MIMO", sound: "/audios/eu-levo-o-mimo.mp3" },
  MEUFAVOEEU: { key: 30, letter: "MEU FAVO E EU", sound: "/audios/meu-favo-e-eu.mp3" },
  EUVIAMULA: { key: 31, letter: "EU VI A MULA", sound: "/audios/eu-vi-a-mula.mp3" },
  OFAVOMEIOMOLE: { key: 32, letter: "O FAVO MEIO MOLE", sound: "/audios/o-favo-meio-mole.mp3" },
  IVOLEVOUAMALA: { key: 33, letter: "IVO LEVOU A MALA", sound: "/audios/ivo-levou-a-mala.mp3" },
};

const {
  MA,
  VA,
  MI,
  FI,
  MU,
  NU,
  ME,
  JE,
  MO,
  NO,
  MEU,
  MEIA,
  AMA,
  MIAU,
  MALA,
  MOLA,
  LAMA,
  FOME,
  MEIO,
  MOVE,
  MOLE,
  MIMO,
  LEME,
  MULA,
  LILOMOVEOOVO,
  VIVIAMAOVAVA,
  FUFULEVAAMALA,
  EVAMOVEAMOLA,
  EULEVOOMIMO,
  MEUFAVOEEU,
  EUVIAMULA,
  OFAVOMEIOMOLE,
  IVOLEVOUAMALA,
} = letters;

const phase1 = [
  [MA, VA, MA],
  [MI, FI, MI],
  [NU, MU, MU],
  [JE, ME, ME],
  [MO, NO, MO],
];

const phase2 = [
  [MI, MA, MA],
  [ME, MO, ME],
  [MI, MU, MI],
  [MO, ME, MO],
  [MA, MU, MU],
];

const phase3 = [[MEU], [MEIA], [AMA], [MIAU]];

const phase4 = [[MALA], [MOLA], [LAMA], [FOME], [MEIO]];

const phase5 = [[MOVE], [MOLE], [MIMO], [LEME], [MULA]];

const phase6 = [[LILOMOVEOOVO], [VIVIAMAOVAVA], [FUFULEVAAMALA]];

const phase7 = [[EVAMOVEAMOLA], [EULEVOOMIMO], [MEUFAVOEEU]];

const phase8 = [[EUVIAMULA], [OFAVOMEIOMOLE], [IVOLEVOUAMALA]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["OVO", "LILO", "MOVE", "O"],
    ["AMA", "O", "VAVA", "VIVI"],
    ["LEVA", "FUFU", "MALA", "A"],
  ],
  [
    ["A", "MOVE", "EVA", "MOLA"],
    ["LEVO", "MIMO", "EU", "O"],
    ["EU", "E", "FAVO", "MEU"],
  ],
  [
    ["EU", "VI", "MULA", "A"],
    ["MEIO", "MOLE", "O", "FAVO"],
    ["MALA", "IVO", "A", "LEVOU"],
  ],
];
