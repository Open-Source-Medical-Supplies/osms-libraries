export interface AirtableRecord<T = {}> {
  createdTime: string; // ISO timestamp
  fields: T;
  id: string;
}

export type AirtableRecords<T = {}> = AirtableRecord<T>[];

export interface AirtableImage {
  id: string; // alphanumeric hash ID from AT
  url: string; // location on AT, URL uses image.filename, but matches image @ 'full.url' below
  filename: string;
  size: number; // in bytes(?)
  type: string; // "image/png", etc.
  thumbnails: {
    small: {
      url: string;    // location on AT, hashed
      width: number;  // max-width in px  -- image may not take up entirety
      height: number; // max-height in px -- image may not take up entirety
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    }
  }
}

export type AirtableImages = AirtableImage[];