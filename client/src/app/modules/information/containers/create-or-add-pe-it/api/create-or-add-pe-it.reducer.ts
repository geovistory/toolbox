import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { CreateOrAddPeIt } from './create-or-add-pe-it.models';
import { CreateOrAddPeItAPIAction, CreateOrAddPeItAPIActions } from './create-or-add-pe-it.actions';
import { createPeItDetail, createTeEntDetail } from 'app/core/state/services/state-creator';
import { InfPersistentItem, InfTemporalEntity } from 'app/core';
import { PeItSearchExisting } from '../../pe-it-search-existing/api/pe-it-search-existing.models';

const INITIAL_STATE = new CreateOrAddPeIt();

export function createOrAddPeItReducer(state: CreateOrAddPeIt = INITIAL_STATE, a: Action): CreateOrAddPeIt {

  const action = a as CreateOrAddPeItAPIAction;

  switch (action.type) {
    case CreateOrAddPeItAPIActions.INIT_CREATE_FORM:

      const template = {
        fk_class: action.meta.pkClass,
        domain_entity_associations: action.meta.domainEntityAssociations
      } as InfPersistentItem;

      const searchExisting = {
        pkClass: action.meta.pkClass
      } as PeItSearchExisting;

      if (action.meta.typeNamespaceRels.length) {
        template.type_namespace_rels = action.meta.typeNamespaceRels
        searchExisting.pkNamespace = action.meta.typeNamespaceRels[0].fk_namespace;
      }

      const classConfig = action.meta.crm.classes[action.meta.pkClass];

      state = {
        ...state,
        searchExisting
      };

      // if this class is a PeIt Class
      if (classConfig.subclassOf === 'peIt') {
        state = {
          ...state,
          createPeItForm: createPeItDetail({}, new InfPersistentItem(template), action.meta.crm, { pkUiContext: action.meta.pkUiContext })
        };
      }

      // if this class is a TeEn Class
      if (classConfig.subclassOf === 'teEnt') {
        state = {
          ...state,
          createTeEnForm: createTeEntDetail({}, new InfTemporalEntity(template), action.meta.crm, { pkUiContext: action.meta.pkUiContext })
        };
      }

      break;

    case CreateOrAddPeItAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case CreateOrAddPeItAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case CreateOrAddPeItAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case CreateOrAddPeItAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

