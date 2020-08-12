import axios, { AxiosRequestConfig } from "axios";
import camelCase from "lodash.camelcase";
import { Dispatch } from "react";
import { CategoryInfo } from "../classes/category-info.class";
import { CategorySupply } from "../classes/category-supply.class";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { TableActionsType, TableActions } from "../redux/tables.reducer";
import { mapFilterData } from "../shared/components/filter-menu/filter-menu.utilities";
import { BasicObject } from "../types/shared.type";
import { AirtableRecords } from "../types/airtable.type";

interface TableListItem {
  encoded: string;
  spaced: string;
  underscored: string;
  type: string;
}
type TableList = TableListItem[];

const url = (table: string) =>
  `https://storage.googleapis.com/opensourcemedicalsupplies.org/${table}.json`;
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

const loadTables = (dispatch: Dispatch<TableActions>): void => {
  axiosGet<TableList>("table_list").then(
    ({ data: tableList }) => {
      dispatch({
        type: TableActionsType.SET_TABLE_LIST,
        data: tableList
      });

      tableList.forEach(({ underscored, spaced, type }) => {
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
              type: TableActionsType.LOAD_TABLE,
              table: camelCase(spaced),
              data,
              tableType: camelCase(type)
            });
          },
          (e) => {
            // catch for each table's data request
            console.warn(e);
          }
        );
      });
    },
    (e) => {
      // catch for table-list data request
      console.warn(e);
    }
  );
};

export default loadTables;
