import { BasicObject } from "../types/shared.type";
import { DataConverter } from "./data-converter.class";

const RawMap = {
  "Base ID": 'baseID',
  "Full Project Name": 'name',
  "Display Name": 'displayName',
  "Reviewed By": 'reviewedBy',
  "Medical Status":'medicalStatus',
  "Description": 'description',
  "Link": 'externalLink',
  "Hyperlink Text": 'hyperLinkText',
  "Attribution Organization": 'attributionOrg',
  "Creator": 'creator',
  "OSMS Notes": 'osmsNotes',
  "Use Case": 'useCase',
  "Audience": 'audience',
  "General Skills/Tools": 'generalSkillsTools',
  "Difficulty": 'difficulty',
  "Project Type": 'projectType'
};

export type ProjectType = typeof RawMap & Project;

export class Project extends DataConverter {
  constructor(data: BasicObject<any>) {
    super(data, RawMap);
  }
}
