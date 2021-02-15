import { NgModule } from '@angular/core';
import { DfhEpics } from './dfh.epics';
import { DfhActions } from './dfh.actions';
import { DfhSelector } from './dfh.service';

@NgModule({
  imports: [],
  providers: [DfhEpics, DfhActions, DfhSelector]
})
export class DfhModule { }
