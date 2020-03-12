import { PaginateByParam } from '../../../../core/store/actions';
import { ListDefinition } from '../properties-tree/properties-tree.models';
export function createPaginateBy(listDefinition: ListDefinition, pkEntity: number): PaginateByParam[] {
    if (listDefinition.listType === 'temporal-entity' || listDefinition.listType === 'entity-preview') {
        return [
            { fk_property: listDefinition.pkProperty },
            { fk_target_class: listDefinition.targetClass },
            { [listDefinition.isOutgoing ? 'fk_temporal_entity' : 'fk_entity']: pkEntity }
        ];
    }
}
