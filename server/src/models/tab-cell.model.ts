import {Entity, model, property} from '@loopback/repository';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';

@model({
    settings: {
        strict: true,
        idInjection: false,
        postgresql: {schema: 'tables', table: 'cell'}
    }
})
export class TabCell extends Entity {

    @property({
        type: 'number',
        id: true,
        generated: true,
        updateOnly: true,
    })
    pk_cell?: number;

    @property({
        type: 'number',
    })
    fk_class?: number;

    @property({
        type: 'number',
    })
    fk_column?: number;

    @property({
        type: 'number',
    })
    fk_row?: number;

    @property({
        type: 'number',
    })
    fk_digital?: number;

    @property({
        type: 'string'
    })
    string_value: string;

    @property({
        type: 'number',
    })
    numeric_value: number | null

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<TabCell>) {
        super(data);
    }
}

export interface TabCellRelations {
    // describe navigational properties here
}

export type TabCellWithRelations = TabCell & TabCellRelations;


registerType(TabCell)
