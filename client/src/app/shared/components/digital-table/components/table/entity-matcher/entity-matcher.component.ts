import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActiveProjectService, InfStatement, SysConfig } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { first, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from 'app/modules/base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from 'app/modules/base/components/ctrl-entity/ctrl-entity.component';
import { InfActions } from 'app/core/inf/inf.actions';

@Component({
  selector: 'gv-entity-matcher',
  templateUrl: './entity-matcher.component.html',
  styleUrls: ['./entity-matcher.component.scss']
})
export class EntityMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkClass: number; // the column of the cell
  @Input() pkCell: number; // the subject of the statement

  pkProject: number;
  statement?: InfStatement;

  constructor(
    private p: ActiveProjectService,
    private dialog: MatDialog,
    private inf: InfActions
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => { this.pkProject = pkProject });

    // pipe the pkEntity$
    this.p.inf$.statement$.by_subject_and_property$({
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
    }).pipe(
      map((statements) => {
        if (statements.length) return statements[0];
        else return undefined;
      }),
      takeUntil(this.destroy$)
    ).subscribe(statement => this.statement = statement);
  }

  changeMapping(mode: 'create' | 'edit' | 'delete') {
    if (mode == 'delete') {
      if (this.statement) this.inf.statement.remove([this.statement], this.pkProject);
    } else {
      this.dialog.open<CtrlEntityDialogComponent,
        CtrlEntityDialogData,
        CtrlEntityModel>(CtrlEntityDialogComponent, {
          height: 'calc(100% - 30px)',
          width: '980px',
          maxWidth: '100%',
          data: {
            initVal$: new BehaviorSubject(undefined),
            showAddList: true,
            hiddenProperty: { pkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
            alreadyInProjectBtnText: 'Select',
            notInProjectClickBehavior: 'selectOnly',
            notInProjectBtnText: 'Select',
            disableIfHasStatement: undefined,
            classAndTypePk: { pkClass: this.pkClass, pkType: undefined },
            pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
          }
        })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (!!result) {
            if (mode == 'edit' && this.statement) {
              this.inf.statement.remove([this.statement], this.pkProject).resolved$.subscribe(result2 => {
                if (result2) {
                  this.upsertStatement(result);
                }
              });
            } else this.upsertStatement(result);
          }
        });
    }
  }



  openEntity = () => this.p.addEntityTab(this.statement.fk_object_info, this.pkClass);

  private upsertStatement(result: CtrlEntityModel) {
    this.inf.statement.upsert([{
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
      fk_object_info: result.pkEntity
    } as InfStatement], this.pkProject);
  }
}