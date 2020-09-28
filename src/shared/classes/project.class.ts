import { AirtableImage } from "../types/airtable.type";
import { BasicObject } from "../types/shared.type";
import DataConverter from "./data-converter";

const RawMap = {
  "Attribution Organization": 'attributionOrg',
  "Audience": 'audience', 
  "Base ID": 'baseID',
  "Creator": 'creator',
  "Description": 'description',
  "Difficulty": 'difficulty',
  "Full Project Name": DataConverter.classMaps.displayName,
  "General Skills/Tools": 'generalSkillsTools',
  "HeaderImage": [DataConverter.classMaps.imageURL, DataConverter.classMaps.imageRaw],
  "Hyperlink Text": 'hyperLinkText',
  "Link": 'externalLink',
  "Medical Status": 'medicalStatus',
  "OSMS Notes": 'osmsNotes',
  "Project Type": 'Project',
  "Reviewed By": 'reviewedBy',
  "Use Case": 'useCase',
  ...DataConverter.classMaps.DISPLAY_NAME,
  ...DataConverter.classMaps.WEB_NAME,
  ...DataConverter.sharedFields
};

const getCrossLinks = (projects: Project[]) => projects.reduce((acc: BasicObject<Project[]>, project) => {
  const name = project.key; // 'web-name' here used to match against Project.categoryKey
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
  name!: string | string[];
  generalSkillsTools!: string;
  imageURL!: string;
  imageRaw!: AirtableImage;
  hyperLinkText!: string;
  externalLink!: string;
  medicalStatus!: string;
  osmsNotes!: string;
  Project!: string;
  reviewedBy!: string;
  useCase!: string;
  key!: string;
  isNew!: '0' | '1';
  isUpdated!: '0' | '1';
  raw: BasicObject<any> = {};

  constructor(data: BasicObject<any>) {
    DataConverter.format(this, data, RawMap);
  }
}
