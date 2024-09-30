export const random = {
  getRandom: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
