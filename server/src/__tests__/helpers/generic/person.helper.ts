import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfPersistentItem } from '../atomic/inf-persistent-item.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../atomic/inf-temporal-entity.helper';
import { addInfosToProject } from '../atomic/pro-info-proj-rel.helper';
/* eslint-disable @typescript-eslint/camelcase */

import { getIndex } from '../meta/index.helper';

export async function createPerson(project: number, name: string): Promise<number> {
    const appelation = (await createInfAppellation({
        pk_entity: getIndex(),
        fk_class: 40,
        string: name
    })).pk_entity;

    const naming = (await createInfTemporalEntity({
        pk_entity: getIndex(),
        fk_class: 365,
    })).pk_entity as number;

    const person = (await createInfPersistentItem({
        pk_entity: getIndex(),
        fk_class: 21,
    })).pk_entity as number;

    const statement1 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: 1111,
        fk_object_info: person,
    })).pk_entity;

    const statement2 = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: 1113,
        fk_object_info: appelation,
      })).pk_entity;


    await addInfosToProject(project, [appelation, naming, person, statement1, statement2]);

    return person;
}