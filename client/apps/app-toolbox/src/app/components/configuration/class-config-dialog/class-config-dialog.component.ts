import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { ClassConfigComponent } from '../class-config/class-config.component';

export interface ClassConfigDialogData {
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
export class ClassConfigDialogComponent {
  classLabel$: Observable<string>
  constructor(
    public dialogRef: MatDialogRef<ClassConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassConfigDialogData,
    private c: ConfigurationPipesService
  ) {
    this.classLabel$ = this.c.pipeClassLabel(data.fkClass)
  }
}
