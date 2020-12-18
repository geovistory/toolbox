/* eslint-disable @typescript-eslint/camelcase */
import { createDatDigital } from '../atomic/dat-digital.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { addInfosToProject } from '../atomic/pro-info-proj-rel.helper';
import { SysSystemTypeMock } from '../data/gvDB/SysSystemTypeMock';
import { getIndex } from '../meta/index.helper';

export async function createDigital(project: number, namespace: number, source: number): Promise<number> {
    const digital = getIndex();

    await createDatDigital({
        pk_entity: digital,
        fk_namespace: namespace,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    })

    const statement = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_data: digital,
        fk_property: 1216,
        fk_object_info: source,
    })).pk_entity;

    await addInfosToProject(project, [statement]);

    return digital;
}

export async function linkDigitalToSource(project: number, source: number, digital: number): Promise<void> {

    const isPartOf = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: digital,
        fk_property: 1317,
        fk_object_info: source,
    })).pk_entity as number;

    const isReproductionOf = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_data: digital,
        fk_property: 1216,
        fk_object_info: source,
    })).pk_entity as number;

    await addInfosToProject(project, [isPartOf, isReproductionOf]);
}