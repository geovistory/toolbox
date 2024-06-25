import { Field } from '@kleiolab/lib-redux';
import { GvFieldId, GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';



export function fieldToFieldId(field: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope): GvFieldId {
    return {
        source,
        property: field.property,
        isOutgoing: field.isOutgoing,
        scope
    };
}
