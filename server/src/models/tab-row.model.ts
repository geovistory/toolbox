import { Entity, model, property } from '@loopback/repository';
import { registerType } from '../components/spec-enhancer/model.spec.enhancer';

@model({
    settings: {
        strict: true,
        idInjection: false,
        postgresql: { schema: 'tables', table: 'row' }
    }
})
export class TabRow extends Entity {

    @property({
        type: 'number',
        id: true,
        generated: true,
        updateOnly: true,
    })
    pk_row: number;

    @property({
        type: 'number',
    })
    fk_digital: number;

    @property({
        type: 'number',
        required: true,
    })
    position: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // [prop: string]: any;

    constructor(data?: Partial<TabRow>) {
        super(data);
    }
}

export interface TabRowRelations {
    // describe navigational properties here
}

export type TabRowWithRelations = TabRow & TabRowRelations;

registerType(TabRow)
