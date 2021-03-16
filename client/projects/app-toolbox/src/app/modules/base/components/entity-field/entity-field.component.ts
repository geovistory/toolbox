import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Field, InformationPipesService, SubfieldPage } from '@kleiolab/lib-queries';
import { GvFieldPage, GvFieldPageScope } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { fieldToGvFieldTargets } from '../../base.helpers';
import { SubfieldDialogComponent, SubfieldDialogData } from '../subfield-dialog/subfield-dialog.component';

@Component({
  selector: 'gv-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.scss']
})
export class EntityFieldComponent implements OnInit {
  @Input() field: Field
  @Input() pkSourceEntity: number
  @Input() scope: GvFieldPageScope
  @Input() showOntoInfo$: Observable<boolean>
  isCircular = false;
  page$: Observable<SubfieldPage>
  constructor(
    private i: InformationPipesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const page: GvFieldPage = {
      fkSourceEntity: this.pkSourceEntity,
      fkProperty: this.field.property.pkProperty,
      isOutgoing: this.field.isOutgoing,
      limit: 1,
      offset: 0,
      scope: this.scope,
    }
    this.page$ = this.i.pipeSubfieldPage(page, fieldToGvFieldTargets(this.field))

  }


  openList() {
    this.page$.pipe(first()).subscribe((subentityPage) => {

      const data: SubfieldDialogData = {
        title: this.field.label,
        field: this.field,
        sourceEntity: this.pkSourceEntity,
        scope: this.scope,
        showOntoInfo$: this.showOntoInfo$,
      }
      this.dialog.open(SubfieldDialogComponent, {
        data
      })
    })
  }
}
