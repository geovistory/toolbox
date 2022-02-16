import {Entity, model, property} from '@loopback/repository';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';


@model({
  settings: {
    forceId: false,
    id: ['fk_project', 'fk_source_info', 'fk_property', 'fk_property_of_property', 'is_outgoing'],
    postgresql: {schema: 'war', table: 'field_change'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarFieldChange extends Entity {

  @property({
    type: 'number',
    required: true,
    id: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    required: true,
    id: true
  })
  fk_source_info: number;

  @property({
    type: 'number',
    required: true,
    id: true
  })
  fk_source_tables_cell: number;

  @property({
    type: 'number',
    required: true,
    id: true
  })
  fk_property: number;

  @property({
    type: 'number',
    required: true,
    id: true
  })
  fk_property_of_property: number;

  @property({
    type: 'boolean',
    required: true,
    id: true
  })
  is_outgoing: boolean;

  @property({
    type: 'string',
    required: true
  })
  tmsp_last_modification: string;

  constructor(data?: Partial<WarFieldChange>) {
    super(data);
  }
}

registerType(WarFieldChange)
