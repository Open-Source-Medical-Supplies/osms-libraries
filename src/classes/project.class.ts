import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

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
  "Project Type": 'Project',
  "Reviewed By": 'reviewedBy',
  "Use Case": 'useCase',
  "web-name": 'webName'
};

const getCrossLinks = (projects: Project[]) => projects.reduce((acc: BasicObject<Project[]>, project) => {
  const name = project.webName; // 'web-name' here used to match against Project.categoryKey
  acc[name] ? acc[name].push(project) : acc[name] = [project];
  return acc;
}, {});

export type CrossLinks = ReturnType<typeof Project['getCrossLinks']>

export class Project {
  static getCrossLinks = getCrossLinks;

  attributionOrg!: string;
  audience!: string;
  baseID!: string;
  creator!: string;
  description!: string;
  difficulty!: string;
  displayName!: string;
  name!: string;
  generalSkillsTools!: string;
  imageURL!: string;
  hyperLinkText!: string;
  externalLink!: string;
  medicalStatus!: string;
  osmsNotes!: string;
  Project!: string;
  reviewedBy!: string;
  useCase!: string;
  webName!: string;
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
