import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPaginationObject, ImportTableResponse, ProjectDataService, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { P_1879_HAS_VALUE_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
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
  @Input() readmode$: BehaviorSubject<boolean>
  // @Input() showOntoInfo$: Observable<boolean>
  loadTrigger$ = new BehaviorSubject<void>(undefined)
  pkTableValueLoader$: Observable<PkTableValueLoader>
  pkHasValuePk = P_1879_HAS_VALUE_ID
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
    if (!this.readmode$) errors.push('@Input() readmode$ is required.');
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

  async openImportDialog() {

    const pkProject = await this.p.pkProject$.pipe(first()).toPromise()
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

    await this.dialog.open<ImporterComponent, ImporterDialogData>(ImporterComponent, {
      height: 'calc(100% - 30px)',
      width: '90%',
      maxHeight: '100%',
      data: { apiCall }
    }).afterClosed().pipe(first()).toPromise()

    this.loadTrigger$.next()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
