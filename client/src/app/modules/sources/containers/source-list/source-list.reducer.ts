import { Action } from 'redux';

import { omit } from 'ramda';
import { ISourceListState } from '../../sources.models';
import { SourceListAction, SourceListActions } from './source-list.actions';

const INITIAL_STATE: ISourceListState = {
};


export const sourceListReducer =
    (lastState: ISourceListState = INITIAL_STATE, action: SourceListAction): ISourceListState => {

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_STATE_UPDATED:
                lastState = action.payload
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_SEARCH_HITS_UPDATED:
                lastState = {
                    ...lastState,
                    list: action.payload.list
                }
                break;
        }


        switch (action.type) {
            case SourceListActions.SOURCE_LIST_OPEN:
                lastState = {
                    ...lastState,
                    edit: action.payload.edit
                }
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_START_REMOVE:
                lastState = {
                    ...lastState,
                    remove: action.payload.remove
                }
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_CANCEL_REMOVE:
                lastState = omit(['remove'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_REMOVED:
                lastState = omit(['remove'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_START_CREATE:
                lastState = {
                    ...lastState,
                    create: true
                };
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_STOP_CREATE:
                lastState = omit(['create'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListActions.SOURCE_LIST_CLOSE:
                lastState = omit(['edit'], lastState);
                break;
        }


        switch (action.type) {
            case SourceListActions.SOURCE_LIST_SOURCE_UPDATED:
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

