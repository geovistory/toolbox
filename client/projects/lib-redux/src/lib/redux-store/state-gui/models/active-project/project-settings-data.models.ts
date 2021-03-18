import { ClassConfig } from '../active-project.models';

export type EntityType = 'teEnt' | 'peIt' | 'other';


// Class of this slice of store
export class ProjectSettingsData {
  items?: ClassConfig[];
  // profiles?: DfhClassProfileView[];
  tabTitle?: string;
  loading?: boolean;
  error?: any;

  constructor(data?: ProjectSettingsData) {
    Object.assign(this, data);
  }
}
