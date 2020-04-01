import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActiveProjectService, DatChunk, DatDigital, getSpecificVersion, IAppState, latestVersion, SubstoreComponent } from 'app/core';
import { SucceedActionMeta } from 'app/core/store/actions';
import { RootEpics } from 'app/core/store/epics';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { TabBase } from 'app/shared/components/tab-layout/tab-layout.models';
import { BehaviorSubject, combineLatest, Observable, Subject, timer } from 'rxjs';
import { delay, filter, first, map, takeUntil, switchMap, skipWhile, distinctUntilChanged } from 'rxjs/operators';
import { MentioningListOf, Row } from '../../../annotation/components/mentioning-list/mentioning-list.component';
import { DeltaI, Op, Ops, QuillDoc } from '../../../quill';
import { ChunksPks, IndexedCharids, QuillEditComponent } from '../../../quill/quill-edit/quill-edit.component';
import { MatDialog } from '@angular/material';
import { ProgressDialogData, ProgressMode, ProgressDialogComponent } from 'app/shared/components/progress-dialog/progress-dialog.component';


export interface Version {
  entityVersion: number; // entity_version
  pkEntity: number; // pk_entity
}

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: () => { }
})
@Component({
  selector: 'gv-text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.css']
})
export class TextDetailComponent implements OnInit, OnDestroy, SubstoreComponent, TabLayoutComponentInterface {

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(QuillEditComponent, { static: false }) quillEdit: QuillEditComponent;
  // @ViewChild(MentioningListComponent, { static: true }) mentioningList: MentioningListComponent;


  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TabBase>;

  // path to the substore
  @Input() basePath: string[];

  // flag true during saving process
  saving = false;

  // Primary key of the text digital to be viewed or edited
  @Input() pkEntity: number;

  // Selected Version
  version$ = new BehaviorSubject<number>(1);

  // Quill Doc passed to quill-edit
  quillDoc$: Observable<QuillDoc>;

  // The digital of this.version$
  digital$: Observable<DatDigital>;

  latestVersion$: Observable<DatDigital>;

  versions$: Observable<Version[]>;

  // the selction made by user in editor
  selectedDelta$ = new BehaviorSubject<DeltaI>(null);
  // if the annotate button is shown
  showAnnotateBtn$: Observable<boolean>;

  annotatedNodes$ = new BehaviorSubject<IndexedCharids<number[]>>({})
  annotationsVisible$ = new BehaviorSubject<boolean>(false);

  accentuatedNodes$ = new BehaviorSubject<IndexedCharids<true>>([]);
  chunksToHighlightInList$ = new BehaviorSubject<ChunksPks>([]);

  // number of characters of text
  textLength: number;
  // max number of characters
  maxLength = 10000;

  // TODO check if needed
  readOnly$;
  listOf: MentioningListOf;

  t: TabLayout;

  constructor(
    protected rootEpics: RootEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);

    /**
     * initialize the editor with the latest (!) version
     */
    this.p.dat$.digital.loadVersion(this.pkEntity).resolved$.subscribe(result => {
      // set the latest version as the initial version shown in editor
      this.setVersion(result)
      this.t.setTabTitle('Text ' + this.pkEntity)
    })


    /**
     * Keep track of the latest version, independent of the currently shown version.
     * This is also relevant for this.versions$
     */
    this.latestVersion$ = this.p.dat$.digital$.by_pk_entity$.key(this.pkEntity).pipe(
      map(versions => latestVersion(versions)),
      filter((v) => !!v)
    )

    /**
     * Creates the list of version, assuming that all versions
     * from latest to 1 exist
     */
    this.versions$ = this.latestVersion$.pipe(
      map(latest => {
        const v = latest.entity_version;
        const vl: Version[] = [];
        for (let i = v; i > 0; i--) {
          vl.push({
            pkEntity: latest.pk_entity,
            entityVersion: i
          })
        }
        return vl;
      })
    )

    /**
     * Pipe the version of digital specified by this.version$
     * shown in the editor
     */
    this.digital$ = combineLatest(
      this.p.dat$.digital$.by_pk_entity$.key(this.pkEntity),
      this.version$
    ).pipe(
      map(([versions, v]) => {
        return getSpecificVersion(versions, v)
      }),
      filter((v) => !!v)
    )


    /**
     * Pipe the quill_doc passed to editor, skipping updates during or after save process
     */
    this.quillDoc$ = this.version$.pipe(
      distinctUntilChanged(),
      filter((v) => {
        return !this.saving
      }),
      switchMap(version => this.p.dat$.digital$.by_pk_entity__entity_version$.key(this.pkEntity + '_' + version).pipe(
        filter(d => !!d),
        map(d => d.quill_doc)
      ))
    )

    /**
     * Annotation
     */
    // show the annotate button when some delta is selected
    this.showAnnotateBtn$ = this.selectedDelta$.pipe(map(d => (!!d)))
    this.listOf = { pkEntity: this.pkEntity, type: 'digital-text' }

    // TODO find out why this is needed
    this.showAnnotateBtn$.pipe(delay(0), takeUntil(this.destroy$)).subscribe(() => {
      this.ref.detectChanges()
    })
    // TODO find out why this is needed
    this.t.showRightArea$.pipe(delay(0), takeUntil(this.destroy$)).subscribe(() => {
      this.ref.detectChanges()
    })
    // TODO find out why this is needed
    // this.chunk$.pipe(delay(0), takeUntil(this.destroy$)).subscribe(() => {
    //   this.ref.detectChanges()
    // })
  }

  mentioningListChange(rows: Row[]) {
    const annotatedNodes: IndexedCharids<number[]> = {}
    rows.forEach(row => {
      (row.domainChunk.quill_doc as QuillDoc).ops.forEach(op => {
        const id = op.attributes.charid
        if (id) annotatedNodes[id] = [...(annotatedNodes[id] || []), row.domainChunk.pk_entity]
      })
    })
    this.annotatedNodes$.next(annotatedNodes);
  }

  mentioningRowMousenter(row: Row) {
    const charid: IndexedCharids<true> = {}
    if (row.domainChunk) {
      (row.domainChunk.quill_doc as QuillDoc).ops.forEach(op => {
        charid[op.attributes.charid] = true;
      })
    }
    this.accentuatedNodes$.next(charid);
  }
  mentioningRowMouseleave(row: Row) {
    this.accentuatedNodes$.next([]);
  }
  // mentioningRowClick(row: Row) {
  //   this.chunksToHighlightInText$.next(row.domainChunk ? [row.domainChunk.pk_entity] : []);
  // }

  textNodeMouseenter(chunkPks: number[]) {
    if (this.annotationsVisible$.value) {
      this.chunksToHighlightInList$.next(chunkPks)
    }
  }
  textNodeMouseleave() {
    this.chunksToHighlightInList$.next([])
  }


  /**
   * Sets the version shown in editor to the version of the
   * first item in the results returned by the api
   * (after loading or upserting)
   */
  private setVersion(results: SucceedActionMeta<DatDigital>) {
    if (results && results.items && results.items.length) {
      this.version$.next(results.items[0].entity_version);
    }
  }

  /**
   * When user changes the version
   */
  changeVersion(v: Version) {
    this.version$.next(v.entityVersion);
    this.p.dat$.digital.loadVersion(this.pkEntity, v.entityVersion);
  }


  /**
   * When user saves the text
   */
  save() {
    this.saving = true
    const data: ProgressDialogData = {
      title: 'Saving Document',
      mode$: new BehaviorSubject<ProgressMode>('indeterminate'),
      hideValue: true,
      value$: new BehaviorSubject(0)
    }
    const dialog = this.dialog.open(ProgressDialogComponent, {
      width: '250px', data, disableClose: true
    });
    this.digital$.pipe(first(), takeUntil(this.destroy$)).subscribe(digital => {
      const timer$ = timer(500)

      // Prepare the digital to save
      const quill_doc = this.quillEdit.quillDoc;
      const digitalToSave = {
        pk_entity: digital.pk_entity,
        fk_namespace: digital.fk_namespace,
        quill_doc,
        string: undefined
      } as DatDigital;

      // Persist the update in the database
      const resolved$ = this.p.dat$.digital.upsert([digitalToSave], digital.fk_namespace).resolved$.pipe(
        filter(res => !!res)
      )

      // Set the version shown in editor to the new version
      resolved$.pipe(takeUntil(this.destroy$)).subscribe(results => {
        this.setVersion(results);
        this.saving = false
      })

      // wait until timer has passed and the api call is resolved$
      combineLatest([resolved$, timer$]).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        dialog.close()
      })

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

  private latestIdReducer(a: Op, b: Op): Op {
    const idOf = (op: Op): string => op.attributes.charid || op.attributes.blockid;
    const aId = parseInt(idOf(a), 10);
    const bId = parseInt(idOf(b), 10);
    return aId > bId ? a : b;
  }

  annotate() {
    this.t.setShowRightArea(true)
    this.setChunk(this.selectedDelta$.value);
    this.p.ramOpen$.next(true);
  }

  private setChunk(selectedDelta: DeltaI) {
    this.digital$.pipe(delay(0), first()).subscribe(digital => {
      this.p.ramSource$.next({
        chunk: {
          fk_text: digital.pk_text,
          fk_entity_version: digital.entity_version,
          fk_namespace: digital.fk_namespace,
          quill_doc: this.quillDocForChunk(selectedDelta)
        } as DatChunk
      });
    });
  }


  private quillDocForChunk(selectedDelta: DeltaI): QuillDoc {
    const latestOp: Op = selectedDelta.ops.reduce(this.latestIdReducer);
    const latestId: number = parseInt(latestOp.attributes.charid || latestOp.attributes.blockid, 10);
    const ops: Ops = selectedDelta.ops;
    const quill_doc: QuillDoc = { ops, latestId };
    return quill_doc;
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
