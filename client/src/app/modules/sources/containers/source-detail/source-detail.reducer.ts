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
        }

        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_START_EDIT:
                lastState = {
                    ...lastState,
                    edit: clone(lastState.view),
                }
                break;
        }


        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_CANCEL_EDIT:
                lastState = omit(['edit'], {
                    ...lastState,
                })
                break;
        }

        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_ON_QUILL_CHANGE:
                lastState = {
                    ...lastState,
                    edit: clone(action.payload.edit)
                }
                break;
        }


        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_SHOW_ANNOTATIONS:
                lastState = {
                    ...lastState,
                    annotationPanel: action.payload.annotationPanel
                }
                break;
        }

        switch (action.type) {
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
        }

        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_STOP_CREATE_ANNOTATION:
                lastState = omit(['annotate'], {
                    ...lastState,
                })
                break;
        }

        switch (action.type) {
            case SourceDetailActions.SOURCE_DETAIL_HIDE_ANNOTATIONS:
                lastState = omit(['annotationPanel'], {
                    ...lastState,
                })
                break;
        }

        switch (action.type) {
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
        }


        return lastState;
    };


