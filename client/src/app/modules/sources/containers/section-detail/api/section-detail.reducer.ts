import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { SectionDetail } from './section-detail.models';
import { SectionDetailAPIAction, SectionDetailAPIActions } from './section-detail.actions';

const INITIAL_STATE = new SectionDetail();

export function sectionDetailReducer(state: SectionDetail = INITIAL_STATE, a: Action): SectionDetail {

  const action = a as SectionDetailAPIAction;

  switch (action.type) {
    case SectionDetailAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case SectionDetailAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case SectionDetailAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SectionDetailAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

