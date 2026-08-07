import { analyzeConnections } from "@/lib/instagram/analysis/analyze";
import { parseFile } from "@/lib/instagram/parser";
import { loadInstagramExport } from "./loadInstagramExport";
import { validateExport, validateFile } from "./validate";
import { readZip } from "@/utils/readZip";

export async function processInstagramExport(file: File) {
  validateFile(file);

  const archive = await readZip(file);
  
  const instagramDocuments = await loadInstagramExport(archive);

  validateExport(instagramDocuments);

  const instagramData = await parseFile(instagramDocuments);

  return analyzeConnections(instagramData);
}
