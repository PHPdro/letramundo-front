const COWBOY_IMAGES = new Set([
  // Nivel 1
  "OI", "UI", "OU", "EI", "AU", "EU", "AI", "UAU", "UAI",
]);

export const getCowboyImage = (letter: string) => {
  return COWBOY_IMAGES.has(letter)
    ? `/cowboy/${letter}.png`
    : `/${letter}.png`;
};
