import { NgFor } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { FactoidControllerService, FactoidMapping } from '@kleiolab/lib-sdk-lb4';
import { first } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { FactoidMappingComponent } from '../factoid-mapping/factoid-mapping.component';

export interface FactoidMappingsDialogData {
  pkTable: number
}

@Component({
  selector: 'gv-factoid-mappings-dialog',
  templateUrl: './factoid-mappings-dialog.component.html',
  styleUrls: ['./factoid-mappings-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, NgFor, FactoidMappingComponent, MatDialogModule]
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
    private state: StateFacade,
    private factoidAPI: FactoidControllerService,
  ) { }

  ngOnInit(): void {
    this.pkTable = this.data.pkTable;
    this.pkProject = this.state.pkProject;

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
    this.fms.unshift({
      pkDigital: this.pkTable,
      properties: [],
      isNew: true  // trick to make new Factoid mapping open by default. Not so clean, but it is a quick fix.
    } as FactoidMapping)
    this.checkValid();
  }

  checkValid() {
    this.valid = true
    for (const fm of this.fms) {
      if (!fm.pkClass) this.valid = false;
      for (const fpm of fm.properties) {
        if (!fpm.pkProperty) this.valid = false;
        if (!fpm.pkColumn) this.valid = false;
      }
    }
  }
}
