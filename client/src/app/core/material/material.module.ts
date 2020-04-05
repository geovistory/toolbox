import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule, MatToolbarModule, MatRippleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const modules = [
  FormsModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatRadioModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatTreeModule,
  MatSidenavModule,
  MatOptionModule,
  MatStepperModule,
  MatSliderModule,
  MatToolbarModule,
  MatRippleModule
]

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  providers: [],
  declarations: [],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
