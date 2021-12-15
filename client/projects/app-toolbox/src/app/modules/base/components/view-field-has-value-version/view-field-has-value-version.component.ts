import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPaginationObject, InfAppellation, InfResourceWithRelations, InfStatementWithRelations, ProjectDataService, QuillDoc, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { ReplaceStatementInFieldRequest } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/replaceStatementInFieldRequest';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { catchError, delay, filter, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TextDetail2Component } from '../../../data/components/text-detail2/text-detail2.component';
import { DeltaI, Op, Ops } from '../../../quill/quill.models';
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


  // the selction made by user in editor
  selectedDelta$ = new BehaviorSubject<DeltaI>(null);
  selectedChunk: InfAppellation
  annotationsVisible$ = new BehaviorSubject<boolean>(false);

  constructor(
    public fieldApi: SubfieldPageControllerService,
    public dataApi: ReduxMainService,
    public projectData: ProjectDataService,
    public dialog: MatDialog,
    public p: ActiveProjectService,
    @Optional() public textDetailComponent: TextDetail2Component
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


  /**
    * When user changes text selection
    */
  selectedDeltaChange(d: DeltaI) {
    if (this.p.ramOpen$.value && !!d && !!d.ops && d.ops.length) {
      this.setChunk(d);
    }
    this.selectedDelta$.next(d)
  }

  annotate() {
    // this.t.setLayoutMode('both')
    this.setChunk(this.selectedDelta$.value);
    this.p.ramOpen$.next(true);
  }


  private setChunk(selectedDelta: DeltaI) {
    this.selectedChunk = {
      fk_class: DfhConfig.CLASS_PK_CHUNK, // mapped to appellation table
      quill_doc: this.quillDocForChunk(selectedDelta)
    }

    combineLatest([this.p.ramTargetIsFix$])
      .pipe(delay(0), first())
      .subscribe(([targetIsFix]) => {
        this.p.ramOnSaveCallback = () => this.onSave()
        this.p.ramSource$.next({
          chunk: this.selectedChunk
        });

        this.p.ramBoxLeft$.next('select-text');
        this.p.ramProperty$.next(DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO);
        if (!targetIsFix) {
          this.p.ramTarget$.next();
          this.p.ramTitle$.next(`Create an annotation`);
          this.p.ramTitlePart2$.next();
          this.p.ramBoxCenter$.next(true);
          this.p.ramBoxRight$.next(true);
        }
      });
  }
  private quillDocForChunk(selectedDelta: DeltaI): QuillDoc {
    const latestOp: Op = selectedDelta.ops.reduce(this.latestIdReducer);
    const latestId: number = parseInt(latestOp.attributes.charid || latestOp.attributes.blockid, 10);
    const ops: Ops = selectedDelta.ops;
    const quill_doc: QuillDoc = { ops, latestId };
    return quill_doc;
  }
  private latestIdReducer(a: Op, b: Op): Op {
    const idOf = (op: Op): string => op.attributes.charid || op.attributes.blockid;
    const aId = parseInt(idOf(a), 10);
    const bId = parseInt(idOf(b), 10);
    return aId > bId ? a : b;
  }


  async onSave() {

    const req = await combineLatest([this.p.pkProject$, this.p.ramTarget$.pipe(filter(x => !!x))])
      .pipe(
        map(([pkProject, target]) => {
          const annotation: InfResourceWithRelations = {
            fk_class: DfhConfig.CLASS_PK_ANNOTATION,
            outgoing_statements: [
              {
                fk_property: DfhConfig.PROPERTY_PK_ANNOTATION_IS_PART_OF,
                fk_object_info: this.source.fkInfo // Text
              },
              {
                fk_property: DfhConfig.PROPERTY_PK_ANNOTATION_HAS_SPOT,
                object_appellation: this.selectedChunk
              },
              {
                fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
                fk_object_info: target
              }
            ]
          }
          return { pkProject, annotation }
        }),
        first(),
      )
      .toPromise()

    return this.dataApi.upsertInfResourcesWithRelations(req.pkProject, [req.annotation])
      .pipe(first())
      .toPromise()
  }
  onCancel() {
    const data: ConfirmDialogData = {
      title: 'Cancel edits?',
      paragraphs: [
        'Attention: Unsaved changes will be lost.'
      ],
      noBtnText: 'Cancel',
      yesBtnText: 'Confirm',
      yesBtnColor: 'warn',

    }
    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.loadTrigger$.next();
          this.editing$.next(false)
        }
      })
  }

  onQuillDocChange(q: QuillDoc) {
    this.newQuillDoc = q
    if (this.textDetailComponent) this.textDetailComponent.quillDocUpdated(q)
  }
  textNodeMouseenter(chunkPks: number[]) {
    if (this.textDetailComponent) {
      if (this.annotationsVisible$.value) {
        this.textDetailComponent.annotationsToHighlightInList$.next(chunkPks)
      }
    }
  }
  textNodeMouseleave() {
    if (this.textDetailComponent) {
      this.textDetailComponent.annotationsToHighlightInList$.next([])
    }
  }

  onNodeClicked(e: number[]) {
    if (this.textDetailComponent) {
      this.textDetailComponent.annotationsPinnedInList$.next(e)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
