import {Entity, model, property} from '@loopback/repository';
import {ProVisibilitySettingsValue} from './project-visibilty-settings/pro-visibility-settings-value';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'projects', table: 'visibility_settings'},
    validateUpsert: true,
    idInjection: false
  }
})
export class ProVisibilitySettings extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity: number;

  @property({
    type: 'number',
    required: true
  })
  fk_project: number;

  @property({
    type: ProVisibilitySettingsValue,
    required: true
  })
  settings?: ProVisibilitySettingsValue;

  constructor(data?: Partial<ProVisibilitySettings>) {
    super(data);
  }
}

export interface ProVisibilitySettingsRelations {
  // describe navigational properties here
}

export type ProVisibilitySettingsWithRelations = ProVisibilitySettings & ProVisibilitySettingsRelations;
