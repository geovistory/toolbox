import { Action } from 'redux';
import { SourceListAPIAction, SourceListAPIActions } from './source-list.actions';
import { SourceList } from './source-list.models';
import { omit } from 'ramda';

const INITIAL_STATE = new SourceList();

export function sourceListReducer(state: SourceList = INITIAL_STATE, a: Action): SourceList {

  const action = a as SourceListAPIAction;

  switch (action.type) {

    case SourceListAPIActions.INITIALIZE_LIST:
      state = {
        ...state,
        list: {
          pkAllowedClasses: action.meta.pkAllowedClasses
        }
      }
      break;

    /**************************************
     * Reducers for loading source details
     **************************************/

    case SourceListAPIActions.LOAD_SOURCE_DETAILS:
      state = {
        ...state,
        edit: undefined,
        loading: true
      }
      break;
    case SourceListAPIActions.LOAD_SOURCE_DETAILS_SUCCEEDED:
      state = {
        ...state,
        edit: action.meta.sourceDetail,
        loading: false
      }
      break;

    case SourceListAPIActions.LOAD_SOURCE_DETAILS_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    /**************************************
     * Reducers for loading section details
     **************************************/
    case SourceListAPIActions.LOAD_SECTION_DETAILS:
      state = {
        ...state,
        editSection: undefined,
        loading: true
      }
      break;
    case SourceListAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED:
      state = {
        ...state,
        editSection: action.meta.sectionDetail,
        loading: false
      }
      break;

    case SourceListAPIActions.LOAD_SECTION_DETAILS_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    /**************************************
    * Reducers for managing create source
    **************************************/

    case SourceListAPIActions.START_CREATE:
      state = {
        ...state,
        create: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        }
      };
      break;

    case SourceListAPIActions.STOP_CREATE:
      state = omit(['create'], state);
      break;


    /************************************************
 * Reducers to remove PeIt from project
 ************************************************/

    case SourceListAPIActions.REMOVE_SOURCE:
      state = {
        ...state,
        loading: true
      }
      break;


    case SourceListAPIActions.REMOVE_SOURCE_SUCCEEDED:
      state = omit(['edit'], state)
      break;


    case SourceListAPIActions.REMOVE_SOURCE_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    // case SourceListAPIActions.STOP_CREATE_SECTION:
    //   state = {
    //     ...state,
    //     edit: {
    //       ...state.edit,
    //       sectionList: {
    //         ...omit(['create'], state.edit.sectionList)
    //       }
    //     }
    //   };
    //   break;


    // case SourceListAPIActions.CLOSE:
    //   state = omit(['edit'], state);
    //   break;


    // case SourceListAPIActions.STATE_UPDATED:
    //   state = action.payload
    //   break;
    // case SourceListAPIActions.OPEN:
    //   state = {
    //     ...state,
    //     edit: action.payload.edit
    //   }
    //   break;

    // case SourceListAPIActions.START_REMOVE:
    //   state = {
    //     ...state,
    //     remove: action.payload.remove
    //   }
    //   break;

    // case SourceListAPIActions.CANCEL_REMOVE:
    //   state = omit(['remove'], state);
    //   break;

    // case SourceListAPIActions.REMOVED:
    //   state = omit(['remove'], state);
    //   break;


    // case SourceListAPIActions.SOURCE_UPDATED:
    //   state = {
    //     ...state,
    //     edit: {
    //       ...omit(['edit'], state.edit),
    //       view: action.payload.edit.view,
    //     }
    //   };
    //   break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SourceListAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

