-- 1 update_api_profiles_table
Create Or Replace Function data_for_history.update_api_profiles_table (
    param_profile_id INT,
    param_requested_language VARCHAR,
    param_tmsp_last_dfh_update TIMESTAMP With TIME ZONE,
    param_profile_data JSON Default Null
)
    Returns JSON
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    removed JSON;
    updated JSON;
    inserted JSON;
Begin
    /*
     * Update tmsp_last_dfh_update for all records of given
     * profile_id
     */
    Update
        data_for_history.api_profile
    Set
        tmsp_last_dfh_update = param_tmsp_last_dfh_update
    Where
        dfh_pk_profile = param_profile_id;

    /*
     * Q: Is profile still present in API ?
     */
    If (param_profile_data Is Null) Then
        /*
         * A: No. Profile is removed from API
         */
        With tw1 As (
            Update
                data_for_history.api_profile
            Set
                removed_from_api = True
            Where
                dfh_pk_profile = param_profile_id
                And removed_from_api = False
            Returning
                *
)
        Select
            jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_profile_label', dfh_profile_label)) Into removed
        From
            tw1;
    Else
        /*
         * A: Yes. Profile is still present in API
         */
        /*
         * Update profile_label
         */
        Update
            data_for_history.api_profile
        Set
            dfh_profile_label = param_profile_data ->> 'profileLabel'
        Where
            dfh_pk_profile = param_profile_id
            And dfh_profile_label_language = param_profile_data ->> 'profileLabelLanguage';

        /*
         * Update profile_definition
         */
        Update
            data_for_history.api_profile
        Set
            dfh_profile_definition = param_profile_data ->> 'profileDefinition'
        Where
            dfh_pk_profile = param_profile_id
            And dfh_profile_definition_language = param_profile_data ->> 'profileDefinitionLanguage';

        /*
         * Update project_label
         */
        Update
            data_for_history.api_profile
        Set
            dfh_project_label = param_profile_data ->> 'ownedByProjectLabel'
        Where
            dfh_pk_profile = param_profile_id
            And dfh_project_label_language = param_profile_data ->> 'ownedByProjectLabelLanguage';

        /*
         * Update language independent fields of existing records
         * of the queried profile
         */
        With tw1 As (
            Update
                data_for_history.api_profile
            Set
                removed_from_api = False,
                dfh_owned_by_project = (param_profile_data ->> 'ownedByProjectID')::int,
                dfh_is_ongoing_forced_publication = (param_profile_data ->> 'isOngoingForcedPublication')::bool,
                dfh_date_profile_published = (param_profile_data ->> 'dateProfilePublished')::TIMESTAMP With TIME ZONE,
                dfh_date_profile_deprecated = (param_profile_data ->> 'dateProfileDeprecated')::TIMESTAMP With TIME ZONE
            Where
                dfh_pk_profile = param_profile_id
            Returning
                *
)
        Select
            jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) Into updated
        From
            tw1;

        /*
         * Insert or update all fields
         * of the queried profile and the requested language
         */
        With tw1 As (
Insert Into data_for_history.api_profile (tmsp_last_dfh_update,
                requested_language,
                dfh_pk_profile,
                dfh_profile_label_language,
                dfh_profile_label,
                dfh_profile_definition_language,
                dfh_profile_definition,
                dfh_owned_by_project,
                dfh_project_label_language,
                dfh_project_label,
                dfh_is_ongoing_forced_publication,
                dfh_date_profile_published,
                dfh_date_profile_deprecated)
            Values (param_tmsp_last_dfh_update,
                param_requested_language,
                (param_profile_data ->> 'profileID')::INT,
                param_profile_data ->> 'profileLabelLanguage',
                param_profile_data ->> 'profileLabel',
                param_profile_data ->> 'profileDefinitionLanguage',
                param_profile_data ->> 'profileDefinition',
                (param_profile_data ->> 'ownedByProjectID')::INT,
                param_profile_data ->> 'ownedByProjectLabelLanguage',
                param_profile_data ->> 'ownedByProjectLabel',
                (param_profile_data ->> 'isOngoingForcedPublication')::bool,
                (param_profile_data ->> 'dateProfilePublished')::TIMESTAMP With TIME ZONE,
                (param_profile_data ->> 'dateProfileDeprecated')::TIMESTAMP With TIME ZONE) On Conflict (dfh_pk_profile,
                requested_language)
            Do
            Update
            Set
                tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update,
                requested_language = EXCLUDED.requested_language,
                dfh_pk_profile = EXCLUDED.dfh_pk_profile,
                dfh_profile_label_language = EXCLUDED.dfh_profile_label_language,
                dfh_profile_label = EXCLUDED.dfh_profile_label,
                dfh_profile_definition_language = EXCLUDED.dfh_profile_definition_language,
                dfh_profile_definition = EXCLUDED.dfh_profile_definition,
                dfh_owned_by_project = EXCLUDED.dfh_owned_by_project,
                dfh_project_label_language = EXCLUDED.dfh_project_label_language,
                dfh_project_label = EXCLUDED.dfh_project_label,
                dfh_is_ongoing_forced_publication = EXCLUDED.dfh_is_ongoing_forced_publication,
                dfh_date_profile_published = EXCLUDED.dfh_date_profile_published,
                dfh_date_profile_deprecated = EXCLUDED.dfh_date_profile_deprecated
            Returning
                *
)
        Select
            jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) Into inserted
        From
            tw1;
    End If;
    Return json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
End;
$BODY$;

-- 2 update_api_classes_profile_table
Create Or Replace Function data_for_history.update_api_classes_profile_table (
    param_profile_id INT,
    param_requested_language VARCHAR,
    param_tmsp_last_dfh_update TIMESTAMP With TIME ZONE,
    param_classes_profile_data JSON Default '[]' ::JSON
)
    Returns JSON
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    removed JSON;
    updated JSON;
    inserted JSON;
Begin
    /*
     * create a table with same type as from json
     */
    Drop Table If Exists classes_profile_from_api;
    Create TEMP Table classes_profile_from_api As
    Select
        param_requested_language As requested_language,
        "classID" As dfh_pk_class,
        "classIdentifierInNamespace" As dfh_class_identifier_in_namespace,
        "classLabelLanguage" As dfh_class_label_language,
        "classLabel" As dfh_class_label,
        "classScopeNoteLanguage" As dfh_class_scope_note_language,
        "classScopeNote" As dfh_class_scope_note,
        "entityBasicType" As dfh_basic_type,
        "entityBasicTypeLabel" As dfh_basic_type_label,
        "namespaceID" As dfh_fk_namespace,
        "namespaceLabelLanguage" As dfh_namespace_label_language,
        "namespaceLabel" As dfh_namespace_label,
        "namespaceURI" As dfh_namespace_uri,
        "profileAssociationType" As dfh_profile_association_type,
        "profileID" As dfh_fk_profile,
        "profileLabelLanguage" As dfh_profile_label_language,
        "profileLabel" As dfh_profile_label
    From
        json_to_recordset(param_classes_profile_data) As x ("classID" int,
        "classIdentifierInNamespace" varchar,
        "classLabel" text,
        "classLabelLanguage" varchar,
        "classScopeNote" text,
        "classScopeNoteLanguage" varchar,
        "entityBasicType" int,
        "entityBasicTypeLabel" text,
        "namespaceID" int,
        "namespaceLabel" text,
        "namespaceLabelLanguage" varchar,
        "namespaceURI" text,
        "profileAssociationType" text,
        "profileID" int,
        "profileLabel" text,
        "profileLabelLanguage" varchar);

    /*
     * Update tmsp_last_dfh_update for all records of given
     * profile_id
     */
    Update
        data_for_history.api_class
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
            dfh_pk_class,
            dfh_fk_profile
        From
            data_for_history.api_class
        Where
            dfh_fk_profile = param_profile_id
        Except
        Select
            dfh_pk_class,
            dfh_fk_profile
        From
            classes_profile_from_api
        Where
            dfh_fk_profile = param_profile_id
),
tw2 As (
    Update
        data_for_history.api_class t1
    Set
        removed_from_api = True
    From
        tw1 t2
    Where
        t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_class = t2.dfh_pk_class
    Returning
        t1.*
)
Select
    jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) Into removed
From
    tw2;

    /*
     * Update class_label
     */
    Update
        data_for_history.api_class t1
    Set
        dfh_class_label = t2.dfh_class_label
    From
        classes_profile_from_api t2
    Where
        t1.dfh_class_label_language = t2.dfh_class_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_class = t2.dfh_pk_class;

    /*
     * Update class_scope_note
     */
    Update
        data_for_history.api_class t1
    Set
        dfh_class_scope_note = t2.dfh_class_scope_note
    From
        classes_profile_from_api t2
    Where
        t1.dfh_class_scope_note_language = t2.dfh_class_scope_note_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_class = t2.dfh_pk_class;

    /*
     * Update namespace_label
     */
    Update
        data_for_history.api_class t1
    Set
        dfh_namespace_label = t2.dfh_namespace_label
    From
        classes_profile_from_api t2
    Where
        t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_class = t2.dfh_pk_class;

    /*
     * Update profile_label
     */
    Update
        data_for_history.api_class t1
    Set
        dfh_profile_label = t2.dfh_profile_label
    From
        classes_profile_from_api t2
    Where
        t1.dfh_profile_label_language = t2.dfh_profile_label_language
        And t1.dfh_fk_profile = t2.dfh_fk_profile
        And t1.dfh_pk_class = t2.dfh_pk_class;

    /*
     * Update language independent fields of existing records
     * This affects also records of other languages than the requested
     */
    With tw1 As (
        Update
            data_for_history.api_class t1
        Set
            removed_from_api = False,
            dfh_class_identifier_in_namespace = t2.dfh_class_identifier_in_namespace,
            dfh_basic_type = t2.dfh_basic_type,
            dfh_basic_type_label = t2.dfh_basic_type_label,
            dfh_fk_namespace = t2.dfh_fk_namespace,
            dfh_namespace_uri = t2.dfh_namespace_uri,
            dfh_profile_association_type = t2.dfh_profile_association_type
        From
            classes_profile_from_api t2
        Where
            t1.dfh_fk_profile = t2.dfh_fk_profile
            And t1.dfh_pk_class = t2.dfh_pk_class
        Returning
            t1.*
)
    Select
        jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) Into updated
    From
        tw1;

    /*
     * Insert all new records
     */
    With tw1 As (
Insert Into data_for_history.api_class (tmsp_last_dfh_update,
            removed_from_api,
            requested_language,
            dfh_pk_class,
            dfh_class_identifier_in_namespace,
            dfh_class_label_language,
            dfh_class_label,
            dfh_class_scope_note_language,
            dfh_class_scope_note,
            dfh_basic_type,
            dfh_basic_type_label,
            dfh_fk_namespace,
            dfh_namespace_label_language,
            dfh_namespace_label,
            dfh_namespace_uri,
            dfh_profile_association_type,
            dfh_fk_profile,
            dfh_profile_label_language,
            dfh_profile_label)
    Select Distinct On (t1.requested_language,
        t1.dfh_pk_class,
        t1.dfh_fk_profile)
        param_tmsp_last_dfh_update,
        False,
        t1.requested_language,
        t1.dfh_pk_class,
        t1.dfh_class_identifier_in_namespace,
        t1.dfh_class_label_language,
        t1.dfh_class_label,
        t1.dfh_class_scope_note_language,
        t1.dfh_class_scope_note,
        t1.dfh_basic_type,
        t1.dfh_basic_type_label,
        t1.dfh_fk_namespace,
        t1.dfh_namespace_label_language,
        t1.dfh_namespace_label,
        t1.dfh_namespace_uri,
        t1.dfh_profile_association_type,
        t1.dfh_fk_profile,
        t1.dfh_profile_label_language,
        t1.dfh_profile_label
    From
        classes_profile_from_api t1
    Where
        t1.requested_language = param_requested_language
        And t1.dfh_fk_profile = param_profile_id On Conflict (requested_language,
            dfh_pk_class,
            dfh_fk_profile)
        Do
        Update
        Set
            tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update,
            removed_from_api = EXCLUDED.removed_from_api,
            --requested_language = EXCLUDED.requested_language,
            --dfh_pk_class = EXCLUDED.dfh_pk_class,
            dfh_class_identifier_in_namespace = EXCLUDED.dfh_class_identifier_in_namespace,
            dfh_class_label_language = EXCLUDED.dfh_class_label_language,
            dfh_class_label = EXCLUDED.dfh_class_label,
            dfh_class_scope_note_language = EXCLUDED.dfh_class_scope_note_language,
            dfh_class_scope_note = EXCLUDED.dfh_class_scope_note,
            dfh_basic_type = EXCLUDED.dfh_basic_type,
            dfh_basic_type_label = EXCLUDED.dfh_basic_type_label,
            dfh_fk_namespace = EXCLUDED.dfh_fk_namespace,
            dfh_namespace_label_language = EXCLUDED.dfh_namespace_label_language,
            dfh_namespace_label = EXCLUDED.dfh_namespace_label,
            dfh_namespace_uri = EXCLUDED.dfh_namespace_uri,
            dfh_profile_association_type = EXCLUDED.dfh_profile_association_type,
            -- dfh_fk_profile = EXCLUDED.dfh_fk_profile,
            dfh_profile_label_language = EXCLUDED.dfh_profile_label_language,
            dfh_profile_label = EXCLUDED.dfh_profile_label
        Returning
            *
)
    Select
        jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) Into inserted
    From
        tw1;

    /*
     * Return kind of a protocol
     */
    Return json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
End;
$BODY$;

-- 2 update_api_properties_profile_table
Create Or Replace Function data_for_history.update_api_properties_profile_table (
    param_profile_id INT,
    param_requested_language VARCHAR,
    param_tmsp_last_dfh_update TIMESTAMP With TIME ZONE,
    param_properties_profile_data JSON Default '[]' ::JSON
)
    Returns JSON
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    removed JSON;
    updated JSON;
    inserted JSON;
Begin
    /*
     * create a table with same type as from json
     */
    Drop Table If Exists properties_profile_from_api;
    Create TEMP Table properties_profile_from_api As
    Select
        param_requested_language As requested_language,
        "propertyID" As dfh_pk_property,
        "propertyLabelLanguage" As dfh_property_label_language,
        "propertyLabel" As dfh_property_label,
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
            dfh_fk_profile
        From
            data_for_history.api_property
        Where
            dfh_fk_profile = param_profile_id
        Except
        Select
            dfh_pk_property,
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
    Returning
        t1.*
)
Select
    jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into removed
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
        Returning
            t1.*
)
    Select
        jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into updated
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
        t1.dfh_fk_profile)
        param_tmsp_last_dfh_update,
        False,
        t1.requested_language,
        t1.dfh_pk_property,
        t1.dfh_property_label_language,
        t1.dfh_property_label,
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
            dfh_property_scope_note_language = EXCLUDED.dfh_property_scope_note_language,
            dfh_property_scope_note = EXCLUDED.dfh_property_scope_note,
            dfh_is_inherited = EXCLUDED.dfh_is_inherited,
            dfh_property_domain = EXCLUDED.dfh_property_domain,
            dfh_domain_instances_min_quantifier = EXCLUDED.dfh_domain_instances_min_quantifier,
            dfh_domain_instances_max_quantifier = EXCLUDED.dfh_domain_instances_max_quantifier,
            dfh_property_range = EXCLUDED.dfh_property_range,
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
        jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) Into inserted
    From
        tw1;

    /*
     * Return kind of a protocol
     */
    Return json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
End;
$BODY$;

Create Or Replace Function data_for_history.update_api_tables (
    param_profile_id INT,
    param_requested_language VARCHAR,
    param_tmsp_last_dfh_update TIMESTAMP With TIME ZONE,
    param_profile_data JSON Default Null,
    param_classes_profile_data JSON Default Null,
    param_properties_profile_data JSON Default Null
)
    Returns JSON
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    api_profile JSON;
    api_class JSON;
    api_property JSON;
Begin
    /**************************************************************
     * Profiles
     ***************************************************************/
    Select
        data_for_history.update_api_profiles_table (param_profile_id,
            param_requested_language,
            param_tmsp_last_dfh_update,
            param_profile_data) Into api_profile;

    /**************************************************************
     * Classes-Profile
     ***************************************************************/
    Select
        data_for_history.update_api_classes_profile_table (param_profile_id,
            param_requested_language,
            param_tmsp_last_dfh_update,
            param_classes_profile_data) Into api_class;

    /**************************************************************
     * Properties-Profile
     ***************************************************************/
    Select
        data_for_history.update_api_properties_profile_table (param_profile_id,
            param_requested_language,
            param_tmsp_last_dfh_update,
            param_properties_profile_data) Into api_property;
    Return json_build_object('api_profile', api_profile, 'api_class', api_class, 'api_property', api_property);
End;
$BODY$;

