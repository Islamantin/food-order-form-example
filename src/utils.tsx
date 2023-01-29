export default {
  clamp(min: any, max: any, value: any) {
    return Math.min(Math.max(value, min), max);
  },
  uniquePush<T>(
    array: T[],
    element: T,
  ) {
      array.push(element);
      return Array.from(new Set(array));
  },
};
