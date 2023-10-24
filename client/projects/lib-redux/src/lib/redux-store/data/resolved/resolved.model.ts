import { ByPk } from '@kleiolab/lib-utils/public-api';
import { SucceedActionMeta } from '../_lib/crud-actions-factory';

export type ResolvedState = ByPk<SucceedActionMeta<any>>
