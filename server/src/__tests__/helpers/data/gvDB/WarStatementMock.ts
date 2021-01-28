/* eslint-disable @typescript-eslint/camelcase */

import { WarStatement, CalendarType, Granularity } from '../../../../models'
import { DfhApiPropertyMock } from './DfhApiPropertyMock'
import { ProProjectMock } from './ProProjectMock'
import { WarEntityPreviewMock } from './WarEntityPreviewMock'
import { DfhApiClassMock } from './DfhApiClassMock'

/**
 * pk_entity prefix: 200
 */
export class WarStatementMock {
    static readonly BIRTH_OF_ZWINGLI_TOOK_PLACE_IN: Partial<WarStatement> = ({
        pk_entity: 2000,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_property: DfhApiPropertyMock.EN_7_BIRTH_TOOK_PLACE_IN_GEO_PLACE.dfh_pk_property,
        fk_subject_info: WarEntityPreviewMock.BIRTH_ZWINGLI.pk_entity,
        fk_object_info: WarEntityPreviewMock.GEO_PLACE_ZURICH.pk_entity,
    })
    static readonly BIRTH_OF_OEKOLOMBAD_TOOK_PLACE_IN: Partial<WarStatement> = ({
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_property: DfhApiPropertyMock.EN_7_BIRTH_TOOK_PLACE_IN_GEO_PLACE.dfh_pk_property,
        fk_subject_info: WarEntityPreviewMock.BIRTH_OEKOLOMBAD.pk_entity,
        fk_object_info: WarEntityPreviewMock.GEO_PLACE_BASEL.pk_entity,
    })

    static readonly BIRTH_OF_ZWINGLI_AT_SOME_TIME_WITHIN: Partial<WarStatement> = ({
        pk_entity: 2002,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_property: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
        fk_subject_info: WarEntityPreviewMock.BIRTH_ZWINGLI.pk_entity,
        fk_object_info: 92,
        object_info_value: {
            timePrimitive: {
                pkEntity: 92,
                fkClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
                julianDay: 123123123,
                calendar: CalendarType.gregorian,
                duration: Granularity['1 day'],
                label: 'Foo (1 day)',
                from: {
                    calGregorianIso8601: 'FOO',
                    calGregorian: 'FOO',
                    calJulian: 'FOO',
                    julianDay: 1234,
                    julianSecond: 1234 * 86400
                },
                to: {
                    calGregorianIso8601: 'FOO',
                    calGregorian: 'FOO',
                    calJulian: 'FOO',
                    julianDay: 1235,
                    julianSecond: 1235 * 86400
                }
            }
        }
    })

}

