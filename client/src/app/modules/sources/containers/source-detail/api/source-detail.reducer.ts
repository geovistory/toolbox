import { Action } from 'redux';
import { SourceDetailAPIAction, SourceDetailAPIActions } from './source-detail.actions';
import { SourceDetail } from './source-detail.models';
import { omit } from 'ramda';

const INITIAL_STATE = new SourceDetail();

export function sourceDetailReducer(state: SourceDetail = INITIAL_STATE, a: Action): SourceDetail {

  const action = a as SourceDetailAPIAction;

  switch (action.type) {


    /**************************************
     * Reducers for loading source details
     **************************************/

    case SourceDetailAPIActions.LOAD_SOURCE_DETAILS:
      state = {
        ...state,
        edit: undefined,
        loading: true
      }
      break;
    case SourceDetailAPIActions.LOAD_SOURCE_DETAILS_SUCCEEDED:
      state = {
        ...state,
        edit: action.meta.sourceDetail,
        loading: false
      }
      break;

    case SourceDetailAPIActions.LOAD_SOURCE_DETAILS_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    /**************************************
     * Reducers for loading section details
     **************************************/
    case SourceDetailAPIActions.LOAD_SECTION_DETAILS:
      state = {
        ...state,
        editSection: undefined,
        loading: true
      }
      break;
    case SourceDetailAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED:
      state = {
        ...state,
        editSection: action.meta.sectionDetail,
        loading: false
      }
      break;

    case SourceDetailAPIActions.LOAD_SECTION_DETAILS_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    /**************************************
    * Reducers for managing create source
    **************************************/

    case SourceDetailAPIActions.START_CREATE:
      state = {
        ...state,
        create: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        }
      };
      break;

    case SourceDetailAPIActions.STOP_CREATE:
      state = omit(['create'], state);
      break;


    /************************************************
 * Reducers to remove PeIt from project
 ************************************************/

    case SourceDetailAPIActions.REMOVE_SOURCE:
      state = {
        ...state,
        loading: true
      }
      break;


    case SourceDetailAPIActions.REMOVE_SOURCE_SUCCEEDED:
      state = omit(['edit'], state)
      break;


    case SourceDetailAPIActions.REMOVE_SOURCE_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    // case SourceDetailAPIActions.STOP_CREATE_SECTION:
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


    // case SourceDetailAPIActions.CLOSE:
    //   state = omit(['edit'], state);
    //   break;


    // case SourceDetailAPIActions.STATE_UPDATED:
    //   state = action.payload
    //   break;
    // case SourceDetailAPIActions.OPEN:
    //   state = {
    //     ...state,
    //     edit: action.payload.edit
    //   }
    //   break;

    // case SourceDetailAPIActions.START_REMOVE:
    //   state = {
    //     ...state,
    //     remove: action.payload.remove
    //   }
    //   break;

    // case SourceDetailAPIActions.CANCEL_REMOVE:
    //   state = omit(['remove'], state);
    //   break;

    // case SourceDetailAPIActions.REMOVED:
    //   state = omit(['remove'], state);
    //   break;


    // case SourceDetailAPIActions.SOURCE_UPDATED:
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
    case SourceDetailAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

