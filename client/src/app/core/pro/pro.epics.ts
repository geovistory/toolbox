import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProInfoProjRelApi } from 'app/core';
import { DatActions } from 'app/core/dat/dat.actions';
import { InfActions } from 'app/core/inf/inf.actions';
import { proRoot } from 'app/core/pro/pro.config';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { ModifyActionMeta } from '../store/actions';
import { StandardEpicsFactory } from '../store/StandardEpicsFactory';
import { ProActions } from './pro.actions';
import { ProInfoProjRelSlice } from './pro.models';


@Injectable()
export class ProEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi
  ) { }

  public createEpics(): Epic {

    const infoProjRelEpicsFactory = new StandardEpicsFactory<ProInfoProjRelSlice, ProInfoProjRel>
      (proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);


    return combineEpics(

      infoProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProInfoProjRel>>((meta) => this.infoProjRelApi
        .bulkUpdateEprAttributes(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.info_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
    )
  }


}
