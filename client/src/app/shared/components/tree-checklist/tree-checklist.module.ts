import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { TreeChecklistSelectComponent } from './tree-checklist-select/tree-checklist-select.component';
import { TreeChecklistComponent } from './tree-checklist.component';


@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    OverlayModule,
    MatCommonModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  declarations: [
    TreeChecklistComponent,
    TreeChecklistSelectComponent
  ],
  exports: [
    TreeChecklistSelectComponent,
    TreeChecklistComponent,
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    OverlayModule,
    MatCommonModule,
  ]
})
export class TreeChecklistModule { }
