import { NgModule } from '@angular/core';
import { DfhEpics } from './dfh.epics';
import { DfhActions } from './dfh.actions';
import { DfhService } from './dfh.service';

@NgModule({
  imports: [],
  providers: [DfhEpics, DfhActions, DfhService]
})
export class DfhModule { }
