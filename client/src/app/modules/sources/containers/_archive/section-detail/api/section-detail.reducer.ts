import { Action } from 'redux';
import { SectionDetailAPIAction, SectionDetailAPIActions } from './section-detail.actions';
import { SectionDetail } from './section-detail.models';
import { omit } from 'ramda';

const INITIAL_STATE = new SectionDetail();

export function sectionDetailReducer(state: SectionDetail = INITIAL_STATE, a: Action): SectionDetail {

  const action = a as SectionDetailAPIAction;

  switch (action.type) {

    case SectionDetailAPIActions.LOAD_SOURCE_PREVIEW:
      state = {
        ...omit(['editSection', 'editSection', 'add'], state),
        loading: true
      }
      break;
    case SectionDetailAPIActions.LOAD_SOURCE_PREVIEW_SUCCEEDED:
      state = {
        ...state,
        pkSource: action.meta.sourcePreview.pk_entity,
        loading: false
      }
      break;

    case SectionDetailAPIActions.LOAD_SOURCE_PREVIEW_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    /**************************************
     * Reducers for loading section details
     **************************************/
    case SectionDetailAPIActions.LOAD_SECTION_DETAILS:
      state = {
        ...omit(['editSection', 'editSection', 'add'], state),
        loading: true
      }
      break;
    case SectionDetailAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED:
      state = {
        ...state,
        editSection: action.meta.sectionDetail,
        loading: false
      }
      break;

    case SectionDetailAPIActions.LOAD_SECTION_DETAILS_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    /**************************************
    * Reducers for managing create section
    **************************************/

    case SectionDetailAPIActions.START_CREATE:
      state = {
        ...state,
        add: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        }
      };
      break;

    case SectionDetailAPIActions.STOP_CREATE:
      state = omit(['add'], state);
      break;


    /************************************************
 * Reducers to remove PeIt from project
 ************************************************/

    case SectionDetailAPIActions.REMOVE_SECTION:
      state = {
        ...state,
        loading: true
      }
      break;


    case SectionDetailAPIActions.REMOVE_SECTION_SUCCEEDED:
      state = {
        ...state,
        removed: true
      }
      break;


    case SectionDetailAPIActions.REMOVE_SECTION_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;

       /*********************************************************************
    *  Set the tab title
    *********************************************************************/

    case SectionDetailAPIActions.SET_TAB_TITLE:
    state = {
      ...state,
      tabTitle: action.meta.tabTitle
    }
    break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SectionDetailAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

