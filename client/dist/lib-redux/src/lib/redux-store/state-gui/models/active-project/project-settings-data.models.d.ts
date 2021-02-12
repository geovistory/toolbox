import { ClassConfig } from '../active-project.models';
export declare type EntityType = 'teEnt' | 'peIt' | 'other';
export declare class ProjectSettingsData {
    items?: ClassConfig[];
    tabTitle?: string;
    loading?: boolean;
    error?: any;
    constructor(data?: ProjectSettingsData);
}
