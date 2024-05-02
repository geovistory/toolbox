import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that clones the sandbox project and adds it to the account
 */
export class SqlGvCloneSandboxProject extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `
      CREATE OR REPLACE FUNCTION commons.clone_sandbox_project(
        account_id integer)
          RETURNS void
          LANGUAGE 'plpgsql'

          COST 100
          VOLATILE

      AS $BODY$
      DECLARE
        pk_sandbox_project int;
        fk_project_default_language int;
        fk_system_type__project_label int;
        fk_system_type__project_description int;
        project_label varchar;
        project_description varchar;
        pk_new_project int;
        pk_new_default_namespace int;
      BEGIN
        -- pk_entity of the sandbox project
        pk_sandbox_project = 375232;
        -- default language = english
        fk_project_default_language = 18889;
        -- system type for project label
        fk_system_type__project_label = 639;
        -- system type for project description
        fk_system_type__project_description = 638;
        -- the label of the new project
        project_label = 'Sandbox Project';
        -- the description of the new project
        project_description = 'This is a sandbox project. You can use it to explore the functionalities of Geovistory BETA and experiment with them. Enjoy!';

        /*
        * create the project
        */
        INSERT INTO projects.project (fk_language, fk_cloned_from_project)
          VALUES (fk_project_default_language, pk_sandbox_project)
        ON CONFLICT
          DO NOTHING
        RETURNING
          pk_entity INTO pk_new_project;

        /*
        * add label of project
        */
        INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
          VALUES (pk_new_project, pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

        /*
        * add description of project
        */
        INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
          VALUES (pk_new_project, pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

        /*
        * add dfh profiles to project
        */
        INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
        SELECT
          pk_new_project AS fk_project,
          fk_profile,
          enabled
        FROM
          projects.dfh_profile_proj_rel
        WHERE
          fk_project = pk_sandbox_project;

        /*
        * add dfh classes to project
        */
        INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
        SELECT
          pk_new_project AS fk_project,
          fk_class,
          enabled_in_entities
        FROM
          projects.dfh_class_proj_rel
        WHERE
          fk_project = pk_sandbox_project;

        /*
        * add default namespace to project
        */
        INSERT INTO data.namespace (fk_project, standard_label)
          VALUES (pk_new_project, 'Default Namespace')
        RETURNING
          pk_entity INTO pk_new_default_namespace;

        /*
        * add account to project
        */
        INSERT INTO public.account_project_rel (fk_project, account_id, ROLE)
          VALUES (pk_new_project, account_id, 'owner');

        /*
        * add all information to project except for statements referencing to data
        */
        WITH tw1 AS (
          /*
          * select all info_proj_rel of sandbox except those that are
          * referencing an statement associating entities in data schema
          */
          SELECT
            t1.pk_entity
          FROM
            projects.info_proj_rel t1
          WHERE
            fk_project = pk_sandbox_project
          EXCEPT
          SELECT
            t1.pk_entity
          FROM
            projects.info_proj_rel t1,
            information.statement t2
          WHERE
            fk_project = pk_sandbox_project
            AND t1.fk_entity = t2.pk_entity
            AND (t2.fk_subject_tables_cell != 0
              OR t2.fk_object_tables_cell != 0
              OR t2.fk_subject_tables_row != 0
              OR t2.fk_object_tables_row != 0
              OR t2.fk_subject_data != 0
              OR t2.fk_object_data != 0))
        INSERT INTO projects.info_proj_rel (fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version)
        SELECT
          pk_new_project AS fk_project,
          t1.fk_entity,
          t1.fk_entity_version,
          t1.fk_entity_version_concat,
          t1.is_in_project,
          t1.is_standard_in_project,
          t1.ord_num_of_domain,
          t1.ord_num_of_range,
          t1.ord_num_of_text_property,
          t1.entity_version
        FROM
          projects.info_proj_rel t1,
          tw1 t2
        WHERE
          t1.pk_entity = t2.pk_entity;

        /*
        * Clone analysis
        */
        INSERT INTO projects.analysis (fk_last_modifier, fk_project, fk_analysis_type, name, description, analysis_definition)
        SELECT
          account_id AS fk_last_modifier,
          pk_new_project AS fk_project,
          fk_analysis_type,
          name,
          description,
          analysis_definition
        FROM
          projects.analysis
        WHERE
          fk_project = pk_sandbox_project;
      END;
      $BODY$;


  `
    return this;

  }
}

