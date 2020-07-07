import { Entity, hasOne, model, property } from '@loopback/repository';
import { Credential } from './credential.model';

@model({
    settings: {
        strict: true,
    },
})
export class Account extends Entity {
    // must keep it
    // add id:string<UUID>
    @property({
        type: 'number',
        id: true,
        generated: true
    })
    id: number;

    @property({
        type: 'string',
    })
    realm?: string;

    // must keep it
    @property({
        type: 'string',
    })
    username?: string;

    // must keep it
    // feat email unique
    @property({
        type: 'string',
        required: true,
        index: {
            unique: true,
        },
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

    @hasOne(() => Credential)
    accountCredentials: Credential;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Account>) {
        super(data);
    }
}

export interface AccountRelations {
    // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
