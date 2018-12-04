import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ClassInstanceLabel, PeItDetail } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';
import { DataUnitActions } from '../data-unit.actions';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItDetail;
interface MetaData {
  keyToToggle?: string;
  pkEntity?: number;
  pkProject?: number;
};
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends DataUnitActions {

  static readonly PE_IT_STATE_UPDATED = 'PeItActions::PE_IT_STATE_UPDATED';

  static readonly PE_IT_LABEL_UPDATED = 'PeItActions::PE_IT_LABEL_UPDATED';

  static readonly TOGGLE_BOOLEAN = 'PeItActions::TOGGLE_BOOLEAN';

  static readonly SET_LEAF_PE_IT_LOADING = 'PeItActions::SET_LEAF_PE_IT_LOADING';

  static readonly START_CREATE_MENTIONING = 'PeItActions::START_CREATE_MENTIONING';

  @dispatch()

  stateUpdated = (payload: PeItDetail): PeItAction => ({
    type: PeItActions.PE_IT_STATE_UPDATED,
    meta: null,
    payload
  })

  peItLabelUpdated = (label: ClassInstanceLabel): PeItAction => ({
    type: PeItActions.PE_IT_LABEL_UPDATED,
    meta: null,
    payload: {
      label
    }
  })

  setLeafPeItLoading = (leafPeItLoading: boolean): PeItAction => ({
    type: PeItActions.SET_LEAF_PE_IT_LOADING,
    meta: null,
    payload: {
      leafPeItLoading
    }
  })

  /**********************************************
   * Method to toggle visibility of ui elements
   **********************************************/

  /**
   * Toggle booleans
   * @param keyToToggle key of the property to toggle. E.g. 'showRightPanel' or 'showProperties'
   */
  toggleBoolean = (keyToToggle: string): PeItAction => ({
    type: PeItActions.TOGGLE_BOOLEAN,
    meta: { keyToToggle },
    payload: null
  })


  /**********************************************
   * Method to start create a new mentioning
   **********************************************/
  startCreateMentioning = (): PeItAction => ({
    type: PeItActions.START_CREATE_MENTIONING,
    meta: null,
    payload: null
  })




}
