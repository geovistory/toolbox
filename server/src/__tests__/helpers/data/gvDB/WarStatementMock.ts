/* eslint-disable @typescript-eslint/camelcase */

import {WarStatement} from '../../../../models'
import {DfhApiPropertyMock} from './DfhApiPropertyMock'
import {ProProjectMock} from './ProProjectMock'
import {WarEntityPreviewMock} from './WarEntityPreviewMock'

/**
 * pk_entity prefix: 200
 */
export class WarStatementMock {
    static readonly BIRTH_OF_ZWINGLI_TOOK_PLACE_IN = new WarStatement({
        pk_entity: 2000,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_property: DfhApiPropertyMock.EN_7_BIRTH_TOOK_PLACE_IN_GEO_PLACE.dfh_pk_property,
        fk_subject_info: WarEntityPreviewMock.BIRTH_ZWINGLI.pk_entity,
        fk_object_info: WarEntityPreviewMock.GEO_PLACE_ZURICH.pk_entity,
    })
    static readonly BIRTH_OF_OEKOLOMBAD_TOOK_PLACE_IN = new WarStatement({
        pk_entity: 2001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        project: ProProjectMock.PROJECT_1.pk_entity,
        fk_property: DfhApiPropertyMock.EN_7_BIRTH_TOOK_PLACE_IN_GEO_PLACE.dfh_pk_property,
        fk_subject_info: WarEntityPreviewMock.BIRTH_OEKOLOMBAD.pk_entity,
        fk_object_info: WarEntityPreviewMock.GEO_PLACE_BASEL.pk_entity,
    })

}

