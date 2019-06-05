import { NgModule } from '@angular/core';
import { ProEpics } from './pro.epics';
import { ProActions } from './pro.actions';
import { ProSelector } from './pro.service';


@NgModule({
  imports: [],
  providers: [ProEpics, ProActions, ProSelector]
})
export class ProModule { }
