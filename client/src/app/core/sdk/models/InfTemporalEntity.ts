/* tslint:disable */
import {
  InfRole,
  ProInfoProjRel,
  InfEntityAssociation,
  InfTextProperty
} from '../index';

declare var Object: any;
export interface InfTemporalEntityInterface {
  "fk_class": number;
  "notes"?: string;
  "pk_entity"?: number;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  te_roles?: InfRole[];
  entity_version_project_rels?: ProInfoProjRel[];
  domain_entity_associations?: InfEntityAssociation[];
  text_properties?: InfTextProperty[];
}

export class InfTemporalEntity implements InfTemporalEntityInterface {
  "fk_class": number;
  "notes": string;
  "pk_entity": number;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  te_roles?: InfRole[];
  entity_version_project_rels?: ProInfoProjRel[];
  domain_entity_associations?: InfEntityAssociation[];
  text_properties?: InfTextProperty[];
  constructor(data?: InfTemporalEntityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTemporalEntity`.
   */
  public static getModelName() {
    return "InfTemporalEntity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfTemporalEntity for dynamic purposes.
  **/
  public static factory(data: InfTemporalEntityInterface): InfTemporalEntity{
    return new InfTemporalEntity(data);
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
      name: 'InfTemporalEntity',
      plural: 'InfTemporalEntities',
      path: 'InfTemporalEntities',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "tmsp_creation": {
          name: 'tmsp_creation',
          type: 'string'
        },
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
        "sys_period": {
          name: 'sys_period',
          type: 'string'
        },
      },
      relations: {
        te_roles: {
          name: 'te_roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_temporal_entity'
        },
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        domain_entity_associations: {
          name: 'domain_entity_associations',
          type: 'InfEntityAssociation[]',
          model: 'InfEntityAssociation',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_domain_entity'
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
