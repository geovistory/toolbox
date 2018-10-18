import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { CreateOrAddPeIt } from './create-or-add-pe-it.models';
import { CreateOrAddPeItAPIAction, CreateOrAddPeItAPIActions } from './create-or-add-pe-it.actions';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { InfPersistentItem } from 'app/core';

const INITIAL_STATE = new CreateOrAddPeIt();

export function createOrAddPeItReducer(state: CreateOrAddPeIt = INITIAL_STATE, a: Action): CreateOrAddPeIt {

  const action = a as CreateOrAddPeItAPIAction;

  switch (action.type) {
    case CreateOrAddPeItAPIActions.INIT_CREATE_FORM:
      state = {
        ...state,
        createForm: createPeItDetail({}, new InfPersistentItem({ fk_class: action.meta.pkClass }), action.meta.crm, { isCreateMode: true })
      };
      break;

    case CreateOrAddPeItAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case CreateOrAddPeItAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case CreateOrAddPeItAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case CreateOrAddPeItAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

