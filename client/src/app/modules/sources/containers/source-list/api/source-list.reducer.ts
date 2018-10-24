import { Action } from 'redux';
import { SourceListAPIAction, SourceListAPIActions } from './source-list.actions';
import { SourceList } from './source-list.models';
import { omit } from 'ramda';

const INITIAL_STATE = new SourceList();

export function sourceListReducer(lastState: SourceList = INITIAL_STATE, a: Action): SourceList {

  const action = a as SourceListAPIAction;

  switch (action.type) {

    case SourceListAPIActions.INITIALIZE_LIST:
      lastState = {
        ...lastState,
        list: {
          pkAllowedClasses: action.meta.pkAllowedClasses
        }
      }
      break;

    /**************************************
     * Reducers for loading source details
     **************************************/

    case SourceListAPIActions.LOAD_SOURCE_DETAILS:
      lastState = {
        ...lastState,
        edit: undefined,
        loading: true
      }
      break;
    case SourceListAPIActions.LOAD_SOURCE_DETAILS_SUCCEEDED:
      lastState = {
        ...lastState,
        edit: action.meta.sourceDetail,
        loading: false
      }
      break;

    case SourceListAPIActions.LOAD_SOURCE_DETAILS_FAILED:
      lastState = {
        ...lastState,
        loading: false
      }
      break;


    /**************************************
     * Reducers for loading section details
     **************************************/
    case SourceListAPIActions.LOAD_SECTION_DETAILS:
      lastState = {
        ...lastState,
        editSection: undefined,
        loading: true
      }
      break;
    case SourceListAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED:
      lastState = {
        ...lastState,
        editSection: action.meta.sectionDetail,
        loading: false
      }
      break;

    case SourceListAPIActions.LOAD_SECTION_DETAILS_FAILED:
      lastState = {
        ...lastState,
        loading: false
      }
      break;



    /**************************************
    * Reducers for managing create source
    **************************************/

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


    // case SourceListAPIActions.STOP_CREATE_SECTION:
    //   lastState = {
    //     ...lastState,
    //     edit: {
    //       ...lastState.edit,
    //       sectionList: {
    //         ...omit(['create'], lastState.edit.sectionList)
    //       }
    //     }
    //   };
    //   break;


    // case SourceListAPIActions.CLOSE:
    //   lastState = omit(['edit'], lastState);
    //   break;


    // case SourceListAPIActions.STATE_UPDATED:
    //   lastState = action.payload
    //   break;
    // case SourceListAPIActions.OPEN:
    //   lastState = {
    //     ...lastState,
    //     edit: action.payload.edit
    //   }
    //   break;

    // case SourceListAPIActions.START_REMOVE:
    //   lastState = {
    //     ...lastState,
    //     remove: action.payload.remove
    //   }
    //   break;

    // case SourceListAPIActions.CANCEL_REMOVE:
    //   lastState = omit(['remove'], lastState);
    //   break;

    // case SourceListAPIActions.REMOVED:
    //   lastState = omit(['remove'], lastState);
    //   break;


    // case SourceListAPIActions.SOURCE_UPDATED:
    //   lastState = {
    //     ...lastState,
    //     edit: {
    //       ...omit(['edit'], lastState.edit),
    //       view: action.payload.edit.view,
    //     }
    //   };
    //   break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SourceListAPIActions.DESTROY:
      lastState = {};
      break;

  }

  return lastState;
};

