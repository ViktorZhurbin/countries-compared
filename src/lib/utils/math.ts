export const getArrayAverage = (array: number[]) => {
  const sum = array.reduce((result, value) => result + value, 0);

  return Math.round(sum / array.length);
};
