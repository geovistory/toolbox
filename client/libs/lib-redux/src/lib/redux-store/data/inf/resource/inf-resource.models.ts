import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';

export class InfResourceSlice {
  by_pk_entity?: ByPk<InfResource>;
  by_fk_class?: ByPk<ByPk<InfResource>>;
  loading?: boolean
}
