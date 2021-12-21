import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactoidControllerService, FactoidMapping } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { first } from 'rxjs/operators';

export interface FactoidMappingsDialogData {
  pkTable: number
}

@Component({
  selector: 'gv-factoid-mappings-dialog',
  templateUrl: './factoid-mappings-dialog.component.html',
  styleUrls: ['./factoid-mappings-dialog.component.scss']
})
export class FactoidMappingsDialogComponent implements OnInit {

  @Input() pkTable: number;

  pkProject: number;
  fms: Array<FactoidMapping> = [];
  valid = true;

  constructor(
    public dialogRef: MatDialogRef<FactoidMappingsDialogData, Array<FactoidMapping>>,
    @Inject(MAT_DIALOG_DATA) public data: FactoidMappingsDialogData,
    private p: ActiveProjectService,
    private factoidAPI: FactoidControllerService,
  ) { }

  ngOnInit(): void {
    this.pkTable = this.data.pkTable;
    this.p.pkProject$.pipe(first()).subscribe(pkProject => this.pkProject = pkProject)

    this.factoidAPI.factoidControllerGetDigitalFactoidMapping(this.pkProject + '', this.pkTable)
      .pipe(first()).subscribe(dfm => this.fms = dfm?.mappings ?? [])
  }

  onSave() {
    this.factoidAPI.factoidControllerSetDigitalFactoidMapping(this.pkProject + '', this.pkTable, {
      pkTable: this.pkTable,
      mappings: this.fms
    }).pipe(first()).subscribe(result => {
      this.dialogRef.close(result.mappings);
    })
  }

  fmChanged(index: number, fm: FactoidMapping) {
    this.fms[index] = fm
    this.checkValid();
  }

  delete(index: number) {
    this.fms.splice(index, 1);
    this.checkValid();
  }

  fmCreate() {
    this.fms.push({
      pkDigital: this.pkTable,
      properties: []
    })
    this.checkValid();
  }

  checkValid() {
    this.valid = true
    for (let fm of this.fms) {
      if (!fm.pkClass) this.valid = false;
      for (let fpm of fm.properties) {
        if (!fpm.pkProperty) this.valid = false;
        if (!fpm.pkColumn) this.valid = false;
      }
    }
  }
}
