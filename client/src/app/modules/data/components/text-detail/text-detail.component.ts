import { Component, OnDestroy, Input, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Subject, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService, DatDigital, latestVersion, getSpecificVersion, DatChunk } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TextDetail } from './api/text-detail.models';
import { TextDetailAPIEpics } from './api/text-detail.epics';
import { TextDetailAPIActions } from './api/text-detail.actions';
import { textDetailReducer } from './api/text-detail.reducer';
import { map, tap, first, takeUntil, filter } from 'rxjs/operators';
import { QuillDoc, Ops, Op, DeltaI } from '../../../quill';
import { tick } from '../../../../../../node_modules/@angular/core/src/render3';
import { SucceedActionMeta } from '../../../../core/store/actions';
import { QuillEditComponent } from '../../../quill/quill-edit/quill-edit.component';


export interface Version {
  entityVersion: number; // entity_version
  pkEntity: number; // pk_entity
}

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textDetailReducer
})
@Component({
  selector: 'gv-text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.css']
})
export class TextDetailComponent extends TextDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(QuillEditComponent) quillEdit: QuillEditComponent;


  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextDetail>;

  // path to the substore
  @Input() basePath: string[];

  // Primary key of the text to be viewed or edited
  @Input() pkEntity: number;
  version$ = new BehaviorSubject<number>(1);

  // select observables of substore properties
  @select() showRightArea$: Observable<boolean>;

  digital$: Observable<DatDigital>;
  latestVersion$: Observable<DatDigital>;

  versions$: Observable<Version[]>;

  // the selction made by user in editor
  selectedDelta$ = new BehaviorSubject<DeltaI>(null);
  // if the annotate button is shown
  showAnnotateBtn$: Observable<boolean>;
  createAnnotation$ = new BehaviorSubject<boolean>(false);
  chunk$ = new BehaviorSubject<DatChunk>(null);

  // TODO check if needed
  readOnly$;
  annotationsVisible$;
  annotatedNodes$
  mentioningsFocusedInTable$

  constructor(
    protected rootEpics: RootEpics,
    private epics: TextDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, textDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    /**
     * initialize the editor with the latest version
     */
    this.p.dat$.digital.loadVersion(this.pkEntity).resolved$.subscribe(result => {
      // set the latest version as the initial version shown in editor
      this.setVersion(result)
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
     * Annotation
     */
    // show the annotate button when some delta is selected
    this.showAnnotateBtn$ = this.selectedDelta$.map(d => (!!d))

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

    this.digital$.pipe(first(), takeUntil(this.destroy$)).subscribe(digital => {

      // Prepare the digital to save
      const quill_doc = this.quillEdit.quillDoc;
      const digitalToSave = {
        pk_entity: digital.pk_entity,
        fk_namespace: digital.fk_namespace,
        quill_doc,
        string: undefined
      } as DatDigital;

      // Persist the update in the database
      this.p.dat$.digital.upsert([digitalToSave], digital.fk_namespace)

        // Set the version shown in editor to the new version
        .resolved$.pipe(takeUntil(this.destroy$)).subscribe(results => {
          this.setVersion(results);
        })

    })
  }

  /**
   * When user changes text selection
   */
  selectedDeltaChange(d: DeltaI) {
    this.selectedDelta$.next(d)
    if(this.createAnnotation$.value){
      this.setChunk();
    }
  }

  private latestIdReducer(a: Op, b: Op): Op {
    const idOf = (op: Op): string => op.attributes.charid || op.attributes.blockid;
    const aId = parseInt(idOf(a));
    const bId = parseInt(idOf(b));
    return aId > bId ? a : b;
  }


  annotate() {
    this.setShowRightArea(true)
    this.setChunk();
  }

  private setChunk() {
    this.digital$.pipe(first()).subscribe(digital => {
      this.chunk$.next({
        fk_text: digital.pk_text,
        fk_entity_version: digital.entity_version,
        fk_namespace: digital.fk_namespace,
        quill_doc: this.quillDocForChunk()
      } as DatChunk);
      this.createAnnotation$.next(true);
    });
  }


  private quillDocForChunk(): QuillDoc {
    const latestOp: Op = this.selectedDelta$.value.ops.reduce(this.latestIdReducer);
    const latestId: number = latestOp.attributes.charid || latestOp.attributes.blockid;
    const ops: Ops = this.selectedDelta$.value.ops;
    const quill_doc: QuillDoc = { ops, latestId };
    return quill_doc;
  }

  /**
   * When user resizes the areas
   */
  resizedArea(event: { gutterNum: number, sizes: Array<number> }) {
    if (event.sizes[1] < 5) this.setShowRightArea(false)
  }

  onNodeClick($event){

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
