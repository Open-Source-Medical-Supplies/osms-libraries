import { CategorySupply } from "../classes/category-supply.class";
import { mapFilterData } from "../shared/components/filter-menu/filter-menu.utilities";
import { AirtableHelpers, AirtableSupplyCalls } from "./airtable";

export const parseFilterMenu = async () => {
	const records = (await AirtableHelpers.callATbase(
		AirtableSupplyCalls.getFilterMenu
	)) as any;
	return mapFilterData(records);
};

export const parseCategories = async (): Promise<{
	categories: CategorySupply[];
}> => {
	const categories = await AirtableHelpers.callATbase<CategorySupply>(
		AirtableSupplyCalls.getCategorySupply,
		CategorySupply
	);
	return { categories };
};
