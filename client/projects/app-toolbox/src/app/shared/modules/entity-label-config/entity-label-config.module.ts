import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { EntityLabelConfigDialogComponent } from './entity-label-config-dialog/entity-label-config-dialog.component';
import { EntityLabelConfigOpenBtnComponent } from './entity-label-config-open-btn/entity-label-config-open-btn.component';
import { ReactiveFormsModule } from '@angular/forms';



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
  ],
  entryComponents: [
    EntityLabelConfigDialogComponent
  ]
})
export class EntityLabelConfigModule { }
