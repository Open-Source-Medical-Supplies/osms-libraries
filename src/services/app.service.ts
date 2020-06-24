import { AirtableCalls, AirtableHelpers } from "./airtable";
import { BasicObject } from "../types/shared.type";
import { Project } from "../classes/project.class";
import { Category } from "../classes/category.class";

const getParam = (splitOn: 'category' | 'project') => window.location && window.location.search ?
    decodeURI(window.location.search.split(splitOn + '=')[1]) :
    undefined;

export const getCategories = async (): Promise<{
  records: BasicObject<any>;
  _records: BasicObject<any>;
}> => {
  const records = (await AirtableHelpers
    .callATbase(AirtableCalls.getCategories))
    .map((r: any) => new Category(r));
  return {records, _records: records};
};

export const getProjects = async (): Promise<{
  records: BasicObject<any>;
  _records: BasicObject<any>;
}> => {
  const records = (await AirtableHelpers
    .callATbase(AirtableCalls.getProjects))
    .map((r: any) => new Project(r));
  debugger
  return {records, _records: records};
};

export const setLinks = async (): Promise<{
  projectLinks: BasicObject<BasicObject<string>[]>
}> => {
  const data = await AirtableHelpers.callATbase(AirtableCalls.getProjects);
  const projectLinks: BasicObject<BasicObject<string>[]> = data.reduce((acc: BasicObject<BasicObject<string>[]>, link: BasicObject<string>) => {
    const name = link["web-name"]; // matches to 'Medical Supply Category' / categoryKey
    if (acc[name]) {
      acc[name].push(link);
    } else {
      acc[name] = [link];
    }
    return acc;
  }, {});
  return {projectLinks};
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
}

export const getBoM = async (): Promise<{materials: {}}> => {
  const materials = await AirtableHelpers.callATbase(AirtableCalls.getBoM);
  return {materials: bomParse(materials)};
};

// export const fetchCategoryData = async(setState) => {
//   Promise.all([
//     setCategories(), 
//     setLinks()
//   ]).then(
//     res => {
//       const param = getParam();
//       if (param) {
//         const selectedCard = res[0]._records.find(r => r['CategoryName'][0] === param) || {};

//         setState({
//           ...res[0],
//           ...res[1],
//           selectedCard,
//           visible: notEmpty(selectedCard)
//         });
//       } else {
//         setState({
//           ...res[0],
//           ...res[1]
//         });
//       }
//     },
//     e => console.warn(e)
//   )
// }

// /**
//  * @returns {Promise<{materials: {}}>}
// */
// export const getBoM = async (): Promise<{ materials: {}; }> => {
//   const materials = await AirtableHelpers.callATbase(AirtableCalls.getBoM);
//   return {materials: bomParse(materials)};
// };

// /**
//  * 
//  * @param {[]} materials
//  * @returns {{}}
//  */
// const bomParse = (materials: []): {} => {
//   return materials.reduce((acc, material) => {
//     const matID = material['Full Project Name'];
//     const mat = acc[matID] || [];
//     mat.push(material);
//     acc[matID] = mat; // this (mat) could be sorted, but materials should be coming in in ID order already
//     return acc;
//   }, {});
// }

// export const fetchProjectData = async(setState) => {
//   const param = getParam();

//   Promise.all([
//     parseProjects(),
//     parseBoM()
//   ]).then(
//     (res) => {
//       if(param) {
//         const selectedCard = res[0]._records.find(r => r['Base ID'] === param) || {};
//         setState({
//           ...res[0],
//           ...res[1],
//           selectedCard,
//           visible: notEmpty(selectedCard),
//         })
//       } else {
//         setState({ ...res[0], ...res[1] })
//       }
//     }
//   );
// }