import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfAppellation } from 'app/core/sdk/models/InfAppellation';
import { Injectable } from '@angular/core';
import { StateService } from '../core/state-service';
import { AppeDetail } from 'app/core/state/models';
import { StateSettings } from '../core/state-settings';

export interface AppeDetailI {
    appellation?: InfAppellation;
}

/**
 * Service for the 'AppeDetail' model
 */
@Injectable()
export class AppeDetailService implements StateService<InfAppellation, AppeDetail> {

    createState(options: AppeDetail, dbData: InfAppellation, crm: ProjectCrm, settings: StateSettings): AppeDetail {
        return new AppeDetail({
            ...options,
            appellation: dbData,
        });
    }
}
