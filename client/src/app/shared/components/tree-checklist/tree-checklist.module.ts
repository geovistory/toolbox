import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatTreeModule, MatIconModule, MatButtonModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatOptionModule, MatCommonModule } from '@angular/material';
import { TreeChecklistComponent } from './tree-checklist.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { TreeChecklistSelectDirective } from './tree-checklist-select.directive';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    OverlayModule,
    MatCommonModule,
  ],
  declarations: [
    TreeChecklistComponent,
    TreeChecklistSelectDirective
  ],
  exports: [
    TreeChecklistComponent,
    TreeChecklistSelectDirective
  ]
})
export class TreeChecklistModule { }
