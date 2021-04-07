/* eslint-disable @typescript-eslint/camelcase */
import { createInfAppellation } from "../atomic/inf-appellation.helper";
import { createInfPersistentItem } from "../atomic/inf-persistent-item.helper";
import { createInfStatement } from "../atomic/inf-statement.helper";
import { createInfTemporalEntity } from "../atomic/inf-temporal-entity.helper";
import { addInfosToProject } from "../atomic/pro-info-proj-rel.helper";
import { DfhApiClassMock } from "../data/gvDB/DfhApiClassMock";
import { DfhApiPropertyMock } from "../data/gvDB/DfhApiPropertyMock";
import { createQuillDoc } from "../data/gvDB/InfAppellationMock";
import { getIndex } from "../meta/index.helper";

export async function createJourney(project: number, name: string): Promise<number> {
    const appellation = (await createInfAppellation({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_40_APPELLATION.pk_entity,
        quill_doc: createQuillDoc(name)
    })).pk_entit;

    const naming = (await createInfTemporalEntity({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_365_NAMING.pk_entity,
    })).pk_entity;

    const journey = (await createInfPersistentItem({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY.dfh_pk_class,
    })).pk_entity as number

    const statementNamingToPEIT = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
        fk_object_info: journey,
    })).pk_entity

    const statementNamingToAPPE = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
        fk_object_info: appellation,
    })).pk_entity

    await addInfosToProject(project, [naming, journey, statementNamingToPEIT, statementNamingToAPPE])

    return journey;
}