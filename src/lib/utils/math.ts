export const getArrayAverage = (array: number[]) => {
  const sum = array.reduce((acc, number) => acc + number, 0);

  return Math.round(sum / array.length);
};
