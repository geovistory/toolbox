import { createDatClassColumnMapping } from '../atomic/dat-class-mapping.helper';
/* eslint-disable @typescript-eslint/camelcase */
import { createDatColumn } from '../atomic/dat-column.helper';
import { createDatTextProperty } from '../atomic/dat-text-property.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { addInfosToProject } from '../atomic/pro-info-proj-rel.helper';
import { createCellTable, createTabCell } from '../atomic/tab-cell-X.helper';
import { createTabRow } from '../atomic/tab-row.helper';
import { SysSystemTypeMock } from '../data/gvDB/SysSystemTypeMock';
import { getIndex } from '../meta/index.helper';

export async function createTable(digital: number): Promise<void> {
    createCellTable(digital);
}

export async function createColumn(namespace: number, digital: number, name: string): Promise<number> {
    const column = (await createDatColumn({
        pk_entity: getIndex(),
        fk_digital: digital,
        fk_column_content_type: SysSystemTypeMock.TEXT.pk_entity,
        fk_namespace: namespace,
        fk_data_type: 3292 //string
    })).pk_entity as number;

    await createDatTextProperty({
        pk_entity: getIndex(),
        string: name,
        fk_language: 18889, //english
        fk_namespace: namespace,
        fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
        fk_entity: column
    })
    return column;
}

export async function createRow(digital: number): Promise<number> {
    return (await createTabRow({
        pk_row: getIndex(),
        fk_digital: digital
    })).pk_row as number;
}

export async function createCell(digital: number, rowInd: number, colInd: number, content: string): Promise<number> {
    const index = getIndex();
    await createTabCell({
        pk_cell: index,
        fk_digital: digital,
        fk_column: colInd,
        fk_row: rowInd,
        string_value: content
    })
    return index;
}

export async function createColumnMapping(colInd: number, classNb: number): Promise<number> {
    return (await createDatClassColumnMapping({
        pk_entity: getIndex(),
        fk_class: classNb,
        fk_column: colInd
    })).pk_entity as number;
}

export async function mapCell(project: number, cellInd: number, pkEntity: number): Promise<number> {
    const statement = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_tables_cell: cellInd,
        fk_property: 1334,
        fk_object_info: pkEntity
    })).pk_entity as number;

    await addInfosToProject(project, [statement]);
    return statement
}