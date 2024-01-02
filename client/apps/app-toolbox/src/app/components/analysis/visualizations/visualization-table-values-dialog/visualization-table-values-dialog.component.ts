import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ActiveProjectService } from "../../../../services/active-project.service";
import { ResultTableValue } from '../visualization-table/visualization-table.component';

export interface ValuesDialogData {
  values: ResultTableValue[];
}
@Component({
  selector: 'gv-visualization-table-values-dialog',
  templateUrl: './visualization-table-values-dialog.component.html',
  styleUrls: ['./visualization-table-values-dialog.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, MatButtonModule]
})
export class VisualizationTableValuesDialogComponent {

  constructor(public dialogRef: MatDialogRef<VisualizationTableValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ValuesDialogData,
    public p: ActiveProjectService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  openEntity(pkEntity: number) {
    this.p.addEntityTabWithoutClass(pkEntity)
  }

}
