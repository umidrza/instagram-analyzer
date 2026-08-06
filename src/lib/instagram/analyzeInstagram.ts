import { parseFile } from "@/lib/instagram/parser";
import { analyzeConnections } from "@/lib/instagram/analysis/analyze";
import { loadInstagramExport } from "./loadInstagramExport";
import { readZip } from "@/utils/readZip";
import { validateExport } from "./validate";

export async function analyzeInstagram(file: File) {
    const archive = await readZip(file);
    
    const instagramDocuments = await loadInstagramExport(archive);

    validateExport(instagramDocuments);

    const instagramData = await parseFile(instagramDocuments);

    const analysisResult = analyzeConnections(instagramData);

    return analysisResult;
}