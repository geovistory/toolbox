CREATE OR REPLACE FUNCTION data_for_history.update_api_profiles_table (param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_profile_data json DEFAULT NULL::json)
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
   * Update tmsp_last_dfh_update for all records of given
   * profile_id
   */
  UPDATE
    data_for_history.api_profile
  SET
    tmsp_last_dfh_update = param_tmsp_last_dfh_update
  WHERE
    dfh_pk_profile = param_profile_id;

  /*
   * Q: Is profile still present in API ?
   */
  IF (param_profile_data IS NULL) THEN
    /*
     * A: No. Profile is removed from API
     */
    WITH tw1 AS (
      UPDATE
        data_for_history.api_profile
      SET
        removed_from_api = TRUE
      WHERE
        dfh_pk_profile = param_profile_id
        AND removed_from_api = FALSE
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_profile_label', dfh_profile_label)) INTO removed
    FROM
      tw1;
  ELSE
    /*
     * A: Yes. Profile is still present in API
     */
    /*
     * Update profile_label
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_profile_label = param_profile_data ->> 'profileLabel'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_profile_label_language = param_profile_data ->> 'profileLabelLanguage';

    /*
     * Update profile_definition
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_profile_definition = param_profile_data ->> 'profileDefinition'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_profile_definition_language = param_profile_data ->> 'profileDefinitionLanguage';

    /*
     * Update project_label
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_project_label = param_profile_data ->> 'ownedByProjectLabel'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_project_label_language = param_profile_data ->> 'ownedByProjectLabelLanguage';

    /*
     * Update language independent fields of existing records
     * of the queried profile
     */
    WITH tw1 AS (
      UPDATE
        data_for_history.api_profile
      SET
        removed_from_api = FALSE,
        dfh_owned_by_project = (param_profile_data ->> 'ownedByProjectID')::int,
        dfh_is_ongoing_forced_publication = (param_profile_data ->> 'isOngoingForcedPublication')::bool,
        dfh_date_profile_published = (param_profile_data ->> 'dateProfilePublished')::timestamp With TIME ZONE,
        dfh_date_profile_deprecated = (param_profile_data ->> 'dateProfileDeprecated')::timestamp With TIME ZONE
      WHERE
        dfh_pk_profile = param_profile_id
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) INTO updated
    FROM
      tw1;

    /*
     * Insert or update all fields
     * of the queried profile and the requested language
     */
    WITH tw1 AS (
INSERT INTO data_for_history.api_profile (tmsp_last_dfh_update, requested_language, dfh_pk_profile, dfh_profile_label_language, dfh_profile_label, dfh_profile_definition_language, dfh_profile_definition, dfh_owned_by_project, dfh_project_label_language, dfh_project_label, dfh_is_ongoing_forced_publication, dfh_date_profile_published, dfh_date_profile_deprecated)
        VALUES (param_tmsp_last_dfh_update, param_requested_language, (param_profile_data ->> 'profileID')::int, param_profile_data ->> 'profileLabelLanguage', param_profile_data ->> 'profileLabel', param_profile_data ->> 'profileDefinitionLanguage', param_profile_data ->> 'profileDefinition', (param_profile_data ->> 'ownedByProjectID')::int, param_profile_data ->> 'ownedByProjectLabelLanguage', param_profile_data ->> 'ownedByProjectLabel', (param_profile_data ->> 'isOngoingForcedPublication')::bool, (param_profile_data ->> 'dateProfilePublished')::timestamp With TIME ZONE, (param_profile_data ->> 'dateProfileDeprecated')::timestamp With TIME ZONE)
      ON CONFLICT (dfh_pk_profile, requested_language)
        DO UPDATE SET
          tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update, requested_language = EXCLUDED.requested_language, dfh_pk_profile = EXCLUDED.dfh_pk_profile, dfh_profile_label_language = EXCLUDED.dfh_profile_label_language, dfh_profile_label = EXCLUDED.dfh_profile_label, dfh_profile_definition_language = EXCLUDED.dfh_profile_definition_language, dfh_profile_definition = EXCLUDED.dfh_profile_definition, dfh_owned_by_project = EXCLUDED.dfh_owned_by_project, dfh_project_label_language = EXCLUDED.dfh_project_label_language, dfh_project_label = EXCLUDED.dfh_project_label, dfh_is_ongoing_forced_publication = EXCLUDED.dfh_is_ongoing_forced_publication, dfh_date_profile_published = EXCLUDED.dfh_date_profile_published, dfh_date_profile_deprecated = EXCLUDED.dfh_date_profile_deprecated
        RETURNING
          *)
        SELECT
          jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) INTO inserted
        FROM
          tw1;
  END IF;
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$BODY$;

