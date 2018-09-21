export type DataUnitType = 'teEnt' | 'peIt';

export interface ClassItemI {
    pkClass: string;
    title: string;
    profileLabels: string;
    profilePks: number[];
    enabled: boolean;
    dataUnitType: DataUnitType;
    scopeNote: string;
}

// Interface of this slice of store
export interface ProjectSettingsDataI {
    items?: ClassItemI[];
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class ProjectSettingsData implements ProjectSettingsDataI {
    items?: ClassItemI[];
    loading?: boolean;
    error?: any;

    constructor(data?: ProjectSettingsDataI) {
        Object.assign(this, data);
    }
}
