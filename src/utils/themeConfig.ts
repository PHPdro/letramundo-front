export const THEME_CONFIG: Record<string, { bgClass: string; color: "blue" | "red" | "orange" }> = {
  alimentos: { bgClass: "bgAlimentosJogo", color: "red" },
  animais: { bgClass: "bgAnimaisJogo", color: "blue" },
  cowboy: { bgClass: "bgCowBoyJogo", color: "orange" },
  praia: { bgClass: "bgPraiaJogo", color: "blue" },
};

export const VALID_THEMES = Object.keys(THEME_CONFIG);
