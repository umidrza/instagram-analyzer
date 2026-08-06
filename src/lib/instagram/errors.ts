export class InstagramExportError extends Error {}

export class InvalidInstagramExportError extends Error {
  constructor(message = "This is not a valid Instagram export.") {
    super(message);
    this.name = "InvalidInstagramExportError";
  }
}

export class MissingFileError
  extends InstagramExportError {}