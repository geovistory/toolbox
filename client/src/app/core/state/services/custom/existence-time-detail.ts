import { Injectable } from '@angular/core';
import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfRole } from 'app/core/sdk';
import { StateService } from '../core/state-service';
import { ExistenceTimeDetail } from 'app/core/state/models';
import { StateSettings } from '../core/state-settings';

/**
 * Service for the 'ExistenceTimeDetail' model
 */
@Injectable()
export class ExistenceTimeDetailService implements StateService<InfRole[], ExistenceTimeDetail> {


    createState(options: ExistenceTimeDetail, dbData: InfRole[], crm: ProjectCrm, settings: StateSettings): ExistenceTimeDetail {
        return new ExistenceTimeDetail({
            ...options
        });
    }
}
