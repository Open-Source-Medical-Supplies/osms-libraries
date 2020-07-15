import get from "lodash.get";
import { CategoryInfo } from "../classes/category-info.class";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { toDict } from "../shared/utility/general.utility";
import { getParam } from "../shared/utility/param-handling";
import ActiveLib from "../types/lib.enum";
import { BasicObject } from "../types/shared.type";
import { AirtableHelpers, AirtableSupplyCalls } from "./airtable";

const getCategories = async (): Promise<{
	records: CategoryInfo[];
	_records: CategoryInfo[];
}> => {
	const records = await AirtableHelpers.callATbase<CategoryInfo>(
		AirtableSupplyCalls.getCategoryInfo,
		CategoryInfo
	);
	return { records, _records: records };
};

const getProjects = async (): Promise<{
	records: Project[];
	_records: Project[];
}> => {
	const records = await AirtableHelpers.callATbase<Project>(
		AirtableSupplyCalls.getProjects,
		Project
	);
	return { records, _records: records };
};

const getLinks = async (): Promise<{
	projectsByCategory: BasicObject<Project[]>;
}> => {
	const data = await AirtableHelpers.callATbase<Project>(
		AirtableSupplyCalls.getProjects,
		Project
	);
	return { projectsByCategory: toDict<Project>(data, 'name') };
};

const getBoM = async (): Promise<{ materials: {} }> => {
	const materials = await AirtableHelpers.callATbase<Material>(
		AirtableSupplyCalls.getBoM,
		Material
	);
	return { materials: toDict<Material>(materials, 'name') };
};

const AppServices = {
	getCategories,
	getProjects,
	getLinks,
  getBoM
};
type AppServiceKeys = keyof typeof AppServices;

export const fetchData = async <T, S extends Function>(
	callKeys: AppServiceKeys[],
	selector: keyof T,
	splitOn: ActiveLib,
	setState: S
): Promise<void> => {
	Promise.all(
		callKeys.map((k: AppServiceKeys) => AppServices[k]()) as Promise<any>[]
	).then(
		(res) => {
			const param = getParam(splitOn);
			const flatRes = flattenPromiseAll(res);
			if (!param) {
				setState(flatRes);
			} else {
				const selected =
					res[0]._records.find((r: any) => get(r, selector) === param) ||
          undefined;
				setState({
					...flatRes,
					selected,
					visible: !!selected,
				});
			}
		},
		(e) => {
			console.warn(e);
			setState({ error: e });
		}
	);
};

const flattenPromiseAll = (res: BasicObject<any>[]) => {
	return res.reduce((acc: BasicObject<string>, val) => {
		Object.keys(val).forEach((k) => (acc[k] = val[k]));
		return acc;
	}, {});
};
