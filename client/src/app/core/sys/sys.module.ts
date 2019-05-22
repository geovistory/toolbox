import { NgModule } from '@angular/core';
import { SysActions } from './sys.actions';
import { SysEpics } from './sys.epics';
import { SystemService } from './sys.service';

@NgModule({
  imports: [],
  providers: [SysEpics, SysActions, SystemService]
})
export class SysModule { }
