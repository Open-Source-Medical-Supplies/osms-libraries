import { CategorySupply } from "../classes/category-supply.class";
import {
	flattenRecords,
	parseFilterData,
} from "../shared/components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
	const records = (await AirtableHelpers.callATbase(
		AirtableCalls.getFilterMenu
	)) as {}[];
	const nodes: {}[] = parseFilterData(Object.assign([], records));
	const flatNodes: {}[] = flattenRecords(Object.assign([], records));
	return { nodes, flatNodes };
};

export const parseCategories = async (): Promise<{
	categories: CategorySupply[];
}> => {
	const categories = await AirtableHelpers.callATbase<CategorySupply>(
		AirtableCalls.getCategorySupply,
		CategorySupply
	);
	return { categories };
};
