import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { VisualDetail } from './visual-detail.models';
import { VisualDetailAPIAction, VisualDetailAPIActions } from './visual-detail.actions';

const INITIAL_STATE = new VisualDetail();


export function visualDetailReducer(state: VisualDetail = INITIAL_STATE, a: Action): VisualDetail {

  const action = a as VisualDetailAPIAction;

  switch (action.type) {

    /*****************************************************
    * Set pkEntity
    *****************************************************/
    case VisualDetailAPIActions.SET_PK_ENTITY:
      state = {
        ...state,
        pkEntity: action.meta.pkEntity
      };
      break;

    /*****************************************************
    * Load existing visual
    *****************************************************/
    case VisualDetailAPIActions.LOAD_PREVIEW:
      let key = (action.meta.pkEntity + '_' + action.meta.version);
      state = {
        ...state,
        queryResByVersion: {
          ...state.queryResByVersion,
          [key]: []
        },
        queryResVersionLoading: {
          ...state.queryResVersionLoading,
          [key]: true
        }
      };
      break;
    case VisualDetailAPIActions.LOAD_PREVIEW_SUCCEEDED:
      key = (action.meta.pkEntity + '_' + action.meta.version);

      state = {
        ...state,
        queryResByVersion: {
          ...state.queryResByVersion,
          [key]: action.meta.itemsArray
        },
        queryResVersionLoading: {
          ...state.queryResVersionLoading,
          [key]: false
        }
      };
      break;

    case VisualDetailAPIActions.LOAD_PREVIEW_FAILED:
      state = {
        ...state,
        queryResByVersion: {
          ...state.queryResByVersion,
          [key]: []
        },
        queryResVersionLoading: {
          ...state.queryResVersionLoading,
          [key]: true
        }
      };
      break;


    case VisualDetailAPIActions.SAVE_SUCCEEDED:
      state = {
        ...state,
        pkEntity: action.meta.comVisual.pk_entity,
        deleted: false,
      };
      break;

    /*****************************************************
    * Delete
    *****************************************************/
    case VisualDetailAPIActions.DELETE_SUCCEEDED:
      state = {
        ...state,
        deleted: true,
        pkEntity: undefined,
        tabTitle: state.tabTitle + ' (Deleted)'
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case VisualDetailAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

