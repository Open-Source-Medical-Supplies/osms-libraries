import ENV from '../env';
const Airtable = require('airtable');

const atObj = new Airtable({ apiKey: ENV.AT_KEY }); 
const suppliesBase = atObj.base('apppSjiUMTolFIo1P');
const supportBase = atObj.base('appOzIsZ9yJckwyo6');

const VIEWS = {
  GRID_VIEW: 'Grid view',
  DEFAULT_GRID: 'Default Grid',
  DEFAULT_VIEW: 'Default View'
};

export interface AirtableData {
  all: () => Promise<any[]>
}
export type AirtableCalls = typeof AirtableSupplyCalls & typeof AirtableSupportingCalls;
export type AirtableCallKeys = keyof typeof AirtableSupplyCalls | keyof typeof AirtableSupportingCalls;

async function getCategoryInfo(): Promise<AirtableData> {
  return suppliesBase('Category Information').select({ view: VIEWS.GRID_VIEW });
}

async function getCategorySupply(): Promise<AirtableData> {
  return suppliesBase('Medical Supply Categories').select({ view: VIEWS.DEFAULT_GRID });
}

async function getProjects(): Promise<AirtableData> {
  return suppliesBase('Engineered Project Pages').select({ view: VIEWS.DEFAULT_VIEW });
}

async function getFilterMenu(): Promise<AirtableData> {
  return suppliesBase('ProjectsFilterMenu').select({ view: VIEWS.GRID_VIEW });
}

async function getBoM(): Promise<AirtableData> {
  return suppliesBase('Bill of Materials').select({ view: VIEWS.GRID_VIEW });
}

export const AirtableSupplyCalls = {
  getProjects,
  getFilterMenu,
  getCategoryInfo,
  getCategorySupply,
  getBoM
};

async function getStaticLanguage(): Promise<AirtableData> {
  return supportBase('IETF Translations').select({ view: VIEWS.GRID_VIEW });
}

export const AirtableSupportingCalls = {
  getStaticLanguage
}

const callATbase = async<T>(
  apiCall: AirtableCalls[AirtableCallKeys],
  mapper?: Function,
  isCtor = true
): Promise<T[]> => {
  return await apiCall().then(
    // data is an AT object
    async data => {
      const vals = AirtableHelpers.filterRecords(await data.all());
      if (mapper) {
        return isCtor ?
          vals.map(v => new mapper.prototype.constructor(v)) :
          mapper(vals);
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
  .filter((field: any) => {
    const val = field.staging || field.Staging;
    return !(val instanceof Array ? val[0] : val);
  });

export const AirtableHelpers = {
  filterRecords,
  callATbase
}