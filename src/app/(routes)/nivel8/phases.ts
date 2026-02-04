export const letters = {
  PA: { key: 1, letter: "PA", sound: "/audios/pa.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  PI: { key: 3, letter: "PI", sound: "/audios/pi.mp3" },
  MI: { key: 4, letter: "MI", sound: "/audios/mi.mp3" },
  PU: { key: 5, letter: "PU", sound: "/audios/pu.mp3" },
  FU: { key: 6, letter: "FU", sound: "/audios/fu.mp3" },
  PE: { key: 7, letter: "PE", sound: "/audios/pe.mp3" },
  JE: { key: 8, letter: "JE", sound: "/audios/je.mp3" },
  PO: { key: 9, letter: "PO", sound: "/audios/po.mp3" },
  LO: { key: 10, letter: "LO", sound: "/audios/lo.mp3" },
  PAI: { key: 11, letter: "PAI", sound: "/audios/pai.mp3" },
  PIA: { key: 12, letter: "PIA", sound: "/audios/pia.mp3" },
  PAPA: { key: 13, letter: "PAPA", sound: "/audios/papa.mp3" },
  JIPE: { key: 14, letter: "JIPE", sound: "/audios/jipe.mp3" },
  PELO: { key: 15, letter: "PELO", sound: "/audios/pelo.mp3" },
  PANO: { key: 16, letter: "PANO", sound: "/audios/pano.mp3" },
  PIPA: { key: 17, letter: "PIPA", sound: "/audios/pipa.mp3" },
  POVO: { key: 18, letter: "POVO", sound: "/audios/povo.mp3" },
  PEPINO: { key: 19, letter: "PEPINO", sound: "/audios/pepino.mp3" },
  MAPA: { key: 20, letter: "MAPA", sound: "/audios/mapa.mp3" },
  PANELA: { key: 21, letter: "PANELA", sound: "/audios/panela.mp3" },
  PENA: { key: 22, letter: "PENA", sound: "/audios/pena.mp3" },
  PAPAI: { key: 23, letter: "PAPAI", sound: "/audios/papai.mp3" },
  PELE: { key: 24, letter: "PELE", sound: "/audios/pele.mp3" },
  LAPELA: { key: 25, letter: "LAPELA", sound: "/audios/lapela.mp3" },
  MEUPAI: { key: 26, letter: "MEU PAI", sound: "/audios/meu-pai.mp3" },
  OPANOFEIO: { key: 27, letter: "O PANO FEIO", sound: "/audios/o-pano-feio.mp3" },
  IVOEAPIPA: { key: 28, letter: "IVO E A PIPA", sound: "/audios/ivo-e-a-pipa.mp3" },
  APANELANALOJA: { key: 29, letter: "A PANELA NA LOJA", sound: "/audios/a-panela-na-loja.mp3" },
  MEUJIPEEEU: { key: 30, letter: "MEU JIPE E EU", sound: "/audios/meu-jipe-e-eu.mp3" },
  OMIOJONAPANELA: { key: 31, letter: "O MIOJO NA PANELA", sound: "/audios/o-miojo-na-panela.mp3" },
  APENANAAVE: { key: 32, letter: "A PENA NA AVE", sound: "/audios/a-pena-na-ave.mp3" },
  EVAPULOUNALAMA: { key: 33, letter: "EVA PULOU NA LAMA", sound: "/audios/eva-pulou-na-lama.mp3" },
  OPEPINONAPIA: { key: 34, letter: "O PEPINO NA PIA", sound: "/audios/o-pepino-na-pia.mp3" },
};

const {
  PA,
  VA,
  PI,
  MI,
  PU,
  FU,
  PE,
  JE,
  PO,
  LO,
  PAI,
  PIA,
  PAPA,
  JIPE,
  PELO,
  PANO,
  PIPA,
  POVO,
  PEPINO,
  MAPA,
  PANELA,
  PENA,
  PAPAI,
  PELE,
  LAPELA,
  MEUPAI,
  OPANOFEIO,
  IVOEAPIPA,
  APANELANALOJA,
  MEUJIPEEEU,
  OMIOJONAPANELA,
  APENANAAVE,
  EVAPULOUNALAMA,
  OPEPINONAPIA,
} = letters;

const phase1 = [
  [PA, VA, PA],
  [MI, PI, PI],
  [PU, FU, PU],
  [JE, PE, PE],
  [PO, LO, PO],
];

const phase2 = [
  [PI, PA, PA],
  [PE, PO, PO],
  [PU, PI, PI],
  [PO, PE, PE],
  [PA, PU, PU],
];

const phase3 = [[PAI], [PIA], [PAPA], [JIPE], [PELO]];

const phase4 = [[PIPA], [PANO], [POVO], [MAPA], [PEPINO]];

const phase5 = [[PANELA], [PENA], [PAPAI], [PELE], [LAPELA]];

const phase6 = [[MEUPAI], [OPANOFEIO], [IVOEAPIPA]];

const phase7 = [[APANELANALOJA], [MEUJIPEEEU], [OMIOJONAPANELA]];

const phase8 = [[APENANAAVE], [EVAPULOUNALAMA], [OPEPINONAPIA]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["PAI", "MEU"],
    ["FEIO", "PANO", "O"],
    ["PIPA", "A", "E", "IVO"],
  ],
  [
    ["LOJA", "NA", "PANELA", "A"],
    ["EU", "E", "JIPE", "MEU"],
    ["PANELA", "NA", "MIOJO", "O"],
  ],
  [
    ["AVE", "NA", "PENA", "A"],
    ["LAMA", "NA", "PULOU", "EVA"],
    ["PIA", "NA", "PEPINO", "O"],
  ],
];
