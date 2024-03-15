export function parseDuration(durationStr) {
  const parts = durationStr.split(":").map(Number);
  let seconds = 0;

  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1]; // MM:SS
  } else if (parts.length === 1) {
    seconds = parts[0]; // SS
  }

  return seconds;
}
