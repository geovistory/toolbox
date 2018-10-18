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
        }

        switch (action.type) {
            case SourceListAPIActions.SEARCH_HITS_UPDATED:
                lastState = {
                    ...lastState,
                    list: action.payload.list
                }
                break;
        }


        switch (action.type) {
            case SourceListAPIActions.OPEN:
                lastState = {
                    ...lastState,
                    edit: action.payload.edit
                }
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.START_REMOVE:
                lastState = {
                    ...lastState,
                    remove: action.payload.remove
                }
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.CANCEL_REMOVE:
                lastState = omit(['remove'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.REMOVED:
                lastState = omit(['remove'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.START_CREATE:
                lastState = {
                    ...lastState,
                    create: {
                        classAndTypePk: action.meta.classAndTypePk
                    }
                };
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.STOP_CREATE:
                lastState = omit(['create'], lastState);
                break;
        }

        switch (action.type) {
            case SourceListAPIActions.CLOSE:
                lastState = omit(['edit'], lastState);
                break;
        }


        switch (action.type) {
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

