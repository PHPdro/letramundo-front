//o meu nome, meu fone novo, a novela nova,
export const letters = {
  NA: { key: 1, letter: "NA", sound: "/audios/na.mp3" },
  VA: { key: 2, letter: "VA", sound: "/audios/va.mp3" },
  NI: { key: 3, letter: "NI", sound: "/audios/ni.mp3" },
  MI: { key: 4, letter: "MI", sound: "/audios/mi.mp3" },
  NU: { key: 5, letter: "NU", sound: "/audios/nu.mp3" },
  FU: { key: 6, letter: "FU", sound: "/audios/fu.mp3" },
  NE: { key: 7, letter: "NE", sound: "/audios/ne.mp3" },
  JE: { key: 8, letter: "JE", sound: "/audios/je.mp3" },
  NO: { key: 9, letter: "NO", sound: "/audios/no.mp3" },
  MO: { key: 10, letter: "MO", sound: "/audios/mo.mp3" },
  NOVO: { key: 11, letter: "NOVO", sound: "/audios/novo.mp3" },
  NOME: { key: 12, letter: "NOME", sound: "/audios/nome.mp3" },
  NEVE: { key: 13, letter: "NEVE", sound: "/audios/neve.mp3" },
  MANO: { key: 14, letter: "MANO", sound: "/audios/mano.mp3" },
  FONE: { key: 15, letter: "FONE", sound: "/audios/fone.mp3" },
  NOVA: { key: 16, letter: "NOVA", sound: "/audios/nova.mp3" },
  MENU: { key: 17, letter: "MENU", sound: "/audios/menu.mp3" },
  NAVE: { key: 18, letter: "NAVE", sound: "/audios/nave.mp3" },
  MENINO: { key: 19, letter: "MENINO", sound: "/audios/menino.mp3" },
  MENINA: { key: 20, letter: "MENINA", sound: "/audios/menina.mp3" },
  NELE: { key: 21, letter: "NELE", sound: "/audios/nele.mp3" },
  NOVELA: { key: 22, letter: "NOVELA", sound: "/audios/novela.mp3" },
  FINA: { key: 23, letter: "FINA", sound: "/audios/fina.mp3" },
  FIONA: { key: 24, letter: "FIONA", sound: "/audios/fiona.mp3" },
  NEVOU: { key: 25, letter: "NEVOU", sound: "/audios/nevou.mp3" },
  OMEUNOME: { key: 26, letter: "O MEU NOME", sound: "/audios/o-meu-nome.mp3" },
  MEUFONENOVO: { key: 27, letter: "MEU FONE NOVO", sound: "/audios/meu-fone-novo.mp3" },
  ANOVELANOVA: { key: 28, letter: "A NOVELA NOVA", sound: "/audios/a-novela-nova.mp3" },
  OMENINONANAVE: { key: 29, letter: "O MENINO NA NAVE", sound: "/audios/o-menino-na-nave.mp3" },
  AMENINAFALAFINO: { key: 30, letter: "A MENINA FALA FINO", sound: "/audios/a-menina-fala-fino.mp3" },
  FIFILEVOUOFONE: { key: 31, letter: "FIFI LEVOU O FONE", sound: "/audios/fifi-levou-o-fone.mp3" },
  OIVOFALAFINO: { key: 32, letter: "O IVO FALA FINO", sound: "/audios/o-ivo-fala-fino.mp3" },
  OMENINOEVAVA: { key: 33, letter: "O MENINO E VAVA", sound: "/audios/o-menino-e-vava.mp3" },
  AMENINANALUA: { key: 34, letter: "A MENINA NA LUA", sound: "/audios/a-menina-na-lua.mp3" },
};

const {
  NA,
  VA,
  NI,
  MI,
  NU,
  FU,
  NE,
  JE,
  NO,
  MO,
  NOVO,
  NOME,
  NEVE,
  MANO,
  FONE,
  NOVA,
  MENU,
  NAVE,
  MENINO,
  MENINA,
  NELE,
  NOVELA,
  FINA,
  FIONA,
  NEVOU,
  OMEUNOME,
  MEUFONENOVO,
  ANOVELANOVA,
  OMENINONANAVE,
  AMENINAFALAFINO,
  FIFILEVOUOFONE,
  OIVOFALAFINO,
  OMENINOEVAVA,
  AMENINANALUA,
} = letters;

const phase1 = [
  [VA, NA, NA],
  [NI, MI, NI],
  [FU, NU, NU],
  [NE, JE, NE],
  [MO, NO, NO],
];

const phase2 = [
  [NI, NA, NA],
  [NE, NO, NE],
  [NI, NU, NI],
  [NE, NO, NO],
  [NA, NU, NU],
];

const phase3 = [[NOVO], [NOME], [NEVE], [MANO], [FONE]];

const phase4 = [[MENU], [NOVA], [NAVE], [MENINO], [MENINA]];

const phase5 = [[NELE], [NOVELA], [FINA], [FIONA], [NEVOU]];

const phase6 = [[OMEUNOME], [MEUFONENOVO], [ANOVELANOVA]];

const phase7 = [[OMENINONANAVE], [AMENINAFALAFINO], [FIFILEVOUOFONE]];

const phase8 = [[OIVOFALAFINO], [OMENINOEVAVA], [AMENINANALUA]];

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8];

export const phrases = [
  [
    ["NOME", "MEU", "O"],
    ["NOVO", "MEU", "FONE"],
    ["NOVELA", "A", "NOVA"],
  ],
  [
    ["NAVE", "NA", "MENINO", "O"],
    ["A", "FINO", "FALA", "MENINA"],
    ["FONE", "O", "LEVOU", "FIFI"],
  ],
  [
    ["FINO", "O", "FALA", "IVO"],
    ["VAVA", "E", "MENINO", "O"],
    ["A", "LUA", "MENINA", "NA"],
  ],
];
