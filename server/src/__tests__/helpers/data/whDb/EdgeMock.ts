import { StatementItemToIndexate } from '../../../../warehouse/primary-ds/EdgeService';
import { EntityMock } from './EntityMock';
/**
 * Mock data related to edges
 */
export class EdgeMock {

    // Out of NAME_1

    static readonly EDGE_NAME_1_TO_APPE: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 0,
        ord_num_of_range: 0,
        pk_statement: 1234,
        fk_property: 1113,
        fk_subject_info: EntityMock.NAME_1_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: 999,
        object_table: 'appellation',
        appellation: 'Jack the Foo',
        language: null,
        lang_string: null
    };
    static readonly EDGE_NAME_1_TO_PERSON: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 0,
        ord_num_of_range: 0,
        pk_statement: 2345,
        fk_property: 1111,
        fk_subject_info: EntityMock.NAME_1_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_1_ID.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    };

    // Out of NAME_2

    static readonly EDGE_NAME_2_TO_APPE: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 3456,
        fk_property: 1113,
        fk_subject_info: EntityMock.NAME_2_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: 999,
        object_table: 'appellation',
        appellation: 'Jack',
        language: null,
        lang_string: null
    };

    static readonly EDGE_NAME_2_TO_PERSON: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 4567,
        fk_property: 1111,
        fk_subject_info: EntityMock.NAME_2_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_1_ID.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    };
    static readonly EDGE_NAME_3_TO_APPE: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 3345,
        fk_property: 1113,
        fk_subject_info: EntityMock.NAME_3_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: 999,
        object_table: 'appellation',
        appellation: 'Kiddy',
        language: null,
        lang_string: null
    }

    static readonly EDGE_NAME_3_TO_PERSON: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 3346,
        fk_property: 1111, // is appellation of
        fk_subject_info: EntityMock.NAME_3_ID.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_3_ID.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    }

    static readonly EDGE_BIRTH_1_BROUGHT_INTO_LIFE: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 5678,
        fk_property: 41, // brought into life
        fk_subject_info: EntityMock.BIRTH_1.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_3.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    }
    static readonly EDGE_BIRTH_1_STEMS_FROM: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 2,
        pk_statement: 5679,
        fk_property: 42, // stems from
        fk_subject_info: EntityMock.BIRTH_1.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.UNION_1.pkEntity,
        object_table: 'temporal_entity',
        appellation: null,
        language: null,
        lang_string: null
    }

    static readonly EDGE_UNION_1_HAS_PARTNER_1: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 6790,
        fk_property: 52, // has partner
        fk_subject_info: EntityMock.UNION_1.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_1.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    }

    static readonly EDGE_UNION_1_HAS_PARTNER_2: StatementItemToIndexate = {
        fk_project: 591,
        ord_num_of_domain: 1,
        ord_num_of_range: 0,
        pk_statement: 6791,
        fk_property: 52, // has partner
        fk_subject_info: EntityMock.UNION_1.pkEntity,
        subject_table: 'temporal_entity',
        fk_object_info: EntityMock.PERS_2.pkEntity,
        object_table: 'persistent_item',
        appellation: null,
        language: null,
        lang_string: null
    }


}
