import { Injectable } from '@angular/core';
import { ProClassFieldConfig, ProInfoProjRel, ProInfoProjRelApi } from 'app/core';
import { DatActions } from 'app/core/dat/dat.actions';
import { InfActions } from 'app/core/inf/inf.actions';
import { proRoot } from 'app/core/pro/pro.config';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { ProClassFieldConfigApi, ProDfhClassProjRel, ProDfhClassProjRelApi, ProPropertyLabel, ProPropertyLabelApi } from '../sdk';
import { LoadActionMeta, ModifyActionMeta } from '../store/actions';
import { StandardEpicsFactory } from '../store/StandardEpicsFactory';
import { ProActions, ProPropertyLabelActionFactory } from './pro.actions';
import { ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProInfoProjRelSlice, ProPropertyLabelSlice } from './pro.models';


@Injectable()
export class ProEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi,
    public classProjRelApi: ProDfhClassProjRelApi,
    public classFieldConfApi: ProClassFieldConfigApi,
    public propertyLabelApi: ProPropertyLabelApi,
  ) { }

  public createEpics(): Epic {

    const proInfoProjRelEpicsFactory = new StandardEpicsFactory<ProInfoProjRelSlice, ProInfoProjRel>
      (proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);

    const proProDfhClassProjRelEpicsFactory = new StandardEpicsFactory<ProDfhClassProjRelSlice, ProDfhClassProjRel>
      (proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);

    const proClassFieldConfigEpicsFactory = new StandardEpicsFactory<ProClassFieldConfigSlice, ProClassFieldConfig>
      (proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);

    const proPropertyLabelEpicsFactory = new StandardEpicsFactory<ProPropertyLabelSlice, ProPropertyLabel>
      (proRoot, 'property_label', this.proActions.property_label, this.notification);



    return combineEpics(

      /**
       * ProInfoProjRel
       */
      proInfoProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProInfoProjRel>>((meta) => this.infoProjRelApi
        .bulkUpdateEprAttributes(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.info_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
      /**
       * ProClassFieldConfig
       */
      proClassFieldConfigEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classFieldConfApi.byProject(meta.pk), ''),
      /**
       * ProProDfhClassProjRel
       */
      proProDfhClassProjRelEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classProjRelApi.getEnabledByProject(meta.pk), ''),
      /**
      * ProProDfhClassProjRel
      */
      proPropertyLabelEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.propertyLabelApi.getDefaultLabels(meta.pk),
        ProPropertyLabelActionFactory.DEFAULT_LABELS,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.property_label.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      proPropertyLabelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProPropertyLabel>>((meta) => this.propertyLabelApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.property_label.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
      proPropertyLabelEpicsFactory.createDeleteEpic((meta) => this.propertyLabelApi.bulkDelete(meta.pk, meta.items))
    )

  }


}
