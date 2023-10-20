import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';

export class ClassColumnMappingSlice {
  by_pk_entity?: ByPk<DatClassColumnMapping>;
  by_fk_column?: ByPk<ByPk<DatClassColumnMapping>>;
}
