import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U, UiContext } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { indexBy } from 'ramda';
import {  ClassInstanceLabel, PropertyField, Entity } from 'app/core/state/models';
import { propertyFieldKey } from 'app/core/state/services/state-creator';



// Flux-standard-action gives us stronger typing of our actions.
type Payload = Entity;
interface MetaData { [key: string]: any };
export type EntityAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityActions {

  // static readonly ROLE_SETS_INITIALIZED = 'ROLE_SETS_INITIALIZED';

  // static readonly FK_CLASS_AND_ROLES_INITIALIZED = 'FK_CLASS_AND_ROLES_INITIALIZED';

  static readonly START_SELECT_PROPERTY = 'Entity::START_SELECT_PROPERTY';

  static readonly STOP_SELECT_PROPERTY = 'Entity::STOP_SELECT_PROPERTY';

  static readonly PROPERTY_SELECTED = 'Entity::PROPERTY_SELECTED';

  static readonly ROLE_SET_ADDED = 'Entity::ROLE_SET_ADDED';

  static readonly ROLE_SET_REMOVED = 'Entity::ROLE_SET_REMOVED';

  static readonly PROP_SET_ADDED = 'Entity::PROP_SET_ADDED';

  static readonly PROP_SET_REMOVED = 'Entity::PROP_SET_REMOVED';

  static readonly ROLE_SET_LIST_DISPLAY_LABEL_UPDATED = 'Entity::ROLE_SET_LIST_DISPLAY_LABEL_UPDATED';

  static readonly ENTITY_INIT = 'Entity::ENTITY_INIT';

  static readonly TOGGLE_REMOVE_VERIFICATION = 'Entity::TOGGLE_REMOVE_VERIFICATION';

  @dispatch()


  propertyFieldsListDisplayLabelUpdated = (label:  ClassInstanceLabel): EntityAction => ({
    type: EntityActions.ROLE_SET_LIST_DISPLAY_LABEL_UPDATED,
    meta: null,
    payload: {
      label
    }
  })

  /**
  * startSelectProperty - called, when user clicks on add a property
  */
  startSelectProperty = (): EntityAction => ({
    type: EntityActions.START_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'selectProp'
    }
  })


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector
  */
  stopSelectProperty = (): EntityAction => ({
    type: EntityActions.STOP_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of property to add
  *
  * @param: propertyField to add
  * @param: uiContext of the class, used sort the _fields
  */
  addPropertyField = (propertyField: PropertyField, uiContext: UiContext): EntityAction => ({
    type: EntityActions.ROLE_SET_ADDED,
    meta: {
      uiContext
    },
    payload: {
      _fields: indexBy(propertyFieldKey, [propertyField]),
      selectPropState: 'init'
    }
  })

  /**
* called, when user selected a the kind of property to remove
*/
  removePropertyField = (key: string): EntityAction => ({
    type: EntityActions.ROLE_SET_REMOVED,
    meta: { key },
    payload: null
  })


  /**
 * called, when user selected a the kind of propSet to add
 */
  addPropSet = (key: string, val: any, uiContext: UiContext): EntityAction => ({
    type: EntityActions.PROP_SET_ADDED,
    meta: { key, val, uiContext },
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of propSet to add
  */
  removePropSet = (stateKey: string): EntityAction => ({
    type: EntityActions.PROP_SET_REMOVED,
    meta: { stateKey },
    payload: null
  })


  /**
  * called, OnInit of a data unit component
  */
  entityInit = (): EntityAction => ({
    type: EntityActions.ENTITY_INIT,
    meta: null,
    payload: null
  })

  /**
  * called on click on remove a data unit and on click on cancel removing a data unit
  */
  toggleRemoveVerification = (): EntityAction => ({
    type: EntityActions.TOGGLE_REMOVE_VERIFICATION,
    meta: null,
    payload: null
  })

}
