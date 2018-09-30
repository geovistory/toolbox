import { ProjectCrm } from 'app/core/active-project';
import { InfPersistentItem } from 'app/core/sdk';
import { PeItDetail } from 'app/core/state/models';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { Injectable } from '@angular/core';
import { DataUnitService } from './data-unit';

/**
 * Service for the 'PeItDetail' model
 */
@Injectable()
export class PeItDetailService implements StateService<InfPersistentItem, PeItDetail> {

    constructor(private dataUnitService: DataUnitService) { }

    createState(options: PeItDetail, peIt: InfPersistentItem, crm: ProjectCrm, settings?: StateSettings): PeItDetail {

        // those only pollute the state unless we are in add mode.
        if (!settings.isAddMode) delete peIt.pi_roles;

        return new PeItDetail({
            ...options,
            _children: this.dataUnitService.initChildren(peIt.fk_class, peIt.pi_roles, crm, settings),
            pkEntity: peIt.pk_entity,
            fkClass: peIt.fk_class,
            peIt,
            selectPropState: 'init',
        })
    }

}
