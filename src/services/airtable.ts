import { Constructor } from '../types/shared.type';
import ENV from '../env';
const Airtable = require('airtable');

const base = new Airtable({ apiKey: ENV.AT_KEY }).base('apppSjiUMTolFIo1P');

const VIEWS = {
  GRID_VIEW: 'Grid view',
  DEFAULT_GRID: 'Default Grid',
  DEFAULT_VIEW: 'Default View'
};

export interface AirtableData {
  all: () => Promise<any[]>
}
export type AirtableCallKeys = keyof typeof AirtableCalls;

async function getCategoryInfo(): Promise<AirtableData> {
  return base('Category Information').select({ view: VIEWS.GRID_VIEW });
}

async function getCategorySupply() {
  return base('Medical Supply Categories').select({view: VIEWS.DEFAULT_GRID});
}

async function getProjects(): Promise<AirtableData> {
  return base('Engineered Project Pages').select({ view: VIEWS.DEFAULT_VIEW });
}

async function getFilterMenu(): Promise<AirtableData> {
  return base('ProjectsFilterMenu').select({view: VIEWS.GRID_VIEW});
}

async function getBoM(): Promise<AirtableData> {
  return base('Bill of Materials').select({view: VIEWS.GRID_VIEW});
}

export const AirtableCalls = {
  getProjects,
  getFilterMenu,
  getCategoryInfo,
  getCategorySupply,
  getBoM
}

const callATbase = async<T>(
  apiCall: typeof AirtableCalls[AirtableCallKeys],
  ctor?: Constructor<T>
): Promise<T[]> => {
  return await apiCall().then(
    // data is an AT object
    async data => {
      const vals = AirtableHelpers.filterRecords(await data.all());
      if (ctor) {
        return vals.map(v => new ctor(v));
      }
      return vals;
    },
    e => {
      console.warn(e);
      return [];
    }
  )
}

const filterRecords = (r: any): any[] => r
  .map(({fields}: {fields: any[]}) => fields)
  .filter((field: any) => !field.staging || !field.Staging);

export const AirtableHelpers = {
  filterRecords,
  callATbase
}