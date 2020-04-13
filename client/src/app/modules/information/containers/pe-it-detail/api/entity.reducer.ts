
import { Entity } from 'app/core/state/models';
import { EntityAction, EntityActions } from './entity.actions';

const INITIAL_STATE = new Entity({
  // selectPropState: 'init',
  // parentPeIt: null,
});


export const entityReducer =
  (state: Entity = INITIAL_STATE, action: EntityAction): Entity => {

    switch (action.type) {

      // case EntityActions.TOGGLE_REMOVE_VERIFICATION:
      //   state = {
      //     ...state,
      //     showRemoveVerification: !state.showRemoveVerification
      //   }
      //   break;
      case EntityActions.SET_SHOW_RIGHT_AREA:
        state = {
          ...state,
          showRightArea: action.payload.showRightArea
        }
        break;

      case EntityActions.SET_RIGHT_PANEL_ACTIVE_TAB:
        state = {
          ...state,
          rightPanelActiveTab: action.payload.rightPanelActiveTab
        }
        break;
    }


    return state;
  };

