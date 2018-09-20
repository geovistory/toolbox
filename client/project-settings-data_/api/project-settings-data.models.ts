// Interface of this slice of store
export interface ProjectSettingsDataI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class ProjectSettingsData implements ProjectSettingsDataI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: ProjectSettingsDataI) {
        Object.assign(this, data);
    }
}
