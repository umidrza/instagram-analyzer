import type { ZipEntry } from "./readZip";

export function findFile(
  files: ZipEntry[],
  fileName: string
): ZipEntry | undefined {
  return files.find((file) => file.path.endsWith(fileName));
}