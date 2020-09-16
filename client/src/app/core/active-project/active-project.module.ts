import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectActions } from './active-project.action';
import { ActiveProjectEpics } from './active-project.epics';
import { ActiveProjectService } from './active-project.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ActiveProjectActions, ActiveProjectEpics, ActiveProjectService]
})
export class ActiveProjectModule { }
