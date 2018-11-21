import { indexBy, prop, omit } from 'ramda';
import { Action } from 'redux';
import { TextPropertyFieldAPIAction, TextPropertyFieldAPIActions } from './text-property-field.actions';
import { TextPropertyField } from 'app/core/state/models/text-property-field';
import { textPropertyDetailKey } from 'app/core/state/services/state-creator';

const INITIAL_STATE = new TextPropertyField();

export function textPropertyListReducer(state: TextPropertyField = INITIAL_STATE, a: Action): TextPropertyField {

  const action = a as TextPropertyFieldAPIAction;

  switch (action.type) {

    /***************************************************
     * Reducers to load
     * TODO: Check if needed
     */
    case TextPropertyFieldAPIActions.LOAD:
      state = {
        ...state,
      };
      break;
    case TextPropertyFieldAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
      };
      break;

    case TextPropertyFieldAPIActions.LOAD_FAILED:
      state = {
        ...state,
      };
      break;

    /***************************************************
     * Reducers to remove text property from project
     ****************************************************/

    case TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT:
      state = {
        ...state,
        loading: true
      }
      break;


    case TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT_SUCCEEDED:
      state = {
        ...state,
        textPropertyDetailList: omit([action.meta.key], state.textPropertyDetailList)
      }
      break;


    case TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;



    case TextPropertyFieldAPIActions.CREATE:
      state = {
        ...state,
        loading: true
      };
      break;
    case TextPropertyFieldAPIActions.CREATE_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        createOrAdd: undefined,
        textPropertyDetailList: {
          [textPropertyDetailKey(action.meta.txtPropDetail)]: action.meta.txtPropDetail,
          ...state.textPropertyDetailList
        }
      };
      break;

    case TextPropertyFieldAPIActions.CREATE_FAILED:
      state = {
        ...state,
      };
      break;

    case TextPropertyFieldAPIActions.TOGGLE:
      state = {
        ...state,
        toggle: state.toggle === 'expanded' ? 'collapsed' : 'expanded'
      };
      break;


    case TextPropertyFieldAPIActions.TOGGLE_TEXT_PROP_DETAIL:
      state = {
        ...state,
        textPropertyDetailList: {
          ...state.textPropertyDetailList,
          [action.meta.key]: {
            ...state.textPropertyDetailList[action.meta.key],
            toggle: state.textPropertyDetailList[action.meta.key].toggle === 'expanded' ? 'collapsed' : 'expanded'
          }
        }
      };
      break;

    case TextPropertyFieldAPIActions.OPEN_CREATE_OR_ADD_FORM:
      state = {
        ...state,
        createOrAdd: {}
      };
      break;

    case TextPropertyFieldAPIActions.CLOSE_CREATE_OR_ADD_FORM:
      state = omit(['createOrAdd'], state);
      break;

    // /*****************************************************
    // * Reducers called on destroy of component
    // *****************************************************/
    // case TextPropertyFieldAPIActions.DESTROY:
    //   state = undefined;
    //   break;

  }

  return state;
};

