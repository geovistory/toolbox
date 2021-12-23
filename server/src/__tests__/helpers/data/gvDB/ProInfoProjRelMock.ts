import {ProInfoProjRel} from '../../../../models';
import {InfResourceMock} from './InfResourceMock';
import {InfStatementMock} from './InfStatementMock';
import {OmitEntity} from './local-model.helpers';
import {ProProjectMock} from './ProProjectMock';
import {PubAccountMock} from './PubAccountMock';

/**
 * pk_entity prefixed with 200
 */

export class ProInfoProjRelMock {
    static readonly PROJ_1_PERSON_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.PERSON_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_NAMING_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2002,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.NAMING_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_NAME_1_TO_APPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2003,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAME_1_TO_APPE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_NAME_1_TO_PERSON: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2004,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAME_1_TO_PERSON.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_MADRID: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2005,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.GEO_PLACE_MADRID.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_CITY_TYPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2006,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_NAMING_CITY: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2007,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.NAMING_1_CITY.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2008,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_NAMING_CITY_TO_APPE_CITY: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2009,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAMING_CITY_TO_APPE_CITY.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_NAMING_CITY_TO_GEO_PLACE_TYPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2010,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_SHIP_VOYAGE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2011,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.SHIP_VOYAGE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2012,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2013,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2014,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2015,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2016,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_END_TP_6: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2017,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.SHIP_VOYAGE_END_OF_THE_END_TP_6.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_BIRTH_1_BROUGHT_INTO_LIFE_PERON_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2018,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })
    static readonly PROJ_1_STMT_BIRTH_1_STEMS_FROM_UNION_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2019,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.BIRTH_1_STEMS_FROM_UNION_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_BIRTH: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2020,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.BIRTH_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_UNION_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2021,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.UNION_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2022,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.UNOIN_1_HAS_PARTNER_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true},
        ord_num_of_range: 2
    })

    static readonly SANDBOX_ALBERT_IV: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2023,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_entity: InfResourceMock.ALBERT_IV.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly SANDBOX_ALBERT_IV_NAMING: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2024,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_entity: InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly SANDBOX_RUDOLF: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2025,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_entity: InfResourceMock.RUDOLF.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly SANDBOX_RUDOLF_NAMING: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2026,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_entity: InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_UNOIN_1_HAS_PARTNER_2: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2027,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.UNOIN_1_HAS_PARTNER_2.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true},
        ord_num_of_range: 1
    })

    static readonly PROJ_1_ALBERT_IV: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2028,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.ALBERT_IV.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })


    static readonly PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2029,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_MADRIDS_PRESENCE_WAS_PRESENCE_OF: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2030,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.MADRIDS_PRESENCE_WAS_PRESENCE_OF.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2031,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2032,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_NAME_1_TO_LANG: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2033,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAME_1_TO_LANG.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })


    static readonly PROJ_1_MANIF_SINGLETON_THE_MURDERER: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2034,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })
    static readonly PROJ_1_STMT_DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2035,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_STMT_EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2036,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })
    static readonly PROJ_1_STMT_EXPR_PORTION_CHAPTER_2_IS_PART_OF_EXPR_PORTION_CHAPTER_1: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2037,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.EXPR_PORTION_CHAPTER_2_IS_PART_OF_EXPR_PORTION_CHAPTER_1.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_VOLUME_UNIT_CUBIC_METER: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2038,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.VOLUME_UNIT_CUBIC_METER.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2039,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id ?? -1,
        is_in_project: true,
        project_visibility: {dataApi: true, website: true}
    })

    static readonly PROJ_1_VILLAGE_TYPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2040,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.GEO_PLACE_TYPE_VILLAGE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })

    static readonly PROJ_1_STMT_NAME_2_TO_APPE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2041,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAME_2_TO_APPE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })

    static readonly PROJ_1_STMT_NAME_2_TO_PERSON: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2042,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.NAME_2_TO_PERSON.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })

    static readonly PROJ_1_STMT_HABS_EMP_CARRIERS_PROVIDED_BY: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2043,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })

    static readonly PROJ_1_STMT_MENTIONS_STMT_HAS_EXACT_REFERENCE: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2044,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfStatementMock.MENTIONS_STMT_HAS_EXACT_REFERENCE.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })



    static readonly PROJ_1_TYPE_OF_MANIF_PROD_TYPE_BOOK: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2045,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_BOOK.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })



    static readonly PROJ_1_TYPE_OF_MANIF_PROD_TYPE_JOURNAL: OmitEntity<ProInfoProjRel> = ({
        pk_entity: 2046,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        project_visibility: {website: true, dataApi: true},
        is_in_project: true
    })


}
