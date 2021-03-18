/* eslint-disable @typescript-eslint/camelcase */
import { DfhApiProfile, InfLanguage } from '../../../models';
import { createDfhApiClass, DfhApiClass } from '../atomic/dfh-api-class.helper';
import { createDfhApiProfile } from '../atomic/dfh-api-profile.helper';
import { createDfhApiProperty, DfhApiProperty } from '../atomic/dfh-api-property.helper';
import { createInfLanguage } from '../atomic/inf-language.helper';
import { createSysSystemType } from '../atomic/sys-system-type.helper';
import { DfhApiClassMock } from '../data/gvDB/DfhApiClassMock';
import { DfhApiProfileMock } from '../data/gvDB/DfhApiProfileMock';
import { DfhApiPropertyMock } from '../data/gvDB/DfhApiPropertyMock';
import { InfLanguageMock } from '../data/gvDB/InfLanguageMock';
import { SysSystemTypeMock } from '../data/gvDB/SysSystemTypeMock';

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
    await createSysSystemType(SysSystemTypeMock.PRO_TEXT_PROPTERTY_DESCRIPTION)
    await createSysSystemType(SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL)
    await createSysSystemType(SysSystemTypeMock.DIGITAL_TEXT)
    await createSysSystemType(SysSystemTypeMock.DIGITAL_TABLE)
    await createSysSystemType(SysSystemTypeMock.NUMBER)
    await createSysSystemType(SysSystemTypeMock.VALUE)
    await createSysSystemType(SysSystemTypeMock.TEXT)
    await createSysSystemType(SysSystemTypeMock.LABEL_OF_DATA_RECORD)
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
        await createDfhApiClass(DfhApiClassMock.EN_633_UNION),
        await createDfhApiClass(DfhApiClassMock.EN_40_APPELLATION),
        await createDfhApiClass(DfhApiClassMock.EN_51_PLACE),
        await createDfhApiClass(DfhApiClassMock.EN_52_DIMENSION),
        await createDfhApiClass(DfhApiClassMock.EN_54_LANGUAGE),
        await createDfhApiClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
        await createDfhApiClass(DfhApiClassMock.EN_657_REFERENCE),
        await createDfhApiClass(DfhApiClassMock.EN_690_TIME_UNIT),
        await createDfhApiClass(DfhApiClassMock.EN_689_DURATION)
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
        await createDfhApiProperty(DfhApiPropertyMock.EN_1409_INVOLVES_PARTNER)
    ]);
}
