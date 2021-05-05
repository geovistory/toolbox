/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createInfAppellation } from "../atomic/inf-appellation.helper";
import { createInfStatement } from "../atomic/inf-statement.helper";
import { createInfResource } from "../atomic/inf-resource.helper";
import { addInfosToProject } from "../atomic/pro-info-proj-rel.helper";
import { DfhApiClassMock } from "../data/gvDB/DfhApiClassMock";
import { DfhApiPropertyMock } from "../data/gvDB/DfhApiPropertyMock";
import { createQuillDoc } from "../data/gvDB/InfAppellationMock";
import { InfResourceMock } from "../data/gvDB/InfResourceMock";
import { getIndex } from "../meta/index.helper";


export async function createCity(project: number, name: string): Promise<number> {
    const appellation = (await createInfAppellation({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_40_APPELLATION.pk_entity,
        quill_doc: createQuillDoc(name)
    })).pk_entit;

    const naming = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_365_NAMING.pk_entity,
    })).pk_entity;

    const madrid = (await createInfResource({
        pk_entity: getIndex(),
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
    })).pk_entity as number

    const statementType = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: madrid,
        fk_property: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property,
        fk_object_info: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
    })).pk_entity

    const statementNamingToPEIT = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
        fk_object_info: madrid,
    })).pk_entity

    const statementNamingToAPPE = (await createInfStatement({
        pk_entity: getIndex(),
        fk_subject_info: naming,
        fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
        fk_object_info: appellation,
    })).pk_entity

    await addInfosToProject(project, [naming, madrid, statementType, statementNamingToPEIT, statementNamingToAPPE])

    return madrid;
}
