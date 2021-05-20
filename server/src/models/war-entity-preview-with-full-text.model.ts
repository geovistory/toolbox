import {model, property} from '@loopback/repository';
import {WarEntityPreview} from './war-entity-preview.model';

@model({
  settings: {
    forceId: false,
    id: ['pk_entity', 'fk_project'],
    postgresql: {schema: 'war', table: 'entity_preview'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarEntityPreviewWithFulltext extends WarEntityPreview {

  @property({
    type: 'string',
  })
  full_text?: string;

  @property({
    type: 'string',
  })
  ts_vector?: string;


  constructor(data?: Partial<WarEntityPreviewWithFulltext>) {
    super(data);
  }
}

export interface WarEntityPreviewRelations {
}

export type WarEntityPreviewWithRelations = WarEntityPreviewWithFulltext & WarEntityPreviewRelations;
