export function formatDate(dateString: string) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleString();
}

export function truncate(text: string, max = 40) {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) + "..." : text;
}
