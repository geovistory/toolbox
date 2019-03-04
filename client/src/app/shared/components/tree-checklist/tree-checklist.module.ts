import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCommonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTreeModule } from '@angular/material';
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
