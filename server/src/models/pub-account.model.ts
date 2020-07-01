import {model, property} from '@loopback/repository';
import {User} from '.';

@model({
  settings: {
    strict: false,
    idInjection: true,
    postgresql: {schema: 'public', table: 'account'},
    emailVerificationRequired: true
  }
})
export class PubAccount extends User {
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PubAccount>) {
    super(data);
  }
}

export interface PubAccountRelations {
  // describe navigational properties here
}

export type PubAccountWithRelations = PubAccount & PubAccountRelations;
