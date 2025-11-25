export default function parseDDMMYYYY(dateString) {
  // FIX: Check if dateString is a string, not null/undefined, and not the default text
  if (typeof dateString !== "string" || !dateString || dateString === "No date available") {
    return null;
  }

  const parts = dateString.split("/");

  // Additional safety check for format
  if (parts.length !== 3) {
    console.warn("Invalid date format detected for filtering:", dateString);
    return null;
  }

  // parts[2]=YYYY, parts[1]-1=MM, parts[0]=DD (Month is 0-indexed)
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}
