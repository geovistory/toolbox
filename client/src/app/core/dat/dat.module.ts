import { NgModule } from '@angular/core';
import { DatEpics } from './dat.epics';
import { DatActions } from './dat.actions';


@NgModule({
  imports: [],
  providers: [DatEpics, DatActions]
})
export class DatModule { }
