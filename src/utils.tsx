export default {
  clamp(min: any, max: any, value: any) {
    return Math.min(Math.max(value, min), max);
  },
};
