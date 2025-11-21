export const codeRegex = /^[A-Za-z0-9]{6,8}$/;

export function isValidUrl(url: string) {
  try {
    const check = new URL(url);
    return check.protocol === "http:" || check.protocol === "https:";
  } catch {
    return false;
  }
}
