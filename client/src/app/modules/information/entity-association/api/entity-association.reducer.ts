import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { Action } from 'redux';
import { EntityAssociationAPIAction, EntityAssociationAPIActions } from './entity-association.actions';

const INITIAL_STATE = new EntityAssociationDetail();

export function entityAssociationReducer(state: EntityAssociationDetail = INITIAL_STATE, a: Action): EntityAssociationDetail {

  const action = a as EntityAssociationAPIAction;

  switch (action.type) {
    case EntityAssociationAPIActions.LOAD_EXISTING_LIST:
      state = {
        ...state,
        loading: true,
        existingList: {}
      };
      break;
    case EntityAssociationAPIActions.LOAD_EXISTING_LIST_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        existingList: action.meta.existingList
      };
      break;

    case EntityAssociationAPIActions.LOAD_EXISTING_LIST_FAILED:
      state = {
        ...state,
        loading: false,
        existingList: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case EntityAssociationAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

