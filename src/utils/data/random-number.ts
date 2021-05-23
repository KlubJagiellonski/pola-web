export const getNumber = (min: number = 0, max: number = 1000): number => {
  const value = Math.floor(Math.random() * max);
  return value > min ? value : min;
};
