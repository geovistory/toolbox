import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/store/StandardEpicsFactory';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DfhClass, DfhClassApi, DfhLabel, DfhLabelApi, DfhProfile, DfhProfileApi, DfhProperty, DfhPropertyApi } from '../sdk';
import { LoadActionMeta } from '../store/actions';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from './dfh.actions';
import { DfhClassSlice, DfhLabelSlice, DfhProfileSlice, DfhPropertySlice } from './dfh.models';



@Injectable()
export class DfhEpics {
  constructor(
    private actions: DfhActions,
    private notification: NotificationsAPIActions,
    private profileApi: DfhProfileApi,
    private classApi: DfhClassApi,
    private propertyApi: DfhPropertyApi,
    private labelApi: DfhLabelApi,
  ) { }

  public createEpics(): Epic {
    const dfhProfileEpicsFactory = new StandardEpicsFactory<DfhProfileSlice, DfhProfile>('dfh', 'profile', this.actions.profile, this.notification);
    const dfhClassEpicsFactory = new StandardEpicsFactory<DfhClassSlice, DfhClass>('dfh', 'klass', this.actions.klass, this.notification);
    const dfhLabelEpicsFactory = new StandardEpicsFactory<DfhLabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);
    const dfhPropertyEpicsFactory = new StandardEpicsFactory<DfhPropertySlice, DfhProperty>('dfh', 'property', this.actions.property, this.notification);

    return combineEpics(
      // Profile Loaders
      dfhProfileEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.profileApi.ofProject(meta.pk),
        DfhProfileActionFactory.OF_PROJECT
      ),
      // Property Loaders
      dfhPropertyEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.propertyApi.ofProject(meta.pk),
        DfhPropertyActionFactory.OF_PROJECT
      ),
      // Class Loaders
      dfhClassEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classApi.ofProject(meta.pk),
        DfhClassActionFactory.OF_PROJECT
      ),
      // Label Loaders
      dfhLabelEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.labelApi.ofProject(meta.pk),
        DfhLabelActionFactory.OF_PROJECT
      )
    )

  }


}
