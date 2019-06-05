
import { Entity } from 'app/core/state/models';
import { omit } from 'ramda';
import { sortChildrenByUiContext } from '../information.helpers';
import { EntityAction, EntityActions } from './entity.actions';

const INITIAL_STATE = new Entity({
  selectPropState: 'init',
  parentPeIt: null,
});


export const entityReducer =
  (state: Entity = INITIAL_STATE, action: EntityAction): Entity => {

    switch (action.type) {

      case EntityActions.ROLE_SET_LIST_DISPLAY_LABEL_UPDATED:
        state = {
          ...state,
          label: action.payload.label
        }
        break;

      case EntityActions.START_SELECT_PROPERTY:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState
        }
        break;

      case EntityActions.STOP_SELECT_PROPERTY:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState
        }
        break;

      case EntityActions.ROLE_SET_ADDED:
        state = {
          ...state,
          _fields: sortChildrenByUiContext(
            {
              ...state._fields,
              ...action.payload._fields
            },
            action.meta.uiContext
          ),
          selectPropState: action.payload.selectPropState
        }
        break;

      case EntityActions.ROLE_SET_REMOVED:
        const newPropertyFields = Object.assign({}, state._fields);
        delete newPropertyFields[action.meta.key];

        state = {
          ...state,
          _fields: newPropertyFields
        }
        break;

      case EntityActions.PROP_SET_REMOVED:
        state = {
          ...state,
          _fields: omit([action.meta.stateKey], state._fields)
        }
        break;

      case EntityActions.PROP_SET_ADDED:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState,
          _fields: sortChildrenByUiContext(
            {
              ...state._fields,
              [action.meta.key]: action.meta.val
            },
            action.meta.uiContext
          )
        }
        break;


      case EntityActions.TOGGLE_REMOVE_VERIFICATION:
        state = {
          ...state,
          showRemoveVerification: !state.showRemoveVerification
        }
        break;
      case EntityActions.SET_SHOW_RIGHT_AREA:
        state = {
          ...state,
          showRightArea: action.payload.showRightArea
        }
        break;
    }


    return state;
  };

