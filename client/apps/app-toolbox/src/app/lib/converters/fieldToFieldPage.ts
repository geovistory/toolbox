import { Field } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';



export function fieldToFieldPage(field: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope, limit: number, offset: number): GvFieldPage {
    return {
        source,
        property: field.property,
        limit,
        offset,
        isOutgoing: field.isOutgoing,
        scope
    };
}
