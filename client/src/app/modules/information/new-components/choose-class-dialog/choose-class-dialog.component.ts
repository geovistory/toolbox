import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { combineLatest, Observable } from '../../../../../../node_modules/rxjs';
import { map } from '../../../../../../node_modules/rxjs/operators';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
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
    this.options$ = combineLatest(this.data.pkClasses.map(pkClass => this.c.pipeLabelOfClass(pkClass).pipe(map((label) => ({
      pkClass, label
    })))))
  }

  select(pkClass:number) {
    this.dialogRef.close(pkClass);
  }

  cancel() {
    this.dialogRef.close();
  }

}