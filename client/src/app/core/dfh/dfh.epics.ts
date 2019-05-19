import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/store/epics';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DfhClass, DfhClassApi, DfhLabelApi, DfhLabel } from '../sdk';
import { DfhActions } from './dfh.actions';
import { ClassSlice, LabelSlice } from './dfh.models';
import { SysConfig } from '../config/sys-config';



@Injectable()
export class DfhEpics {
  constructor(
    private actions: DfhActions,
    private notification: NotificationsAPIActions,
    private classApi: DfhClassApi,
    private labelApi: DfhLabelApi,
  ) { }

  public createEpics(): Epic {
    const classEpicsFactory = new StandardEpicsFactory<ClassSlice, DfhClass>('dfh', 'class', this.actions.klass, this.notification);
    const labelEpicsFactory = new StandardEpicsFactory<LabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);

    return combineEpics(

      // Class Loaders      
      classEpicsFactory.createLoadEpic(this.classApi.classesOfProfile(null), ''),

      // Label Loaders
      labelEpicsFactory.createLoadEpic(this.labelApi.findComplex({
        where: ['com_fk_system_type', '=', SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS]
      }), 'CLASS_LABELS'),

      // Label Upserters
      labelEpicsFactory.createUpsertEpic((items) => this.labelApi.bulkReplaceOrCreate(items), '')
      
    );
  }


}
