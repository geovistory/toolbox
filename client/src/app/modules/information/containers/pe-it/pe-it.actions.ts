import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem, InfRole } from 'app/core';
import {  IPeItState } from './pe-it.model';
import { RoleSetListState } from '../../components/role-set-list/role-set-list.model';
import { RoleSetListActions } from '../../components/role-set-list/role-set-list-actions';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPeItState;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends RoleSetListActions {

  static readonly PE_IT_LABEL_UPDATED = 'PE_IT_LABEL_UPDATED';

  static readonly COMMUNITY_STATS_VISIBILITY_TOGGLED = 'COMMUNITY_STATS_VISIBILITY_TOGGLED';

  static readonly ONTO_INFO_VISIBILITY_TOGGLED = 'ONTO_INFO_VISIBILITY_TOGGLED';

  @dispatch()



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

  peItLabelUpdated = (label: string): PeItAction => ({
    type: PeItActions.PE_IT_LABEL_UPDATED,
    meta: null,
    payload: {
      label
    }
  })

}
