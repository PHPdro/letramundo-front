export const letters = {
  BA: { key: 1, letter: "BA", sound: "/audios/ba.mp3" },
  PA: { key: 2, letter: "PA", sound: "/audios/pa.mp3" },
  BI: { key: 3, letter: "BI", sound: "/audios/bi.mp3" },
  MI: { key: 4, letter: "MI", sound: "/audios/mi.mp3" },
  BU: { key: 5, letter: "BU", sound: "/audios/bu.mp3" },
  NU: { key: 6, letter: "NU", sound: "/audios/nu.mp3" },
  BE: { key: 7, letter: "BE", sound: "/audios/be.mp3" },
  JE: { key: 8, letter: "JE", sound: "/audios/je.mp3" },
  BO: { key: 9, letter: "BO", sound: "/audios/bo.mp3" },
  LO: { key: 10, letter: "LO", sound: "/audios/lo.mp3" },
  BOI: { key: 11, letter: "BOI", sound: "/audios/boi.mp3" },
  BAFO: { key: 12, letter: "BAFO", sound: "/audios/bafo.mp3" },
  JUBA: { key: 13, letter: "JUBA", sound: "/audios/juba.mp3" },
  BOIA: { key: 14, letter: "BOIA", sound: "/audios/boia.mp3" },
  BALA: { key: 15, letter: "BALA", sound: "/audios/bala.mp3" },
  JUJUBA: { key: 16, letter: "JUJUBA", sound: "/audios/jujuba.mp3" },
  BEBE: { key: 17, letter: "BEBE", sound: "/audios/bebe.mp3" },
  BOLA: { key: 18, letter: "BOLA", sound: "/audios/bola.mp3" },
  FUBA: { key: 19, letter: "FUBA", sound: "/audios/fuba.mp3" },
  BOLO: { key: 20, letter: "BOLO", sound: "/audios/bolo.mp3" },
  JIBOIA: { key: 21, letter: "JIBOIA", sound: "/audios/jiboia.mp3" },
  BANANA: { key: 22, letter: "BANANA", sound: "/audios/banana.mp3" },
  LOBO: { key: 23, letter: "LOBO", sound: "/audios/lobo.mp3" },
  BELO: { key: 24, letter: "BELO", sound: "/audios/belo.mp3" },
  BIFE: { key: 25, letter: "BIFE", sound: "/audios/bife.mp3" },
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
  BA,
  PA,
  BI,
  MI,
  BU,
  NU,
  BE,
  JE,
  BO,
  LO,
  BOI,
  BAFO,
  JUBA,
  BOIA,
  BALA,
  JUJUBA,
  BEBE,
  BOLA,
  FUBA,
  BOLO,
  JIBOIA,
  BANANA,
  LOBO,
  BELO,
  BIFE,
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
  [BA, PA, BA],
  [MI, BI, BI],
  [BU, NU, BU],
  [JE, BE, BE],
  [BO, LO, BO],
];

const phase2 = [
  [BI, BA, BA],
  [BE, BO, BO],
  [BU, BI, BI],
  [BO, BE, BE],
  [BA, BU, BU],
];

const phase3 = [[BOI], [BAFO], [JUBA], [BOIA], [BALA]];

const phase4 = [[JUJUBA], [BEBE], [BOLA], [FUBA], [BOLO]];

const phase5 = [[JIBOIA], [BANANA], [LOBO], [BELO], [BIFE]];

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
