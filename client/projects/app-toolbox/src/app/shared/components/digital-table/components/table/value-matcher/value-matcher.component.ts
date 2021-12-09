import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { InfActions, ReduxMainService } from '@kleiolab/lib-redux';
import { InfStatement, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { CtrlValueDialogComponent, CtrlValueDialogData, CtrlValueDialogResult } from 'projects/app-toolbox/src/app/modules/base/components/ctrl-value/ctrl-value-dialog.component';
import { Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { InfValueObject } from '../../../../value-preview/value-preview.component';

// export type InfValueObjectType = InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitiveWithCalendar | InfLanguage;

@Component({
  selector: 'gv-value-matcher',
  templateUrl: './value-matcher.component.html',
  styleUrls: ['./value-matcher.component.scss']
})
export class ValueMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkClass: number;
  @Input() vot: SysConfigValueObjectType | undefined; // the column of the cell
  @Input() pkCell: number; // the subject of the statement

  pkProject: number;
  isInProject = false;
  statement$: Observable<InfStatement>;
  statement?: InfStatement;
  value$: Observable<InfValueObject>;
  value: InfValueObject | undefined;

  constructor(
    private p: ActiveProjectService,
    private dialog: MatDialog,
    private inf: InfActions,
    public c: ConfigurationPipesService,
    private s: SchemaSelectorsService,
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    // get pkProject
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => { this.pkProject = pkProject });

    // get the statement
    this.statement$ = this.s.inf$.statement$.by_subject_and_property$({
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
    );
    this.statement$.subscribe(s => this.statement = s)

    this.value$ = this.statement$.pipe(
      filter(statement => !!statement),
      switchMap(statement => {
        if (statement) {
          if (this.vot.appellation) {
            return this.p.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({ appellation: value })))
          }
          if (this.vot.place) {
            return this.p.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({ place: value })))
          }
          if (this.vot.dimension) {
            return this.p.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({ dimension: value })))
          }
          if (this.vot.langString) {
            return this.p.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({ langString: value })))
          }
          if (this.vot.language) {
            return this.p.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({ language: value })))
          }
          if (this.vot.timePrimitive) {
            return this.p.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap(value => of({
              timePrimitive: {
                julianDay: value.julian_day,
                duration: value.duration,
                calendar: value.calendar
              }
            })))
          }
        }
      }),
      takeUntil(this.destroy$)
    )
    this.value$.subscribe(vv => this.value = vv)
  }

  changeMatching(mode: 'create' | 'edit' | 'delete') {
    if (mode == 'delete') {
      if (this.statement) this.dataService.removeInfEntitiesFromProject([this.statement.pk_entity], this.pkProject);
    } else {
      this.dialog.open<CtrlValueDialogComponent,
        CtrlValueDialogData, CtrlValueDialogResult>(CtrlValueDialogComponent, {
          // height: 'calc(30%)',
          // width: '400px',
          maxWidth: '100%',
          data: {
            vot: this.vot,
            pkClass: this.pkClass,
            initVal$: this.value ? this.value$ : undefined,
            pkProject: this.pkProject
          }
        })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (!result) return;
          const newStatement: InfStatement = {
            fk_subject_tables_cell: this.pkCell,
            fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
            ...result
          };
          if (mode == 'edit' && this.statement && result) {
            this.dataService.removeInfEntitiesFromProject([this.statement.pk_entity], this.pkProject).subscribe(result2 => {
              this.dataService.upsertInfStatementsWithRelations(this.pkProject, [newStatement]);
            });
          } else this.dataService.upsertInfStatementsWithRelations(this.pkProject, [newStatement]);
        });
    }
  }
}
