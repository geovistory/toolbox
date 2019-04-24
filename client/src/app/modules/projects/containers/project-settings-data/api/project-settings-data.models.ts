import { DfhProjRel } from 'app/core/sdk/models/DfhProjRel';
import { DfhClassProfileView, ClassConfig } from '../../../../../core';

export type EntityType = 'teEnt' | 'peIt' | 'other';

// export interface ClassConfig {
//     pkEntity: number;
//     pkClass: string;
//     title: string;
//     profileLabels: string;
//     profilePks: number[];
//     projRel: DfhProjRel;
//     entityType: EntityType;
//     scopeNote: string;
//     changingProjRel: boolean;
// }

// Class of this slice of store
export class ProjectSettingsData {
    items?: ClassConfig[];
    profiles?: DfhClassProfileView[];
    tabTitle?: string;
    loading?: boolean;
    error?: any;

    constructor(data?: ProjectSettingsData) {
        Object.assign(this, data);
    }
}
