import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "Attribution Organization": 'attributionOrg',
  "Audience": 'audience',
  "Base ID": 'baseID',
  "Creator": 'creator',
  "Description": 'description',
  "Difficulty": 'difficulty',
  "Display Name": 'displayName',
  "Full Project Name": 'name',
  "General Skills/Tools": 'generalSkillsTools',
  "HeaderImage": 'imageURL',
  "Hyperlink Text": 'hyperLinkText',
  "Link": 'externalLink',
  "Medical Status": 'medicalStatus',
  "OSMS Notes": 'osmsNotes',
  "Project Type": 'projectType',
  "Reviewed By": 'reviewedBy',
  "Use Case": 'useCase',
  "web-name": 'webName'
};

const getCrossLinks = (projects: Project[]) => projects.reduce((acc: BasicObject<Project[]>, project) => {
  const name = project.webName; // 'web-name' here used to match against Project.categoryKey
  acc[name] ? acc[name].push(project) : acc[name] = [project];
  return acc;
}, {});

export type ProjectType = typeof RawMap & Project;
export type CrossLinks = ReturnType<typeof Project['getCrossLinks']>

export class Project extends DataConverter {
  static getCrossLinks = getCrossLinks;

  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
