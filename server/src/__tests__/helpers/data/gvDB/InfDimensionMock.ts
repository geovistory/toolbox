/* eslint-disable @typescript-eslint/camelcase */
import {InfDimension} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';
import {InfResourceMock} from './InfResourceMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 800
 */

export class InfDimensionMock {
  static readonly ONE_MONTH: OmitEntity<InfDimension> = {
    pk_entity: 8001,
    fk_class: DfhApiClassMock.EN_689_DURATION.dfh_pk_class,
    numeric_value: 1,
    fk_measurement_unit: InfResourceMock.TIME_UNIT_MONTH.pk_entity ?? -1
  }

}
