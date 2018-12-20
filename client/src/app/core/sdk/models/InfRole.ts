/* tslint:disable */
import {
  InfAppellation,
  InfTemporalEntity,
  InfLanguage,
  InfPersistentItem,
  InfEntityProjectRel,
  InfTimePrimitive,
  InfPlace
} from '../index';

declare var Object: any;
export interface InfRoleInterface {
  "fk_property": number;
  "fk_entity": number;
  "fk_temporal_entity": number;
  "is_in_project_count"?: number;
  "is_standard_in_project_count"?: number;
  "community_favorite_calendar"?: string;
  "rank_for_te_ent"?: number;
  "range_max_quantifier"?: number;
  "rank_for_pe_it"?: number;
  "domain_max_quantifier"?: number;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  appellation?: InfAppellation;
  temporal_entity?: InfTemporalEntity;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
  entity_version_project_rels?: InfEntityProjectRel[];
  time_primitive?: InfTimePrimitive;
  place?: InfPlace;
}

export class InfRole implements InfRoleInterface {
  "fk_property": number;
  "fk_entity": number;
  "fk_temporal_entity": number;
  "is_in_project_count": number;
  "is_standard_in_project_count": number;
  "community_favorite_calendar": string;
  "rank_for_te_ent": number;
  "range_max_quantifier": number;
  "rank_for_pe_it": number;
  "domain_max_quantifier": number;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  appellation?: InfAppellation;
  temporal_entity?: InfTemporalEntity;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
  entity_version_project_rels?: InfEntityProjectRel[];
  time_primitive?: InfTimePrimitive;
  place?: InfPlace;
  constructor(data?: InfRoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfRole`.
   */
  public static getModelName() {
    return "InfRole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfRole for dynamic purposes.
  **/
  public static factory(data: InfRoleInterface): InfRole{
    return new InfRole(data);
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
      name: 'InfRole',
      plural: 'InfRoles',
      path: 'InfRoles',
      idName: 'pk_entity',
      properties: {
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
        "fk_temporal_entity": {
          name: 'fk_temporal_entity',
          type: 'number'
        },
        "is_in_project_count": {
          name: 'is_in_project_count',
          type: 'number'
        },
        "is_standard_in_project_count": {
          name: 'is_standard_in_project_count',
          type: 'number'
        },
        "community_favorite_calendar": {
          name: 'community_favorite_calendar',
          type: 'string'
        },
        "rank_for_te_ent": {
          name: 'rank_for_te_ent',
          type: 'number'
        },
        "range_max_quantifier": {
          name: 'range_max_quantifier',
          type: 'number'
        },
        "rank_for_pe_it": {
          name: 'rank_for_pe_it',
          type: 'number'
        },
        "domain_max_quantifier": {
          name: 'domain_max_quantifier',
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
        appellation: {
          name: 'appellation',
          type: 'InfAppellation',
          model: 'InfAppellation',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        temporal_entity: {
          name: 'temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_temporal_entity',
          keyTo: 'pk_entity'
        },
        language: {
          name: 'language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        persistent_item: {
          name: 'persistent_item',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        time_primitive: {
          name: 'time_primitive',
          type: 'InfTimePrimitive',
          model: 'InfTimePrimitive',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        place: {
          name: 'place',
          type: 'InfPlace',
          model: 'InfPlace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
