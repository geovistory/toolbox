import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

export class DigitalSlice {
  by_pk_entity__entity_version?: ByPk<DatDigital>;
  by_pk_entity?: ByPk<ByPk<DatDigital>>;
  by_pk_text?: ByPk<ByPk<DatDigital>>;
}
