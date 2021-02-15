import { Injectable } from '@angular/core';
import { SchemaEpicsFactory } from "@kleiolab/lib-redux";
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from "@kleiolab/lib-redux";
import { LoadActionMeta } from "@kleiolab/lib-redux";
import { DfhLabel, DfhLabelApi, DfhProfile, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhProperty } from "@kleiolab/lib-sdk-lb4";
import { DfhClassControllerService } from "@kleiolab/lib-sdk-lb4";
import { DfhClass } from "@kleiolab/lib-sdk-lb4";
import { DfhPropertyControllerService } from "@kleiolab/lib-sdk-lb4";
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from './dfh.actions';
import { DfhClassSlice, DfhLabelSlice, DfhProfileSlice, DfhPropertySlice } from './dfh.models';



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
    const dfhProfileEpicsFactory = new SchemaEpicsFactory<DfhProfileSlice, DfhProfile>('dfh', 'profile', this.actions.profile, this.notification);
    const dfhClassEpicsFactory = new SchemaEpicsFactory<DfhClassSlice, DfhClass>('dfh', 'klass', this.actions.klass, this.notification);
    const dfhLabelEpicsFactory = new SchemaEpicsFactory<DfhLabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);
    const dfhPropertyEpicsFactory = new SchemaEpicsFactory<DfhPropertySlice, DfhProperty>('dfh', 'property', this.actions.property, this.notification);

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
