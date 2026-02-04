export const letters = {
  JA: { key: 1, letter: "JA", sound: "/audios/ja.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  JI: { key: 3, letter: "JI", sound: "/audios/ji.mp3" },
  MI: { key: 4, letter: "MI", sound: "/audios/mi.mp3" },
  JU: { key: 5, letter: "JU", sound: "/audios/ju.mp3" },
  FU: { key: 6, letter: "FU", sound: "/audios/fu.mp3" },
  JE: { key: 7, letter: "JE", sound: "/audios/je.mp3" },
  FE: { key: 8, letter: "FE", sound: "/audios/fe.mp3" },
  JO: { key: 9, letter: "JO", sound: "/audios/jo.mp3" },
  NO: { key: 10, letter: "NO", sound: "/audios/no.mp3" },
  NOJO: { key: 11, letter: "NOJO", sound: "/audios/nojo.mp3" },
  JOIA: { key: 12, letter: "JOIA", sound: "/audios/joia.mp3" },
  LOJA: { key: 13, letter: "LOJA", sound: "/audios/loja.mp3" },
  NAJA: { key: 14, letter: "NAJA", sound: "/audios/naja.mp3" },
  JUJU: { key: 15, letter: "JUJU", sound: "/audios/juju.mp3" },
  MIOJO: { key: 16, letter: "MIOJO", sound: "/audios/miojo.mp3" },
  JANELA: { key: 17, letter: "JANELA", sound: "/audios/janela.mp3" },
  JULIA: { key: 18, letter: "JULIA", sound: "/audios/julia.mp3" },
  FUJA: { key: 19, letter: "FUJA", sound: "/audios/fuja.mp3" },
  JUNINA: { key: 20, letter: "JUNINA", sound: "/audios/junina.mp3" },
  JOANA: { key: 21, letter: "JOANA", sound: "/audios/joana.mp3" },
  JAVALI: { key: 22, letter: "JAVALI", sound: "/audios/javali.mp3" },
  VIAJA: { key: 23, letter: "VIAJA", sound: "/audios/viaja.mp3" },
  VIAJOU: { key: 24, letter: "VIAJOU", sound: "/audios/viajou.mp3" },
  JILO: { key: 25, letter: "JILO", sound: "/audios/jilo.mp3" },
  JOANAVIAJOU: { key: 26, letter: "JOANA VIAJOU", sound: "/audios/joana-viajou.mp3" },
  OJAVALIFOFO: { key: 27, letter: "O JAVALI FOFO", sound: "/audios/o-javali-fofo.mp3" },
  ALOJAJUNINA: { key: 28, letter: "A LOJA JUNINA", sound: "/audios/a-loja-junina.mp3" },
  OMENINONAJANELA: { key: 29, letter: "O MENINO NA JANELA", sound: "/audios/o-menino-na-janela.mp3" },
  ANAJAFEIA: { key: 30, letter: "A NAJA FEIA", sound: "/audios/a-naja-feia.mp3" },
  FIFIVIAJANALUA: { key: 31, letter: "FIFI VIAJA NA LUA", sound: "/audios/fifi-viaja-na-lua.mp3" },
  IVOVIAJOUNANAVE: { key: 32, letter: "IVO VIAJOU NA NAVE", sound: "/audios/ivo-viajou-na-nave.mp3" },
  OMENINONALOJA: { key: 33, letter: "O MENINO NA LOJA", sound: "/audios/o-menino-na-loja.mp3" },
  JUJUEAAVE: { key: 34, letter: "JUJU E A AVE", sound: "/audios/juju-e-a-ave.mp3" },
};

const {
  JA,
  VA,
  JI,
  MI,
  JU,
  FU,
  JE,
  FE,
  JO,
  NO,
  NOJO,
  JOIA,
  LOJA,
  NAJA,
  JUJU,
  MIOJO,
  JANELA,
  JULIA,
  FUJA,
  JUNINA,
  JOANA,
  JAVALI,
  VIAJA,
  VIAJOU,
  JILO,
  JOANAVIAJOU,
  OJAVALIFOFO,
  ALOJAJUNINA,
  OMENINONAJANELA,
  ANAJAFEIA,
  FIFIVIAJANALUA,
  IVOVIAJOUNANAVE,
  OMENINONALOJA,
  JUJUEAAVE,
} = letters;

const phase1 = [
  [JA, VA, JA],
  [MI, JI, JI],
  [JU, FU, JU],
  [FE, JE, JE],
  [JO, NO, JO],
];

const phase2 = [
  [JI, JA, JA],
  [JE, JO, JO],
  [JU, JI, JI],
  [JO, JE, JE],
  [JA, JU, JU],
];

const phase3 = [[JOIA], [NOJO], [LOJA], [JUJU], [NAJA]];

const phase4 = [[JANELA], [MIOJO], [FUJA], [JULIA], [JUNINA]];

const phase5 = [[JAVALI], [JOANA], [VIAJOU], [JILO], [VIAJA]];

const phase6 = [[JOANAVIAJOU], [OJAVALIFOFO], [ALOJAJUNINA]];

const phase7 = [[OMENINONAJANELA], [ANAJAFEIA], [FIFIVIAJANALUA]];

const phase8 = [[IVOVIAJOUNANAVE], [OMENINONALOJA], [JUJUEAAVE]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["VIAJOU", "JOANA"],
    ["FOFO", "JAVALI", "O"],
    ["JUNINA", "LOJA", "A"],
  ],
  [
    ["JANELA", "NA", "MENINO", "O"],
    ["FEIA", "NAJA", "A"],
    ["LUA", "NA", "VIAJA", "FIFI"],
  ],
  [
    ["NAVE", "NA", "VIAJOU", "IVO"],
    ["LOJA", "NA", "MENINO", "O"],
    ["AVE", "A", "E", "JUJU"],
  ],
];
