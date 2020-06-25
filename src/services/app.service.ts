import { AirtableCalls, AirtableHelpers, AirtableCallKeys } from "./airtable";
import { BasicObject } from "../types/shared.type";
import { Project } from "../classes/project.class";
import { Category } from "../classes/category.class";
import { notEmpty } from "../shared/utility/general.utility";
import get from 'lodash.get';

const getCategories = async (): Promise<{
	records: BasicObject<any>;
	_records: BasicObject<any>;
}> => {
	const records = (
		await AirtableHelpers.callATbase(AirtableCalls.getCategories)
	).map((r: any) => new Category(r));
	return { records, _records: records };
};

const getProjects = async (): Promise<{
	records: BasicObject<any>;
	_records: BasicObject<any>;
}> => {
	const records = (
		await AirtableHelpers.callATbase(AirtableCalls.getProjects)
	).map((r: any) => new Project(r));
	debugger;
	return { records, _records: records };
};

const getLinks = async (): Promise<{
	projectLinks: BasicObject<BasicObject<string>[]>;
}> => {
	const data = await AirtableHelpers.callATbase(AirtableCalls.getProjects);
	const projectLinks: BasicObject<BasicObject<string>[]> = data.reduce(
		(acc: BasicObject<BasicObject<string>[]>, link: BasicObject<string>) => {
			const name = link['web-name']; // matches to 'Medical Supply Category' / categoryKey
			if (acc[name]) {
				acc[name].push(link);
			} else {
				acc[name] = [link];
			}
			return acc;
		},
		{}
	);
	return { projectLinks };
};

const bomParse = (materials: any[]): {} => {
	// acc -> string[] ??
	return materials.reduce((acc: BasicObject<string[]>, material) => {
		const matID: string = material['Full Project Name'];
		const mat: any[] = acc[matID] || [];
		mat.push(material);
		acc[matID] = mat; // this (mat) could be sorted, but materials should be coming in in ID order already
		return acc;
	}, {});
};

const getBoM = async (): Promise<{ materials: {} }> => {
	const materials = await AirtableHelpers.callATbase(AirtableCalls.getBoM);
	return { materials: bomParse(materials) };
};


const AppServices = {
  getCategories,
  getProjects,
  getLinks,
  getBoM
}
type AppServiceKeys = keyof typeof AppServices;

export const fetchData = async (
  callKeys: AppServiceKeys[],
  selector: string,
  splitOn: 'category' | 'project',
  setState: Function
): Promise<void> => {
  Promise
  .all(callKeys.map((k: AppServiceKeys) => AppServices[k]()) as Promise<any>[])
  .then(
		res => {
      const param = getParam(splitOn);
      const flatRes = flattenPromiseAll(res);
			if (!param) {
        setState(flatRes)
			} else {
        const selectedCard = res[0]._records.find((r: any) => get(r, selector) === param) || {};
				setState({
					...flatRes,
					selectedCard,
					visible: notEmpty(selectedCard)
				});
			}
		},
		e => {
      console.warn(e)
      setState({error: e})
    }
	);
};

const getParam = (splitOn: 'category' | 'project') => window.location && window.location.search ?
  decodeURI(window.location.search.split(splitOn + '=')[1]) : undefined;

const flattenPromiseAll = (res: BasicObject<any>[]) => {
  return res.reduce((acc: BasicObject<string>, val) => {
    Object.keys(val).forEach(k => acc[k] = val[k]);
    return acc
  }, {});
}
