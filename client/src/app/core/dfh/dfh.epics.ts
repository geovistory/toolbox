import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable';
import { DfhClass, DfhClassApi, DfhLabelApi, DfhLabel, DfhPropertyProfileView, DfhPropertyProfileViewApi, DfhPropertyView, DfhPropertyViewApi } from '../sdk';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory } from './dfh.actions';
import { DfhClassSlice, DfhLabelSlice, DfhPropertyProfileViewSlice, DfhPropertyViewSlice } from './dfh.models';
import { SysConfig } from '../config/sys-config';
import * as Config from '../../../../../common/config/Config';
import { ModifyActionMeta, LoadActionMeta } from '../store/actions';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';



@Injectable()
export class DfhEpics {
  constructor(
    private actions: DfhActions,
    private notification: NotificationsAPIActions,
    private classApi: DfhClassApi,
    private labelApi: DfhLabelApi,
    private propProfileApi: DfhPropertyProfileViewApi,
    private propertyViewApi: DfhPropertyViewApi
  ) { }

  public createEpics(): Epic {
    const dfhClassEpicsFactory = new StandardEpicsFactory<DfhClassSlice, DfhClass>('dfh', 'klass', this.actions.klass, this.notification);
    const dfhLabelEpicsFactory = new StandardEpicsFactory<DfhLabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);
    const dfhPropertyViewEpicsFactory = new StandardEpicsFactory<DfhPropertyViewSlice, DfhPropertyView>('dfh', 'property_view', this.actions.property_view, this.notification);
    const dfhPropertyProfileViewEpicsFactory = new StandardEpicsFactory<DfhPropertyProfileViewSlice, DfhPropertyProfileView>('dfh', 'property_profile_view', this.actions.property_profile_view, this.notification);

    return combineEpics(

      // Class Loaders
      dfhClassEpicsFactory.createLoadEpic((meta) => this.classApi.classesOfProfile(null), ''),
      dfhClassEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classApi.classesOfProjectProfiles(meta.pk),
        DfhClassActionFactory.CLASSES_OF_PROJECT_PROFILE
      ),

      // Label Loaders
      dfhLabelEpicsFactory.createLoadEpic((meta) => this.labelApi.findComplex({
        where: ['com_fk_system_type', '=', SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS]
      }), DfhLabelActionFactory.LABELS_OF_CLASSES),

      // Label Loaders
      dfhLabelEpicsFactory.createLoadEpic((meta) => this.labelApi.findComplex({
        where: ['com_fk_system_type', 'IN', [
          Config.PROPERTY_LABEL_SG,
          Config.PROPERTY_LABEL_PL,
          Config.PROPERTY_LABEL_INVERSED_SG,
          Config.PROPERTY_LABEL_INVERSED_PL
        ]]
      }), DfhLabelActionFactory.LABELS_OF_PROPERTIES),

      // Label Upserter
      dfhLabelEpicsFactory.createUpsertEpic<ModifyActionMeta<DfhLabel>>((meta) => {
        return this.labelApi.bulkReplaceOrCreate(meta.items)
      }),

      // Label Deleter
      dfhLabelEpicsFactory.createDeleteEpic((items) => {
        return this.labelApi.bulkDelete(items)
      }),

      // Load all property profile views
      dfhPropertyProfileViewEpicsFactory.createLoadEpic(() => this.propProfileApi.find(), '', ),

      // Load Property View
      dfhPropertyViewEpicsFactory.createLoadEpic(() => this.propertyViewApi.find(), ''))

  }


}
