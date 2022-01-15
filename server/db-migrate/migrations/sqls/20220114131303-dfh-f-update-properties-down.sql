CREATE OR REPLACE FUNCTION data_for_history.update_api_properties_profile_table (param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_properties_profile_data json DEFAULT '[]' ::json)
  RETURNS json
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  removed json;
  updated json;
  inserted json;
BEGIN
  /*
   * create a table with same type as from json
   */
  DROP TABLE IF EXISTS properties_profile_from_api;
  CREATE TABLE properties_profile_from_api AS
  SELECT
    param_requested_language AS requested_language,
    "propertyID" AS dfh_pk_property,
    "propertyLabelLanguage" AS dfh_property_label_language,
    "propertyLabel" AS dfh_property_label,
    "propertyInverseLabel" AS dfh_property_inverse_label,
    "propertyScopeNoteLanguage" AS dfh_property_scope_note_language,
    "propertyScopeNote" AS dfh_property_scope_note,
    "isInherited" AS dfh_is_inherited,
    "propertyDomain" AS dfh_property_domain,
    "domainInstancesMinQuantifier" AS dfh_domain_instances_min_quantifier,
    "domainInstancesMaxQuantifier" AS dfh_domain_instances_max_quantifier,
    "propertyRange" AS dfh_property_range,
    "rangeInstancesMinQuantifier" AS dfh_range_instances_min_quantifier,
    "rangeInstancesMaxQuantifier" AS dfh_range_instances_max_quantifier,
    "identityDefining" AS dfh_identity_defining,
    "isHasTypeSubproperty" AS dfh_is_has_type_subproperty,
    "propertyIdentifierInNamespace" AS dfh_property_identifier_in_namespace,
    "namespaceURI" AS dfh_namespace_uri,
    "namespaceID" AS dfh_fk_namespace,
    "namespaceLabelLanguage" AS dfh_namespace_label_language,
    "namespaceLabel" AS dfh_namespace_label,
    "profileAssociationType" AS dfh_profile_association_type,
    "profileID" AS dfh_fk_profile,
    "profileLabelLanguage" AS dfh_profile_label_language,
    "profileLabel" AS dfh_profile_label
  FROM
    json_to_recordset(param_properties_profile_data) AS x ("propertyID" INT,
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
  UPDATE
    data_for_history.api_property
  SET
    tmsp_last_dfh_update = param_tmsp_last_dfh_update
  WHERE
    dfh_fk_profile = param_profile_id;

  /*
   * Mark all records missing in the json data
   * as removed from api.
   * (this is independent from the requested language)
   */
  WITH tw1 AS (
    SELECT
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile
    FROM
      data_for_history.api_property
    WHERE
      dfh_fk_profile = param_profile_id
    EXCEPT
    SELECT
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile
    FROM
      properties_profile_from_api
    WHERE
      dfh_fk_profile = param_profile_id
),
tw2 AS (
  UPDATE
    data_for_history.api_property t1
  SET
    removed_from_api = TRUE
  FROM
    tw1 t2
  WHERE
    t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property
    AND t1.dfh_property_domain = t2.dfh_property_domain
    AND t1.dfh_property_range = t2.dfh_property_range
  RETURNING
    t1.*
)
SELECT
  jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_domain, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO removed
FROM
  tw2;

  /*
   * Update language dependent fields of existing records
   */
  /*
   * Update property_labels
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_label = t2.dfh_property_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_label_language = t2.dfh_property_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update property_inverse_labels
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_inverse_label = t2.dfh_property_inverse_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_label_language = t2.dfh_property_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update scope_notes
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_scope_note = t2.dfh_property_scope_note
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_scope_note_language = t2.dfh_property_scope_note_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update dfh_namespace_label
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_namespace_label = t2.dfh_namespace_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update dfh_profile_label
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_profile_label = t2.dfh_profile_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_profile_label_language = t2.dfh_profile_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update language independent fields of existing records
   * This affects also records of other languages than the requested
   */
  WITH tw1 AS (
    UPDATE
      data_for_history.api_property t1
    SET
      removed_from_api = FALSE,
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
    FROM
      properties_profile_from_api t2
    WHERE
      t1.dfh_fk_profile = t2.dfh_fk_profile
      AND t1.dfh_pk_property = t2.dfh_pk_property
      AND t1.dfh_property_domain = t2.dfh_property_domain
      AND t1.dfh_property_range = t2.dfh_property_range
    RETURNING
      t1.*
)
  SELECT
    jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO updated
  FROM
    tw1;

  /*
   * Insert or update all new records
   */
  WITH tw1 AS (
INSERT INTO data_for_history.api_property (tmsp_last_dfh_update, removed_from_api, requested_language, dfh_pk_property, dfh_property_label_language, dfh_property_label, dfh_property_inverse_label, dfh_property_scope_note_language, dfh_property_scope_note, dfh_is_inherited, dfh_property_domain, dfh_domain_instances_min_quantifier, dfh_domain_instances_max_quantifier, dfh_property_range, dfh_range_instances_min_quantifier, dfh_range_instances_max_quantifier, dfh_identity_defining, dfh_is_has_type_subproperty, dfh_property_identifier_in_namespace, dfh_namespace_uri, dfh_fk_namespace, dfh_namespace_label_language, dfh_namespace_label, dfh_profile_association_type, dfh_fk_profile, dfh_profile_label_language, dfh_profile_label)
    SELECT DISTINCT ON (t1.requested_language,
      t1.dfh_pk_property,
      t1.dfh_property_domain,
      t1.dfh_property_range,
      t1.dfh_fk_profile)
      param_tmsp_last_dfh_update,
      FALSE,
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
    FROM
      properties_profile_from_api t1
    WHERE
      t1.requested_language = param_requested_language
      AND t1.dfh_fk_profile = param_profile_id
    ON CONFLICT (requested_language,
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile)
      DO UPDATE SET
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
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO inserted
    FROM
      tw1;

  /*
   * Return kind of a protocol
   */
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$BODY$;

