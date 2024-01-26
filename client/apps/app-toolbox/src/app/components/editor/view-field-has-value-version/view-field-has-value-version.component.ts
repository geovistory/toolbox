import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPaginationObject, InfAppellation, InfResourceWithRelations, InfStatementWithRelations, ProjectDataService, QuillDoc, ReplaceStatementInFieldRequest, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest, of, timer } from 'rxjs';
import { catchError, delay, filter, first, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { C_339_STRING_ID, C_933_ANNOTATION_IN_TEXT_ID, P_1864_HAS_VALUE_VERSION_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from '../../../lib/constants/ontome-ids';
import { ActiveProjectService } from '../../../services/active-project.service';
import { ConfirmHook, EditModeService } from '../../../services/edit-mode.service';
import { TextDetailService } from '../../layout/tab-bodies/text-detail/text-detail.service';
import { ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn } from '../../misc/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from '../../misc/progress-dialog/progress-dialog.component';
import { ToggleBtnComponent } from '../../misc/toggle-btn/toggle-btn.component';
import { QuillEditComponent } from '../../text-editor/quill-edit/quill-edit.component';
import { DeltaI, Op, Ops } from '../../text-editor/quill.models';
import { EditTextDialogService } from '../edit-text-dialog/edit-text-dialog.service';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { VIEW_FIELD_ITEM_TYPE } from '../view-field-item/VIEW_FIELD_ITEM_TYPE';
import type { ViewFieldItemTypeFn } from '../view-field-item/view-field-item.component';
interface QuillDocLoader {
  loading: boolean,
  error: boolean,
  quillDoc?: QuillDoc
}
const itemTypeProvider: ViewFieldItemTypeFn = (f, s) => 'valueVersion'
@Component({
  selector: 'gv-view-field-has-value-version',
  templateUrl: './view-field-has-value-version.component.html',
  styleUrls: ['./view-field-has-value-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: VIEW_FIELD_ITEM_TYPE, useValue: itemTypeProvider },
  ],
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, MatButtonModule, QuillEditComponent, MatTooltipModule, MatIconModule, MatMenuModule,
    forwardRef(() => ViewFieldBodyComponent), AsyncPipe, ToggleBtnComponent]
})
export class ViewFieldHasValueVersionComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @Input() field: Field
  @Input() scope: GvFieldPageScope
  @Input() source: GvFieldSourceEntity
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() showRightButtons = true
  @Input() showHeader = true

  pkStringClass = C_339_STRING_ID;
  pkHasValueVersionPk = P_1864_HAS_VALUE_VERSION_ID;
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
    public state: StateFacade,
    public projectData: ProjectDataService,
    public dialog: MatDialog,
    public p: ActiveProjectService,
    @Optional() public textDetail: TextDetailService,
    public editMode: EditModeService,
    @Optional() editText: EditTextDialogService,

  ) {
    if (editText) editText.registerComponent(this)
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.source) errors.push('@Input() source is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.quillDocLoader$ = this.initQuillDocLoader()

    this.editMode.registerBeforeSwitchOffHook(this.confirmHook)

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
     * @returns Promise true, if saved, false if not
     */
  async onSave(): Promise<boolean> {
    if (equals(this.newQuillDoc, this.oldQuillDoc)) {
      await this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn>(ConfirmDialogComponent, {
        data: {
          title: 'Info',
          paragraphs: ['No changes. No need to save the text.'],
          yesBtnText: 'Ok',
          noBtnText: '',
          hideNoButton: true
        }
      }).afterClosed().pipe(first()).toPromise()
      return false
    }

    const data: ProgressDialogData = {
      title: 'Saving Document',
      mode$: new BehaviorSubject<ProgressMode>('indeterminate'),
      hideValue: true,
      value$: new BehaviorSubject(0)
    }
    const progressDialog = this.dialog.open(ProgressDialogComponent, {
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
      fk_property: P_1864_HAS_VALUE_VERSION_ID,
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
    const apiCall$: Observable<{ error: boolean }> = this.projectData.createProjectDataControllerReplaceStatementsOfField(req)
      .pipe(
        map(e => ({ error: false })),
        catchError(() => of({ error: true })),
      )


    // wait until timer has passed and the api call is resolved$
    const [apiCall] = await combineLatest([apiCall$, timer$]).pipe(first()).toPromise()
    progressDialog.close()

    if (apiCall.error) {
      await this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
        data: {
          title: 'Error',
          paragraphs: ['Error while saving. Please try again.'],
          yesBtnText: 'Close',
          noBtnText: '',
          hideNoButton: true
        }
      }).afterClosed().pipe(first()).toPromise()
      return false
    }

    this.oldQuillDoc = this.newQuillDoc
    return true
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
        this.p.ramSource$.next(
          {
            annotation: {
              textChunk: this.selectedChunk,
              pkEntityOfText: this.source.fkInfo
            }
          });

        if (!targetIsFix) {
          this.p.ramOnSaveCallback = () => this.saveAnnotationCallback()
          this.p.ramBoxLeft$.next('select-text');
          this.p.ramProperty$.next(undefined); // todo: check if this can be empty
          this.p.ramTarget$.next(undefined);
          this.p.ramTitle$.next(`Create an annotation`);
          this.p.ramTitlePart2$.next(undefined);
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


  private async saveAnnotationCallback() {

    const req = await combineLatest([this.state.pkProject$, this.p.ramTarget$.pipe(filter(x => !!x))])
      .pipe(
        map(([pkProject, target]) => {
          const annotation: InfResourceWithRelations = {
            fk_class: C_933_ANNOTATION_IN_TEXT_ID,
            outgoing_statements: [
              {
                fk_property: P_1872_IS_ANNOTATED_IN_ID,
                fk_object_info: this.source.fkInfo // Text
              },
              {
                fk_property: P_1874_AT_POSITION_ID,
                object_appellation: this.selectedChunk
              },
              {
                fk_property: P_1875_ANNOTATED_ENTITY_ID,
                fk_object_info: target
              }
            ]
          }
          return { pkProject, annotation }
        }),
        first(),
      )
      .toPromise()

    return this.state.data.upsertInfResourcesWithRelations(req.pkProject, [req.annotation])
      .pipe(first())
      .toPromise()
  }

  onCancel() {
    this.editMode.setValue(false)
  }
  confirmHook: ConfirmHook = async () => {
    const hasChanged = !equals(this.newQuillDoc, this.oldQuillDoc)

    if (hasChanged) {
      const data: ConfirmDialogData = {
        title: 'Cancel edits?',
        paragraphs: [
          'Attention: Unsaved changes will be lost.'
        ],
        noBtnText: 'Cancel',
        yesBtnText: 'Confirm',
        yesBtnColor: 'warn',

      }
      const confirmed = await this.dialog.open(ConfirmDialogComponent, { data })
        .afterClosed().pipe(first()).toPromise()

      if (confirmed) this.loadTrigger$.next();

      return confirmed;
    }
    else {
      return true
    }
  }

  onQuillDocChange(q: QuillDoc) {
    this.newQuillDoc = q
    if (this.textDetail?.component) this.textDetail.component.quillDocUpdated(q)
  }
  textNodeMouseenter(chunkPks: number[]) {
    if (this.textDetail?.component) {
      if (this.annotationsVisible$.value) {
        this.textDetail.component.annotationsToHighlightInList$.next(chunkPks)
      }
    }
  }
  textNodeMouseleave() {
    if (this.textDetail?.component) {
      this.textDetail.component.annotationsToHighlightInList$.next([])
    }
  }

  onNodeClicked(e: number[]) {
    if (this.textDetail?.component) {
      this.textDetail.component.annotationsPinnedInList$.next(e)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
