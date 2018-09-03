import { dispatch, NgRedux, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState, InfChunk, InfChunkApi, InfEntityAssociation, U } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';

import { AnnotationCtrlState, AnnotationState, IAnnotationPanelState, MentionedEntity } from '../../annotation.models';
import { AnnotationPanelActions } from './annotation-panel.actions';
import { annotationPanelReducer } from './annotation-panel.reducer';
import { DfhConfig } from '../../../information/shared/dfh-config';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: annotationPanelReducer
})
@Component({
  selector: 'gv-annotation-panel',
  templateUrl: './annotation-panel.component.html',
  styleUrls: ['./annotation-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Container to manage the Annotations: Create, show, edit, delete
 * - interacts with store
 * - interacts with api
 *
 * Template if the 'edit' variable in the store is truthy:
 * - Shows a Form to edit (or create) one Annotation with ok and cancel button
 * - The FormGroup has a FormControl, the AnnotationCtrlComponent, to which it passes
 *   via ControlValueAccessor the AnnotationState and
 *   via Input the substore path to 'edit'
 *
 * Template if the 'edit' variable in the store is falsy:
 * - for each view.entities in store show AnnotationViewComponent and pass in the AnnotationState (buttons for edit and remove can be added to panel)
 */
export class AnnotationPanelComponent implements OnInit, OnDestroy {


  // path to the substore
  @Input() path: string[] | string;

  @select() edit$: Observable<AnnotationCtrlState>;
  @select() remove$: Observable<AnnotationState>;
  @select() view$: Observable<AnnotationState>;

  formGroup: FormGroup;
  annotationCtrl: FormControl;
  annotationCtrlPath: string[];

  subs: Subscription[] = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: AnnotationPanelActions,
    private fb: FormBuilder,
    private chunkApi: InfChunkApi
  ) {
    this.annotationCtrl = new FormControl(null, [Validators.required])
    this.formGroup = this.fb.group({ 'annotationCtrl': this.annotationCtrl })
    this.annotationCtrl.valueChanges.subscribe(val => {
      const x = val;
    })
  }

  getBasePath() { return this.path }

  /**
   * subscribe to 'annotationPanel'
   */
  ngOnInit() {

    this.annotationCtrlPath = this.path === '' ? ['edit'] :
      typeof this.path === 'string' ? [...[this.path], 'edit'] :
        [...this.path, 'edit'];

    this.subs.push(this.edit$.subscribe(editState => {
      this.annotationCtrl.setValue(editState)
    }))
  }

  // annotationCtrlValidator()

  /**
   * unsubscribe
   */
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Updates the state of substore
   */
  @dispatch() updateState(payload: IAnnotationPanelState) {
    return this.actions.annotationPanelStateUpdated(payload)
  }

  /**
   * Start new annotation
   * - builds a new annotationState and adds it to substore path 'edit'
   */
  @dispatch() startCreate() {
    return this.actions.startCreateAnnotation()
  }

  /**
   * Start edit annotation
   * - takes the annotationState from ['view', key] (leaf it there, will not be visible)
   * - adds a deep copy of the annotationState to ['edit']
   */
  @dispatch() startEdit(annotation: AnnotationState) {

    return this.actions.startEditAnnotation(annotation);
  }

  /**
   * Cancels edit annotation
   * - resets substore path 'edit' to null
   */
  @dispatch() cancelEdit() {
    return this.actions.cancelEditAnnotation();
  }

  /**
   * Saves annotation
   * - gets the data from formControl of AnnotationCtrlComponent
   * - calls api to findOrCreate InfChunk with InfEntityAssociation[] with InfEntityProjectRel[]
   * - on success call created()
   */
  save() {
    const val: AnnotationState = this.annotationCtrl.value;

    const c = {
      js_quill_data: val.chunk.quillDelta,
      fk_digital_object: this.ngRedux.getState().sources.edit.view.pk_entity,
      entity_associations: U.obj2Arr(val.mentionedEntities).map((me: MentionedEntity) => {
        return {
          fk_range_entity: me.pkEntity,
          fk_property: DfhConfig.PROPERTY_PK_MENTIONES
        } as InfEntityAssociation
      })
    } as InfChunk

    this.chunkApi.findOrCreateChunk(this.ngRedux.getState().activeProject.pk_project, c).subscribe(res => {
      const chunk = res[0];
      this.created(chunk)
    })
  }

  /**
   * Created a new annotation
   * - add annotation to substore path 'view'
   */
  @dispatch() created(c: InfChunk) {

    // TODO: retrieve the mentioned entities or so
    return this.actions.createdAnnotation({
      chunk: {
        pkEntity: c.pk_entity,
        quillDelta: c.js_quill_data
      },
      mentionedEntities: {}
    } as AnnotationState)
  }


  /**
   * Start removeing an annotation from project
   * - takes the annotationState from ['view', key] (leaf it there, will not be visible)
   * - adds a deep copy of the annotationState to ['edit']
   */
  @dispatch() startRemove(annotation: AnnotationState) {
    return this.actions.startRemoveAnnotation(annotation);
  }


  /**
   * Cancels remove annotation
   * - resets substore path 'remove' to null
   */
  @dispatch() cancelRemove() {
    return this.actions.cancelRemoveAnnotation();
  }

}
