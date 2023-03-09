const to2dArray = <T extends Record<string, any>>(
  array: T[],
  width: number
): T[][] => {
  if (array.length === 0) {
    return [array];
  }

  const result = array.reduce(
    (rows: any, key, index) =>
      (index % width == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );
  return result;
};

const randomIndexFromArray = (array: any[]): number =>
  Math.floor(Math.random() * array.length);

export { to2dArray, randomIndexFromArray };
