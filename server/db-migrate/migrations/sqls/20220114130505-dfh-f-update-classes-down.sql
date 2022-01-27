CREATE OR REPLACE FUNCTION data_for_history.update_api_classes_profile_table (param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_classes_profile_data json DEFAULT '[]' ::json)
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
  DROP TABLE IF EXISTS classes_profile_from_api;
  CREATE TEMP TABLE classes_profile_from_api AS
  SELECT
    param_requested_language AS requested_language,
    "classID" AS dfh_pk_class,
    "classIdentifierInNamespace" AS dfh_class_identifier_in_namespace,
    "classLabelLanguage" AS dfh_class_label_language,
    "classLabel" AS dfh_class_label,
    "classScopeNoteLanguage" AS dfh_class_scope_note_language,
    "classScopeNote" AS dfh_class_scope_note,
    "entityBasicType" AS dfh_basic_type,
    "entityBasicTypeLabel" AS dfh_basic_type_label,
    "namespaceID" AS dfh_fk_namespace,
    "namespaceLabelLanguage" AS dfh_namespace_label_language,
    "namespaceLabel" AS dfh_namespace_label,
    "namespaceURI" AS dfh_namespace_uri,
    "profileAssociationType" AS dfh_profile_association_type,
    "profileID" AS dfh_fk_profile,
    "profileLabelLanguage" AS dfh_profile_label_language,
    "profileLabel" AS dfh_profile_label
  FROM
    json_to_recordset(param_classes_profile_data) AS x ("classID" int,
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
  UPDATE
    data_for_history.api_class
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
      dfh_pk_class,
      dfh_fk_profile
    FROM
      data_for_history.api_class
    WHERE
      dfh_fk_profile = param_profile_id
    EXCEPT
    SELECT
      dfh_pk_class,
      dfh_fk_profile
    FROM
      classes_profile_from_api
    WHERE
      dfh_fk_profile = param_profile_id
),
tw2 AS (
  UPDATE
    data_for_history.api_class t1
  SET
    removed_from_api = TRUE
  FROM
    tw1 t2
  WHERE
    t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class
  RETURNING
    t1.*
)
SELECT
  jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) INTO removed
FROM
  tw2;

  /*
   * Update class_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_class_label = t2.dfh_class_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_class_label_language = t2.dfh_class_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update class_scope_note
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_class_scope_note = t2.dfh_class_scope_note
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_class_scope_note_language = t2.dfh_class_scope_note_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update namespace_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_namespace_label = t2.dfh_namespace_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update profile_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_profile_label = t2.dfh_profile_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_profile_label_language = t2.dfh_profile_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update language independent fields of existing records
   * This affects also records of other languages than the requested
   */
  WITH tw1 AS (
    UPDATE
      data_for_history.api_class t1
    SET
      removed_from_api = FALSE,
      dfh_class_identifier_in_namespace = t2.dfh_class_identifier_in_namespace,
      dfh_basic_type = t2.dfh_basic_type,
      dfh_basic_type_label = t2.dfh_basic_type_label,
      dfh_fk_namespace = t2.dfh_fk_namespace,
      dfh_namespace_uri = t2.dfh_namespace_uri,
      dfh_profile_association_type = t2.dfh_profile_association_type
    FROM
      classes_profile_from_api t2
    WHERE
      t1.dfh_fk_profile = t2.dfh_fk_profile
      AND t1.dfh_pk_class = t2.dfh_pk_class
    RETURNING
      t1.*
)
  SELECT
    jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) INTO updated
  FROM
    tw1;

  /*
   * Insert all new records
   */
  WITH tw1 AS (
INSERT INTO data_for_history.api_class (tmsp_last_dfh_update, removed_from_api, requested_language, dfh_pk_class, dfh_class_identifier_in_namespace, dfh_class_label_language, dfh_class_label, dfh_class_scope_note_language, dfh_class_scope_note, dfh_basic_type, dfh_basic_type_label, dfh_fk_namespace, dfh_namespace_label_language, dfh_namespace_label, dfh_namespace_uri, dfh_profile_association_type, dfh_fk_profile, dfh_profile_label_language, dfh_profile_label)
    SELECT DISTINCT ON (t1.requested_language,
      t1.dfh_pk_class,
      t1.dfh_fk_profile)
      param_tmsp_last_dfh_update,
      FALSE,
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
    FROM
      classes_profile_from_api t1
    WHERE
      t1.requested_language = param_requested_language
      AND t1.dfh_fk_profile = param_profile_id
    ON CONFLICT (requested_language,
      dfh_pk_class,
      dfh_fk_profile)
      DO UPDATE SET
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
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) INTO inserted
    FROM
      tw1;

  /*
   * Return kind of a protocol
   */
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$BODY$;

