export async function readZip(file: File) {
  const buffer = await file.arrayBuffer();

  return buffer;
}