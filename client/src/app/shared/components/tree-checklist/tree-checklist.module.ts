import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCommonModule, MatIconModule, MatOptionModule, MatSelectModule, MatTreeModule } from '@angular/material';
import { TreeChecklistSelectDirective } from './tree-checklist-select.directive';
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
  ],
  declarations: [
    TreeChecklistComponent,
    TreeChecklistSelectDirective
  ],
  exports: [
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
