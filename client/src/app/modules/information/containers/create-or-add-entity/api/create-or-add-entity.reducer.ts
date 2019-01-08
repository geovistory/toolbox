import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { CreateOrAddEntity } from './create-or-add-entity.models';
import { CreateOrAddEntityAPIAction, CreateOrAddEntityAPIActions } from './create-or-add-entity.actions';
import { createPeItDetail, createTeEntDetail } from 'app/core/state/services/state-creator';
import { InfPersistentItem, InfTemporalEntity } from 'app/core';
import { PeItSearchExisting } from '../../pe-it-search-existing/api/pe-it-search-existing.models';

const INITIAL_STATE = new CreateOrAddEntity();

export function createOrAddEntityReducer(state: CreateOrAddEntity = INITIAL_STATE, a: Action): CreateOrAddEntity {

  const action = a as CreateOrAddEntityAPIAction;

  switch (action.type) {
    case CreateOrAddEntityAPIActions.INIT_CREATE_FORM:

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

    case CreateOrAddEntityAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case CreateOrAddEntityAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case CreateOrAddEntityAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case CreateOrAddEntityAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

