import { DfhProjRel } from 'app/core/sdk/models/DfhProjRel';
import { DfhClassProfileView } from '../../../../../core';

export type DataUnitType = 'teEnt' | 'peIt';

export interface ClassItemI {
    pkEntity: number;
    pkClass: string;
    title: string;
    profileLabels: string;
    profilePks: number[];
    projRel: DfhProjRel;
    dataUnitType: DataUnitType;
    scopeNote: string;
    changingProjRel: boolean;
}

// Interface of this slice of store
export interface ProjectSettingsDataI {
    items?: ClassItemI[];
    profiles?: DfhClassProfileView[];
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class ProjectSettingsData implements ProjectSettingsDataI {
    items?: ClassItemI[];
    profiles?: DfhClassProfileView[];
    loading?: boolean;
    error?: any;

    constructor(data?: ProjectSettingsDataI) {
        Object.assign(this, data);
    }
}
