import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DfhClass, DfhClassApi, DfhLabelApi, DfhLabel } from '../sdk';
import { DfhActions } from './dfh.actions';
import { ClassSlice, LabelSlice } from './dfh.models';
import { SysConfig } from '../config/sys-config';
import * as Config from '../../../../../common/config/Config';
import { ModifyActionMeta } from '../store/actions';



@Injectable()
export class DfhEpics {
  constructor(
    private actions: DfhActions,
    private notification: NotificationsAPIActions,
    private classApi: DfhClassApi,
    private labelApi: DfhLabelApi,
  ) { }

  public createEpics(): Epic {
    const classEpicsFactory = new StandardEpicsFactory<ClassSlice, DfhClass>('dfh', 'klass', this.actions.klass, this.notification);
    const labelEpicsFactory = new StandardEpicsFactory<LabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);

    return combineEpics(

      // Class Loaders
      classEpicsFactory.createLoadEpic((action) => this.classApi.classesOfProfile(null), ''),

      // Label Loaders
      labelEpicsFactory.createLoadEpic((action) => this.labelApi.findComplex({
        where: ['com_fk_system_type', '=', SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS]
      }), 'CLASS_LABELS'),

      // Label Loaders
      labelEpicsFactory.createLoadEpic((action) => this.labelApi.findComplex({
        where: ['com_fk_system_type', 'IN', [
          Config.PROPERTY_LABEL_SG,
          Config.PROPERTY_LABEL_PL,
          Config.PROPERTY_LABEL_INVERSED_SG,
          Config.PROPERTY_LABEL_INVERSED_PL
        ]]
      }), 'PROPERTY_LABELS'),

      // Label Upserter
      labelEpicsFactory.createUpsertEpic<ModifyActionMeta<DfhLabel>>((meta) => {
        return this.labelApi.bulkReplaceOrCreate(meta.items)
      }),

      // Label Deleter
      labelEpicsFactory.createDeleteEpic((items) => {
        return this.labelApi.bulkDelete(items)
      })

    );
  }


}