import { unzipSync } from "fflate";
import { ZipArchive } from "@/utils/archive";

export async function readZip(file: File): Promise<ZipArchive> {
  const buffer = await file.arrayBuffer();
  const files = unzipSync(new Uint8Array(buffer));

  return new ZipArchive(files);
}