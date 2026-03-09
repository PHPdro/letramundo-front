export const letters = {
  TA: { key: 1, letter: "TA", sound: "/audios/ta.mp3" },
  PA: { key: 2, letter: "PA", sound: "/audios/pa.mp3" },
  TI: { key: 3, letter: "TI", sound: "/audios/ti.mp3" },
  NI: { key: 4, letter: "NI", sound: "/audios/ni.mp3" },
  TU: { key: 5, letter: "TU", sound: "/audios/tu.mp3" },
  LU: { key: 6, letter: "LU", sound: "/audios/lu.mp3" },
  TE: { key: 7, letter: "TE", sound: "/audios/te.mp3" },
  JE: { key: 8, letter: "JE", sound: "/audios/je.mp3" },
  TO: { key: 9, letter: "TO", sound: "/audios/to.mp3" },
  BO: { key: 10, letter: "BO", sound: "/audios/bo.mp3" },
  TUA: { key: 11, letter: "TUA", sound: "/audios/tua.mp3" },
  TATU: { key: 12, letter: "TATU", sound: "/audios/tatu.mp3" },
  BOTE: { key: 13, letter: "BOTE", sound: "/audios/bote.mp3" },
  APITO: { key: 14, letter: "APITO", sound: "/audios/apito.mp3" },
  TIME: { key: 15, letter: "TIME", sound: "/audios/time.mp3" },
  BETO: { key: 16, letter: "BETO", sound: "/audios/beto.mp3" },
  BATATA: { key: 17, letter: "BATATA", sound: "/audios/batata.mp3" },
  NATA: { key: 18, letter: "NATA", sound: "/audios/nata.mp3" },
  MITO: { key: 19, letter: "MITO", sound: "/audios/mito.mp3" },
  MOTO: { key: 20, letter: "MOTO", sound: "/audios/moto.mp3" },
  TIJOLO: { key: 21, letter: "TIJOLO", sound: "/audios/tijolo.mp3" },
  TOMATE: { key: 22, letter: "TOMATE", sound: "/audios/tomate.mp3" },
  BEBETO: { key: 23, letter: "BEBETO", sound: "/audios/bebeto.mp3" },
  TEIA: { key: 24, letter: "TEIA", sound: "/audios/teia.mp3" },
  TOMA: { key: 25, letter: "TOMA", sound: "/audios/toma.mp3" },
  BETOEAMOTO: { key: 26, letter: "BETO E A MOTO", sound: "/audios/beto-e-a-moto.mp3" },
  BEBETONOTIME: { key: 27, letter: "BEBETO NO TIME", sound: "/audios/bebeto-no-time.mp3" },
  OTATUNOTIJOLO: { key: 28, letter: "O TATU NO TIJOLO", sound: "/audios/o-tatu-no-tijolo.mp3" },
  ABATATAFEIA: { key: 29, letter: "A BATATA FEIA", sound: "/audios/a-batata-feia.mp3" },
  AFIFINOBOTE: { key: 30, letter: "A FIFI NO BOTE", sound: "/audios/a-fifi-no-bote.mp3" },
  MEUPAIEOOAPITO: { key: 31, letter: "MEU PAI E O APITO", sound: "/audios/meu-pai-e-o-apito.mp3" },
  MEUPAIAMATOMATE: { key: 32, letter: "MEU PAI AMA TOMATE", sound: "/audios/meu-pai-ama-tomate.mp3" },
  AEVANAAMOTO: { key: 33, letter: "A EVA NA MOTO", sound: "/audios/a-eva-na-moto.mp3" },
  ATUAMOTOBONITA: { key: 34, letter: "A TUA MOTO BONITA", sound: "/audios/a-tua-moto-bonita.mp3" },
};

const {
  TA,
  PA,
  TI,
  NI,
  TU,
  LU,
  TE,
  JE,
  TO,
  BO,
  TUA,
  TATU,
  BOTE,
  APITO,
  TIME,
  BETO,
  BATATA,
  NATA,
  MITO,
  MOTO,
  TIJOLO,
  TOMATE,
  BEBETO,
  TEIA,
  TOMA,
  BETOEAMOTO,
  BEBETONOTIME,
  OTATUNOTIJOLO,
  ABATATAFEIA,
  AFIFINOBOTE,
  MEUPAIEOOAPITO,
  MEUPAIAMATOMATE,
  AEVANAAMOTO,
  ATUAMOTOBONITA,
} = letters;

const phase1 = [
  [TA, PA, TA],
  [NI, TI, TI],
  [TU, LU, TU],
  [JE, TE, TE],
  [TO, BO, TO],
];

const phase2 = [
  [TI, TA, TA],
  [TE, TO, TO],
  [TU, TI, TI],
  [TO, TE, TE],
  [TA, TU, TU],
];

const phase3 = [[TUA], [TATU], [BOTE], [APITO], [TIME]];

const phase4 = [[BETO], [BATATA], [NATA], [MITO], [MOTO]];

const phase5 = [[TIJOLO], [TOMATE], [BEBETO], [TEIA], [TOMA]];

const phase6 = [[BETOEAMOTO], [BEBETONOTIME], [OTATUNOTIJOLO]];

const phase7 = [[ABATATAFEIA], [AFIFINOBOTE], [MEUPAIEOOAPITO]];

const phase8 = [[MEUPAIAMATOMATE], [AEVANAAMOTO], [ATUAMOTOBONITA]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["A", "E", "MOTO", "BETO"],
    ["NO", "BEBETO", "TIME"],
    ["TATU", "NO", "O", "TIJOLO"],
  ],
  [
    ["BATATA", "A", "FEIA"],
    ["NO", "FIFI", "A", "BOTE"],
    ["E", "PAI", "APITO", "O", "MEU"],
  ],
  [
    ["AMA", "PAI", "TOMATE", "MEU"],
    ["NA", "EVA", "A", "MOTO"],
    ["MOTO", "TUA", "A", "BONITA"],
  ],
];
