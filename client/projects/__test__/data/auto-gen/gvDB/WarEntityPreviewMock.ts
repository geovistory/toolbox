/* eslint-disable @typescript-eslint/camelcase */

import {WarEntityPreview, TimePrimitiveWithCal, } from '@kleiolab/lib-sdk-lb4';
import {ProProjectMock} from './ProProjectMock'
import {DfhApiClassMock} from './DfhApiClassMock'
import {InfLangStringMock} from './InfLangStringMock'
import {OmitEntity} from './local-model.helpers'
import {InfAppellationMock} from './InfAppellationMock'

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
}

