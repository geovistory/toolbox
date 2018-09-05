import { Action } from 'redux';

import { omit, clone } from 'ramda';
import { ISourceDetailState } from '../../sources.models';
import { SourceDetailAction, SourceDetailActions } from './source-detail.actions';
import * as Delta from 'quill'

const INITIAL_STATE: ISourceDetailState = {
};


export const sourceDetailReducer =
    (lastState: ISourceDetailState = INITIAL_STATE, action: SourceDetailAction): ISourceDetailState => {

        switch (action.type) {

            case SourceDetailActions.SOURCE_DETAIL_STATE_UPDATED:
                lastState = action.payload
                break;


            case SourceDetailActions.SOURCE_DETAIL_EDIT_STARTED:
                const edit = clone(lastState.view);
                // update the latest Id for editing
                edit.js_quill_data.latestId = action.meta.latestId;

                lastState = {
                    ...lastState,
                    edit: edit,
                }
                break;


            case SourceDetailActions.SOURCE_DETAIL_CANCEL_EDIT:
                lastState = omit(['edit'], {
                    ...lastState,
                })
                break;

            case SourceDetailActions.SOURCE_DETAIL_ON_QUILL_CHANGE:
                lastState = {
                    ...lastState,
                    edit: {
                        ...lastState.edit,
                        js_quill_data: clone(action.payload.edit.js_quill_data)
                    }
                }
                break;

            case SourceDetailActions.SOURCE_DETAIL_SHOW_ANNOTATIONS:
                lastState = {
                    ...lastState,
                    annotationPanel: action.payload.annotationPanel
                }
                break;

            case SourceDetailActions.SOURCE_DETAIL_START_CREATE_ANNOTATION:
                lastState = {
                    annotate: clone(lastState.view),
                    ...lastState,
                    annotationPanel: {
                        ...lastState.annotationPanel,
                        edit: {
                            ...lastState.annotationPanel.edit,
                            selectingSegment: true,
                            selectingEntities: false
                        }
                    }
                }
                break;

            case SourceDetailActions.SOURCE_DETAIL_STOP_CREATE_ANNOTATION:
                lastState = omit(['annotate'], {
                    ...lastState,
                })
                break;

            case SourceDetailActions.SOURCE_DETAIL_HIDE_ANNOTATIONS:
                lastState = omit(['annotationPanel'], {
                    ...lastState,
                })
                break;

            case SourceDetailActions.SOURCE_DETAIL_SELECTED_DELTA_CHANGE:
                lastState = {
                    ...lastState,
                    annotationPanel: {
                        ...lastState.annotationPanel,
                        edit: {
                            ...lastState.annotationPanel.edit,
                            chunk: {
                                ...lastState.annotationPanel.edit.chunk,
                                quillDelta: action.payload.annotationPanel.edit.chunk.quillDelta
                            }
                        }
                    }
                }
                break;

            case SourceDetailActions.SOURCE_DETAIL_VERSION_LIST_LOADED:
                lastState = {
                    ...lastState,
                    versionList: action.payload.versionList
                }
                break;
        }



        return lastState;
    };


