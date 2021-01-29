export const formatTimestamp = (
  timestamp: Date | string | undefined
): string => {
  if (timestamp) {
    const secondsElapsed =
      (new Date().getTime() - new Date(timestamp).getTime()) / 1000;
    let value = secondsElapsed;
    let unit = "second";

    if (secondsElapsed < 60) {
      value = Math.floor(secondsElapsed);
      unit = "second";
    } else if (secondsElapsed < 3600) {
      value = Math.floor(secondsElapsed / 60);
      unit = "minute";
    } else if (secondsElapsed < 86400) {
      value = Math.floor(secondsElapsed / 3600);
      unit = "hour";
    } else {
      value = Math.floor(secondsElapsed / 86400);
      unit = "day";
    }

    if (value === 1) return `${value} ${unit} ago`;
    return `${value} ${unit}s ago`;
  }
  return "";
};
