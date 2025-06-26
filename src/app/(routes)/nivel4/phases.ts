export const letters = {
  LA: { key: 1, letter: "LA", sound: "/audios/la.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  FI: { key: 3, letter: "FI", sound: "/audios/fi.mp3" },
  LI: { key: 4, letter: "LI", sound: "/audios/li.mp3" },
  LU: { key: 5, letter: "LU", sound: "/audios/lu.mp3" },
  VU: { key: 6, letter: "VU", sound: "/audios/vu.mp3" },
  FE: { key: 7, letter: "FE", sound: "/audios/fe.mp3" },
  LE: { key: 8, letter: "LE", sound: "/audios/le.mp3" },
  FO: { key: 9, letter: "FO", sound: "/audios/fo.mp3" },
  LO: { key: 10, letter: "LO", sound: "/audios/lo.mp3" },
  LUA: { key: 11, letter: "LUA", sound: "/audios/lua.mp3" },
  ELA: { key: 12, letter: "ELA", sound: "/audios/ela.mp3" },
  LEI: { key: 13, letter: "LEI", sound: "/audios/lei.mp3" },
  LEU: { key: 14, letter: "LEU", sound: "/audios/leu.mp3" },
  ELE: { key: 15, letter: "ELE", sound: "/audios/ele.mp3" },
  LEVE: { key: 16, letter: "LEVE", sound: "/audios/leve.mp3" },
  LUVA: { key: 17, letter: "LUVA", sound: "/audios/luva.mp3" },
  LAVA: { key: 18, letter: "LAVA", sound: "/audios/lava.mp3" },
  LEVA: { key: 19, letter: "LEVA", sound: "/audios/leva.mp3" },
  VELA: { key: 20, letter: "VELA", sound: "/audios/vela.mp3" },
  LILO: { key: 21, letter: "LILO", sound: "/audios/lilo.mp3" },
  FALA: { key: 22, letter: "FALA", sound: "/audios/fala.mp3" },
  FILA: { key: 23, letter: "FILA", sound: "/audios/fila.mp3" },
  FALE: { key: 24, letter: "FALE", sound: "/audios/fale.mp3" },
  FALO: { key: 25, letter: "FALO", sound: "/audios/falo.mp3" },
  EULEVOAUVA: { key: 26, letter: "EU LEVO A UVA", sound: "/audios/eu-levo-a-uva.mp3" },
  IVOEAFILA: { key: 27, letter: "IVO E A FILA", sound: "/audios/ivo-e-a-fila.mp3" },
  AVIVIFALAFOFO: { key: 28, letter: "A VIVI FALA FOFO", sound: "/audios/a-vivi-fala-fofo.mp3" },
  EVALAVAAUVA: { key: 29, letter: "EVA LAVA A UVA", sound: "/audios/eva-lava-a-uva.mp3" },
  IVOEALUVA: { key: 30, letter: "IVO E A LUVA", sound: "/audios/ivo-e-a-luva.mp3" },
  ELAVIUALUA: { key: 31, letter: "ELA VIU A LUA", sound: "/audios/ela-viu-a-lua.mp3" },
  ELALEUEFALOU: { key: 32, letter: "ELA LEU E FALOU", sound: "/audios/ela-leu-e-falou.mp3" },
  FIFIVIUAVELA: { key: 33, letter: "FIFI VIU A VELA", sound: "/audios/fifi-viu-a-vela.mp3" },
  VIVILEUALEI: { key: 34, letter: "VIVI LEU A LEI", sound: "/audios/vivi-leu-a-lei.mp3" },
};

const {
  LA,
  VA,
  FI,
  LI,
  LU,
  VU,
  FE,
  LE,
  FO,
  LO,
  LUA,
  ELA,
  LEI,
  LEU,
  ELE,
  LEVE,
  LUVA,
  LAVA,
  LEVA,
  VELA,
  LILO,
  FALA,
  FILA,
  FALE,
  FALO,
  EULEVOAUVA,
  IVOEAFILA,
  AVIVIFALAFOFO,
  EVALAVAAUVA,
  IVOEALUVA,
  ELAVIUALUA,
  ELALEUEFALOU,
  FIFIVIUAVELA,
  VIVILEUALEI,
} = letters;

const phase1 = [
  [LA, VA, LA],
  [FI, LI, LI],
  [LU, VU, LU],
  [FE, LE, LE],
  [LO, FO, LO],
];

const phase2 = [
  [LA, LI, LA],
  [LO, LE, LE],
  [LU, LI, LI],
  [LO, LE, LO],
  [LA, LU, LU],
];

const phase3 = [[LUA], [ELA], [LEI], [LEU], [ELE]];

const phase4 = [[LEVE], [LUVA], [LAVA], [LEVA], [VELA]];

const phase5 = [[LILO], [FALA], [FILA], [FALE], [FALO]];

const phase6 = [[EULEVOAUVA], [IVOEAFILA], [AVIVIFALAFOFO]];

const phase7 = [[EVALAVAAUVA], [IVOEALUVA], [ELAVIUALUA]];

const phase8 = [[ELALEUEFALOU], [FIFIVIUAVELA], [VIVILEUALEI]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["A", "EU", "LEVO", "UVA"],
    ["FILA", "IVO", "E", "A"],
    ["VIVI", "A", "FOFO", "FALA"],
  ],
  [
    ["EVA", "UVA", "A", "LAVA"],
    ["E", "IVO", "A", "LUVA"],
    ["VIU", "LUA", "ELA", "A"],
  ],
  [
    ["E", "ELA", "FALOU", "LEU"],
    ["VELA", "VIU", "A", "FIFI"],
    ["LEU", "A", "VIVI", "LEI"],
  ],
];
