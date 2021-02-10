import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InformationPipesService } from '../../../../core/redux-queries/services/information-pipes.service';
import { ConfigurationPipesService } from 'projects/toolbox/src/app/core/redux-queries/services/configuration-pipes.service';
export interface ChooseClassDialogData {
  title: string;
  pkClasses: number[]
}

@Component({
  selector: 'gv-choose-class-dialog',
  templateUrl: './choose-class-dialog.component.html',
  styleUrls: ['./choose-class-dialog.component.scss']
})
export class ChooseClassDialogComponent implements OnInit {

  options$: Observable<{ pkClass: number, label: string }[]>

  constructor(public dialogRef: MatDialogRef<ChooseClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChooseClassDialogData,
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    this.options$ = combineLatest(this.data.pkClasses.map(pkClass => this.c.pipeClassLabel(pkClass).pipe(map((label) => ({
      pkClass, label
    })))))
  }

  select(pkClass: number) {
    this.dialogRef.close(pkClass);
  }

  cancel() {
    this.dialogRef.close();
  }

}
