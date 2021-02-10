import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { EntityDetail } from 'projects/toolbox/src/app/core';
import { FluxStandardAction } from 'flux-standard-action';

type Payload = EntityDetail;
interface MetaData {
  keyToToggle?: string;

  config?: EntityDetail

};
export type EntityDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityDetailAPIActions {

  static readonly INIT = 'PeItDetail::INIT';


  static readonly DESTROY = 'PeItDetail::DESTROY';

  static readonly TOGGLE_BOOLEAN = 'PeItActions::TOGGLE_BOOLEAN';

  // static readonly SET_SHOW_RIGHT_AREA = 'Entity::SET_SHOW_RIGHT_AREA';

  static readonly SET_RIGHT_PANEL_ACTIVE_TAB = 'Entity::SET_RIGHT_PANEL_ACTIVE_TAB';

  /**
   * Set index of the active tab in the right panel
   * @param tabIndex index of the active tab in the right panel
   */
  setRightPanelActiveTab = (rightPanelActiveTab: number): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.SET_RIGHT_PANEL_ACTIVE_TAB,
    meta: null,
    payload: {
      rightPanelActiveTab
    }
  })


  // setShowRightArea = (showRightArea: boolean): EntityDetailAPIAction => ({
  //   type: EntityDetailAPIActions.SET_SHOW_RIGHT_AREA,
  //   meta: null,
  //   payload: {
  //     showRightArea
  //   }
  // })

  /**
   * Toggle booleans
   * @param keyToToggle key of the property to toggle. E.g. 'showRightPanel' or 'showProperties'
   */
  toggleBoolean = (keyToToggle: string): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.TOGGLE_BOOLEAN,
    meta: { keyToToggle },
    payload: null
  })

  @dispatch() init = (config: EntityDetail): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.INIT,
    meta: { config },
    payload: null,
  });

  @dispatch() destroy = (): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
