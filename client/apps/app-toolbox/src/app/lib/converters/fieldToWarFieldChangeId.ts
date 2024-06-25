import { GvFieldProperty, GvFieldSourceEntity, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';



export function fieldToWarFieldChangeId(
    pkProject: number,
    source: GvFieldSourceEntity,
    property: GvFieldProperty,
    isOutgoing: boolean
): WarFieldChangeId {
    return {
        fk_source_info: source.fkInfo,
        fk_source_tables_cell: source.fkTablesCell,
        fk_project: pkProject,
        fk_property: property.fkProperty,
        fk_property_of_property: property.fkPropertyOfProperty,
        is_outgoing: isOutgoing
    };
}
