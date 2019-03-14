import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { Warehouse } from './warehouse.models';
import { WarehouseAPIAction, WarehouseAPIActions } from './warehouse.actions';

const INITIAL_STATE = new Warehouse();

export function warehouseReducer(state: Warehouse = INITIAL_STATE, a: Action): Warehouse {

  const action = a as WarehouseAPIAction;

  switch (action.type) {
    case WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS:
      state = {
        ...state,
        createEntityPreviewsLoading: true,
        createEntityPreviewsInfo: ''
      };
      break;
    case WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS_SUCCEEDED:
      state = {
        ...state,
        createEntityPreviewsLoading: false,
        createEntityPreviewsInfo: action.meta.createEntityPreviewsInfo
      };
      break;

    case WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS_FAILED:
      state = {
        ...state,
        createEntityPreviewsLoading: false,
        createEntityPreviewsInfo: 'An error occured'
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case WarehouseAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

