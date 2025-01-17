export function extractCookie(
  cookies: string,
  key: string,
): string | undefined {
  if (!cookies || !key) return undefined;
  return cookies
    .split(';')
    .map((c) => c.trim())
    .reduce((value, pair) => {
      const [name, val] = pair.split('=');
      return name === key ? val : value;
    }, undefined);
}