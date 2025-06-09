export const letters = {
  VA: { key: 1, letter: "VA", sound: "/audios/va.mp3" },
  FA: { key: 2, letter: "FA", sound: "/audios/fa.mp3" },
  VI: { key: 3, letter: "VI", sound: "/audios/vi.mp3" },
  LI: { key: 4, letter: "LI", sound: "/audios/li.mp3" },
  VU: { key: 5, letter: "VU", sound: "/audios/vu.mp3" },
  FU: { key: 6, letter: "FU", sound: "/audios/fu.mp3" },
  VE: { key: 7, letter: "VE", sound: "/audios/ve.mp3" },
  LE: { key: 8, letter: "LE", sound: "/audios/le.mp3" },
  VO: { key: 9, letter: "VO", sound: "/audios/vo.mp3" },
  LO: { key: 10, letter: "LO", sound: "/audios/lo.mp3" },
  UVA: { key: 11, letter: "UVA", sound: "/audios/uva.mp3" },
  OVO: { key: 12, letter: "OVO", sound: "/audios/ovo.mp3" },
  EVA: { key: 13, letter: "EVA", sound: "/audios/eva.mp3" },
  IVO: { key: 14, letter: "IVO", sound: "/audios/ivo.mp3" },
  VOA: { key: 15, letter: "VOA", sound: "/audios/voa.mp3" },
  VIU: { key: 16, letter: "VIU", sound: "/audios/viu.mp3" },
  VAI: { key: 17, letter: "VAI", sound: "/audios/vai.mp3" },
  AVE: { key: 18, letter: "AVE", sound: "/audios/ave.mp3" },
  VIVO: { key: 19, letter: "VIVO", sound: "/audios/vivo.mp3" },
  VAVA: { key: 20, letter: "VAVA", sound: "/audios/vava.mp3" },
  VIVI: { key: 21, letter: "VIVI", sound: "/audios/vivi.mp3" },
  VIVA: { key: 22, letter: "VIVA", sound: "/audios/viva.mp3" },
  VEIO: { key: 23, letter: "VEIO", sound: "/audios/veio.mp3" },
  AAVEVOA: { key: 24, letter: "A AVE VOA", sound: "/audios/a-ave-voa.mp3" },
  OIVOVEIO: { key: 25, letter: "O IVO VEIO", sound: "/audios/o-ivo-veio.mp3" },
  AAVEVIVA: { key: 26, letter: "A AVE VIVA", sound: "/audios/a-ave-viva.mp3" },
  EVAVIUAUVA: { key: 27, letter: "EVA VIU A UVA", sound: "/audios/eva-viu-a-uva.mp3" },
  IVOEAVE: { key: 28, letter: "IVO E A AVE", sound: "/audios/ivo-e-a-ave.mp3" },
  EVAEOVO: { key: 30, letter: "EVA E O OVO", sound: "/audios/eva-e-o-ovo.mp3" },
  OIVOVIUOOVO: { key: 29, letter: "IVO VIU O OVO", sound: "/audios/ivo-viu-o-ovo.mp3" },
  AAVEEVAVA: { key: 31, letter: "A AVE E VAVA", sound: "/audios/a-ave-e-vava.mp3" },
  VIVIVIUAAVE: { key: 32, letter: "VIVI VIU A AVE", sound: "/audios/vivi-viu-a-ave.mp3" },
};

const {
  VA,
  FA,
  VI,
  LI,
  VU,
  FU,
  VE,
  LE,
  VO,
  LO,
  UVA,
  OVO,
  EVA,
  IVO,
  VOA,
  VIU,
  VAI,
  AVE,
  VIVO,
  VAVA,
  VIVI,
  VIVA,
  VEIO,
  AAVEVOA,
  OIVOVEIO,
  AAVEVIVA,
  EVAVIUAUVA,
  IVOEAVE,
  EVAEOVO,
  OIVOVIUOOVO,
  AAVEEVAVA,
  VIVIVIUAAVE,
} = letters;

const phase1 = [
  [VA, FA],
  [VI, LI],
  [VU, FU],
  [VE, LE],
  [VO, LO],
];

const phase2 = [
  [VA, VI],
  [VE, VO],
  [VI, VU],
  [VO, VE],
  [VU, VA],
];

const phase3 = [[UVA], [OVO], [EVA], [IVO]];

const phase4 = [[VOA], [VIU], [VAI], [AVE]];

const phase5 = [[VAVA], [VIVO], [VIVI], [VIVA], [VEIO]];

const phase6 = [[AAVEVOA], [OIVOVEIO], [AAVEVIVA]];

const phase7 = [[EVAVIUAUVA], [IVOEAVE], [EVAEOVO]];

const phase8 = [[OIVOVIUOOVO], [AAVEEVAVA], [VIVIVIUAAVE]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["AVE", "A", "VOA"],
    ["IVO", "VEIO", "O"],
    ["A", "AVE", "VIVA"],
  ],
  [
    ["UVA", "EVA", "VIU", "A"],
    ["E", "IVO", "A", "AVE"],
    ["EVA", "OVO", "O", "E"],
  ],
  [
    ["IVO", "O", "VIU", "OVO"],
    ["A", "VAVA", "AVE", "E"],
    ["VIVI", "A", "AVE", "VIU"],
  ],
];
