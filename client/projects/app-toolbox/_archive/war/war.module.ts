import { NgModule } from '@angular/core';
import { WarEpics } from './war.epics';
import { WarActions } from './war.actions';
import { WarSelector } from './war.service';


@NgModule({
  imports: [],
  providers: [WarEpics, WarActions, WarSelector]
})
export class WarModule { }
