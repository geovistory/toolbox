import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatTreeModule, MatIconModule, MatButtonModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { TreeChecklistComponent } from './tree-checklist.component';
import { TreeChecklistSelectComponent } from './tree-checklist-select.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [TreeChecklistComponent, TreeChecklistSelectComponent],
  exports: [TreeChecklistComponent, TreeChecklistSelectComponent]
})
export class TreeChecklistModule { }
