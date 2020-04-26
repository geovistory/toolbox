import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Entity } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';



// Flux-standard-action gives us stronger typing of our actions.
type Payload = Entity;
interface MetaData { [key: string]: any };
export type EntityAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityActions {

  // static readonly ROLE_SETS_INITIALIZED = 'ROLE_SETS_INITIALIZED';

  // static readonly FK_CLASS_AND_ROLES_INITIALIZED = 'FK_CLASS_AND_ROLES_INITIALIZED';

  // static readonly START_SELECT_PROPERTY = 'Entity::START_SELECT_PROPERTY';

  // static readonly STOP_SELECT_PROPERTY = 'Entity::STOP_SELECT_PROPERTY';

  // static readonly PROPERTY_SELECTED = 'Entity::PROPERTY_SELECTED';

  // static readonly ROLE_SET_ADDED = 'Entity::ROLE_SET_ADDED';

  // static readonly ROLE_SET_REMOVED = 'Entity::ROLE_SET_REMOVED';

  // static readonly PROP_SET_ADDED = 'Entity::PROP_SET_ADDED';

  // static readonly PROP_SET_REMOVED = 'Entity::PROP_SET_REMOVED';

  // static readonly ROLE_SET_LIST_DISPLAY_LABEL_UPDATED = 'Entity::ROLE_SET_LIST_DISPLAY_LABEL_UPDATED';

  // static readonly ENTITY_INIT = 'Entity::ENTITY_INIT';

  // static readonly TOGGLE_REMOVE_VERIFICATION = 'Entity::TOGGLE_REMOVE_VERIFICATION';

  static readonly SET_SHOW_RIGHT_AREA = 'Entity::SET_SHOW_RIGHT_AREA';

  static readonly SET_RIGHT_PANEL_ACTIVE_TAB = 'Entity::SET_RIGHT_PANEL_ACTIVE_TAB';

  /**
   * Set index of the active tab in the right panel
   * @param tabIndex index of the active tab in the right panel
   */
  setRightPanelActiveTab = (rightPanelActiveTab: number): EntityAction => ({
    type: EntityActions.SET_RIGHT_PANEL_ACTIVE_TAB,
    meta: null,
    payload: {
      rightPanelActiveTab
    }
  })


  /**
  * called on click on remove a data unit and on click on cancel removing a data unit
  */
  // toggleRemoveVerification = (): EntityAction => ({
  //   type: EntityActions.TOGGLE_REMOVE_VERIFICATION,
  //   meta: null,
  //   payload: null
  // })

  setShowRightArea = (showRightArea: boolean): EntityAction => ({
    type: EntityActions.SET_SHOW_RIGHT_AREA,
    meta: null,
    payload: {
      showRightArea
    }
  })

}
