import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem, InfRole } from 'app/core';
import { PeItDetail, DataUnitLabel, PeItDetailI } from 'app/core/state/models';
import { DataUnitActions } from '../data-unit.actions';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItDetailI;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends DataUnitActions {

  static readonly PE_IT_STATE_UPDATED = 'PE_IT_STATE_UPDATED';

  static readonly PE_IT_LABEL_UPDATED = 'PE_IT_LABEL_UPDATED';

  static readonly COMMUNITY_STATS_VISIBILITY_TOGGLED = 'COMMUNITY_STATS_VISIBILITY_TOGGLED';

  static readonly ONTO_INFO_VISIBILITY_TOGGLED = 'ONTO_INFO_VISIBILITY_TOGGLED';

  static readonly SET_LEAF_PE_IT_LOADING = 'SET_LEAF_PE_IT_LOADING';


  @dispatch()

  stateUpdated = (payload: PeItDetail): PeItAction => ({
    type: PeItActions.PE_IT_STATE_UPDATED,
    meta: null,
    payload
  })

  communityStatsVisibilityToggled = (communityStatsVisible: boolean): PeItAction => ({
    type: PeItActions.COMMUNITY_STATS_VISIBILITY_TOGGLED,
    meta: null,
    payload: {
      communityStatsVisible
    }
  })

  ontoInfoVisibilityToggled = (ontoInfoVisible: boolean): PeItAction => ({
    type: PeItActions.ONTO_INFO_VISIBILITY_TOGGLED,
    meta: null,
    payload: {
      ontoInfoVisible
    }
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

}
