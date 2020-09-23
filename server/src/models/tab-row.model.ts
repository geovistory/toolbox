import { Entity, model, property } from '@loopback/repository';
import { DatEntity } from '.';

@model({
    settings: {
        strict: true,
        idInjection: false,
        postgresql: { schema: 'data', table: 'row' }
    }
})
export class TabRow extends Entity implements DatEntity {

    @property({
        type: 'number',
        id: true,
        generated: true,
        updateOnly: true,
    })
    pk_entity?: number;

    @property({
        type: 'number',
    })
    fk_digital?: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<TabRow>) {
        super(data);
    }
}

export interface TabRowRelations {
    // describe navigational properties here
}

export type TabRowWithRelations = TabRow & TabRowRelations;
