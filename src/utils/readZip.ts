import { unzipSync } from "fflate";
import type { JsonDocument } from "@/types/jsonDocument";
import { readJson } from "@/utils/readJson";

export async function readZip(file: File): Promise<JsonDocument[]> {
  const buffer = await file.arrayBuffer();

  const zip = unzipSync(new Uint8Array(buffer));

  return Object.entries(zip)
    .filter(([path]) => path.endsWith(".json"))
    .map(([path, content]) => ({
      path,
      name: path.split("/").pop()!,
      data: readJson<unknown>(content),
    }));
}