import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { indexBy, sortBy } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
export interface ChooseClassDialogData {
  title: string;
  pkClasses: number[]
  showOntoInfo$: Observable<boolean>
}
export type ChooseClassDialogReturn = number
@Component({
  selector: 'gv-choose-class-dialog',
  templateUrl: './choose-class-dialog.component.html',
  styleUrls: ['./choose-class-dialog.component.scss']
})
export class ChooseClassDialogComponent implements OnInit {

  options$: Observable<{ pkClass: number, label: string, docUrl?: string }[]>

  ontomeUrl = SysConfig.ONTOME_URL

  constructor(
    public dialogRef: MatDialogRef<ChooseClassDialogComponent, ChooseClassDialogReturn>,
    @Inject(MAT_DIALOG_DATA) public data: ChooseClassDialogData,
    private c: ConfigurationPipesService
  ) { }

  async ngOnInit() {
    const classes = await this.c.pipeClassesOfProject().pipe(first()).toPromise()
    const idx = indexBy(c => c.dfhClass.pk_class.toString(), classes)
    this.options$ = combineLatest(this.data.pkClasses.map(pkClass => this.c.pipeClassLabel(pkClass).pipe(map((label) => ({
      pkClass, label, docUrl: idx[pkClass]?.classConfig?.docUrl
    }))))).pipe(
      map(items => sortBy(i => i.label, items))
    )
  }

  select(pkClass: number) {
    this.dialogRef.close(pkClass);
  }

  cancel() {
    this.dialogRef.close();
  }

}
