/* tslint:disable */
import {
  ProInfoProjRel,
  InfPersistentItem,
  DatChunk,
  DatDigital
} from '../index';

declare var Object: any;
export interface InfEntityAssociationInterface {
  "fk_property": number;
  "fk_info_domain"?: number;
  "fk_info_range"?: number;
  "fk_data_domain"?: number;
  "fk_data_range"?: number;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_domain_entity"?: number;
  "fk_range_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  domain_chunk?: DatChunk;
  range_chunk?: DatChunk;
  domain_digital?: DatDigital;
}

export class InfEntityAssociation implements InfEntityAssociationInterface {
  "fk_property": number;
  "fk_info_domain": number;
  "fk_info_range": number;
  "fk_data_domain": number;
  "fk_data_range": number;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_domain_entity": number;
  "fk_range_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  domain_chunk?: DatChunk;
  range_chunk?: DatChunk;
  domain_digital?: DatDigital;
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
        "fk_info_domain": {
          name: 'fk_info_domain',
          type: 'number'
        },
        "fk_info_range": {
          name: 'fk_info_range',
          type: 'number'
        },
        "fk_data_domain": {
          name: 'fk_data_domain',
          type: 'number'
        },
        "fk_data_range": {
          name: 'fk_data_range',
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
        "fk_domain_entity": {
          name: 'fk_domain_entity',
          type: 'number'
        },
        "fk_range_entity": {
          name: 'fk_range_entity',
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
        domain_pe_it: {
          name: 'domain_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_info_domain',
          keyTo: 'pk_entity'
        },
        range_pe_it: {
          name: 'range_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_info_range',
          keyTo: 'pk_entity'
        },
        domain_chunk: {
          name: 'domain_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_data_domain',
          keyTo: 'pk_entity'
        },
        range_chunk: {
          name: 'range_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_data_range',
          keyTo: 'pk_entity'
        },
        domain_digital: {
          name: 'domain_digital',
          type: 'DatDigital',
          model: 'DatDigital',
          relationType: 'belongsTo',
                  keyFrom: 'fk_data_domain',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
