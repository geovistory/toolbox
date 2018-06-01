import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IAnnotationPanelState, Chunk, AnnotationState } from '../../annotation.models';
import { InfEntityAssociation } from 'app/core';
import { clone, indexBy } from 'ramda'

export function annotationStateKey(a: AnnotationState) {
  return '_annot' + a.chunk.pkEntity;
}

// replace AnnotationPanel with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IAnnotationPanelState;
export type AnnotationPanelAction = FluxStandardAction<Payload, any>;

@Injectable()
export class AnnotationPanelActions {
  static readonly ANNOTATION_PANEL_STATE_UPDATED = 'ANNOTATION_PANEL_STATE_UPDATED';
  static readonly START_CREATE_ANNOTATION = 'START_CREATE_ANNOTATION';
  static readonly ANNOTATION_PANEL_CREATED_ANNOTATION = 'ANNOTATION_PANEL_CREATED_ANNOTATION';  
  static readonly START_EDIT_ANNOTATION = 'START_EDIT_ANNOTATION';
  static readonly CANCEL_EDIT_ANNOTATION = 'CANCEL_EDIT_ANNOTATION';
  static readonly START_REMOVE_ANNOTATION = 'START_REMOVE_ANNOTATION';
  static readonly CANCEL_REMOVE_ANNOTATION = 'CANCEL_REMOVE_ANNOTATION';


  @dispatch()

  annotationPanelStateUpdated = (payload: IAnnotationPanelState): AnnotationPanelAction => ({
    type: AnnotationPanelActions.ANNOTATION_PANEL_STATE_UPDATED,
    meta: null,
    payload
  })

  startCreateAnnotation = (): AnnotationPanelAction => {
    return {
      type: AnnotationPanelActions.START_CREATE_ANNOTATION,
      meta: null,
      payload: {
        edit: {
          selectingSegment: true,
          selectingEntities: false
        }
      }
    }
  }

  createdAnnotation = (view: AnnotationState): AnnotationPanelAction => {
    return {
      type: AnnotationPanelActions.ANNOTATION_PANEL_CREATED_ANNOTATION,
      meta: null,
      payload: {
        view: indexBy(annotationStateKey, [view])
      }
    }
  }

  startEditAnnotation = (annotation:AnnotationState): AnnotationPanelAction => {
    return {
      type: AnnotationPanelActions.START_EDIT_ANNOTATION,
      meta: null,
      payload: {
        edit: {
          selectingSegment: false,
          selectingEntities: true,
          chunk: new Chunk(annotation.chunk),
          mentionedEntities: clone(annotation.mentionedEntities)
        }
      }
    }
  }

  startRemoveAnnotation = (annotation:AnnotationState): AnnotationPanelAction => {
    return {
      type: AnnotationPanelActions.START_REMOVE_ANNOTATION,
      meta: null,
      payload: {
        remove: clone(annotation)
      }
    }
  }

  cancelEditAnnotation = (): AnnotationPanelAction => ({
    type: AnnotationPanelActions.CANCEL_EDIT_ANNOTATION,
    meta: null,
    payload: null
  })


  cancelRemoveAnnotation = (): AnnotationPanelAction => ({
    type: AnnotationPanelActions.CANCEL_REMOVE_ANNOTATION,
    meta: null,
    payload: null
  })

}
