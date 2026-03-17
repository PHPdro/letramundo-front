export const THEME_CONFIG: Record<string, { bgClass: string; bgNiveisClass: string; color: "blue" | "red" | "orange" }> = {
  alimentos: { bgClass: "bgAlimentosJogo", bgNiveisClass: "bgAlimentosNiveis", color: "red" },
  animais: { bgClass: "bgAnimaisJogo", bgNiveisClass: "bgAnimaisNiveis", color: "blue" },
  cowboy: { bgClass: "bgCowBoyJogo", bgNiveisClass: "bgCowBoyNiveis", color: "orange" },
  praia: { bgClass: "bgPraiaJogo", bgNiveisClass: "bgPraiaNiveis", color: "blue" },
};

export const VALID_THEMES = Object.keys(THEME_CONFIG);
