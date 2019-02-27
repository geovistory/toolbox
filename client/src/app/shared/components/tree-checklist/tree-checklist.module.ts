import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCommonModule, MatIconModule, MatOptionModule, MatSelectModule, MatTreeModule, MatFormFieldModule, MatMenuModule } from '@angular/material';
import { TreeChecklistSelectDirective } from './tree-checklist-select.directive';
import { TreeChecklistComponent } from './tree-checklist.component';
import { TreeChecklistSelectComponent } from './tree-checklist-select/tree-checklist-select.component';


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
    TreeChecklistSelectDirective,
    TreeChecklistSelectComponent
  ],
  exports: [
    TreeChecklistSelectComponent,
    TreeChecklistComponent,
    TreeChecklistSelectDirective,
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
