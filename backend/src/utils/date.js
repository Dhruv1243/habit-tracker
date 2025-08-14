// utils/date.js
//what does this do???
export function toUtcMidnight(dateInput) {
  const d = new Date(dateInput); // accepts "YYYY-MM-DD" or Date
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}
