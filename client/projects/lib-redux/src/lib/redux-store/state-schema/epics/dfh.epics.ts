import { Injectable } from '@angular/core';
import { combineEpics, Epic } from 'redux-observable-es6-compat';


@Injectable({
  providedIn: 'root'
})
export class DfhEpics {
  constructor(
    // private actions: DfhActions,
    // private notification: NotificationsAPIActions,
    // private classApi: DfhClassControllerService,
    // private propertyApi: DfhPropertyControllerService,
    // private labelApi: DfhLabelApi,
  ) { }

  public createEpics(): Epic {
    // const dfhProfileEpicsFactory = new SchemaEpicsFactory<DfhProfileSlice, DfhProfile>('dfh', 'profile', this.actions.profile, this.notification);
    // const dfhClassEpicsFactory = new SchemaEpicsFactory<DfhClassSlice, DfhClass>('dfh', 'klass', this.actions.klass, this.notification);
    // const dfhLabelEpicsFactory = new SchemaEpicsFactory<DfhLabelSlice, DfhLabel>('dfh', 'label', this.actions.label, this.notification);
    // const dfhPropertyEpicsFactory = new SchemaEpicsFactory<DfhPropertySlice, DfhProperty>('dfh', 'property', this.actions.property, this.notification);

    return combineEpics(

      // // Property Loaders
      // dfhPropertyEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.propertyApi.dfhPropertyControllerOfProject(meta.pk),
      //   DfhPropertyActionFactory.OF_PROJECT
      // ),
      // // Class Loaders
      // dfhClassEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.classApi.dfhClassControllerOfProject(meta.pk),
      //   DfhClassActionFactory.OF_PROJECT
      // ),
      // // Label Loaders
      // dfhLabelEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.labelApi.ofProject(meta.pk),
      //   DfhLabelActionFactory.OF_PROJECT
      // )
    )

  }


}
