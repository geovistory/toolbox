import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';

import { DfhProperty, InfRole, DfhClass } from 'app/core';
import { indexBy, prop } from 'ramda';
import { DataUnit, RoleSet } from '../information.models';
import { roleSetKey } from '../information.helpers';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = DataUnit;
interface MetaData { [key: string]: any };
export type DataUnitAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class DataUnitActions {

  // static readonly ROLE_SETS_INITIALIZED = 'ROLE_SETS_INITIALIZED';

  // static readonly FK_CLASS_AND_ROLES_INITIALIZED = 'FK_CLASS_AND_ROLES_INITIALIZED';

  static readonly START_SELECT_PROPERTY = 'START_SELECT_PROPERTY';

  static readonly STOP_SELECT_PROPERTY = 'STOP_SELECT_PROPERTY';

  static readonly PROPERTY_SELECTED = 'PROPERTY_SELECTED';

  static readonly ROLE_SET_ADDED = 'ROLE_SET_ADDED';

  static readonly ROLE_SET_REMOVED = 'ROLE_SET_REMOVED';

  static readonly PROP_SET_ADDED = 'PROP_SET_ADDED';

  static readonly PROP_SET_REMOVED = 'PROP_SET_REMOVED';

  static readonly ROLE_SET_LIST_DISPLAY_LABEL_UPDATED = 'ROLE_SET_LIST_DISPLAY_LABEL_UPDATED';


  @dispatch()


  roleSetsListDisplayLabelUpdated = (label: string): DataUnitAction => ({
    type: DataUnitActions.ROLE_SET_LIST_DISPLAY_LABEL_UPDATED,
    meta: null,
    payload: {
      label
    }
  })

  /**
  * startSelectProperty - called, when user clicks on add a property
  */
  startSelectProperty = (): DataUnitAction => ({
    type: DataUnitActions.START_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'selectProp'
    }
  })


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector
  */
  stopSelectProperty = (): DataUnitAction => ({
    type: DataUnitActions.STOP_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of property to add
  */
  addRoleSet = (roleSet: RoleSet): DataUnitAction => ({
    type: DataUnitActions.ROLE_SET_ADDED,
    meta: null,
    payload: {
      _children: indexBy(roleSetKey, [roleSet]),
      selectPropState: 'init'
    }
  })

  /**
* called, when user selected a the kind of property to add
*/
  removeRoleSet = (key: string): DataUnitAction => ({
    type: DataUnitActions.ROLE_SET_REMOVED,
    meta: { key },
    payload: null
  })


  /**
 * called, when user selected a the kind of propSet to add
 */
  addPropSet = (key: string, val:any): DataUnitAction => ({
    type: DataUnitActions.PROP_SET_ADDED,
    meta: { key,val },
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of propSet to add
  */
  removePropSet = (stateKey: string): DataUnitAction => ({
    type: DataUnitActions.PROP_SET_REMOVED,
    meta: { stateKey },
    payload: null
  })


  // fkClassAndRolesInitialized = (fkClass: number, dfhClass: DfhClass, roles: InfRole[]): DataUnitAction => ({
  //   type: DataUnitActions.FK_CLASS_AND_ROLES_INITIALIZED,
  //   meta: null,
  //   payload: {
  //     fkClass,
  //     dfhClass,
  //     roles
  //   }
  // })



}
