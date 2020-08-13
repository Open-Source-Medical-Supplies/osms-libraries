import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { TableAction, TABLE_ACTIONS } from "../redux/tables.reducer";
import { TableMap, TABLE_MAPPING } from "../shared/constants/google-bucket.constants";
import { AirtableRecords } from "../shared/types/airtable.type";
import { valueof } from "../shared/types/shared.type";


/** TableListItem based on the gBucket / gFunction setup */
interface TableListItem {
  encoded: string;
  spaced: string;
  underscored: string;
  camelCased: string;
  type: valueof<typeof TABLE_MAPPING>;
}
type TableList = TableListItem[];

const BUCKET_NAME = "opensourcemedicalsupplies.org";
const url = (table: string) =>
  `https://storage.googleapis.com/${BUCKET_NAME}/${table}.json`;
const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const axiosGet = <T = any>(urlString: string) =>
  axios.get<T>(url(urlString), config);

const loadTables = (dispatch: Dispatch<TableAction>): void => {
  axiosGet<TableList>("table_list").then(
    ({ data: tableList }) => {
      dispatch({
        type: TABLE_ACTIONS.SET_TABLE_LIST,
        data: tableList,
      });

      tableList.forEach(({ underscored, type, camelCased }) => {
        axiosGet<AirtableRecords>(underscored).then(
          ({ data }) => {
            const mapper = TableMap[type];

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
              type: TABLE_ACTIONS.LOAD_TABLE,
              table: camelCased,
              data,
              tableType: type,
            });
          },
          (e) => {
            // catch for each table's data request
            console.warn(e);

            dispatch({
              type: TABLE_ACTIONS.LOAD_TABLE,
              table: camelCased,
              data: { error: true },
              tableType: type,
            });
          }
        );
      });
    },
    (e) => {
      // catch for table-list data request
      console.warn(e);

      dispatch({
        type: TABLE_ACTIONS.SET_TABLE_LIST,
        data: { error: true },
      });
    }
  );
};

export default loadTables;
