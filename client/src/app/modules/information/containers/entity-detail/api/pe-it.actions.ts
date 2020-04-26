import { Injectable } from '@angular/core';
import { PeItDetail } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';
import { EntityActions } from './entity.actions';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItDetail;
interface MetaData {
  keyToToggle?: string;
  tabIndex?: number;
  pkEntity?: number;
  pkProject?: number;
};
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends EntityActions {


  static readonly TOGGLE_BOOLEAN = 'PeItActions::TOGGLE_BOOLEAN';

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


}
