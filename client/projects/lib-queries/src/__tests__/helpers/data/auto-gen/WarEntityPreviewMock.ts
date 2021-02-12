/* eslint-disable @typescript-eslint/camelcase */

import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ProProjectMock } from './ProProjectMock'
import { DfhApiClassMock } from './DfhApiClassMock'

/**
 * pk_entity prefix: 100
 */
export class WarEntityPreviewMock {
    static readonly GEO_PLACE_BASEL: Partial<WarEntityPreview> = ({
        pk_entity: 1000,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Basel',
        entity_type: 'peIt',
    })

    static readonly GEO_PLACE_ZURICH: Partial<WarEntityPreview> = ({
        pk_entity: 1001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        class_label: 'Geographical Place',
        entity_label: 'Zürich',
        entity_type: 'peIt',
    })


    static readonly BIRTH_OEKOLOMBAD: Partial<WarEntityPreview> = ({
        pk_entity: 1002,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Johannes Oekolampad',
        entity_type: 'teEn',
        time_span: {
            'p82': {
                julianDay: 123123123,
                calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
                duration: '1 year' as TimePrimitiveWithCal.DurationEnum
            }
        }
    })

    static readonly BIRTH_ZWINGLI: Partial<WarEntityPreview> = ({
        pk_entity: 1003,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        class_label: 'Birth',
        entity_label: 'Ulrich Zwingli',
        entity_type: 'teEn',
        time_span: {
            'p82': {
                julianDay: 123123123,
                calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
                duration: '1 day' as TimePrimitiveWithCal.DurationEnum,
            }
        }
    })

}

