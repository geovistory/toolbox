/* eslint-disable @typescript-eslint/camelcase */
import { InfTemporalEntity } from 'projects/toolbox/src/app/core/sdk-lb4';
import { DfhApiClassMock } from './DfhApiClassMock';

/**
 * pk_entity prefix: 400
 */
export class InfTemporalEntityMock {
  static readonly NAMING_1: Partial<InfTemporalEntity> = ({
    pk_entity: 4001,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly NAMING_1_CITY: Partial<InfTemporalEntity> = ({
    pk_entity: 4002,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly NAMING_2_STADT: Partial<InfTemporalEntity> = ({
    pk_entity: 4003,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly SHIP_VOYAGE: Partial<InfTemporalEntity> = ({
    pk_entity: 4004,
    fk_class: DfhApiClassMock.EN_523_SHIP_VOYAGE.dfh_pk_class,
  })

  static readonly BIRTH_1: Partial<InfTemporalEntity> = ({
    pk_entity: 4005,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
  })

  static readonly UNION_1: Partial<InfTemporalEntity> = ({
    pk_entity: 4006,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
  })

  static readonly ALBERT_IV_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4007,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly RUDOLF_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4008,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly JEAN_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4009,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly HANS_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4010,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly PIERRE_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4011,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly ANGELA_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4012,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly HABSBOURG_EMPIRE_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4013,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly UNIONS_NAMING: Partial<InfTemporalEntity> = ({
    pk_entity: 4014,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly ALBERT_IV_NAMING_2: Partial<InfTemporalEntity> = ({
    pk_entity: 4015,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

}
