import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_appellation'}
  }
})
export class InfAppellation extends InfEntity {
  @property({
    type: 'object',
    required: true,
  })
  quill_doc: object;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    type: 'string',
  })
  string?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfAppellation>) {
    super(data);
  }
}

export interface InfAppellationRelations {
  // describe navigational properties here
}

export type InfAppellationWithRelations = InfAppellation & InfAppellationRelations;
