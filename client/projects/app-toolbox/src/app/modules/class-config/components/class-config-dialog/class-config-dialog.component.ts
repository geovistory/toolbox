import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ClassConfigDialogData {
  fkAppContext: number
  fkClass: number
  fkProject: number
}

@Component({
  selector: 'gv-class-config-dialog',
  templateUrl: './class-config-dialog.component.html',
  styleUrls: ['./class-config-dialog.component.scss']
})
export class ClassConfigDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassConfigDialogData,
  ) { }

  ngOnInit() {
  }

}
