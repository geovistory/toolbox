import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPaginationObject, ImportTableResponse, ProjectDataService, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ImporterComponent, ImporterDialogData } from '../importer/importer.component';
interface PkTableValueLoader {
  loading: boolean,
  error: boolean,
  hasValueCount?: number,
  pkTableValue?: number
}
@Component({
  selector: 'gv-view-field-has-table-value',
  templateUrl: './view-field-has-table-value.component.html',
  styleUrls: ['./view-field-has-table-value.component.scss']
})
export class ViewFieldHasTableValueComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  // @Input() field: Field
  @Input() scope: GvFieldPageScope
  @Input() source: GvFieldSourceEntity
  @Input() readonly$: BehaviorSubject<boolean>
  // @Input() showOntoInfo$: Observable<boolean>
  loadTrigger$ = new BehaviorSubject<void>(undefined)
  pkTableValueLoader$: Observable<PkTableValueLoader>
  pkHasValuePk = DfhApiPropertyMock.EN_99006_TABLE_HAS_VALUE.dfh_pk_property
  constructor(
    public fieldApi: SubfieldPageControllerService,
    public dataApi: ReduxMainService,
    public projectData: ProjectDataService,
    public dialog: MatDialog,
    public p: ActiveProjectService,
  ) {

  }

  ngOnInit(): void {
    const errors: string[] = []
    // if (!this.field) errors.push('@Input() field is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.source) errors.push('@Input() source is required.');
    // if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));


    this.pkTableValueLoader$ = this.initPkTableValueLoader();
  }



  initPkTableValueLoader(): Observable<PkTableValueLoader> {
    return this.loadTrigger$.pipe(
      switchMap(() => this.fieldApi.subfieldPageControllerLoadSubfieldPages([{
        page: {
          isOutgoing: true,
          limit: 1,
          offset: 0,
          property: { fkProperty: this.pkHasValuePk },
          scope: this.scope,
          source: this.source
        },
        pkProject: this.scope.inProject,
        targets: {}
      }]).pipe(
        map<GvPaginationObject, PkTableValueLoader>(page => ({
          loading: false,
          error: false,
          pkTableValue: page.subfieldPages?.[0]?.paginatedStatements?.[0]?.statement.fk_object_data,
          hasValueCount: page.subfieldPages?.[0]?.count ?? 0
        })),
        catchError(() => of({
          loading: false,
          error: true,
        })),
        startWith<PkTableValueLoader>({
          loading: true,
          error: false,
        })
      )),
      shareReplay()
    )
  }

  openImportDialog() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      const apiCall = (response: ImportTableResponse) => {
        const a$ = this.dataApi.upsertInfStatementsWithRelations(
          pkProject,
          [{
            fk_object_data: response.fk_digital,
            fk_subject_info: this.source.fkInfo,
            fk_property: this.pkHasValuePk
          }]
        ).pipe(map(r => r ? response : undefined));


        return combineLatest([a$]).pipe(map((vals) => vals[0]))
      }

      this.dialog.open<ImporterComponent, ImporterDialogData>(ImporterComponent, {
        height: 'calc(100% - 30px)',
        width: '90%',
        maxHeight: '100%',
        data: { apiCall }
      });
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
