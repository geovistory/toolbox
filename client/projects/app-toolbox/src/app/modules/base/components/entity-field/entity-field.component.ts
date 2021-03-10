import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InformationPipesService, Subfield, SubfieldPage } from '@kleiolab/lib-queries';
import { GvSubfieldPage, GvSubfieldPageScope, GvSubfieldType } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { SubfieldDialogComponent, SubfieldDialogData } from '../subfield-dialog/subfield-dialog.component';

@Component({
  selector: 'gv-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.scss']
})
export class EntityFieldComponent implements OnInit {
  @Input() subfield: Subfield
  @Input() pkSourceEntity: number
  @Input() scope: GvSubfieldPageScope
  @Input() showOntoInfo$: Observable<boolean>
  page$: Observable<SubfieldPage>
  constructor(
    private i: InformationPipesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    const page: GvSubfieldPage = {
      fkSourceEntity: this.pkSourceEntity,
      fkProperty: this.subfield.property.pkProperty,
      isOutgoing: this.subfield.isOutgoing,
      targetClass: this.subfield.targetClass,
      limit: 1,
      offset: 0,
      scope: this.scope,
    }
    const subfieldType: GvSubfieldType = this.subfield.listType
    this.page$ = this.i.pipeSubfieldPage(page, subfieldType)
  }


  openList() {
    this.page$.pipe(first()).subscribe((subentityPage) => {

      const data: SubfieldDialogData = {
        sourceClass: this.subfield.targetClass,
        fkProperty: this.subfield.property.pkProperty,
        targetClass: this.subfield.targetClass,
        isOutgoing: this.subfield.isOutgoing,
        sourceEntity: this.pkSourceEntity,
        scope: this.scope,
        showOntoInfo$: this.showOntoInfo$,
      }
      // const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info)
      // this.listDialog.open(true, pkEntities, 'Items')
      this.dialog.open(SubfieldDialogComponent, {
        data
      })
    })
    // throw new Error('TODO');
  }
}
