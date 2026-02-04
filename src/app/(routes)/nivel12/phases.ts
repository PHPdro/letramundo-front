export const letters = {
  CA: { key: 1, letter: "CA", sound: "/audios/ca.mp3" },
  DA: { key: 2, letter: "DA", sound: "/audios/da.mp3" },
  CU: { key: 3, letter: "CU", sound: "/audios/cu.mp3" },
  PU: { key: 4, letter: "PU", sound: "/audios/pu.mp3" },
  CO: { key: 5, letter: "CO", sound: "/audios/co.mp3" },
  BO: { key: 6, letter: "BO", sound: "/audios/bo.mp3" },
  CI: { key: 7, letter: "CI", sound: "/audios/ci.mp3" },
  CE: { key: 8, letter: "CE", sound: "/audios/ce.mp3" },
  CUBO: { key: 9, letter: "CUBO", sound: "/audios/cubo.mp3" },
  BECO: { key: 10, letter: "BECO", sound: "/audios/beco.mp3" },
  CUECA: { key: 11, letter: "CUECA", sound: "/audios/cueca.mp3" },
  MICO: { key: 12, letter: "MICO", sound: "/audios/mico.mp3" },
  CANO: { key: 13, letter: "CANO", sound: "/audios/cano.mp3" },
  CALO: { key: 14, letter: "CALO", sound: "/audios/calo.mp3" },
  BICUDO: { key: 15, letter: "BICUDO", sound: "/audios/bicudo.mp3" },
  CAJU: { key: 16, letter: "CAJU", sound: "/audios/caju.mp3" },
  COCADA: { key: 17, letter: "COCADA", sound: "/audios/cocada.mp3" },
  CAFE: { key: 18, letter: "CAFE", sound: "/audios/cafe.mp3" },
  MACACO: { key: 19, letter: "MACACO", sound: "/audios/macaco.mp3" },
  CANELA: { key: 20, letter: "CANELA", sound: "/audios/canela.mp3" },
  TUCANO: { key: 21, letter: "TUCANO", sound: "/audios/tucano.mp3" },
  FOFOCA: { key: 22, letter: "FOFOCA", sound: "/audios/fofoca.mp3" },
  CANUDO: { key: 23, letter: "CANUDO", sound: "/audios/canudo.mp3" },
  OMACACOPULA: { key: 24, letter: "O MACACO PULA", sound: "/audios/o-macaco-pula.mp3" },
  MEUPAIAMACAFE: { key: 25, letter: "MEU PAI AMA CAFE", sound: "/audios/meu-pai-ama-cafe.mp3" },
  EUVIOTUCANOBICUDO: { key: 26, letter: "EU VI O TUCANO BICUDO", sound: "/audios/eu-vi-o-tucano-bicudo.mp3" },
  OCALODOMEUPAIDOEU: { key: 27, letter: "O CALO DO MEU PAI DOEU", sound: "/audios/o-calo-do-meu-pai-doeu.mp3" },
  ACUECADOMENINOCAIU: { key: 28, letter: "A CUECA DO MENINO CAIU", sound: "/audios/a-cueca-do-menino-caiu.mp3" },
  AMOEDADOMEUPAI: { key: 29, letter: "A MOEDA DO MEU PAI CAIU", sound: "/audios/a-moeda-do-meu-pai-caiu.mp3" },
  OMENINOFOFOCOU: { key: 30, letter: "O MENINO FOFOCOU", sound: "/audios/o-menino-fofocou.mp3" },
  EUCOMICOCADA: { key: 31, letter: "EU COMI COCADA", sound: "/audios/eu-comi-cocada.mp3" },
  OCANUDOCAIUDOCOPODAMENINA: { key: 32, letter: "O CANUDO CAIU DO COPO DA MENINA", sound: "/audios/o-canudo-caiu-do-copo-da-menina.mp3" },
};

const {
  CA,
  DA,
  CU,
  PU,
  CO,
  BO,
  CI,
  CE,
  CUBO,
  BECO,
  CUECA,
  MICO,
  CANO,
  CALO,
  BICUDO,
  CAJU,
  COCADA,
  CAFE,
  MACACO,
  CANELA,
  TUCANO,
  FOFOCA,
  CANUDO,
  OMACACOPULA,
  MEUPAIAMACAFE,
  EUVIOTUCANOBICUDO,
  OCALODOMEUPAIDOEU,
  ACUECADOMENINOCAIU,
  AMOEDADOMEUPAI,
  OMENINOFOFOCOU,
  EUCOMICOCADA,
  OCANUDOCAIUDOCOPODAMENINA,
} = letters;

const phase1 = [
  [CA, DA, CA],
  [CU, PU, CU],
  [CO, BO, CO],
];

const phase2 = [
  [CI, CA, CA],
  [CO, CE, CO],
  [CA, CU, CU],
];

const phase3 = [[CUBO], [BECO], [CUECA], [MICO], [CANO]];

const phase4 = [[CALO], [BICUDO], [CAJU], [COCADA], [CAFE]];

const phase5 = [[MACACO], [CANELA], [TUCANO], [FOFOCA], [CANUDO]];

const phase6 = [[OMACACOPULA], [MEUPAIAMACAFE], [EUVIOTUCANOBICUDO]];

const phase7 = [[OCALODOMEUPAIDOEU], [ACUECADOMENINOCAIU], [AMOEDADOMEUPAI]];

const phase8 = [[OMENINOFOFOCOU], [EUCOMICOCADA], [OCANUDOCAIUDOCOPODAMENINA]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["PULA", "MACACO", "O"],
    ["CAFE", "AMA", "PAI", "MEU"],
    ["BICUDO", "TUCANO", "O", "VI", "EU"],
  ],
  [
    ["DOEU", "PAI", "MEU", "DO", "CALO", "O"],
    ["CAIU", "MENINO", "DO", "CUECA", "A"],
    ["CAIU", "PAI", "MEU", "DO", "MOEDA", "A"],
  ],
  [
    ["FOFOCOU", "MENINO", "O"],
    ["COCADA", "COMI", "EU"],
    ["MENINA", "DA", "COPO", "DO", "CAIU", "CANUDO", "O"],
  ],
];
