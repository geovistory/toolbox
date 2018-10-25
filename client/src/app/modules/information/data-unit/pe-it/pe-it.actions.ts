import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DataUnitLabel, PeItDetail } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';
import { DataUnitActions } from '../data-unit.actions';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItDetail;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends DataUnitActions {

  static readonly PE_IT_STATE_UPDATED = 'PeItActions::PE_IT_STATE_UPDATED';

  static readonly PE_IT_LABEL_UPDATED = 'PeItActions::PE_IT_LABEL_UPDATED';

  static readonly TOGGLE_COMMUNITY_STATS = 'PeItActions::TOGGLE_COMMUNITY_STATS';

  static readonly TOGGLE_ONTO_INFO = 'PeItActions::TOGGLE_ONTO_INFO';

  static readonly TOGGLE_RIGHT_PANEL = 'PeItActions::TOGGLE_RIGHT_PANEL';

  static readonly SET_LEAF_PE_IT_LOADING = 'PeItActions::SET_LEAF_PE_IT_LOADING';


  @dispatch()

  stateUpdated = (payload: PeItDetail): PeItAction => ({
    type: PeItActions.PE_IT_STATE_UPDATED,
    meta: null,
    payload
  })

  peItLabelUpdated = (label: DataUnitLabel): PeItAction => ({
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
   * Methods to toggle visibility of ui elements
   **********************************************/
  toggleRightPanel = (): PeItAction => ({
    type: PeItActions.TOGGLE_RIGHT_PANEL,
    meta: null,
    payload: null
  })


  toggleCommunityStats = (): PeItAction => ({
    type: PeItActions.TOGGLE_COMMUNITY_STATS,
    meta: null,
    payload: null
  })

  toggleOntoInfo = (): PeItAction => ({
    type: PeItActions.TOGGLE_ONTO_INFO,
    meta: null,
    payload: null
  })


}
