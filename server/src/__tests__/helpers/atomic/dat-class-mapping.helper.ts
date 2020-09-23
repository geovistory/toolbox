/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { DatColumn } from '../../../models';
import { testdb } from '../testdb';
import { DfhApiClass } from './dfh-api-class.helper';

export class DatColumnMapping {
    pk_entity: number;
    fk_class: number;
    fk_column: number;

    constructor(pkEntity: number, fk_class: number, fk_column: number) {
        this.pk_entity = pkEntity;
        this.fk_class = fk_class;
        this.fk_column = fk_column;
    }
}

export async function createClassColumnMapping(clas: DfhApiClass, col: DatColumn) {
    return new DatColumnMapping(
        (await testdb.execute('INSERT INTO data.class_column_mapping (fk_class, fk_column) VALUES (' + clas.dfh_pk_class + ', ' + col.pk_entity + ');')).pk_entity,
        clas.dfh_pk_class as number,
        col.pk_entity as number,
    )
}