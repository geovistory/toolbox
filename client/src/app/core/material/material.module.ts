import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MAT_HAMMER_OPTIONS } from '@angular/material';

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
  MatRippleModule,
  MatGridListModule,
]

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  providers: [
    // Enable selction of child elements of matTooltip elements
    // Read more here: https://stackoverflow.com/questions/55307860/using-angular-material-tooltip-but-cant-select-text-on-element-beneath-it
    // Related issue: https://github.com/angular/components/issues/8817
    // Attention: Deprecated – will be removed in Material 10
    {
      provide: MAT_HAMMER_OPTIONS,
      useValue: { cssProps: { userSelect: true } },
    },
  ],
  declarations: [],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
