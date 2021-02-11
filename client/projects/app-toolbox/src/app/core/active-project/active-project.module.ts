import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectActions } from './active-project.action';
import { ActiveProjectEpics } from './active-project.epics';
import { ActiveProjectService } from './active-project.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShouldPauseService } from '../services/should-pause.service';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    ShouldPauseService,
    ActiveProjectActions,
    ActiveProjectEpics,
    ActiveProjectService]
})
export class ActiveProjectModule { }
