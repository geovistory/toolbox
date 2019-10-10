import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TeEntDetail, ProjectCrm } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { StateSettings } from 'app/core/state/services/state-creator';
import { TeEntActions } from './te-ent.actions'

type Payload = TeEntDetail;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  teEntDetail?: TeEntDetail;
  pkUiContext?: number;
  pkClasses?: number[];
  config?: TeEntDetail
  settings?: StateSettings,
  crm?: ProjectCrm,
  keyToToggle?: string;
};
export type TeEntDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntDetailAPIActions extends TeEntActions {


  static readonly INIT = 'TeEntDetail::INIT';

  static readonly TOGGLE_BOOLEAN = 'TeEntDetail::TOGGLE_BOOLEAN';

  static readonly DESTROY = 'TeEntDetail::DESTROY';



  /*********************************************************************
  *  Actions to manage temporal entity editor
  *********************************************************************/

  init = (config: TeEntDetail): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.INIT,
    meta: { config },
    payload: null,
  });



  /**********************************************
 * Method to toggle visibility of ui elements
 **********************************************/

  /**
   * Toggle booleans
   * @param keyToToggle key of the property to toggle. E.g. 'showRightPanel' or 'showProperties'
   */
  toggleBoolean = (keyToToggle: string): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.TOGGLE_BOOLEAN,
    meta: { keyToToggle },
    payload: null
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })



}
