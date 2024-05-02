/* eslint-disable @typescript-eslint/naming-convention */
import {WarFieldChangeId} from '@kleiolab/lib-sdk-lb4';
import {WarFieldChange} from '@kleiolab/lib-sdk-lb4';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 200
 */
export namespace WarFieldChangeMock {
    export const FIELD_1: OmitEntity<WarFieldChange> = {
        fk_project: 1,
        fk_property: 2,
        fk_property_of_property: 0,
        fk_source_info: 3,
        fk_source_tables_cell: 0,
        is_outgoing: true,
        tmsp_last_modification: '2000-01-01'
    }

    export function toFieldId(f: OmitEntity<WarFieldChange>): WarFieldChangeId {
        const {fk_project, fk_property, fk_property_of_property, fk_source_info, fk_source_tables_cell, is_outgoing} = f;
        return {fk_project, fk_property, fk_property_of_property, fk_source_info, fk_source_tables_cell, is_outgoing}
    }
}

