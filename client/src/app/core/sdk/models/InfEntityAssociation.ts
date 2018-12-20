/* tslint:disable */
import {
  InfEntityProjectRel,
  InfPersistentItem,
  InfChunk,
  InfDigitalObject
} from '../index';

declare var Object: any;
export interface InfEntityAssociationInterface {
  "fk_property": number;
  "fk_domain_entity": number;
  "fk_range_entity": number;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  entity_version_project_rels?: InfEntityProjectRel[];
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  domain_chunk?: InfChunk;
  range_chunk?: InfChunk;
  digital_object?: InfDigitalObject;
}

export class InfEntityAssociation implements InfEntityAssociationInterface {
  "fk_property": number;
  "fk_domain_entity": number;
  "fk_range_entity": number;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  entity_version_project_rels?: InfEntityProjectRel[];
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  domain_chunk?: InfChunk;
  range_chunk?: InfChunk;
  digital_object?: InfDigitalObject;
  constructor(data?: InfEntityAssociationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfEntityAssociation`.
   */
  public static getModelName() {
    return "InfEntityAssociation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfEntityAssociation for dynamic purposes.
  **/
  public static factory(data: InfEntityAssociationInterface): InfEntityAssociation{
    return new InfEntityAssociation(data);
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
      name: 'InfEntityAssociation',
      plural: 'InfEntityAssociations',
      path: 'InfEntityAssociations',
      idName: 'pk_entity',
      properties: {
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "fk_domain_entity": {
          name: 'fk_domain_entity',
          type: 'number'
        },
        "fk_range_entity": {
          name: 'fk_range_entity',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
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
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        domain_pe_it: {
          name: 'domain_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_domain_entity',
          keyTo: 'pk_entity'
        },
        range_pe_it: {
          name: 'range_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_range_entity',
          keyTo: 'pk_entity'
        },
        domain_chunk: {
          name: 'domain_chunk',
          type: 'InfChunk',
          model: 'InfChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_domain_entity',
          keyTo: 'pk_entity'
        },
        range_chunk: {
          name: 'range_chunk',
          type: 'InfChunk',
          model: 'InfChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_range_entity',
          keyTo: 'pk_entity'
        },
        digital_object: {
          name: 'digital_object',
          type: 'InfDigitalObject',
          model: 'InfDigitalObject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_domain_entity',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
