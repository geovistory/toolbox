import { InfStatement, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

interface PaginationInfo {
  loading: {
    [key: string]: boolean
  },
  count: number,
  rows: {
    [key: string]: StatementWithTarget
  }
}

export class InfStatementSlice {
  by_pk_entity?: ByPk<InfStatement>;
  by_subject?: ByPk<ByPk<InfStatement>>;
  by_object?: ByPk<ByPk<InfStatement>>;
  'by_subject+property'?: ByPk<ByPk<InfStatement>>;
  'by_object+property'?: ByPk<ByPk<InfStatement>>;
  by_fk_subject_data?: ByPk<ByPk<InfStatement>>;
  by_subfield_page?: ByPk<PaginationInfo>
  loading?: boolean
}
