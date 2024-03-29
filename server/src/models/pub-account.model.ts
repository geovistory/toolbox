import {Entity, hasOne, model, property} from '@loopback/repository';
import {PubCredential} from './pub-credential.model';

@model({
  settings: {
    strict: true,
    caseSensitiveEmail: true,
    hiddenProperties: ['verificationToken'],
    maxTTL: 31556926,
    ttl: 1209600,
    idInjection: true,
    postgresql: {schema: 'public', table: 'account'},
    emailVerificationRequired: true
  }
})
export class PubAccount extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: 1,
    generated: true,
    updateOnly: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
  })
  verificationToken?: string;

  @hasOne(() => PubCredential, {keyTo: 'accountId'})
  pubAccountCredentials?: PubCredential;


  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<PubAccount>) {
    super(data);
  }
}

export interface PubAccountRelations {
  // describe navigational properties here
}

export type PubAccountWithRelations = PubAccount & PubAccountRelations;
