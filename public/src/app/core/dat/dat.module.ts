import { NgModule } from '@angular/core';
import { DatEpics } from './dat.epics';
import { DatActions } from './dat.actions';
import { DatSelector } from './dat.service';


@NgModule({
  imports: [],
  providers: [DatEpics, DatActions, DatSelector]
})
export class DatModule { }
