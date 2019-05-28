import { NgModule } from '@angular/core';
import { SysActions } from './sys.actions';
import { SysEpics } from './sys.epics';
import { SystemSelector } from './sys.service';

@NgModule({
  imports: [],
  providers: [SysEpics, SysActions, SystemSelector]
})
export class SysModule { }
