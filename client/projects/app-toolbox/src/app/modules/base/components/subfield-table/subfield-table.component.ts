import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigurationPipesService, StatementWithTarget, SubentitySubfieldPage, Subfield } from '@kleiolab/lib-queries';
import { InfActions } from '@kleiolab/lib-redux';
import { GvLoadSubentitySubfieldPageReq, GvSubentitySubfieldPage, GvSubfieldId, GvSubfieldType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { indexBy, mapObjIndexed } from 'ramda';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SubfieldDialogComponent, SubfieldDialogData } from '../subfield-dialog/subfield-dialog.component';
import { SubfieldComponent } from '../subfield/subfield.component';


@Component({
  selector: 'gv-subfield-table',
  templateUrl: './subfield-table.component.html',
  styleUrls: ['./subfield-table.component.scss']
})
export class SubfieldTableComponent implements OnInit {
  @Input() items$: Observable<StatementWithTarget[]>
  @Input() subfield: Subfield
  @Input() showOntoInfo$: Observable<boolean>

  dataColumns$: Observable<{ name: string, id: string, pkProperty: number, subfieldType: GvSubfieldType }[]>
  displayedColumns$: Observable<string[]>
  dataColumnsMap$ = new BehaviorSubject<{ [key: string]: boolean; }>({});
  dataSource$: Observable<{
    stmtWT: StatementWithTarget,
    cells: { [colId: string]: SubentitySubfieldPage }
  }[]>
  constructor(
    private p: ActiveProjectService,
    private c: ConfigurationPipesService,
    private parentComponent: SubfieldComponent,
    private dialog: MatDialog,
    public inf: InfActions
  ) {
  }

  ngOnInit() {
    this.dataColumns$ = combineLatest(
      this.subfield.listType.temporalEntity.map(subentityField => {
        const page = subentityField.page;
        const domain = page.isOutgoing ? this.subfield.targetClass : null
        const range = page.isOutgoing ? null : this.subfield.targetClass
        return this.c.pipeFieldLabel(page.fkProperty, domain, range)
          .pipe(
            map(fieldLabel => {
              return {
                id: colId(page),
                name: fieldLabel,
                pkProperty: page.fkProperty,
                subfieldType: subentityField.subfieldType
              }
            })
          )
      })
    )
    const dataColMap = mapObjIndexed<GvLoadSubentitySubfieldPageReq, boolean>(
      (val, key, obj) => {
        // hideCircularField on init
        if (val.page.isCircular) return false
        return true
      },
      indexBy((l) => colId(l.page), this.subfield.listType.temporalEntity)
    );

    // wait until we have the data columns, otherwise mat-table will complain
    // about columns in the dataSource$ not present in displayedColumns$
    this.dataColumns$.pipe(first())
      .subscribe((x) => {
        this.dataColumnsMap$.next(dataColMap);

        const customCols = {
          columnsBefore: ['_classInfo_'],
          columnsAfter: ['_actions_']
        }
        this.displayedColumns$ = this.dataColumnsMap$.pipe(map((dataColumnsMap) => {
          let checked = [];
          for (const key in dataColumnsMap) {
            if (dataColumnsMap[key]) checked.push(key);
          }
          checked = [...customCols.columnsBefore, ...checked, ...customCols.columnsAfter];
          if (checked.length === 0) checked.push('_empty_');
          return checked;
        }));

        this.dataSource$ = this.items$.pipe(
          map(
            items => items.map(
              stmtWT => ({
                stmtWT: stmtWT,
                cells: indexBy((subStmtWT) => colId(subStmtWT.subfield), stmtWT.target.entity.subfields)
              })
            )
          )
        )
      })

  }
  openList(subentityPage: SubentitySubfieldPage) {
    const data: SubfieldDialogData = {
      sourceClass: this.subfield.targetClass,
      fkProperty: subentityPage.subfield.fkProperty,
      targetClass: subentityPage.subfield.targetClass,
      isOutgoing: subentityPage.subfield.isOutgoing,
      sourceEntity: subentityPage.subfield.fkSourceEntity,
      scope: this.parentComponent.scope,
      showOntoInfo$: this.parentComponent.showOntoInfo$,
    }
    // const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info)
    // this.listDialog.open(true, pkEntities, 'Items')
    this.dialog.open(SubfieldDialogComponent, {
      data
    })
    // throw new Error('TODO');
  }

  openInNewTab(item: StatementWithTarget) {
    this.p.addEntityTab(item.target.entity.pkEntity, this.subfield.targetClass)
  }

  addAndOpenInNewTab(item: StatementWithTarget) {
    this.p.addEntityToProject(item.target.entity.pkEntity, () => {
      this.openInNewTab(item)
    })
  }

  markAsFavorite(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, item.statement.pk_entity, item.isOutgoing)
    })
  }

  remove(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {

      // remove the statement
      this.inf.statement.remove([item.statement], pkProject)

      // remove the related temporal entity
      this.p.removeEntityFromProject(item.target.entity.pkEntity)
    })

  }

  toggleCol(colId: string) {
    this.dataColumnsMap$.pipe(first()).subscribe(colMap => {
      colMap[colId] = !colMap[colId];
      this.dataColumnsMap$.next(colMap);
    });
  }
}
function colId(page: GvSubentitySubfieldPage | GvSubfieldId): string {
  return page.fkProperty + '_' + page.isOutgoing + '_' + page.targetClass
}
