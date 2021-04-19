import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Field, InformationPipesService, SubfieldPage } from '@kleiolab/lib-queries';
import { GvFieldPage, GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
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
  @Input() source: GvFieldSourceEntity
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
      source: this.source,
      property: this.field.property,
      isOutgoing: this.field.isOutgoing,
      limit: 1,
      offset: 0,
      scope: this.scope,
    }
    this.page$ = this.i.pipeFieldPage(page, fieldToGvFieldTargets(this.field), this.field.isTimeSpanShortCutField)

  }


  openList() {
    this.page$.pipe(first()).subscribe((subentityPage) => {

      const data: SubfieldDialogData = {
        title: this.field.label,
        field: this.field,
        source: this.source,
        scope: this.scope,
        showOntoInfo$: this.showOntoInfo$,
      }
      this.dialog.open(SubfieldDialogComponent, {
        data
      })
    })
  }
}
