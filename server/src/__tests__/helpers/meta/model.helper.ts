/* eslint-disable @typescript-eslint/camelcase */
import { createDfhApiClass, DfhApiClass } from '../atomic/dfh-api-class.helper';
import { DfhApiClassMock } from '../data/gvDB/DfhApiClassMock';
import { createDfhApiProfile } from '../atomic/dfh-api-profile.helper';
import { DfhApiProfileMock } from '../data/gvDB/DfhApiProfileMock';
import { createDfhApiProperty, DfhApiProperty } from '../atomic/dfh-api-property.helper';
import { DfhApiPropertyMock } from '../data/gvDB/DfhApiPropertyMock';
import { DfhApiProfile, InfLanguage } from '../../../models';
import { createType } from '../atomic/sys-system-type.helper';
import { createInfLanguage } from '../atomic/inf-language.helper';
import { InfLanguageMock } from '../data/gvDB/InfLanguageMock';

export async function createModel() {
    await createTypes();
    const languages = await createLanguages();
    const profiles = await createProfiles();
    const classes = await createClasses();
    const properties = await createProperties();

    return { languages, profiles, classes, properties };
}

//is this still needed?
export async function createModelForCityType() {
    await createDfhApiClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE);
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
}

export async function createTypes(): Promise<void> {
    await createType("projectDescription", 638, 'Description of an entity.');
    await createType("projectLabel", 639, 'Label of an entity.');
    await createType("digitalTable", 3287, 'Table. Type of Digital stored in the table data.digital');
    await createType("digitalText", 3286, 'Text. Type of a Digital stored in the table data.digital');
    await createType("value", 3291, 'Value.  Semistructured data of one of the data types specified with fk_data_type');
    await createType("string", 3292, 'Text. Data type');
    await createType("number", 3293, 'Float. Data type');
    await createType("label", 3295, 'Label of an entity.');
}

export async function createLanguages(): Promise<Array<InfLanguage>> {
    return Promise.all([
        await createInfLanguage(InfLanguageMock.GERMAN),
        await createInfLanguage(InfLanguageMock.ENGLISH),
        await createInfLanguage(InfLanguageMock.FRENCH),
        await createInfLanguage(InfLanguageMock.ITALIAN)
    ])
}

export async function createClasses(): Promise<Array<DfhApiClass>> {
    return Promise.all([
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING),
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON),
        await createDfhApiClass(DfhApiClassMock.EN_218_EXPRESSION),
        await createDfhApiClass(DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE),
        await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH),
        await createDfhApiClass(DfhApiClassMock.EN_633_UNION)
    ]);
}

export async function createProfiles(): Promise<Array<DfhApiProfile>> {
    return Promise.all(
        [
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC),
            await createDfhApiProfile(DfhApiProfileMock.MARITIME_HISTORY),
            await createDfhApiProfile(DfhApiProfileMock.BIOGRAPHY_AND_FAMILY),
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_GENERIC_HIST)
        ]);
}

export async function createProperties(): Promise<Array<DfhApiProperty>> {
    return Promise.all([
        await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
        await createDfhApiProperty(DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1206_HAS_TYPE_OF_MANIFESTATION_PRODUCT_TYPE),
        await createDfhApiProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
        await createDfhApiProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END),
        await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1409_INVOLVES_PARTNER),
        // await createDfhApiProperty(DfhApiPropertyMock.),
        
    ]);
}