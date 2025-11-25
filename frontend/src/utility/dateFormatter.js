/**
 * Converts a Firebase Timestamp object to a 'DD/MM/YYYY' string.
 *
 * @param {object} inputDateTimestamp - The timestamp object from Firestore.
 * @returns {string} The formatted date string, e.g., "06/11/2025".
 */

export function formatDateDMY(inputDateTimestamp) {
  const dateObject = inputDateTimestamp.toDate();
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObject);
}
