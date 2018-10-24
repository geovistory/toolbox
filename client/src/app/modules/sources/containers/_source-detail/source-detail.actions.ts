import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ISourceDetailState, ISourceSearchHitState, IVersion } from '../../sources.models';
import { IAnnotationPanelState } from '../../../annotation';
import * as Delta from 'quill-delta/lib/delta';
import { QuillDoc } from 'app/modules/quill';
import { InfDigitalObject } from '../../../../core';

// replace SourceDetail with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ISourceDetailState;
export type SourceDetailAction = FluxStandardAction<Payload, any>;

@Injectable()
export class SourceDetailActions {
  static readonly SOURCE_DETAIL_STATE_UPDATED = 'SOURCE_DETAIL_STATE_UPDATED';
  static readonly SOURCE_DETAIL_START_EDIT = 'SOURCE_DETAIL_START_EDIT';
  static readonly SOURCE_DETAIL_EDIT_STARTED = 'SOURCE_DETAIL_EDIT_STARTED';
  static readonly SOURCE_DETAIL_CANCEL_EDIT = 'SOURCE_DETAIL_CANCEL_EDIT';
  static readonly SOURCE_DETAIL_ON_QUILL_CHANGE = 'SOURCE_DETAIL_ON_QUILL_CHANGE';

  static readonly SOURCE_DETAIL_SHOW_ANNOTATIONS = 'SOURCE_DETAIL_SHOW_ANNOTATIONS';
  static readonly SOURCE_DETAIL_HIDE_ANNOTATIONS = 'SOURCE_DETAIL_HIDE_ANNOTATIONS';

  static readonly SOURCE_DETAIL_START_CREATE_ANNOTATION = 'SOURCE_DETAIL_START_CREATE_ANNOTATION';
  static readonly SOURCE_DETAIL_STOP_CREATE_ANNOTATION = 'SOURCE_DETAIL_STOP_CREATE_ANNOTATION';
  static readonly SOURCE_DETAIL_SELECTED_DELTA_CHANGE = 'SOURCE_DETAIL_SELECTED_DELTA_CHANGE';

  static readonly SOURCE_DETAIL_START_LOADING_VERSION_LIST = 'SOURCE_DETAIL_START_LOADING_VERSION_LIST';
  static readonly SOURCE_DETAIL_VERSION_LIST_LOADED = 'SOURCE_DETAIL_VERSION_LIST_LOADED';

  @dispatch()

  stateUpdated = (payload: ISourceDetailState): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_STATE_UPDATED,
    meta: null,
    payload
  })

  startEdit = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_START_EDIT,
    meta: null,
    payload: null
  })

  editStarted = (latestId: number): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_EDIT_STARTED,
    meta: { latestId },
    payload: null
  })

  cancelEdit = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_CANCEL_EDIT,
    meta: null,
    payload: null
  })

  showAnnotations = (annotationPanel: IAnnotationPanelState): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_SHOW_ANNOTATIONS,
    meta: null,
    payload: {
      annotationPanel
    }
  })

  hideAnnotations = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_HIDE_ANNOTATIONS,
    meta: null,
    payload: null
  })

  startCreateAnnotation = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_START_CREATE_ANNOTATION,
    meta: null,
    payload: null
  })

  stopCreateAnnotation = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_STOP_CREATE_ANNOTATION,
    meta: null,
    payload: null
  })


  onQuillDocChange = (quillDoc: QuillDoc): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_ON_QUILL_CHANGE,
    meta: null,
    payload: {
      edit: {
        js_quill_data: quillDoc
      } as InfDigitalObject
    }
  })

  onSelectedDeltaChange = (quillDelta: Delta): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_SELECTED_DELTA_CHANGE,
    meta: null,
    payload: {
      annotationPanel: {
        edit: {
          chunk: {
            quillDelta
          }
        }
      }
    }
  })

  startLoadingVersionList = (): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_START_LOADING_VERSION_LIST,
    meta: null,
    payload: null
  })

  versionListLoaded = (versionList: IVersion[]): SourceDetailAction => ({
    type: SourceDetailActions.SOURCE_DETAIL_VERSION_LIST_LOADED,
    meta: null,
    payload: {
      versionList
    }
  })

}
