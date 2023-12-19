import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ActiveProjectService } from "../../../../services/active-project.service";
import { ResultTableValue } from '../result-table/result-table.component';

export interface ValuesDialogData {
  values: ResultTableValue[];
}
@Component({
  selector: 'gv-resulting-values-dialog',
  templateUrl: './resulting-values-dialog.component.html',
  styleUrls: ['./resulting-values-dialog.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, MatButtonModule]
})
export class ResultingValuesDialogComponent {

  constructor(public dialogRef: MatDialogRef<ResultingValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ValuesDialogData,
    public p: ActiveProjectService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  openEntity(pkEntity: number) {
    this.p.addEntityTabWithoutClass(pkEntity)
  }

}
