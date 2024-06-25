import { DatNamespace } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';

export class NamespaceSlice {
  by_pk_entity?: ByPk<DatNamespace>;
  by_fk_project?: ByPk<ByPk<DatNamespace>>;
}

