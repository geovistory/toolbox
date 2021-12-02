import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPaginationObject, InfAppellation, InfStatementWithRelations, ProjectDataService, QuillDoc, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { ReplaceStatementInFieldRequest } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/replaceStatementInFieldRequest';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { catchError, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { VIEW_FIELD_ITEM_TYPE } from '../view-field-item/view-field-item.component';
interface QuillDocLoader {
  loading: boolean,
  error: boolean,
  quillDoc?: QuillDoc
}
@Component({
  selector: 'gv-view-field-has-value-version',
  templateUrl: './view-field-has-value-version.component.html',
  styleUrls: ['./view-field-has-value-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: VIEW_FIELD_ITEM_TYPE, useValue: 'valueVersion' },
  ]
})
export class ViewFieldHasValueVersionComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @Input() field: Field
  @Input() scope: GvFieldPageScope
  @Input() source: GvFieldSourceEntity
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  editing$ = new BehaviorSubject(false)

  pkStringClass = 339;
  pkHasValueVersionPk = DfhConfig.PROPERTY_PK_HAS_VALUE_VERSION;
  quillDocLoader$: Observable<QuillDocLoader>
  loadTrigger$ = new BehaviorSubject<void>(undefined)
  newQuillDoc: QuillDoc
  oldQuillDoc: QuillDoc
  showHistory$ = new BehaviorSubject(false)


  constructor(
    public fieldApi: SubfieldPageControllerService,
    public dataApi: ReduxMainService,
    public projectData: ProjectDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.source) errors.push('@Input() source is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.quillDocLoader$ = this.initQuillDocLoader()

  }


  initQuillDocLoader(): Observable<QuillDocLoader> {
    return this.loadTrigger$.pipe(
      switchMap(() => this.fieldApi.subfieldPageControllerLoadSubfieldPages([{
        page: {
          isOutgoing: true,
          limit: 1,
          offset: 0,
          property: { fkProperty: this.pkHasValueVersionPk },
          scope: this.scope,
          source: this.source
        },
        pkProject: this.scope.inProject,
        targets: {
          [this.pkStringClass]: { appellation: 'true' }
        }
      }]).pipe(
        map<GvPaginationObject, QuillDocLoader>(page => ({
          loading: false,
          error: false,
          quillDoc: page.subfieldPages?.[0]?.paginatedStatements?.[0]?.target?.appellation?.quill_doc
        })),
        tap((d) => {
          this.oldQuillDoc = d.quillDoc
        }),
        catchError(() => of({
          loading: false,
          error: true,
        })),
        startWith<QuillDocLoader>({
          loading: true,
          error: false,
        })
      )),
      shareReplay()
    )
  }

  /**
     * When user saves the text
     */
  save() {
    if (equals(this.newQuillDoc, this.oldQuillDoc)) {
      this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
        data: {
          title: 'Info',
          paragraphs: ['No changes. No need to save the text.'],
          yesBtnText: 'Ok',
          noBtnText: '',
          hideNoButton: true
        }
      })
      return;
    }
    const data: ProgressDialogData = {
      title: 'Saving Document',
      mode$: new BehaviorSubject<ProgressMode>('indeterminate'),
      hideValue: true,
      value$: new BehaviorSubject(0)
    }
    const dialog = this.dialog.open(ProgressDialogComponent, {
      width: '250px', data, disableClose: true
    });
    const timer$ = timer(500)

    // Prepare the statement to save
    const appellation: InfAppellation = {
      quill_doc: this.newQuillDoc,
      fk_class: this.pkStringClass,
    }
    const statement: InfStatementWithRelations = {
      fk_subject_info: this.source.fkInfo,
      fk_property: DfhConfig.PROPERTY_PK_HAS_VALUE_VERSION,
      object_appellation: appellation
    }
    const req: ReplaceStatementInFieldRequest = {
      pkProject: this.scope.inProject,
      isOutgoing: true,
      property: { fkProperty: this.pkHasValueVersionPk },
      source: this.source,
      statement
    }
    // Persist the update in the database
    const apiCall = this.projectData.createProjectDataControllerReplaceStatementsOfField(req)
      .pipe(
        map(e => ({ error: false })),
        catchError(() => of({ error: true })),
      )


    // wait until timer has passed and the api call is resolved$
    combineLatest([apiCall, timer$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([apiCall]) => {
      dialog.close()
      if (apiCall.error) {
        this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
          data: {
            title: 'Error',
            paragraphs: ['Error while saving. Please try again.'],
            yesBtnText: 'Close',
            noBtnText: '',
            hideNoButton: true
          }
        })
      }
      else {
        this.oldQuillDoc = this.newQuillDoc
      }
    })

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
