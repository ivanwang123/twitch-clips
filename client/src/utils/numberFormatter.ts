export const formatNumber = (num: number | undefined): number | string => {
  if (!num) return "0";

  if (num >= 1000000) {
    // million
    return Math.round(num / 100000) / 10 + "M";
  } else if (num >= 100000) {
    // hundred thousand
    return Math.round(num / 1000) + "k";
  } else if (num >= 1000) {
    // thousand
    return Math.round(num / 100) / 10 + "k";
  }
  return num;
};
