import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


export interface InfoDialogData {
  title: string;
  infos: string;
}
export type InfoDialogReturn = undefined;

@Component({
    selector: 'gv-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent, InfoDialogReturn>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) { }

  close(): void {
    this.dialogRef.close()
  }
}
