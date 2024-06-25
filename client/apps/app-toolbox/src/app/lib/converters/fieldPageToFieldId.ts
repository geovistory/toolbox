import { GvFieldId, GvFieldPage } from '@kleiolab/lib-sdk-lb4';



export function fieldPageToFieldId(fieldPage: GvFieldPage): GvFieldId {
    return {
        source: fieldPage.source,
        property: fieldPage.property,
        isOutgoing: fieldPage.isOutgoing,
        scope: fieldPage.scope
    };
}
