-- 1
ALTER TABLE data_for_history.class_profile_view RENAME TO class_profile_view_deprecated;
ALTER TABLE data_for_history.class_profile_view_vt RENAME TO class_profile_view_vt_deprecated;
ALTER TABLE data_for_history.associates_system_type RENAME TO associates_system_type_deprecated;
ALTER TABLE data_for_history.associates_system_type_vt RENAME TO associates_system_type_vt_deprecated;
ALTER TABLE data_for_history.label RENAME TO label_deprecated;
ALTER TABLE data_for_history.label_vt RENAME TO label_vt_deprecated;
ALTER TABLE data_for_history.property_profile_view RENAME TO property_profile_view_deprecated;
ALTER TABLE data_for_history.property_profile_view_vt RENAME TO property_profile_view_vt_deprecated;
ALTER TABLE data_for_history.system_type RENAME TO system_type_deprecated;
ALTER TABLE data_for_history.system_type_vt RENAME TO system_type_vt_deprecated;
ALTER TABLE data_for_history.text_property RENAME TO text_property_deprecated;
ALTER TABLE data_for_history.text_property_vt RENAME TO text_property_vt_deprecated;

-- 2
ALTER TABLE data_for_history.api_property
ADD COLUMN dfh_property_inverse_label text;

ALTER TABLE data_for_history.api_property_vt
ADD COLUMN dfh_property_inverse_label text;

-- 3

CREATE OR REPLACE FUNCTION data_for_history.update_api_properties_profile_table(
	param_profile_id integer,
	param_requested_language character varying,
	param_tmsp_last_dfh_update timestamp with time zone,
	param_properties_profile_data json DEFAULT '[]'::json)
    RETURNS json
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE

AS $BODY$
Declare
    removed JSON;
    updated JSON;
    inserted JSON;
Begin
    /*
     * create a table with same type as from json
     */
    Drop Table If Exists properties_profile_from_api;
    Create Table properties_profile_from_api As
    Select
        param_requested_language As requested_language,
        "propertyID" As dfh_pk_property,
        "propertyLabelLanguage" As dfh_property_label_language,
        "propertyLabel" As dfh_property_label,
        "propertyInverseLabel" As dfh_property_inverse_label,
        "propertyScopeNoteLanguage" As dfh_property_scope_note_language,
        "propertyScopeNote" As dfh_property_scope_note,
        "isInherited" As dfh_is_inherited,
        "propertyDomain" As dfh_property_domain,
        "domainInstancesMinQuantifier" As dfh_domain_instances_min_quantifier,
        "domainInstancesMaxQuantifier" As dfh_domain_instances_max_quantifier,
        "propertyRange" As dfh_property_range,
        "rangeInstancesMinQuantifier" As dfh_range_instances_min_quantifier,
        "rangeInstancesMaxQuantifier" As dfh_range_instances_max_quantifier,
        "identityDefining" As dfh_identity_defining,
        "isHasTypeSubproperty" As dfh_is_has_type_subproperty,
        "propertyIdentifierInNamespace" As dfh_property_identifier_in_namespace,
        "namespaceURI" As dfh_namespace_uri,
        "namespaceID" As dfh_fk_namespace,
        "namespaceLabelLanguage" As dfh_namespace_label_language,
        "namespaceLabel" As dfh_namespace_label,
        "profileAssociationType" As dfh_profile_association_type,
        "profileID" As dfh_fk_profile,
        "profileLabelLanguage" As dfh_profile_label_language,
        "profileLabel" As dfh_profile_label
    From
        json_to_recordset(param_properties_profile_data) As x ("propertyID" INT,
        "propertyLabelLanguage" VARCHAR,
        "propertyLabel" TEXT,
        "propertyInverseLabel" TEXT,
        "propertyScopeNoteLanguage" VARCHAR,
        "propertyScopeNote" TEXT,
        "isInherited" BOOLEAN,
        "propertyDomain" INTEGER,
        "domainInstancesMinQuantifier" INTEGER,
        "domainInstancesMaxQuantifier" INTEGER,
        "propertyRange" INTEGER,
        "rangeInstancesMinQuantifier" INTEGER,
        "rangeInstancesMaxQuantifier" INTEGER,
        "identityDefining" BOOLEAN,
        "isHasTypeSubproperty" BOOLEAN,
        "propertyIdentifierInNamespace" VARCHAR,
        "namespaceURI" TEXT,
        "namespaceID" INTEGER,
        "namespaceLabelLanguage" VARCHAR,
        "namespaceLabel" TEXT,
        "profileAssociationType" TEXT,
        "profileID" INTEGER,
        "profileLabelLanguage" VARCHAR,
        "profileLabel" TEXT);

    /*
     * Update tmsp_last_dfh_update for all records of given
     * profile_id
     */
    Update
        data_for_history.api_property
    Set
        tmsp_last_dfh_update = param_tmsp_last_dfh_update
    Where
        dfh_fk_profile = param_profile_id;

    /*
     * Mark all records missing in the json data
     * as removed from api.
     * (this is independent from the requested language)
     */
    With tw1 As (
        Select
            dfh_pk_property,
            dfh_property_domain,
            dfh_property_range,
            dfh_fk_profile
        From
            data_for_history.api_property
        Where
            dfh_fk_profile = param_profile_id
        Except
        Select
            dfh_pk_property,
            dfh_property_domain,
            dfh_property_range,
            dfh_fk_profile
        From
            properties_profile_from_api
        Where
            dfh_fk_profile = param_profile_id
),
tw2 As (
    Update
        data_for_history.api_property t1
    Set
        removed_from_api = True
    From
        tw1 t2
    Where
        t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property
        And t1.dfh_property_domain = t2.dfh_property_domain
        And t1.dfh_property_range = t2.dfh_property_range
    Returning
        t1.*
)
Select
    jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_domain, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into removed
From
    tw2;

    /*
     * Update language dependent fields of existing records
     */
    /*
     * Update property_labels
     */
    Update
        data_for_history.api_property t1
    Set
        dfh_property_label = t2.dfh_property_label
    From
        properties_profile_from_api t2
    Where
        t1.dfh_property_label_language = t2.dfh_property_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property;

        /*
     * Update property_inverse_labels
     */
    Update
        data_for_history.api_property t1
    Set
        dfh_property_inverse_label = t2.dfh_property_inverse_label
    From
        properties_profile_from_api t2
    Where
        t1.dfh_property_label_language = t2.dfh_property_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property;

    /*
     * Update scope_notes
     */
    Update
        data_for_history.api_property t1
    Set
        dfh_property_scope_note = t2.dfh_property_scope_note
    From
        properties_profile_from_api t2
    Where
        t1.dfh_property_scope_note_language = t2.dfh_property_scope_note_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property;

    /*
     * Update dfh_namespace_label
     */
    Update
        data_for_history.api_property t1
    Set
        dfh_namespace_label = t2.dfh_namespace_label
    From
        properties_profile_from_api t2
    Where
        t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property;

    /*
     * Update dfh_profile_label
     */
    Update
        data_for_history.api_property t1
    Set
        dfh_profile_label = t2.dfh_profile_label
    From
        properties_profile_from_api t2
    Where
        t1.dfh_profile_label_language = t2.dfh_profile_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_property = t2.dfh_pk_property;

    /*
     * Update language independent fields of existing records
     * This affects also records of other languages than the requested
     */
    With tw1 As (
        Update
            data_for_history.api_property t1
        Set
            removed_from_api = False,
            dfh_pk_property = t2.dfh_pk_property,
            dfh_is_inherited = t2.dfh_is_inherited,
            dfh_property_domain = t2.dfh_property_domain,
            dfh_domain_instances_min_quantifier = t2.dfh_domain_instances_min_quantifier,
            dfh_domain_instances_max_quantifier = t2.dfh_domain_instances_max_quantifier,
            dfh_property_range = t2.dfh_property_range,
            dfh_range_instances_min_quantifier = t2.dfh_range_instances_min_quantifier,
            dfh_range_instances_max_quantifier = t2.dfh_range_instances_max_quantifier,
            dfh_identity_defining = t2.dfh_identity_defining,
            dfh_is_has_type_subproperty = t2.dfh_is_has_type_subproperty,
            dfh_property_identifier_in_namespace = t2.dfh_property_identifier_in_namespace,
            dfh_namespace_uri = t2.dfh_namespace_uri,
            dfh_fk_namespace = t2.dfh_fk_namespace,
            dfh_profile_association_type = t2.dfh_profile_association_type,
            dfh_fk_profile = t2.dfh_fk_profile
        From
            properties_profile_from_api t2
        Where
            t1.dfh_fk_profile = t2.dfh_fk_profile
            And t1.dfh_pk_property = t2.dfh_pk_property
            And t1.dfh_property_domain = t2.dfh_property_domain
            And t1.dfh_property_range = t2.dfh_property_range
        Returning
            t1.*
)
    Select
        jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into updated
    From
        tw1;

    /*
     * Insert or update all new records
     */
    With tw1 As (
Insert Into data_for_history.api_property (tmsp_last_dfh_update,
            removed_from_api,
            requested_language,
            dfh_pk_property,
            dfh_property_label_language,
            dfh_property_label,
            dfh_property_inverse_label,
            dfh_property_scope_note_language,
            dfh_property_scope_note,
            dfh_is_inherited,
            dfh_property_domain,
            dfh_domain_instances_min_quantifier,
            dfh_domain_instances_max_quantifier,
            dfh_property_range,
            dfh_range_instances_min_quantifier,
            dfh_range_instances_max_quantifier,
            dfh_identity_defining,
            dfh_is_has_type_subproperty,
            dfh_property_identifier_in_namespace,
            dfh_namespace_uri,
            dfh_fk_namespace,
            dfh_namespace_label_language,
            dfh_namespace_label,
            dfh_profile_association_type,
            dfh_fk_profile,
            dfh_profile_label_language,
            dfh_profile_label)
    Select Distinct On (t1.requested_language,
        t1.dfh_pk_property,
        t1.dfh_property_domain,
        t1.dfh_property_range,
        t1.dfh_fk_profile)
        param_tmsp_last_dfh_update,
        False,
        t1.requested_language,
        t1.dfh_pk_property,
        t1.dfh_property_label_language,
        t1.dfh_property_label,
        t1.dfh_property_inverse_label,
        t1.dfh_property_scope_note_language,
        t1.dfh_property_scope_note,
        t1.dfh_is_inherited,
        t1.dfh_property_domain,
        t1.dfh_domain_instances_min_quantifier,
        t1.dfh_domain_instances_max_quantifier,
        t1.dfh_property_range,
        t1.dfh_range_instances_min_quantifier,
        t1.dfh_range_instances_max_quantifier,
        t1.dfh_identity_defining,
        t1.dfh_is_has_type_subproperty,
        t1.dfh_property_identifier_in_namespace,
        t1.dfh_namespace_uri,
        t1.dfh_fk_namespace,
        t1.dfh_namespace_label_language,
        t1.dfh_namespace_label,
        t1.dfh_profile_association_type,
        t1.dfh_fk_profile,
        t1.dfh_profile_label_language,
        t1.dfh_profile_label
    From
        properties_profile_from_api t1
    Where
        t1.requested_language = param_requested_language
        And t1.dfh_fk_profile = param_profile_id On Conflict (requested_language,
            dfh_pk_property,
            dfh_property_domain,
            dfh_property_range,
            dfh_fk_profile)
        Do
        Update
        Set
            tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update,
            removed_from_api = EXCLUDED.removed_from_api,
            requested_language = EXCLUDED.requested_language,
            dfh_pk_property = EXCLUDED.dfh_pk_property,
            dfh_property_label_language = EXCLUDED.dfh_property_label_language,
            dfh_property_label = EXCLUDED.dfh_property_label,
            dfh_property_inverse_label = EXCLUDED.dfh_property_inverse_label,
            dfh_property_scope_note_language = EXCLUDED.dfh_property_scope_note_language,
            dfh_property_scope_note = EXCLUDED.dfh_property_scope_note,
            dfh_is_inherited = EXCLUDED.dfh_is_inherited,
            dfh_domain_instances_min_quantifier = EXCLUDED.dfh_domain_instances_min_quantifier,
            dfh_domain_instances_max_quantifier = EXCLUDED.dfh_domain_instances_max_quantifier,
            dfh_range_instances_min_quantifier = EXCLUDED.dfh_range_instances_min_quantifier,
            dfh_range_instances_max_quantifier = EXCLUDED.dfh_range_instances_max_quantifier,
            dfh_identity_defining = EXCLUDED.dfh_identity_defining,
            dfh_is_has_type_subproperty = EXCLUDED.dfh_is_has_type_subproperty,
            dfh_property_identifier_in_namespace = EXCLUDED.dfh_property_identifier_in_namespace,
            dfh_namespace_uri = EXCLUDED.dfh_namespace_uri,
            dfh_fk_namespace = EXCLUDED.dfh_fk_namespace,
            dfh_namespace_label_language = EXCLUDED.dfh_namespace_label_language,
            dfh_namespace_label = EXCLUDED.dfh_namespace_label,
            dfh_profile_association_type = EXCLUDED.dfh_profile_association_type,
            dfh_fk_profile = EXCLUDED.dfh_fk_profile,
            dfh_profile_label_language = EXCLUDED.dfh_profile_label_language,
            dfh_profile_label = EXCLUDED.dfh_profile_label
        Returning
            *
)
    Select
        jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into inserted
    From
        tw1;

    /*
     * Return kind of a protocol
     */
    Return json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
End;
$BODY$;

-- 4

CREATE OR REPLACE VIEW data_for_history.v_label
 AS
 SELECT DISTINCT ON (t1.dfh_profile_label, t1.dfh_profile_label_language) 'label'::text AS type,
    t1.dfh_profile_label AS label,
    t1.dfh_profile_label_language AS language,
    t1.dfh_pk_profile AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_profile t1
UNION
 SELECT DISTINCT ON (t1.dfh_profile_definition, t1.dfh_profile_definition_language) 'definition'::text AS type,
    t1.dfh_profile_definition AS label,
    t1.dfh_profile_definition_language AS language,
    t1.dfh_pk_profile AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_profile t1
UNION
 SELECT DISTINCT ON (t1.dfh_project_label, t1.dfh_project_label_language) 'label'::text AS type,
    t1.dfh_project_label AS label,
    t1.dfh_project_label_language AS language,
    NULL::integer AS fk_profile,
    t1.dfh_owned_by_project AS fk_project,
    NULL::integer AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_profile t1
UNION
 SELECT DISTINCT ON (t1.dfh_property_label, t1.dfh_property_label_language) 'label'::text AS type,
    t1.dfh_property_label AS label,
    t1.dfh_property_label_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    t1.dfh_pk_property AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_property t1
UNION
 SELECT DISTINCT ON (t1.dfh_property_inverse_label, t1.dfh_property_label_language) 'inverse_label'::text AS type,
    t1.dfh_property_inverse_label AS label,
    t1.dfh_property_label_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    t1.dfh_pk_property AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_property t1
   WHERE t1.dfh_property_inverse_label IS NOT NULL
UNION
 SELECT DISTINCT ON (t1.dfh_property_scope_note, t1.dfh_property_scope_note_language) 'scope_note'::text AS type,
    t1.dfh_property_scope_note AS label,
    t1.dfh_property_scope_note_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    t1.dfh_pk_property AS fk_property,
    NULL::integer AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_property t1
UNION
 SELECT DISTINCT ON (t1.dfh_class_label, t1.dfh_class_label_language) 'label'::text AS type,
    t1.dfh_class_label AS label,
    t1.dfh_class_label_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    t1.dfh_pk_class AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_class t1
UNION
 SELECT DISTINCT ON (t1.dfh_class_scope_note, t1.dfh_class_scope_note_language) 'scope_note'::text AS type,
    t1.dfh_class_scope_note AS label,
    t1.dfh_class_scope_note_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    t1.dfh_pk_class AS fk_class,
    NULL::integer AS fk_property_of_property
   FROM data_for_history.api_class t1
UNION
 SELECT DISTINCT ON (t1.label, t1.label_language) 'label'::text AS type,
    t1.label,
    t1.label_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    NULL::integer AS fk_class,
    t1.pk_property_of_property AS fk_property_of_property
   FROM data_for_history.property_of_property t1
UNION
 SELECT DISTINCT ON (t1.scope_note, t1.scope_note_language) 'scope_note'::text AS type,
    t1.scope_note AS label,
    t1.scope_note_language AS language,
    NULL::integer AS fk_profile,
    NULL::integer AS fk_project,
    NULL::integer AS fk_property,
    NULL::integer AS fk_class,
    t1.pk_property_of_property AS fk_property_of_property
   FROM data_for_history.property_of_property t1;
