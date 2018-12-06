import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, IAppState, InfChunk, InfDigitalObject, PeItDetail, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Delta, QuillDoc, Op } from 'app/modules/quill';
import { dropLast } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil, filter, mergeMap, map } from 'rxjs/operators';
import { IVersion } from '../../components/version-picker/version-picker.component';
import { DfhConfig } from '../../shared/dfh-config';
import { TextEditorAPIActions } from './api/text-editor.actions';
import { TextEditorAPIEpics } from './api/text-editor.epics';
import { TextEditor } from './api/text-editor.models';
import { textEditorReducer } from './api/text-editor.reducer';
import { Mentioning } from '../mentioning-list/api/mentioning-list.models';
import { QuillNodeHandler } from 'app/modules/quill/quill-node-handler';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textEditorReducer
})
@Component({
  selector: 'gv-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent extends TextEditorAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextEditor>;

  // path to the substore
  @Input() basePath: string[];

  @Output() annotate = new EventEmitter<void>();

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() digitalObject$: Observable<InfDigitalObject>;
  @select() versionList$: Observable<IVersion[]>;
  @select() quillDoc$: Observable<QuillDoc>;
  @select() readOnly$: Observable<boolean>;
  @select() annotationsVisible$: Observable<boolean>;
  @select() creatingAnnotation$: Observable<boolean>;

  @select() highlightMentionedPeIts$: Observable<boolean>;
  @select() highlightMentionedTeEnts$: Observable<boolean>;
  @select() highlightAssertions$: Observable<boolean>;

  @select() selectedDelta$: Observable<boolean>;
  showAnnotateBtn$: Observable<boolean>;

  annotatedNodes$: Observable<{ [nodeId: string]: number[] }>; // number = nodeId, number[] = pk_entities of mentioned entitites

  mentioningsFocusedInTable$: Observable<number[]>;

  parentPeIt$: Observable<PeItDetail>;
  pkProject$: Observable<number>;

  editedQuillDoc: QuillDoc;

  pkSection: number;
  pkProject: number;


  constructor(
    protected rootEpics: RootEpics,
    private epics: TextEditorAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private projectService: ActiveProjectService
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, textEditorReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.parentPeIt$ = this.ngRedux.select(dropLast(2, this.basePath))
    this.pkProject$ = this.ngRedux.select(['activeProject', 'pk_project'])
    this.mentioningsFocusedInTable$ = this.ngRedux.select(['activeProject', 'mentioningsFocusedInTable'])

    // get the pk_entity of the section
    combineLatest(this.pkProject$, this.parentPeIt$).pipe(
      first(d => (d.filter(i => !i).length === 0)),
      takeUntil(this.destroy$)).subscribe((d) => {
        const section = d[1], pkProject = d[0]
        if (section.pkEntity) {
          this.pkSection = section.pkEntity;
          this.pkProject = pkProject;
          this.load(pkProject, section.pkEntity, DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION)
          // search for entity_associations from that section to a digital object that has a quill_doc
          // to find the Text

        }
      })

    this.quillDoc$.takeUntil(this.destroy$).subscribe(qd => { this.editedQuillDoc = qd })

    // show the annotate button when some delta is selected
    this.showAnnotateBtn$ = this.selectedDelta$.map(d => (!!d))

    this.listenForAnnotations()

    // unset mentioningsFocusedInText when annotations are hidden
    this.annotationsVisible$.pipe(filter(d => d === false), takeUntil(this.destroy$)).subscribe(bool => {
      this.projectService.mentioningsFocusedInText([])
    })
  }

  ngOnDestroy() {
    this.projectService.mentioningsFocusedInText([])
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  quillDocChange(q: QuillDoc) {
    this.editedQuillDoc = q;
  }

  onSave() {
    this.save(this.pkProject, {
      ...this.localStore.getState().digitalObject,
      js_quill_data: this.editedQuillDoc
    })
  }

  onCancel() {
    this.editedQuillDoc = this.localStore.getState().quillDoc;
    this.setReadOnly(true)
  }

  onStartEdit() {
    this.setReadOnly(false)
  }

  onAnnotate() {

    this.annotate.emit()

    this.projectService.updateSelectedChunk(new InfChunk({
      fk_digital_object: this.localStore.getState().digitalObject.pk_entity,
      js_quill_data: this.localStore.getState().selectedDelta,
    }))
  }

  toggleAnnotations() {
    this.setAnnotationsVisible(this.localStore.getState().annotationsVisible ? false : true)
  }

  /**
   * called when user changes version of a digital object
   */
  onVersionChange(version: IVersion) {
    this.changeVersion(version);
  }

  selectedDeltaChange(d: Delta) {
    this.selectDelta(d);
  }

  onNodeClick(nh: QuillNodeHandler) {
    if (this.localStore.getState().annotationsVisible) {
      nh.annotatedEntities$.pipe(first()).subscribe(pks => {
        this.projectService.mentioningsFocusedInText(pks || [])
        this.projectService.mentioningsFocusedInTable([])
      })
    }
  }


  /**
   * Listen to mentionedEntities, get the nodes of the chunks and create a index that contains
   * the node id as key and an array of mentioning pks as value and return it as an observable
   */
  listenForAnnotations() {
    this.annotatedNodes$ = this.ngRedux.select<Mentioning[]>([...dropLast(2, this.basePath), ...['mentionedEntities', 'items']])
      .pipe(
        filter(ms => ms !== undefined),
        mergeMap(
          ms => combineLatest(
            ms.filter(m => !!m.fk_chunk)
              .map(mentioning => this.ngRedux.select<InfChunk>(['activeProject', 'chunks', mentioning.fk_chunk]).pipe(
                filter(chunk => (!!chunk && !!chunk.js_quill_data && !!chunk.js_quill_data.ops)),
                map(chunk => ({
                  chunk,
                  mentioning
                }))
              ))
          ).map(objs => {
            const nodes: { [nodeId: string]: number[] } = {};
            objs.forEach(obj => {
              const mentioning = obj.mentioning, chunk = obj.chunk;
              (chunk.js_quill_data as Delta).ops.forEach(op => {
                if (op.attributes && op.attributes.node) {
                  const arr = nodes[op.attributes.node] || [];
                  nodes[op.attributes.node] = [...arr, mentioning.pk_entity]
                }
              })
            })
            return nodes;
          })
        )
      );
  }
}
