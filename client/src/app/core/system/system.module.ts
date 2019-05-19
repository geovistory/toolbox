import { NgModule } from '@angular/core';
import { SystemActions } from './system.actions';
import { SystemEpics } from './system.epics';
import { SystemService } from './system.service';

@NgModule({
  imports: [],
  providers: [SystemEpics, SystemActions, SystemService]
})
export class SystemModule { }
