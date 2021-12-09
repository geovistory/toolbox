import {WarEntityPreview} from '@kleiolab/lib-sdk-lb4';
import {TimePrimitiveWithCal} from '../../../../models/enums/CalendarType'
import {} from '../../../../models/enums/Granularity'
import {DfhApiClassMock} from './DfhApiClassMock'
import {InfAppellationMock} from './InfAppellationMock'
import {InfLangStringMock} from './InfLangStringMock'
import {InfResourceMock} from './InfResourceMock'
import {OmitEntity} from './local-model.helpers'
import {ProProjectMock} from './ProProjectMock'

/**
 * pk_entity prefix: depends on entity type. If peIt, 200, if teEn 400
 */
export class WarEntityPreviewMock {
    static readonly GEO_PLACE_BASEL: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1000,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Basel',
        entity_type: 'peIt',
    })

    static readonly GEO_PLACE_ZURICH: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Zürich',
        entity_type: 'peIt',
    })


    static readonly BIRTH_OEKOLOMBAD: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1002,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Johannes Oekolampad',
        entity_type: 'teEn',
        time_span: {
            "p82": {
                julianDay: 123123123,
                calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
                duration: '1 year' as TimePrimitiveWithCal.DurationEnum
            }
        }
    })

    static readonly BIRTH_ZWINGLI: OmitEntity<WarEntityPreview> = ({
        pk_entity: 1003,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Ulrich Zwingli',
        entity_type: 'teEn',
        time_span: {
            "p82": {
                julianDay: 123123123,
                calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
                duration: '1 day' as TimePrimitiveWithCal.DurationEnum,
            }
        }
    })


    static readonly TIME_UNIT_ONE_MONTH: OmitEntity<WarEntityPreview> = ({
        pk_entity: 2017,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_690_TIME_UNIT.dfh_pk_class,
        class_label: DfhApiClassMock.EN_690_TIME_UNIT.dfh_class_label,
        entity_label: InfLangStringMock.EN_SHORT_TITLE_MONTH.string,
        entity_type: 'peIt',
    })

    static readonly PERSON_1: OmitEntity<WarEntityPreview> = ({
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        class_label: DfhApiClassMock.EN_21_PERSON.dfh_class_label,
        entity_label: InfAppellationMock.JACK_THE_FOO.string,
        entity_type: 'peIt',
    })

    static readonly EXPRESSION_PORTION_HABS_EMP_CHAPTER_1: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_class_label,
        entity_label: 'Chapter 1',
        entity_type: 'peIt',
    })
    static readonly EXPRESSION_PORTION_HABS_EMP_CHAPTER_2: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_2,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_class_label,
        entity_label: 'Chapter 2',
        entity_type: 'peIt',
    })

    static readonly APPE_IN_LANG_TYPE_FIRST_NAME: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_class_label,
        entity_label: 'First Name',
        entity_type: 'peIt',
    })

    static readonly APPE_IN_LANG_TYPE_LAST_NAME: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_class_label,
        entity_label: 'Last Name',
        entity_type: 'peIt',
    })

    static readonly VOLUME_UNIT_CUBIC_METER: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.VOLUME_UNIT_CUBIC_METER,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_715_VOLUME_MEASUREMENT_UNIT.dfh_class_label,
        entity_label: 'Cubic Meter',
        entity_type: 'peIt',
    })

    static readonly GEO_PLACE_TYPE_CITY: OmitEntity<WarEntityPreview> = ({
        ...InfResourceMock.GEO_PLACE_TYPE_CITY,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        class_label: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_class_label,
        entity_label: 'City',
        entity_type: 'peIt',
    })

}

