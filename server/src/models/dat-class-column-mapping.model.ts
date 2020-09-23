import { model, property, Entity, belongsTo } from '@loopback/repository';
import { DatEntity } from '.';
import { DatNamespace } from './dat-namespace.model';

@model({
    settings: {
        strict: true,
        idInjection: false,
        postgresql: { schema: 'data', table: 'class_column_mapping' }
    }
})
export class DatClassColumnMapping extends Entity implements DatEntity {

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
    fk_class?: number;

    @property({
        type: 'number',
    })
    fk_column?: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<DatClassColumnMapping>) {
        super(data);
    }
}

export interface DatClassColumnMappingRelations {
    // describe navigational properties here
}

export type DatClassColumnMappingWithRelations = DatClassColumnMapping & DatClassColumnMappingRelations;
