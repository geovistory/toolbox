/* tslint:disable */
import {
  ProInfoProjRel,
  InfTemporalEntity,
  InfAppellation,
  WarEntityPreview,
  InfLanguage,
  InfPersistentItem,
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
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  range_temporal_entity?: InfTemporalEntity;
  appellation?: InfAppellation;
  temporal_entity?: InfTemporalEntity;
  persistent_item_preview?: WarEntityPreview;
  temporal_entity_preview?: WarEntityPreview;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
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
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  range_temporal_entity?: InfTemporalEntity;
  appellation?: InfAppellation;
  temporal_entity?: InfTemporalEntity;
  persistent_item_preview?: WarEntityPreview;
  temporal_entity_preview?: WarEntityPreview;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
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
        range_temporal_entity: {
          name: 'range_temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
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
        persistent_item_preview: {
          name: 'persistent_item_preview',
          type: 'WarEntityPreview',
          model: 'WarEntityPreview',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        temporal_entity_preview: {
          name: 'temporal_entity_preview',
          type: 'WarEntityPreview',
          model: 'WarEntityPreview',
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
