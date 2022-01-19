import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from 'projects/app-toolbox/src/app/modules/base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from 'projects/app-toolbox/src/app/modules/base/components/ctrl-entity/ctrl-entity.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TableComponent } from '../table.component';


@Component({
  selector: 'gv-entity-matcher',
  templateUrl: './entity-matcher.component.html',
  styleUrls: ['./entity-matcher.component.scss']
})
export class EntityMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkClass: number; // the column of the cell
  @Input() pkCell: number; // the subject of the statement
  @Input() cellContent: string; // the content of the cell (for auto search)

  pkProject: number;
  statement?: InfStatement;
  isInProject = false;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
    private dialog: MatDialog,
    private dataService: ReduxMainService,
    @Inject(forwardRef(() => TableComponent)) public tableComponent: TableComponent
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => { this.pkProject = pkProject });

    // pipe the pkEntity$
    this.s.inf$.statement$.by_subject_and_property$({
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
    }).pipe(
      map((statements) => {
        if (statements.length) {
          this.ap.streamEntityPreview(statements[0].fk_object_info).subscribe(ep => this.isInProject = !!ep.fk_project);
          return statements[0];
        } else return undefined;
      }),
      takeUntil(this.destroy$)
    ).subscribe(statement => this.statement = statement);
  }

  changeMatching(mode: 'create' | 'edit' | 'delete') {
    if (mode == 'delete') {
      if (this.statement) this.dataService.removeInfEntitiesFromProject([this.statement.pk_entity], this.pkProject);
    } else {
      this.dialog.open<CtrlEntityDialogComponent,
        CtrlEntityDialogData,
        CtrlEntityModel>(CtrlEntityDialogComponent, {
          height: 'calc(100% - 30px)',
          width: '980px',
          maxWidth: '100%',
          panelClass: 'gv-no-padding',
          data: {
            initVal$: new BehaviorSubject(undefined),
            showAddList: true,
            hiddenProperty: { fkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
            disableIfHasStatement: undefined,
            pkClass: this.pkClass,
            defaultSearch: this.cleanCellTextForSearch(this.cellContent)
          }
        })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (mode == 'edit' && this.statement && result) {
            this.dataService.removeInfEntitiesFromProject([this.statement.pk_entity], this.pkProject).subscribe(result2 => {
              if (result2) this.handleDialogResponse(result);
            });
          } else this.handleDialogResponse(result);
        });
    }
  }

  openEntity = () => this.p.addEntityTab(this.statement.fk_object_info, this.pkClass);

  addAndOpenEntity() {
    this.p.addEntityToProject(this.statement.fk_object_info, () => {
      this.p.addEntityTab(this.statement.fk_object_info, this.pkClass)
    })
  }

  private handleDialogResponse(result: CtrlEntityModel) {
    if (result && result.resource) {
      this.dataService.upsertInfResourcesWithRelations(this.pkProject, [result.resource]).subscribe(result2 => {
        try {
          if (result2) this.upsertStatement(result2.positive.inf.resource[0].pk_entity);
        } catch (error) {
          console.warn(`error when trying to upsert statement with fk_object_info from result2.positive.inf.resource[0].pk_entity`)
        }
      });
    }
    else if (result && result.pkEntity) {
      this.upsertStatement(result.pkEntity);
    }
  }

  private upsertStatement(pkEntity: number) {
    this.dataService.upsertInfStatementsWithRelations(this.pkProject, [{
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
      fk_object_info: pkEntity
    }])
  }

  private cleanCellTextForSearch(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').map(s => s.slice(0, 4)).join(' ')
  }

}
