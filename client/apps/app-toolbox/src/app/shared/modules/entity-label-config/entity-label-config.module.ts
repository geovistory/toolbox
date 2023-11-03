import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityLabelConfigDialogComponent } from './entity-label-config-dialog/entity-label-config-dialog.component';
import { EntityLabelConfigOpenBtnComponent } from './entity-label-config-open-btn/entity-label-config-open-btn.component';
import { MaterialModule } from '../../../core/material/material.module';



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
