import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ClassConfigComponent } from '../class-config/class-config.component';

export interface ClassConfigDialogData {
  fkAppContext: number
  fkClass: number
  fkProject: number
}

@Component({
    selector: 'gv-class-config-dialog',
    templateUrl: './class-config-dialog.component.html',
    styleUrls: ['./class-config-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, ClassConfigComponent, MatButtonModule, AsyncPipe]
})
export class ClassConfigDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassConfigDialogData,
  ) { }

  ngOnInit() {
  }

}
