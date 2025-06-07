export const letters = {
  FA: { key: 1, letter: "FA", sound: "/audios/fa.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  FI: { key: 3, letter: "FI", sound: "/audios/fi.mp3" },
  LI: { key: 4, letter: "LI", sound: "/audios/li.mp3" },
  FU: { key: 5, letter: "FU", sound: "/audios/fu.mp3" },
  VU: { key: 6, letter: "VU", sound: "/audios/vu.mp3" },
  FE: { key: 7, letter: "FE", sound: "/audios/fe.mp3" },
  LE: { key: 8, letter: "LE", sound: "/audios/le.mp3" },
  FO: { key: 9, letter: "FO", sound: "/audios/fo.mp3" },
  LO: { key: 10, letter: "LO", sound: "/audios/lo.mp3" },
  FOI: { key: 11, letter: "FOI", sound: "/audios/foi.mp3" },
  FUI: { key: 12, letter: "FUI", sound: "/audios/fui.mp3" },
  UFA: { key: 13, letter: "UFA", sound: "/audios/ufa.mp3" },
  FIO: { key: 14, letter: "FIO", sound: "/audios/fio.mp3" },
  FOFO: { key: 15, letter: "FOFO", sound: "/audios/fofo.mp3" },
  FIFI: { key: 16, letter: "FIFI", sound: "/audios/fifi.mp3" },
  FEIO: { key: 17, letter: "FEIO", sound: "/audios/feio.mp3" },
  FAVO: { key: 18, letter: "FAVO", sound: "/audios/favo.mp3" },
  FUFU: { key: 19, letter: "FUFU", sound: "/audios/fufu.mp3" },
  FIFO: { key: 20, letter: "FIFO", sound: "/audios/fifo.mp3" },
  FAVA: { key: 21, letter: "FAVA", sound: "/audios/fava.mp3" },
  FOFA: { key: 23, letter: "FOFA", sound: "/audios/fofa.mp3" },
  AAVEFOFA: { key: 24, letter: "A AVE FOFA", sound: "/audios/aavefofa.mp3" },
  OOVOFEIO: { key: 25, letter: "O OVO FEIO", sound: "/audios/oovofeio.mp3" },
  AFOFAVIVI: { key: 26, letter: "A FOFA VIVI", sound: "/audios/afofavivi.mp3" },
  EVAVIUOFAVO: { key: 27, letter: "EVA VIU O FAVO", sound: "/audios/evaviuofavo.mp3" },
  IVOEAFAVA: { key: 28, letter: "IVO E A FAVA", sound: "/audios/ivoeafava.mp3" },
  FIFIEAUVA: { key: 29, letter: "FIFI E A UVA", sound: "/audios/fifieauva.mp3" },
  EUVIOFIO: { key: 30, letter: "EU VI O FIO", sound: "/audios/euviofio.mp3" },
  FIFIVIUOFAVO: { key: 31, letter: "FIFI VIU O FAVO", sound: "/audios/fifiviuofavo.mp3" },
  FUFUVIUAFAVE: { key: 32, letter: "FUFU VIU A FAVE", sound: "/audios/fufuviuafave.mp3" },
};

const {
  VA,
  FA,
  LI,
  VU,
  FU,
  LE,
  LO,
  FE,
  FO,
  FI,
  FOI,
  FUI,
  UFA,
  FIO,
  FOFO,
  FIFI,
  FEIO,
  FAVO,
  FUFU,
  FIFO,
  FAVA,
  FOFA,
  AAVEFOFA,
  OOVOFEIO,
  AFOFAVIVI,
  EVAVIUOFAVO,
  IVOEAFAVA,
  FIFIEAUVA,
  EUVIOFIO,
  FIFIVIUOFAVO,
  FUFUVIUAFAVE,
} = letters;

const phase1 = [
  [FA, VA],
  [FI, LI],
  [FU, VU],
  [FE, LE],
  [FO, LO],
];

const phase2 = [
  [FA, FI],
  [FE, FO],
  [FI, FU],
  [FO, FE],
  [FU, FA],
];

const phase3 = [[FOI], [FUI], [UFA], [FIO]];

const phase4 = [[FOFO], [FIFI], [FEIO], [FAVO]];

const phase5 = [[FUFU], [FIFO], [FAVA], [FOFA]];

const phase6 = [[AAVEFOFA], [OOVOFEIO], [AFOFAVIVI]];

const phase7 = [[EVAVIUOFAVO], [IVOEAFAVA], [FIFIEAUVA]];

const phase8 = [[EUVIOFIO], [FIFIVIUOFAVO], [FUFUVIUAFAVE]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["AVE", "A", "FOFA"],
    ["FEIO", "OVO", "O"],
    ["A", "VIVI", "FOFA"],
  ],
  [
    ["EVA", "O", "VIU", "FAVO"],
    ["E", "IVO", "A", "FAVA"],
    ["FIFI", "A", "UVA", "E"],
  ],
  [
    ["VI", "EU", "O", "FIO"],
    ["VIU", "O", "FAVO", "FIFI"],
    ["FUFU", "A", "FAVE", "VIU"],
  ],
];
