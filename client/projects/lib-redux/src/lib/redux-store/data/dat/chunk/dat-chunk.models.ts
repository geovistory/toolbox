import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

export class ChunkSlice {
  by_pk_entity?: ByPk<DatDigital>;
  by_fk_text?: ByPk<ByPk<DatDigital>>;
}
