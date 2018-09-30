import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfTemporalEntity } from 'app/core/sdk';
import { TeEntDetail } from 'app/core/state/models';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { Injectable } from '@angular/core';
import { DataUnitService } from './data-unit';

/**
 * Service for the 'TeEntDetail' model
 */
@Injectable()
export class TeEntDetailService implements StateService<InfTemporalEntity, TeEntDetail> {

    constructor(private dataUnitService: DataUnitService) { }

    createState(options: TeEntDetail, teEnt: InfTemporalEntity, crm: ProjectCrm, settings: StateSettings): TeEntDetail {

        if (!teEnt) return;

        return new TeEntDetail({
            selectPropState: 'init',
            toggle: 'collapsed',
            teEnt: teEnt,
            fkClass: teEnt.fk_class,
            _children: this.dataUnitService.initChildren(teEnt.fk_class, teEnt.te_roles, crm, settings)
        });
    }
}
