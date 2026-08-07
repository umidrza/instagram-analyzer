import { strFromU8 } from "fflate";

export class ZipArchive {
  constructor(private readonly files: Record<string, Uint8Array>) {}

  has(path: string) {
    return path in this.files;
  }

  list() {
    return Object.keys(this.files);
  }

  find(pattern: RegExp) {
    return this.list().filter((path) => pattern.test(path));
  }

  getBytes(path: string) {
    return this.files[path];
  }

  getText(path: string) {
    const bytes = this.files[path];

    if (!bytes) {
      throw new Error(`File not found: ${path}`);
    }

    return strFromU8(bytes);
  }

  getJson<T>(path: string): T {
    return JSON.parse(this.getText(path));
  }

  findByName(name: string): string | undefined {
    return Object.keys(this.files).find((path) => path.split("/").pop() === name);
  }

  hasName(name: string): boolean {
    return this.findByName(name) !== undefined;
  }

  getJsonByName<T>(name: string): T {
    const path = this.findByName(name);

    if (!path) {
      throw new Error(`File not found: ${name}`);
    }

    return this.getJson<T>(path);
  }
}