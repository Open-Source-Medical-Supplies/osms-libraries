import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { CategoryInfo } from "../classes/category-info.class";
import { CategorySupply } from "../classes/category-supply.class";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { TableAction, TableActions } from "../redux/tables.reducer";
import { mapFilterData } from "../shared/components/filter-menu/filter-menu.utilities";
import { AirtableRecords } from "../types/airtable.type";
import { BasicObject } from "../types/shared.type";

/** TableListItem based on the gBucket / gFunction setup */
interface TableListItem {
  encoded: string;
  spaced: string;
  underscored: string;
  camelCased: string;
  type: string;
}
type TableList = TableListItem[];

const BUCKET_NAME = 'opensourcemedicalsupplies.org';
const url = (table: string) =>
  `https://storage.googleapis.com/${BUCKET_NAME}/${table}.json`;
const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json"
  },
};
const axiosGet = <T = any>(urlString: string) =>
  axios.get<T>(url(urlString), config);

/**
 * Either
 * provide a Ctor to map the retrieved Array<{}> -> Array<classInstance>
 * or
 * provide a function that can handle an Array<{}>
 */
const TableMapping: BasicObject<Function> = {
  Project,
  CategoryInfo,
  CategorySupply,
  FilterMenu: mapFilterData,
  Material,
};

const loadTables = (dispatch: Dispatch<TableAction>): void => {
  axiosGet<TableList>("table_list").then(
    ({ data: tableList }) => {
      dispatch({
        type: TableActions.SET_TABLE_LIST,
        data: tableList
      });

      tableList.forEach(({ underscored, spaced, type, camelCased }) => {
        axiosGet<AirtableRecords>(underscored).then(
          ({ data }) => {
            const mapper = TableMapping[type];

            if (mapper) {
              if (mapper.prototype) {
                data = data.map((v) => {
                  return new mapper.prototype.constructor(v);
                });
              } else {
                data = mapper(data);
              }
            }

            dispatch({
              type: TableActions.LOAD_TABLE,
              table: camelCased,
              data,
              tableType: type
            });
          },
          (e) => {
            // catch for each table's data request
            console.warn(e);

            dispatch({
              type: TableActions.LOAD_TABLE,
              table: camelCased,
              data: {error: true},
              tableType: type
            });
          }
        );
      });
    },
    (e) => {
      // catch for table-list data request
      console.warn(e);

      dispatch({
        type: TableActions.SET_TABLE_LIST,
        data: {error: true}
      });
    }
  );
};

export default loadTables;
