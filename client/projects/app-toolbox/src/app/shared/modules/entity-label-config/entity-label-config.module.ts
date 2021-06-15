import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { EntityLabelConfigDialogComponent } from './entity-label-config-dialog/entity-label-config-dialog.component';
import { EntityLabelConfigOpenBtnComponent } from './entity-label-config-open-btn/entity-label-config-open-btn.component';



@NgModule({
  declarations: [
    EntityLabelConfigDialogComponent,
    EntityLabelConfigOpenBtnComponent
  ],
  exports: [
    EntityLabelConfigOpenBtnComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class EntityLabelConfigModule { }
