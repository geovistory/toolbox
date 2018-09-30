import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfPlace } from 'app/core/sdk';
import { StateService } from '../core/state-service';
import { PlaceDetail } from 'app/core/state/models';
import { Injectable } from '@angular/core';
import { StateSettings } from '../core/state-settings';

/**
 * Service for the 'PlaceDetail' model
 */
@Injectable()
export class PlaceDetailService implements  StateService<InfPlace, PlaceDetail> {


    createState(options: PlaceDetail, dbData: InfPlace, crm: ProjectCrm, settings: StateSettings): PlaceDetail {
        return new PlaceDetail({ ...options, place: dbData });
    }
}
