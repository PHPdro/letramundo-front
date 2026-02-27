const ALIMENTOS_IMAGES = new Set([
  "AI", "AMA", "AU", "EI", "EU",
  "EU LEVO A UVA", "EU LEVO O MIMO", "EU VI A MULA", "EU VI O FIO",
  "FALA", "FALE", "FALO", "FEIO", "FILA", "FINA", "FOME",
  "LAVA", "LEU", "LEVA",
  "MEIO", "MEU FAVO E EU", "MEU FONE NOVO", "MEU", "MOLE", "MOVE",
  "NELE", "NEVE", "NEVOU", "NOME", "NOVELA",
  "O MEU NOME", "A NOVELA NOVA",
  "OI", "OU", "UAI", "UAU", "UFA", "UI",
  "VAI", "VEIO", "VIU", "VIVA", "VIVO",
]);

export const getAlimentosImage = (letter: string) => {
  return ALIMENTOS_IMAGES.has(letter)
    ? `/alimentos/${letter}.png`
    : `/${letter}.png`;
};
