import { Action } from 'redux';
import { AnnotationPanelAction, AnnotationPanelActions } from './annotation-panel.actions';
import { IAnnotationPanelState } from '../../annotation.models';
import { omit } from 'ramda';

const INITIAL_STATE: IAnnotationPanelState = {
};


export const annotationPanelReducer =
    (lastState: IAnnotationPanelState = INITIAL_STATE, action: AnnotationPanelAction): IAnnotationPanelState => {

        switch (action.type) {
            case AnnotationPanelActions.ANNOTATION_PANEL_STATE_UPDATED:
                lastState = action.payload
                break;
        }

        switch (action.type) {
            case AnnotationPanelActions.START_CREATE_ANNOTATION:
                lastState = {
                    ...lastState,
                    edit: action.payload.edit
                }
                break;
        }

        switch (action.type) {
            case AnnotationPanelActions.ANNOTATION_PANEL_CREATED_ANNOTATION:
                lastState = {
                    ...omit(['edit'], lastState),
                    view: {
                        ...lastState.view,
                        ...action.payload.view
                    }
                }
                break;
        }

        switch (action.type) {
            case AnnotationPanelActions.START_EDIT_ANNOTATION:
                lastState = {
                    ...lastState,
                    edit: action.payload.edit
                }
                break;
        }


        switch (action.type) {
            case AnnotationPanelActions.CANCEL_EDIT_ANNOTATION:
                lastState = {
                    ...omit(['edit'], lastState),
                }
                break;
        }

        switch (action.type) {
            case AnnotationPanelActions.START_REMOVE_ANNOTATION:
                lastState = {
                    ...lastState,
                    remove: action.payload.remove
                }
                break;
        }

        switch (action.type) {
            case AnnotationPanelActions.CANCEL_REMOVE_ANNOTATION:
                lastState = {
                    ...omit(['remove'], lastState),
                }
                break;
        }

        return lastState;
    };

