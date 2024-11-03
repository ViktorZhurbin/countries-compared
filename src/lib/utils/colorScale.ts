export const scaleColors = [
  "rgb(87, 187, 138)",
  "rgb(171, 201, 120)",
  "rgb(255, 214, 102)",
  "rgb(243, 169, 109)",
  "rgb(230, 124, 115)",
];

export const getRankedBackgroundColor = (rank: number, array: number[]) => {
  const sortedArray = [...array].sort((a, b) => a - b);

  const index = sortedArray.indexOf(rank);
  const segmentLength = Math.floor(array.length / scaleColors.length);

  const segment = Math.floor(index / segmentLength);

  return scaleColors[segment];
};
