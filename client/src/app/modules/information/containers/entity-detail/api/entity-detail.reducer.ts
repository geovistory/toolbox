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
    case EntityDetailAPIActions.OPEN_ENTITY_EDITOR:
      state = {
        ...state,
        loading: true,
        _peIt_editable: {}
      };
      break;

    case EntityDetailAPIActions.OPEN_ENTITY_EDITOR_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        _peIt_editable: action.meta.peItDetail,
        _teEnt_editable: undefined
      };
      break;

    case EntityDetailAPIActions.OPEN_ENTITY_EDITOR_FAILED:
      state = {
        ...state,
        loading: false,
        _peIt_editable: undefined
      };
      break;

    /*****************************************************
    * Reducers to manage phenomenon editor
    *****************************************************/
    case EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR:
      state = {
        ...state,
        loading: true,
        _teEnt_editable: {}
      };
      break;

    case EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        _teEnt_editable: action.meta.teEntDetail,
        _peIt_editable: undefined
      };
      break;

    case EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR_FAILED:
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
        _peIt_add: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        }
      };
      break;

    case EntityDetailAPIActions.STOP_CREATE:
      state = omit(['_peIt_add'], state);
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
      state = omit(['_peIt_editable'], state)
      break;


    case EntityDetailAPIActions.REMOVE_PE_IT_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    // case EntityDetailAPIActions.ENTITY_ADD_EXISTING_INITIALIZED:
    //   state = {
    //     ...state,
    //     _peIt_add_form: action.payload._peIt_add_form
    //   };
    //   break;

    // case EntityDetailAPIActions.ENTITY_ADD_EXISTING_DESTROYED:
    //   state = {
    //     ...omit(['_peIt_add_form'], state),
    //   }
    //   break;


    // case EntityDetailAPIActions.PE_IT_CREATE_ADDED:
    //   state = {
    //     ...state,
    //     _peIt_create_form: action.payload._peIt_create_form
    //   };
    //   break;

    // case EntityDetailAPIActions.PE_IT_CREATE_DESTROYED:
    //   state = {
    //     ...omit(['_peIt_create_form'], state),
    //   }
    //   break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case EntityDetailAPIActions.DESTROY:
      state = { };
      break;

  }

  return state;
};

