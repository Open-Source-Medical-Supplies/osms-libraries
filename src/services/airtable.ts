import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

const VIEWS = {
  GRID_VIEW: 'Grid view',
  DEFAULT_GRID: 'Default Grid',
  DEFAULT_VIEW: 'Default View'
};

export interface AirtableData {
  all: () => Promise<any[]>
}
export type AirtableCallKeys = keyof typeof AirtableCalls;

async function getCategories(): Promise<AirtableData> {
  return base('Category Information').select({ view: VIEWS.GRID_VIEW });
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
  getCategories,
  getBoM
}

const callATbase = async (
  apiCall: typeof AirtableCalls[AirtableCallKeys]
): Promise<any[]> => {
  return await apiCall().then(
    // data is an AT object
    async data => {
      return AirtableHelpers.filterRecords(await data.all());
    },
    e => {
      console.warn(e);
      return [];
    }
  )
}

const filterRecords = (r: any): any[] => r
  .map(({fields}: {fields: any[]}) => fields)
  .filter((field: {staging: boolean}) => field.staging !== true);

export const AirtableHelpers = {
  filterRecords,
  callATbase
}