import { omit } from 'ramda';
import { Action } from 'redux';
import { EntityDetailAPIAction, EntityDetailAPIActions } from './entity-detail.actions';
import { EntityDetail } from './entity-detail.models';

const INITIAL_STATE = new EntityDetail();

export function entityDetailReducer(state: EntityDetail = INITIAL_STATE, a: Action): EntityDetail {

  const action = a as EntityDetailAPIAction;

  switch (action.type) {


    /*****************************************************
    * Reducers to manage entity editor
    *****************************************************/
    case EntityDetailAPIActions.OPEN_PERSISTENT_ENTITY_EDITOR:
      state = {
        ...omit(['_teEnt_editable', '_add'], state),
        loading: true,
        _peIt_editable: {}
      };
      break;

    case EntityDetailAPIActions.OPEN_PERSISTENT_ENTITY_EDITOR_SUCCEEDED:
      state = {
        ...state,
        _peIt_editable: action.meta.peItDetail,
        loading: false,
      };
      break;

    case EntityDetailAPIActions.OPEN_PERSISTENT_ENTITY_EDITOR_FAILED:
      state = {
        ...state,
        loading: false,
        _peIt_editable: undefined
      };
      break;

    /*****************************************************
    * Reducers to manage temporal entity editor
    *****************************************************/
    case EntityDetailAPIActions.OPEN_TEMPORAL_ENTITY_EDITOR:
      state = {
        ...omit(['_peIt_editable', '_add'], state),
        loading: true,
        _teEnt_editable: {}
      };
      break;

    case EntityDetailAPIActions.OPEN_TEMPORAL_ENTITY_EDITOR_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        _teEnt_editable: action.meta.teEntDetail,
      };
      break;

    case EntityDetailAPIActions.OPEN_TEMPORAL_ENTITY_EDITOR_FAILED:
      state = {
        ...state,
        loading: false,
        _teEnt_editable: undefined
      };
      break;


    /*****************************************************
    * Reducers to manage entity add form
    *****************************************************/

    case EntityDetailAPIActions.START_CREATE:
      state = {
        ...state,
        _add: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        },
        tabTitle: 'Add...'
      };
      break;

    case EntityDetailAPIActions.STOP_CREATE:
      state = omit(['_add'], state);
      break;


    /************************************************
       * Reducers to remove PeIt from project
       ************************************************/

    case EntityDetailAPIActions.REMOVE_PE_IT:
      state = {
        ...state,
        loading: true
      }
      break;


    case EntityDetailAPIActions.REMOVE_PE_IT_SUCCEEDED:
      state = {
        ...state,
        removed: true
      }
      break;


    case EntityDetailAPIActions.REMOVE_PE_IT_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    /*********************************************************************
    *  Set the tab title
    *********************************************************************/

    case EntityDetailAPIActions.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      }
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case EntityDetailAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

