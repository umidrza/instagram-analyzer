import { unzipSync, strFromU8 } from "fflate";

export interface ZipEntry {
  path: string;
  content: string;
}

export async function readZip(file: File): Promise<ZipEntry[]> {
  const arrayBuffer = await file.arrayBuffer();

  const uint8 = new Uint8Array(arrayBuffer);

  const unzipped = unzipSync(uint8);

  const files: ZipEntry[] = [];

  for (const [path, data] of Object.entries(unzipped)) {
    files.push({
      path,
      content: strFromU8(data),
    });
  }

  return files;
}