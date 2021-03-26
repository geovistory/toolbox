import { Entity, model, property } from '@loopback/repository';


@model()
export class TableConfigCol {
    @property() fkColumn: number;
    @property() visible: boolean;
}

@model()
export class TableConfig {
  @property.array(TableConfigCol)
  columns?: TableConfigCol[]
}

@model({
    settings: {
        strict: true,
        postgresql: { schema: 'projects', table: 'table_config' },
        validateUpsert: true,
        idInjection: false
    }
})
export class ProTableConfig extends Entity {

    @property({
        type: 'number',
        id: true,
        generated: true,
        updateOnly: true,
    })
    pk_entity?: number;

    @property({ type: 'number' })
    fk_project?: number;

    @property({ type: 'number' })
    account_id?: number;

    @property({ type: 'number' })
    fk_digital?: number;

    //to remove
    // @property.array(TableConfigCol, { required: true })
    // @property(TableConfigCol, { required: true })
    // config?: {array: TableConfigCol[]};

    @property(TableConfig)
    config?: TableConfig;

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<ProTableConfig>) {
        super(data);
    }
}

export interface ProTableConfigRelations {
    // describe navigational properties here
}

export type ProTableConfigWithRelations = ProTableConfig & ProTableConfigRelations;
