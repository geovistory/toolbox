import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that returns an table of OntoME profile ids
 * required by Geovistory, according to the system config.
 *
 */
export class SqlGvGetRequiredOntoMeProfiles extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `
    CREATE OR REPLACE FUNCTION gv_get_required_ontome_profiles()
    RETURNS TABLE (profile_id integer)
    LANGUAGE SQL
    ROWS 5
    AS $$
      SELECT jsonb_array_elements_text(config->'ontome'->'requiredOntomeProfiles')::int fk_profile
      FROM system.config
    $$
    `
  }
}

