import { Entity, model, property } from '@loopback/repository';


@model({ settings: { strict: true, postgresql: { schema: 'data', table: 'factoid_property_mapping' } } })
export class DatFactoidPropertyMapping extends Entity {

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
    fk_property?: number;

    @property({
        type: 'number',
        required: true,
    })
    fk_column: number;

    @property({
        type: 'number',
        required: true,
    })
    fk_factoid_mapping: number;

    @property({
        type: 'boolean',
        required: true,
    })
    is_outgoing: boolean;

    @property({
        type: 'number',
        required: false,
    })
    fk_default: number;


    @property({
        type: 'string',
        required: false,
    })
    comment: string;


    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // [prop: string]: any;

    constructor(data?: Partial<DatFactoidPropertyMapping>) {
        super(data);
    }
}

export interface DatFactoidPropertyMappingRelations {
    // describe navigational properties here
}

export type DatFactoidPropertyMappingWithRelations = DatFactoidPropertyMapping & DatFactoidPropertyMappingRelations;
