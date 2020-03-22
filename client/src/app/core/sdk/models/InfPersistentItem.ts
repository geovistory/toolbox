/* tslint:disable */
import {
  ProInfoProjRel,
  InfRole,
  DfhClass,
  InfTextProperty
} from '../index';

declare var Object: any;
export interface InfPersistentItemInterface {
  "fk_class": number;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  pi_roles?: InfRole[];
  te_roles?: InfRole[];
  dfh_class?: DfhClass;
  text_properties?: InfTextProperty[];
}

export class InfPersistentItem implements InfPersistentItemInterface {
  "fk_class": number;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  pi_roles?: InfRole[];
  te_roles?: InfRole[];
  dfh_class?: DfhClass;
  text_properties?: InfTextProperty[];
  constructor(data?: InfPersistentItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfPersistentItem`.
   */
  public static getModelName() {
    return "InfPersistentItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfPersistentItem for dynamic purposes.
  **/
  public static factory(data: InfPersistentItemInterface): InfPersistentItem{
    return new InfPersistentItem(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'InfPersistentItem',
      plural: 'InfPersistentItems',
      path: 'InfPersistentItems',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
      },
      relations: {
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        pi_roles: {
          name: 'pi_roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        te_roles: {
          name: 'te_roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_temporal_entity'
        },
        dfh_class: {
          name: 'dfh_class',
          type: 'DfhClass',
          model: 'DfhClass',
          relationType: 'belongsTo',
                  keyFrom: 'fk_class',
          keyTo: 'pk_class'
        },
        text_properties: {
          name: 'text_properties',
          type: 'InfTextProperty[]',
          model: 'InfTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_concerned_entity'
        },
      }
    }
  }
}
