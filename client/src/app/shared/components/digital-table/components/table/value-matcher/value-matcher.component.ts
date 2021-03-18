import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActiveProjectService, InfAppellation, InfDimension, InfLangString, InfPlace, InfStatement, InfTimePrimitive } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { CtrlValueDialogComponent, CtrlValueDialogData, CtrlValueDialogResult } from 'app/modules/base/components/ctrl-value/ctrl-value-dialog.component';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ValueObjectTypeName } from '../table.component';

@Component({
  selector: 'gv-value-matcher',
  templateUrl: './value-matcher.component.html',
  styleUrls: ['./value-matcher.component.scss']
})
export class ValueMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkClass: number;
  @Input() vot: { type: ValueObjectTypeName, dimensionClass?: number }; // the column of the cell
  @Input() pkCell: number; // the subject of the statement

  pkProject: number;
  isInProject = false;
  statement$: Observable<InfStatement>;
  statement?: InfStatement;
  value$: Observable<InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitive>;
  value: InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitive | undefined;

  constructor(
    private p: ActiveProjectService,
    private dialog: MatDialog,
    private inf: InfActions,
    public c: ConfigurationPipesService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    // get pkProject
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => { this.pkProject = pkProject });

    // get the statement
    this.statement$ = this.p.inf$.statement$.by_subject_and_property$({
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
    }).pipe(
      map((statements) => {
        if (statements.length) {
          this.p.streamEntityPreview(statements[0].fk_object_info).subscribe(ep => this.isInProject = !!ep.fk_project);
          return statements[0];
        } else return undefined;
      }),

      takeUntil(this.destroy$)
    );
    this.statement$.subscribe(s => this.statement = s)

    this.value$ = this.statement$.pipe(
      filter(statement => !!statement),
      switchMap(statement => {
        if (statement) {
          if (this.vot.type === ValueObjectTypeName.appellation) return this.p.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info)
          if (this.vot.type === ValueObjectTypeName.place) return this.p.inf$.place$.by_pk_entity$.key(statement.fk_object_info)
          if (this.vot.type === ValueObjectTypeName.dimension) return this.p.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info)
          if (this.vot.type === ValueObjectTypeName.langString) return this.p.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info)
          if (this.vot.type === ValueObjectTypeName.timePrimitive) return this.p.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
        }
      }),
      takeUntil(this.destroy$)
    )
    this.value$.subscribe(v => this.value = v)
  }

  changeMatching(mode: 'create' | 'edit' | 'delete') {
    if (mode == 'delete') {
      if (this.statement) this.inf.statement.remove([this.statement], this.pkProject);
    } else {
      this.dialog.open<CtrlValueDialogComponent,
        CtrlValueDialogData, CtrlValueDialogResult>(CtrlValueDialogComponent, {
          height: 'calc(100% - 30px)',
          width: '980px',
          maxWidth: '100%',
          data: {
            vot: this.vot,
            initVal$: this.value ? this.value$ : undefined
          }
        })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (!result) return;
          const newStatement = {
            fk_subject_tables_cell: this.pkCell,
            fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
            ...result
          };
          if (mode == 'edit' && this.statement && result) {
            if (this.vot.type == ValueObjectTypeName.timePrimitive) {
              // transform object_time_primitive from InfTimePrimitiveWithCalendar into InfTimePrimitive
            } else {
              this.inf.statement.remove([this.statement], this.pkProject).resolved$.subscribe(result2 => {
                this.inf.statement.upsert([newStatement], this.pkProject);
              });
            }
          } else this.inf.statement.upsert([newStatement], this.pkProject);
        });
    }
  }
}
