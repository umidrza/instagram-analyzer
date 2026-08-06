import type { ZipArchive } from "./archive";

export function readJson<T>(
  archive: ZipArchive,
  path: string
) {
  return archive.getJson<T>(path);
}