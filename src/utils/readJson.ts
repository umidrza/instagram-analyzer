export function readJson<T>(content: Uint8Array): T {
  const text = new TextDecoder().decode(content);

  return JSON.parse(text);
}