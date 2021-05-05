import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfResource } from '../atomic/inf-resource.helper';
import { addInfosToProject } from '../atomic/pro-info-proj-rel.helper';
/* eslint-disable @typescript-eslint/camelcase */

import { getIndex } from '../meta/index.helper';

export async function createSource(project: number, name: string): Promise<number> {

    const appelationManif = (await createInfAppellation({
        pk_entity: getIndex(),
        fk_class: 40,
        string: name + ' - Manifestation'
    })).pk_entity;

    const appelationExpr = (await createInfAppellation({
        pk_entity: getIndex(),
        fk_class: 40,
        string: name + ' - Expression'
    })).pk_entity;

    const namingManif = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: 365,
    })).pk_entity as number;

    const namingExpr = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: 365,
    })).pk_entity as number;

    const manifProdType = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: 219,
    })).pk_entity as number;

    const expression = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: 218,
    })).pk_entity as number;

    const isAppelationOf1 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: namingManif,
        fk_property: 1111,
        fk_object_info: manifProdType,
    })).pk_entity;

    const refersToName1 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: namingManif,
        fk_property: 1113,
        fk_object_info: appelationManif,
    })).pk_entity;

    const isAppelationOf2 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: namingExpr,
        fk_property: 1111,
        fk_object_info: expression,
    })).pk_entity;

    const refersToName2 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: namingExpr,
        fk_property: 1113,
        fk_object_info: appelationExpr,
    })).pk_entity;

    const carrierProvidedBy = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: expression,
        fk_property: 979,
        fk_object_info: manifProdType,
    })).pk_entity;

    await addInfosToProject(project, [appelationManif, appelationExpr, namingManif, namingExpr, manifProdType, expression, isAppelationOf1, refersToName1, isAppelationOf2, refersToName2, carrierProvidedBy]);
    return expression;
}
