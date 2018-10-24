import { indexBy, prop, omit } from 'ramda';
import { Action } from 'redux';
import { SectionList } from './section-list.models';
import { SectionListAPIAction, SectionListAPIActions } from './section-list.actions';
import { createEntityAssociationList } from 'app/core/state/services/state-creator';

const INITIAL_STATE = new SectionList();

export function sectionListReducer(state: SectionList = INITIAL_STATE, a: Action): SectionList {

  const action = a as SectionListAPIAction;

  switch (action.type) {
    case SectionListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case SectionListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: action.meta.items
      };
      break;

    case SectionListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;

    /*****************************************************
    * Reducers to manage entity add form
    *****************************************************/

    case SectionListAPIActions.START_CREATE:
      state = {
        ...state,
        create: action.meta.entityAssociationDetail
      };
      break;

    case SectionListAPIActions.STOP_CREATE:
      state = omit(['create'], state);
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SectionListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

