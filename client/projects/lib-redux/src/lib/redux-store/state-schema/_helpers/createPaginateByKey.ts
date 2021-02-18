import { LoadPaginatedStatementListMeta, PaginateByParam } from '../../public-api';
export function createPaginateByKey(meta: LoadPaginatedStatementListMeta): PaginateByParam[] {
  return [
    { fk_property: meta.pkProperty },
    { fk_target_class: meta.fkTargetClass },
    { [meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: meta.pkSourceEntity },
    { [meta.alternatives ? 'alternatives' : 'ofProject']: meta.alternatives }
  ];
}
