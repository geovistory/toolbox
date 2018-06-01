import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WithSubStore, select, dispatch, NgRedux } from '@angular-redux/store';
import { sourceDetailReducer } from './source-detail.reducer';
import { ISourceDetailState } from '../..';
import { Observable, Subscription } from 'rxjs';
import { QuillDoc } from 'app/modules/quill';
import { IAnnotationPanelState, Chunk, AnnotationState, MentionedEntity } from 'app/modules/annotation';
import { SourceDetailActions } from './source-detail.actions';
import * as Delta from 'quill-delta/lib/delta';
import { InfEntityAssociation, InfDigitalObject, InfDigitalObjectApi, IAppState } from 'app/core';
import { indexBy } from 'ramda'
import { annotationStateKey } from 'app/modules/annotation/containers/annotation-panel/annotation-panel.actions';
import { mentionedEntityKey } from '../../../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';

/**
 * A Container to show and edit the details of a source
 * - interacts with store at the level of ISourceDetailState
 * - interacts with api
 *   - search for mentionings, 
 *     - creates annotatedNodes Object for Quill
 *     - creates a AnnnotationPanelState
 * 
 * - Input: path to substore
 * - Output: onSave, triggered on saving a edit of the digital object or its name
 * - Output: onClose, triggered on closing a source
 * 
 * 
 * Template
 * - TEMP: use 'digitalObject', 'notes' as Title
 * 
 * - If 'edit' is true
 *   -  save edit and cancel edit buttons
 * 
 * - If 'edit' and 'annotationPanel', 'edit', 'selectingSegment' are false
 *   -  edit button
 * 
 * - If 'annotationPanel' is true
 *   -  hide annotations button
 * 
 * - If 'annotationPanel' and 'annotationPanel', 'edit', 'selectingSegment' are false
 *   -  show annotations button
 * 
 * - If 'edit' show QuillEditComponent 
 *       passing in 'edit' via Input 'quillDoc'
 *       passing in true via Input 'readOnly'
 *       passing in true via Input 'annotationsVisible'
 *       passing in annotatedNodes via Input 'annotatedNodes'
 *       listening to Output 'selectedDeltaChange' 
 *
 * - If 'annotationPanel' var of substore is thruthy, show AnnotationPanelComponent 
 *   passing path to store 'annotationPanel' via Input
 *  
 */
@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sourceDetailReducer
})
@Component({
  selector: 'gv-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceDetailComponent implements OnInit, OnDestroy {

  // path to the substore
  @Input() path: string[];
  getBasePath() { return this.path }

  // if provided, initialState will be dispatched onInit replacing the lastState of substore 
  @Input() initState: ISourceDetailState;

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<InfDigitalObject> = new EventEmitter();

  @select() label$: Observable<boolean>;
  @select() view$: Observable<boolean>;
  @select() edit$: Observable<InfDigitalObject>;
  @select(['annotationPanel', 'edit', 'selectingSegment']) selectingSegment$: Observable<InfDigitalObject>;
  @select() annotate$: Observable<InfDigitalObject>;
  @select() annotationPanel$: Observable<IAnnotationPanelState>;

  annotationPanelPath: string[];
  annotatedNodes;
  annotationPanel: IAnnotationPanelState;
  digitalObject: InfDigitalObject; // emitted on save
  subs: Subscription[] = []

  constructor(
    private actions: SourceDetailActions,
    private digtObjApi: InfDigitalObjectApi,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    // TODO init annotations

    this.initAnnotations();

    this.annotationPanelPath = [...this.path, 'annotationPanel'];

    this.subs.push(this.selectingSegment$.subscribe(bool => {
      if (!bool) {
        this.stopCreateAnnotation();
      }
    }))

    this.subs.push(this.edit$.subscribe((digitalObject: InfDigitalObject) => {
      this.digitalObject = digitalObject;
    }))

  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  /**
   * Start Edit Digital Object
   * - dispatches action that sets 'editDigitalObject' true
   */
  @dispatch() startEdit() {
    return this.actions.startEdit()
  }

  /**
   * Cancel Edit Digital Object
   * - update store: set 'editDigitalObject' false
   */
  @dispatch() cancelEdit() {
    return this.actions.cancelEdit()
  }

  /**
   * Save edits
   * - emit onSave() event
   */
  save() {
    this.onSave.emit(this.digitalObject);
  }


  /**
   * Show the annotated segments in the digital object
   * - update store: set 'showAnnotations' true
   * - update store: set 'annotationPanel' = this.annotationPanel
   */
  @dispatch() showAnnotations() {
    return this.actions.showAnnotations(this.annotationPanel)
  }

  /**
   * Hide the annotated segments in the digital object
   * - update store: set 'showAnnotations' false
   * - update store: set 'annotationPanel' false
   * 
   */
  @dispatch() hideAnnotations() {
    return this.actions.hideAnnotations()
  }

  /**
 * Start create Annotation
 * - update store: set 'annotationPanel' 'edit' 'selectingSegment' = true
 * - update store: set 'annotationPanel' 'edit' 'selectingEntities' = false
 * 
 */
  @dispatch() startCreateAnnotation() {
    return this.actions.startCreateAnnotation()
  }

  /**
  * Creat Annotation was stopped
  * 
  */
  @dispatch() stopCreateAnnotation() {
    return this.actions.stopCreateAnnotation()
  }

  /**
   * called during creation of a new Annotation / Chunk, when 
   * user selects words/letters in QuillEditComponent
   * - create Chunk
   * - updates store: set 'annotationPanel', 'edit', 'chunk' = new Chunk
   */
  @dispatch() onSelectedDeltaChange(delta: Delta) {
    return this.actions.onSelectedDeltaChange(delta)
  }

  /**
   * called when quillDoc is changed
   */
  @dispatch() onQuillDocChange(quillDoc: QuillDoc) {
    return this.actions.onQuillDocChange(quillDoc)
  }

  initAnnotations() {

    this.subs.push(this.digtObjApi.nestedObjectOfProject(
      this.ngRedux.getState().activeProject.pk_project,
      this.ngRedux.getState().sources.edit.view.pk_entity,
    ).subscribe((digitObjs: InfDigitalObject[]) => {
      const digitObj = digitObjs[0];

      console.log(digitObj)
      let nodes = new Map();

      this.annotationPanel = {
        view: indexBy(annotationStateKey, digitObj.chunks.map(chunk => {
          const delta = JSON.parse(chunk.js_quill_data);

          delta.ops.forEach(op => {
            if (op.attributes && op.attributes.node && !(op.attributes.node == '_dots_')) {
              const count = nodes.get(op.attributes.node) ? nodes.get(op.attributes.node) : 0;
              nodes.set(op.attributes.node, (count + 1))
            }
          })

          return {
            chunk: {
              pkEntity: chunk.pk_entity,
              fkDigitalObject: chunk.fk_digital_object,
              quillDelta: JSON.parse(chunk.js_quill_data) // TODO why does it store the deltas stringified??
            },
            mentionedEntities: indexBy(mentionedEntityKey, chunk.entity_associations.map(ea=>{
              return {
                pkEntity: ea.fk_range_entity,
                entityAssociation: ea,
                label: '' // TODO lazy load pe it or eager load ?
              } as MentionedEntity
            }))
          } as AnnotationState;
        }))
      }
      this.annotatedNodes = Array.from(nodes);


    }))
    this.annotatedNodes = [
      ['20', 1],
      ['21', 3],
      ['24', 5]
    ]

    this.annotationPanel = {
      view: {
        _annot_1: {
          chunk: new Chunk({
            quillDelta: {
              "ops": [
                {
                  "attributes": {
                    "node": "20"
                  },
                  "insert": "Emmanuel"
                },
                {
                  "attributes": {
                    "node": "21"
                  },
                  "insert": " "
                },
                {
                  "attributes": {
                    "node": "24"
                  },
                  "insert": "Büchel"
                }
              ]
            }
          }),
          mentionedEntities: {
            _entity_123: {
              pkEntity: 123,
              entityAssociation: new InfEntityAssociation(),
              label: 'Bern'
            },
            _entity_124: {
              pkEntity: 124,
              entityAssociation: new InfEntityAssociation(),
              label: 'Moritz'
            },
            _entity_125: {
              pkEntity: 125,
              entityAssociation: new InfEntityAssociation(),
              label: 'Bern'
            },
            _entity_126: {
              pkEntity: 126,
              entityAssociation: new InfEntityAssociation(),
              label: 'Moritz'
            }
          }
        },
        _annot_2: {
          chunk: new Chunk({
            quillDelta: {
              text: 'some other words'
            }
          }),
          mentionedEntities: {
            _entity_400: {
              pkEntity: 400,
              entityAssociation: new InfEntityAssociation(),
              label: 'Hans Muster'
            }
          }
        },
        _annot_3: {
          chunk: new Chunk({
            quillDelta: {
              text: 'some other words'
            }
          }),
          mentionedEntities: {
            _entity_400: {
              pkEntity: 400,
              entityAssociation: new InfEntityAssociation(),
              label: 'Hans Muster'
            }
          }
        }
      }
    }
  }
}
