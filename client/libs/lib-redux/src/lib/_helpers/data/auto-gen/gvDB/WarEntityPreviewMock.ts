import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { CalendarType } from '../enums/CalendarType';
import { Granularity } from '../enums/Granularity';
import { DfhApiClassMock } from './DfhApiClassMock';
import { InfAppellationMock } from './InfAppellationMock';
import { InfLangStringMock } from './InfLangStringMock';
import { InfResourceMock } from './InfResourceMock';
import { ProProjectMock } from './ProProjectMock';
import { OmitEntity } from './local-model.helpers';

/**
 * pk_entity prefix: depends on entity type. If peIt, 200, if teEn 400
 */
export namespace WarEntityPreviewMock {
    export const GEO_PLACE_BASEL: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1000,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Basel',
        entity_type: 'peIt',
    })



    export const BIRTH_OEKOLOMBAD: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1002,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Johannes Oekolampad',
        entity_type: 'teEn',
        time_span: {
            "p82": {
                julianDay: 123123123,
                calendar: CalendarType.gregorian,
                duration: Granularity['1 year']
            }
        }
    })

    export const BIRTH_ZWINGLI: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1003,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Ulrich Zwingli',
        entity_type: 'teEn',
        time_span: {
            "p82": {
                julianDay: 123123123,
                calendar: CalendarType.gregorian,
                duration: Granularity['1 day'],
            }
        }
    })


    export const TIME_UNIT_ONE_MONTH: OmitEntity<WarEntityPreview> = ({
        pk_entity: 2017,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_690_TIME_UNIT.dfh_pk_class,
        class_label: DfhApiClassMock.EN_690_TIME_UNIT.dfh_class_label,
        entity_label: InfLangStringMock.EN_SHORT_TITLE_MONTH.string,
        entity_type: 'peIt',
    })

    export const PERSON_1: OmitEntity<WarEntityPreview> = ({
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        class_label: DfhApiClassMock.EN_21_PERSON.dfh_class_label,
        entity_label: InfAppellationMock.JACK_THE_FOO.string,
        entity_type: 'peIt',
    })

    export const EXPRESSION_PORTION_HABS_EMP_CHAPTER_1: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
        fk_class: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_class_label,
        entity_label: 'Chapter 1',
        entity_type: 'peIt',
    })
    export const EXPRESSION_PORTION_HABS_EMP_CHAPTER_2: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_2.pk_entity,
        fk_class: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_2.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_class_label,
        entity_label: 'Chapter 2',
        entity_type: 'peIt',
    })

    export const APPE_IN_LANG_TYPE_FIRST_NAME: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME.pk_entity,
        fk_class: InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_class_label,
        entity_label: 'First Name',
        entity_type: 'peIt',
    })

    export const APPE_IN_LANG_TYPE_LAST_NAME: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME.pk_entity,
        fk_class: InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_class_label,
        entity_label: 'Last Name',
        entity_type: 'peIt',
    })

    export const VOLUME_UNIT_CUBIC_METER: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.VOLUME_UNIT_CUBIC_METER.pk_entity,
        fk_class: InfResourceMock.VOLUME_UNIT_CUBIC_METER.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_715_VOLUME_MEASUREMENT_UNIT.dfh_class_label,
        entity_label: 'Cubic Meter',
        entity_type: 'peIt',
    })

    export const GEO_PLACE_TYPE_CITY: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
        fk_class: InfResourceMock.GEO_PLACE_TYPE_CITY.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_class_label,
        entity_label: 'City',
        entity_type: 'peIt',
    })

    export const GEO_PLACE_TYPE_VILLAGE: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.GEO_PLACE_TYPE_VILLAGE.pk_entity,
        fk_class: InfResourceMock.GEO_PLACE_TYPE_VILLAGE.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_class_label,
        entity_label: 'Village',
        entity_type: 'peIt',
    })

    export const NAMING_1: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.NAMING_1.pk_entity,
        fk_class: InfResourceMock.NAMING_1.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_365_NAMING.dfh_class_label,
        entity_label: 'Jack the foo',
        entity_type: 'teEn',
    })

    export const NAMING_2: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.NAMING_2.pk_entity,
        fk_class: InfResourceMock.NAMING_2.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_365_NAMING.dfh_class_label,
        entity_label: 'Jack',
        entity_type: 'teEn',
    })

    export const HABS_EMP_EXPR: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.HABS_EMP_EXPR.pk_entity,
        fk_class: InfResourceMock.HABS_EMP_EXPR.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_218_EXPRESSION.dfh_class_label,
        entity_label: 'Expression of Habs-Empire',
        entity_type: 'peIt',
    })
    export const DEFINITION_1: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.DEFINITION_1.pk_entity,
        fk_class: InfResourceMock.DEFINITION_1.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: 'Definition', // todo: use DfhApiClassMock when available
        entity_label: 'This person is the famous jack the foo, invented by KleioLab and used in Geovistory mock data.',
        entity_type: 'peIt',
    })

    export const TYPE_OF_MANIF_PROD_TYPE_BOOK: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_BOOK.pk_entity,
        fk_class: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_BOOK.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE.dfh_class_label,
        entity_label: 'Book',
        entity_type: 'peIt',
    })
    export const TYPE_OF_MANIF_PROD_TYPE_JOURNAL: OmitEntity<WarEntityPreview> = ({
        pk_entity: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL.pk_entity,
        fk_class: InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL.fk_class,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE.dfh_class_label,
        entity_label: 'Journal',
        entity_type: 'peIt',
    })

    export const GEO_PLACE_ZURICH: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Zürich',
        entity_type: 'peIt',
        fk_type: WarEntityPreviewMock.GEO_PLACE_TYPE_CITY.pk_entity,
        type_label: WarEntityPreviewMock.GEO_PLACE_TYPE_CITY.entity_label
    })
}

