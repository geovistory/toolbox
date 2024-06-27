import { GvFieldPage, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';



export function fieldPageToWarFieldChangeId(fieldPage: GvFieldPage): WarFieldChangeId {
    return {
        fk_source_info: fieldPage.source.fkInfo,
        fk_source_tables_cell: fieldPage.source.fkTablesCell,
        fk_project: fieldPage.scope.inProject,
        fk_property: fieldPage.property.fkProperty,
        is_outgoing: fieldPage.isOutgoing
    };
}
