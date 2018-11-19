// import { dispatch, NgRedux, select, WithSubStore } from '@angular-redux/store';
// import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// import { IAppState, InfDigitalObject, InfDigitalObjectApi } from 'app/core';
// import { AnnotationState, IAnnotationPanelState, MentionedEntity } from 'app/modules/annotation';
// import { annotationStateKey } from 'app/modules/annotation/containers/annotation-panel/annotation-panel.actions';
// import { QuillDoc } from 'app/modules/quill';
// import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
// import * as Delta from 'quill-delta/lib/delta';
// import { indexBy } from 'ramda';
// import { Observable, Subscription, Subject } from 'rxjs';
// import { ISourceDetailState } from '../..';
// import { mentionedEntityKey } from '../../../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
// import { SourceDetailActions } from './source-detail.actions';
// import { sourceDetailReducer } from './source-detail.reducer';
// import { RootEpics } from 'app/core/store/epics';
// import { SourceDetailApiEpics } from './source-detail.epics';
// import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';

// /**
//  * A Container to show and edit the details of a source
//  * - interacts with store at the level of ISourceDetailState
//  * - interacts with api
//  *   - search for mentionings,
//  *     - creates annotatedNodes Object for Quill
//  *     - creates a AnnnotationPanelState
//  *
//  * - Input: path to substore
//  * - Output: onSave, triggered on saving a edit of the digital object or its name
//  * - Output: onClose, triggered on closing a source
//  *
//  *
//  * Template
//  * - TEMP: use 'digitalObject', 'notes' as Title
//  *
//  * - If 'edit' is true
//  *   -  save edit and cancel edit buttons
//  *
//  * - If 'edit' and 'annotationPanel', 'edit', 'selectingSegment' are false
//  *   -  edit button
//  *
//  * - If 'annotationPanel' is true
//  *   -  hide annotations button
//  *
//  * - If 'annotationPanel' and 'annotationPanel', 'edit', 'selectingSegment' are false
//  *   -  show annotations button
//  *
//  * - If 'edit' show QuillEditComponent
//  *       passing in 'edit' via Input 'quillDoc'
//  *       passing in true via Input 'readOnly'
//  *       passing in true via Input 'annotationsVisible'
//  *       passing in annotatedNodes via Input 'annotatedNodes'
//  *       listening to Output 'selectedDeltaChange'
//  *
//  * - If 'annotationPanel' var of substore is thruthy, show AnnotationPanelComponent
//  *   passing path to store 'annotationPanel' via Input
//  *
//  */
// @AutoUnsubscribe({ blackList: ['destroy$'] })
// @WithSubStore({
//   basePathMethodName: 'getBasePath',
//   localReducer: sourceDetailReducer
// })
// @Component({
//   selector: 'gv-source-detail',
//   templateUrl: './source-detail.component.html',
//   styleUrls: ['./source-detail.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class SourceDetailComponent implements OnInit, OnDestroy {

//   // path to the substore
//   @Input() path: string[];

//   // if provided, initialState will be dispatched onInit replacing the lastState of substore
//   @Input() initState: ISourceDetailState;

//   @Output() close: EventEmitter<void> = new EventEmitter();
//   @Output() onSave: EventEmitter<InfDigitalObject> = new EventEmitter();
//   @Output() versionChanged: EventEmitter<IVersion> = new EventEmitter();

//   @select() label$: Observable<boolean>;
//   @select() view$: Observable<InfDigitalObject>;
//   @select() edit$: Observable<InfDigitalObject>;
//   @select(['annotationPanel', 'edit', 'selectingSegment']) selectingSegment$: Observable<InfDigitalObject>;
//   @select() annotate$: Observable<InfDigitalObject>;
//   @select() annotationPanel$: Observable<IAnnotationPanelState>;
//   @select() versionList$: Observable<IVersion[]>;

//   annotationPanelPath: string[];
//   annotatedNodes;
//   annotationPanel: IAnnotationPanelState;
//   digitalObject: InfDigitalObject; // emitted on save
//   subs: Subscription[] = []
//   destroy$: Subject<boolean> = new Subject<boolean>();

//   constructor(
//     protected rootEpics: RootEpics,
//     private epics: SourceDetailApiEpics,
//     private actions: SourceDetailActions,
//     private digtObjApi: InfDigitalObjectApi,
//     private ngRedux: NgRedux<IAppState>
//   ) { }

//   getBasePath() { return this.path }

//   ngOnInit() {

//     this.rootEpics.addEpic(this.epics.createEpics(this));

//     this.initAnnotations();

//     this.initVersions();

//     this.annotationPanelPath = [...this.path, 'annotationPanel'];

//     this.subs.push(this.selectingSegment$.subscribe(bool => {
//       if (!bool) {
//         this.stopCreateAnnotation();
//       }
//     }))

//     this.subs.push(this.edit$.subscribe((digitalObject: InfDigitalObject) => {
//       this.digitalObject = digitalObject;
//     }))

//   }
//   ngOnDestroy() {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//     this.subs.forEach(sub => sub.unsubscribe())
//   }


//   /**
//    * Start Edit Digital Object
//    * - searches for the latest id of the latest version
//    */
//   @dispatch() startEdit() {
//     return this.actions.startEdit()
//   }

//   /**
//    * Start Edit Digital Object
//    * - dispatches action that sets 'editDigitalObject' true
//    */
//   @dispatch() editStarted(latestId: number) {
//     return this.actions.editStarted(latestId)
//   }

//   /**
//    * Cancel Edit Digital Object
//    * - update store: set 'editDigitalObject' false
//    */
//   @dispatch() cancelEdit() {
//     return this.actions.cancelEdit()
//   }

//   /**
//    * Save edits
//    * - emit onSave() event
//    */
//   save() {
//     this.onSave.emit(this.digitalObject);
//   }


//   /**
//    * Show the annotated segments in the digital object
//    * - update store: set 'showAnnotations' true
//    * - update store: set 'annotationPanel' = this.annotationPanel
//    */
//   @dispatch() showAnnotations() {
//     return this.actions.showAnnotations(this.annotationPanel)
//   }

//   /**
//    * Hide the annotated segments in the digital object
//    * - update store: set 'showAnnotations' false
//    * - update store: set 'annotationPanel' false
//    *
//    */
//   @dispatch() hideAnnotations() {
//     return this.actions.hideAnnotations()
//   }

//   /**
//  * Start create Annotation
//  * - update store: set 'annotationPanel' 'edit' 'selectingSegment' = true
//  * - update store: set 'annotationPanel' 'edit' 'selectingEntities' = false
//  *
//  */
//   @dispatch() startCreateAnnotation() {
//     return this.actions.startCreateAnnotation()
//   }

//   /**
//   * Creat Annotation was stopped
//   *
//   */
//   @dispatch() stopCreateAnnotation() {
//     return this.actions.stopCreateAnnotation()
//   }

//   /**
//    * called during creation of a new Annotation / Chunk, when
//    * user selects words/letters in QuillEditComponent
//    * - create Chunk
//    * - updates store: set 'annotationPanel', 'edit', 'chunk' = new Chunk
//    */
//   @dispatch() onSelectedDeltaChange(delta: Delta) {
//     return this.actions.onSelectedDeltaChange(delta)
//   }

//   /**
//    * called when quillDoc is changed
//    */
//   @dispatch() onQuillDocChange(quillDoc: QuillDoc) {
//     return this.actions.onQuillDocChange(quillDoc)
//   }

//   /**
//    * called on init. triggers epic to load version list.
//    */
//   @dispatch() initVersions() {
//     return this.actions.startLoadingVersionList();
//   }

//   /**
//  * called on init. triggers epic to load version list.
//  */
//   @dispatch() versionListLoaded(versionList: IVersion[]) {
//     return this.actions.versionListLoaded(versionList);
//   }

//   initAnnotations() {
//     const s = this.ngRedux.getState();
//     const pkProject = s.activeProject.pk_project;
//     const pkEntity = s.sources.edit.view.pk_entity;

//     // init default annotation panel state
//     this.annotationPanel = { view: {} }

//     // init annotation panel state using given chunks
//     const buildAnnotationPanelState = (chunks) => {

//       const nodes = new Map();
//       this.annotationPanel = {
//         view: indexBy(annotationStateKey, chunks.map(chunk => {
//           const delta = JSON.parse(chunk.js_quill_data);

//           delta.ops.forEach(op => {
//             if (op.attributes && op.attributes.node && !(op.attributes.node == '_dots_')) {
//               const count = nodes.get(op.attributes.node) ? nodes.get(op.attributes.node) : 0;
//               nodes.set(op.attributes.node, (count + 1))
//             }
//           })

//           return {
//             chunk: {
//               pkEntity: chunk.pk_entity,
//               fkDigitalObject: chunk.fk_digital_object,
//               quillDelta: JSON.parse(chunk.js_quill_data) // TODO why does it store the deltas stringified??
//             },
//             mentionedEntities: indexBy(mentionedEntityKey, chunk.entity_associations.map(ea => {
//               return {
//                 pkEntity: ea.fk_range_entity,
//                 entityAssociation: ea,
//                 label: '' // TODO lazy load pe it or eager load ?
//               } as MentionedEntity
//             }))
//           } as AnnotationState;
//         }))
//       }
//       this.annotatedNodes = Array.from(nodes);
//     }

//     // Look for chunks that are referenced to this digital object.
//     // For each chunk includes the associated (mentioned) entities
//     if (pkEntity) {
//       this.subs.push(this.digtObjApi.nestedObjectOfProject(pkProject, pkEntity)
//         .subscribe((digitObjs: InfDigitalObject[]) => {
//           const digitObj = digitObjs[0];

//           if (digitObj && digitObj.chunks.length) {
//             buildAnnotationPanelState(digitObj.chunks);
//           }

//         }))
//     }
//   }

//   /**
//    * called upon changing of version by user
//    */
//   versionChange(entitVersion) {
//     this.versionChanged.emit(entitVersion)
//   }
// }
