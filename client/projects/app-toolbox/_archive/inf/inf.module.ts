import { NgModule } from '@angular/core';
import { InfActions } from './inf.actions';
import { InfEpics } from './inf.epics';

@NgModule({
  imports: [],
  providers: [InfEpics, InfActions]
})
export class InfModule { }
