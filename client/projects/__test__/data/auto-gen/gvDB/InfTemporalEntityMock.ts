/* eslint-disable @typescript-eslint/camelcase */
import {InfTemporalEntity} from '@kleiolab/lib-sdk-lb4';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 400
 */
export class InfTemporalEntityMock {
  static readonly NAMING_1: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4001,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly NAMING_1_CITY: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4002,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly NAMING_2_STADT: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4003,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly SHIP_VOYAGE: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4004,
    fk_class: DfhApiClassMock.EN_523_SHIP_VOYAGE.dfh_pk_class,
  })

  static readonly BIRTH_1: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4005,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
  })

  static readonly UNION_1: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4006,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
  })

  static readonly ALBERT_IV_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4007,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly RUDOLF_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4008,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly JEAN_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4009,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly HANS_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4010,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly PIERRE_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4011,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly ANGELA_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4012,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly HABSBOURG_EMPIRE_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4013,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly UNIONS_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4014,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly ALBERT_IV_NAMING_2: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4015,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly VOTTABLE_NAMING: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4016,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly MADRIDS_PRESENCE: OmitEntity<InfTemporalEntity> = ({
    pk_entity: 4017,
    fk_class: DfhApiClassMock.EN_51_PLACE.dfh_pk_class,
  })

}
