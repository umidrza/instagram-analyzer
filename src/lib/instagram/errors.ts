export class InstagramExportError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InstagramExportError";
  }
}

export class InvalidInstagramExportError extends InstagramExportError {
  constructor(message = "This is not a valid Instagram export.") {
    super(message);
    this.name = "InvalidInstagramExportError";
  }
}

export class MissingFileError extends InstagramExportError {
  constructor(message = "Required Instagram export file is missing.") {
    super(message);
    this.name = "MissingFileError";
  }
}

export class InvalidArchiveError extends InstagramExportError {
  constructor(message = "The ZIP archive does not contain a valid Instagram export.") {
    super(message);
    this.name = "InvalidArchiveError";
  }
}

export class InvalidDocumentError extends InstagramExportError {
  constructor(message = "The Instagram export contains malformed data.") {
    super(message);
    this.name = "InvalidDocumentError";
  }
}
