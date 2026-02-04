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
  EUAMOBANANA: { key: 26, letter: "EU AMO BANANA", sound: "/audios/eu-amo-banana.mp3" },
  OLOBOMAU: { key: 27, letter: "O LOBO MAU", sound: "/audios/o-lobo-mau.mp3" },
  AMENINANABOIA: { key: 28, letter: "A MENINA NA BOIA", sound: "/audios/a-menina-na-boia.mp3" },
  AJUJUBANOBOLO: { key: 29, letter: "A JUJUBA NO BOLO", sound: "/audios/a-jujuba-no-bolo.mp3" },
  OBELOMENINONAJANELA: { key: 30, letter: "O BELO MENINO NA JANELA", sound: "/audios/o-belo-menino-na-janela.mp3" },
  MEUPAIEOBO: { key: 31, letter: "MEU PAI E O BOI", sound: "/audios/meu-pai-e-o-boi.mp3" },
  MEUPAIAMAJUJUBA: { key: 32, letter: "MEU PAI AMA JUJUBA", sound: "/audios/meu-pai-ama-jujuba.mp3" },
  OBIFENAPIA: { key: 33, letter: "O BIFE NA PIA", sound: "/audios/o-bife-na-pia.mp3" },
  AJIBOIAEOLOBO: { key: 34, letter: "A JIBOIA E O LOBO", sound: "/audios/a-jiboia-e-o-lobo.mp3" },
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
  EUAMOBANANA,
  OLOBOMAU,
  AMENINANABOIA,
  AJUJUBANOBOLO,
  OBELOMENINONAJANELA,
  MEUPAIEOBO,
  MEUPAIAMAJUJUBA,
  OBIFENAPIA,
  AJIBOIAEOLOBO,
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

const phase6 = [[EUAMOBANANA], [OLOBOMAU], [AMENINANABOIA]];

const phase7 = [[AJUJUBANOBOLO], [OBELOMENINONAJANELA], [MEUPAIEOBO]];

const phase8 = [[MEUPAIAMAJUJUBA], [OBIFENAPIA], [AJIBOIAEOLOBO]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["BANANA", "AMO", "EU"],
    ["MAU", "LOBO", "O"],
    ["BOIA", "NA", "MENINA", "A"],
  ],
  [
    ["BOLO", "NO", "JUJUBA", "A"],
    ["JANELA", "NA", "MENINO", "BELO", "O"],
    ["BOI", "O", "E", "PAI", "MEU"],
  ],
  [
    ["JUJUBA", "AMA", "PAI", "MEU"],
    ["PIA", "NA", "BIFE", "O"],
    ["LOBO", "O", "E", "JIBOIA", "A"],
  ],
];
