
/**
 * this class mirrors {Entity} from '@loopback/repository'
 */
declare abstract class Entity {
    getId(): unknown;
    getIdObject(): Object;
    toJSON(): Object;
    toObject(): Object;
    toDataObject(): Object;
}

// use this generic type to omit the properties from a model that extends Entity
export type OmitEntity<T> = Omit<T, keyof Entity>;

export interface DatFactoidMapping {
    pk_entity: number,
    fk_digital: number,
    fk_class: number
}

export interface DatFactoidPropertyMapping {
    pk_entity: number,
    fk_property: number,
    fk_column: number,
    fk_factoid_mapping: number
}
export interface NewDfhApiProfile {
    "removed_from_api": boolean,
    "requested_language": string,
    "dfh_pk_profile": number,
    "dfh_profile_label": string,
    "dfh_project_label": string,
    "dfh_owned_by_project": number,
    "dfh_profile_definition": string,
    "dfh_project_label_language": string,
    "dfh_profile_label_language": string,
    "dfh_profile_definition_language": string,
    "dfh_is_ongoing_forced_publication": boolean,
    "dfh_is_root_profile": boolean,
    "dfh_fk_root_profile"?: number
}
export interface NewDfhApiClass {
    dfh_pk_class: number,
    dfh_class_identifier_in_namespace: string,
    dfh_class_label_language: string,
    dfh_class_label: string,
    dfh_class_scope_note_language: string,
    dfh_class_scope_note: string,
    dfh_basic_type: number,
    dfh_basic_type_label: string | null,
    dfh_fk_namespace: number,
    dfh_namespace_label_language: string,
    dfh_namespace_label: string,
    dfh_namespace_uri: string | null,
    dfh_profile_association_type: string,
    dfh_fk_profile: number,
    dfh_profile_label_language: string,
    dfh_profile_label: string,
    dfh_parent_classes: number[],
    dfh_ancestor_classes: number[],
}
export interface DfhApiClass extends NewDfhApiClass {
    pk_entity: number,
    tmsp_last_modification: string
}

export interface NewDfhApiProperty {
    is_enabled_in_profile: boolean | null,
    removed_from_api: boolean,
    requested_language: string,
    dfh_pk_property: number,
    dfh_property_label_language: string,
    dfh_property_label: string,
    dfh_property_inverse_label: string,
    dfh_property_scope_note_language: string,
    dfh_property_scope_note: string,
    dfh_is_inherited: boolean,
    dfh_property_domain: number,
    dfh_domain_instances_min_quantifier: number | null,
    dfh_domain_instances_max_quantifier: number | null,
    dfh_property_range: number,
    dfh_range_instances_min_quantifier: number | null,
    dfh_range_instances_max_quantifier: number | null,
    dfh_identity_defining: boolean,
    dfh_is_has_type_subproperty: boolean,
    dfh_property_identifier_in_namespace: string,
    dfh_namespace_uri: string | null,
    dfh_fk_namespace: number,
    dfh_namespace_label_language: string,
    dfh_namespace_label: string,
    dfh_profile_association_type: string | null,
    dfh_fk_profile: number,
    dfh_profile_label_language: string,
    dfh_profile_label: string,
    dfh_parent_properties: number[],
    dfh_ancestor_properties: number[],
}
export interface DfhApiProperty extends NewDfhApiProperty {
    pk_entity: number,
    tmsp_last_dfh_update: string
}


export const PK_DEFAULT_CONFIG_PROJECT = 375669;

export interface OntomeProfileMock {
    profile: NewDfhApiProfile,
    properties: NewDfhApiProperty[],
    classes: NewDfhApiClass[],
}
