import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { ChecklistControlService } from './services/checklist-control.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [ChecklistControlService]
})
export class ChecklistControlModule { }
