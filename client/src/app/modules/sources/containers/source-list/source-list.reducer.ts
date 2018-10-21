import { Action } from 'redux';

import { omit } from 'ramda';
import { ISourceListState } from '../../sources.models';
import { SourceListAPIAction, SourceListAPIActions } from './source-list.actions';

const INITIAL_STATE: ISourceListState = {
};


export const sourceListReducer =
    (lastState: ISourceListState = INITIAL_STATE, action: SourceListAPIAction): ISourceListState => {

        switch (action.type) {
            case SourceListAPIActions.STATE_UPDATED:
                lastState = action.payload
                break;

            case SourceListAPIActions.SEARCH_HITS_UPDATED:
                lastState = {
                    ...lastState,
                    list: action.payload.list
                }
                break;

            case SourceListAPIActions.OPEN:
                lastState = {
                    ...lastState,
                    edit: action.payload.edit
                }
                break;

            case SourceListAPIActions.START_REMOVE:
                lastState = {
                    ...lastState,
                    remove: action.payload.remove
                }
                break;

            case SourceListAPIActions.CANCEL_REMOVE:
                lastState = omit(['remove'], lastState);
                break;

            case SourceListAPIActions.REMOVED:
                lastState = omit(['remove'], lastState);
                break;

            case SourceListAPIActions.START_CREATE:
                lastState = {
                    ...lastState,
                    create: {
                        classAndTypePk: action.meta.classAndTypePk,
                        pkUiContext: action.meta.pkUiContext
                    }
                };
                break;

            case SourceListAPIActions.STOP_CREATE:
                lastState = omit(['create'], lastState);
                break;

            case SourceListAPIActions.CLOSE:
                lastState = omit(['edit'], lastState);
                break;

            case SourceListAPIActions.SOURCE_UPDATED:
                lastState = {
                    ...lastState,
                    edit: {
                        ...omit(['edit'], lastState.edit),
                        view: action.payload.edit.view,
                    }
                };
                break;
        }

        return lastState;
    };

