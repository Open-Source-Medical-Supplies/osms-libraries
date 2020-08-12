export interface AirtableRecord<T = {}> {
  createdTime: string; // ISO timestamp
  fields: T;
  id: string;
}

export type AirtableRecords<T = {}> = AirtableRecord<T>[];