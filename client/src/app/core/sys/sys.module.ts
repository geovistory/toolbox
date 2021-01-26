import { NgModule } from '@angular/core';
import { SysActions } from './sys.actions';
import { SysEpics } from './sys.epics';
import { SysSelector } from './sys.service';

@NgModule({
  imports: [],
  providers: [SysEpics, SysActions, SysSelector]
})
export class SysModule { }
