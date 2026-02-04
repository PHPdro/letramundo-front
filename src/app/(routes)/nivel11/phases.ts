export const letters = {
  DA: { key: 1, letter: "DA", sound: "/audios/da.mp3" },
  PA: { key: 2, letter: "PA", sound: "/audios/pa.mp3" },
  DI: { key: 3, letter: "DI", sound: "/audios/di.mp3" },
  LI: { key: 4, letter: "LI", sound: "/audios/li.mp3" },
  DU: { key: 5, letter: "DU", sound: "/audios/du.mp3" },
  FU: { key: 6, letter: "FU", sound: "/audios/fu.mp3" },
  DE: { key: 7, letter: "DE", sound: "/audios/de.mp3" },
  VE: { key: 8, letter: "VE", sound: "/audios/ve.mp3" },
  DO: { key: 9, letter: "DO", sound: "/audios/do.mp3" },
  BO: { key: 10, letter: "BO", sound: "/audios/bo.mp3" },
  DIA: { key: 11, letter: "DIA", sound: "/audios/dia.mp3" },
  DEU: { key: 12, letter: "DEU", sound: "/audios/deu.mp3" },
  DEDO: { key: 13, letter: "DEDO", sound: "/audios/dedo.mp3" },
  BODE: { key: 14, letter: "BODE", sound: "/audios/bode.mp3" },
  DELE: { key: 15, letter: "DELE", sound: "/audios/dele.mp3" },
  DONA: { key: 16, letter: "DONA", sound: "/audios/dona.mp3" },
  VIDA: { key: 17, letter: "VIDA", sound: "/audios/vida.mp3" },
  DADO: { key: 18, letter: "DADO", sound: "/audios/dado.mp3" },
  DOIDO: { key: 19, letter: "DOIDO", sound: "/audios/doido.mp3" },
  DANONE: { key: 20, letter: "DANONE", sound: "/audios/danone.mp3" },
  DINO: { key: 21, letter: "DINO", sound: "/audios/dino.mp3" },
  TOMADA: { key: 22, letter: "TOMADA", sound: "/audios/tomada.mp3" },
  MOEDA: { key: 23, letter: "MOEDA", sound: "/audios/moeda.mp3" },
  DIANA: { key: 24, letter: "DIANA", sound: "/audios/diana.mp3" },
  DIANATOMOUODADO: { key: 25, letter: "DIANA TOMOU O DADO", sound: "/audios/diana-tomou-o-dado.mp3" },
  AMOTODOMEUPAI: { key: 26, letter: "A MOTO DO MEU PAI", sound: "/audios/a-moto-do-meu-pai.mp3" },
  APATADOLOBO: { key: 27, letter: "A PATA DO LOBO", sound: "/audios/a-pata-do-lobo.mp3" },
  AMOEDADOPAPAI: { key: 28, letter: "A MOEDA DO PAPAI", sound: "/audios/a-moeda-do-papai.mp3" },
  ADONADOTATU: { key: 29, letter: "A DONA DO TATU", sound: "/audios/a-dona-do-tatu.mp3" },
  ODEDODODINO: { key: 30, letter: "O DEDO DO DINO", sound: "/audios/o-dedo-do-dino.mp3" },
  DIANAAMABOLODEBANANA: { key: 31, letter: "DIANA AMA BOLO DE BANANA", sound: "/audios/diana-ama-bolo-de-banana.mp3" },
  EUTOMODANONE: { key: 32, letter: "EU TOMO DANONE", sound: "/audios/eu-tomo-danone.mp3" },
  DUDADEUOBOLO: { key: 33, letter: "DUDA DEU O BOLO", sound: "/audios/duda-deu-o-bolo.mp3" },
};

const {
  DA,
  PA,
  DI,
  LI,
  DU,
  FU,
  DE,
  VE,
  DO,
  BO,
  DIA,
  DEU,
  DEDO,
  BODE,
  DELE,
  DONA,
  VIDA,
  DADO,
  DOIDO,
  DANONE,
  DINO,
  TOMADA,
  MOEDA,
  DIANA,
  DIANATOMOUODADO,
  AMOTODOMEUPAI,
  APATADOLOBO,
  AMOEDADOPAPAI,
  ADONADOTATU,
  ODEDODODINO,
  DIANAAMABOLODEBANANA,
  EUTOMODANONE,
  DUDADEUOBOLO,
} = letters;

const phase1 = [
  [DA, PA, DA],
  [LI, DI, DI],
  [DU, FU, DU],
  [VE, DE, DE],
  [DO, BO, DO],
];

const phase2 = [
  [DI, DA, DA],
  [DE, DO, DO],
  [DU, DI, DI],
  [DO, DE, DE],
  [DA, DU, DU],
];

const phase3 = [[DIA], [DEU], [DEDO], [BODE], [DELE]];

const phase4 = [[DONA], [VIDA], [DADO], [DOIDO], [DANONE]];

const phase5 = [[DINO], [TOMADA], [MOEDA], [DIANA], [DADO]];

const phase6 = [[DIANATOMOUODADO], [AMOTODOMEUPAI], [APATADOLOBO]];

const phase7 = [[AMOEDADOPAPAI], [ADONADOTATU], [ODEDODODINO]];

const phase8 = [[DIANAAMABOLODEBANANA], [EUTOMODANONE], [DUDADEUOBOLO]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["DADO", "O", "TOMOU", "DIANA"],
    ["PAI", "MEU", "DO", "MOTO", "A"],
    ["LOBO", "DO", "PATA", "A"],
  ],
  [
    ["PAPAI", "DO", "MOEDA", "A"],
    ["TATU", "DO", "DONA", "A"],
    ["DINO", "DO", "DEDO", "O"],
  ],
  [
    ["BANANA", "DE", "BOLO", "AMA", "DIANA"],
    ["DANONE", "TOMO", "EU"],
    ["BOLO", "O", "DEU", "DUDA"],
  ],
];
