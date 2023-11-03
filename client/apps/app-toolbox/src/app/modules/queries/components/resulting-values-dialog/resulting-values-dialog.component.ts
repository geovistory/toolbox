import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectService } from "../../../../core/active-project/active-project.service";
import { ResultTableValue } from '../result-table/result-table.component';

export interface ValuesDialogData {
  values: ResultTableValue[];
}
@Component({
  selector: 'gv-resulting-values-dialog',
  templateUrl: './resulting-values-dialog.component.html',
  styleUrls: ['./resulting-values-dialog.component.scss']
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
