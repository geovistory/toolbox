import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/redux-store/StandardEpicsFactory';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DfhClassApi, DfhLabel, DfhLabelApi, DfhProfile, DfhProfileApi, } from '../sdk';
import { LoadActionMeta } from '../redux-store/actions';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from './dfh.actions';
import { DfhClassSlice, DfhLabelSlice, DfhProfileSlice, DfhPropertySlice } from './dfh.models';
import { DfhPropertyControllerService } from '../sdk-lb4/api/dfhPropertyController.service';
import { DfhClass, DfhProperty, DfhClassControllerService } from '../sdk-lb4';



@Injectable()
export class DfhEpics {
  constructor(
    private actions: DfhActions,
    private notification: NotificationsAPIActions,
    private profileApi: DfhProfileApi,
    private classApi: DfhClassControllerService,
    private propertyApi: DfhPropertyControllerService,
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
      dfhPropertyEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.propertyApi.dfhPropertyControllerOfProject(meta.pk),
        DfhPropertyActionFactory.OF_PROJECT
      ),
      // Class Loaders
      dfhClassEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classApi.dfhClassControllerOfProject(meta.pk),
        DfhClassActionFactory.OF_PROJECT
      ),
      // Label Loaders
      dfhLabelEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.labelApi.ofProject(meta.pk),
        DfhLabelActionFactory.OF_PROJECT
      )
    )

  }


}
