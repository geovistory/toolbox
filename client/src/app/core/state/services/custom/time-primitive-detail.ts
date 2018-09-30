import { Injectable } from '@angular/core';
import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfTimePrimitive } from 'app/core/sdk';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { TimePrimitveDetail } from 'app/core/state/models';

/**
 * Service for the 'ExistenceTimeDetail' model
 */
@Injectable()
export class TimePrimitveDetailService implements StateService<InfTimePrimitive, TimePrimitveDetail> {

    createState(options: TimePrimitveDetail, dbData: InfTimePrimitive, crm: ProjectCrm, settings: StateSettings): TimePrimitveDetail {
        return new TimePrimitveDetail({ ...options, timePrimitive: dbData });
    }
}
