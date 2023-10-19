import { DatNamespace } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

export class NamespaceSlice {
  by_pk_entity?: ByPk<DatNamespace>;
  by_fk_project?: ByPk<ByPk<DatNamespace>>;
}

