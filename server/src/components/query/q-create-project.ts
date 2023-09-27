

import {PK_PROJECT_OF_TEMPLATE_PROJECT, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_DESCRIPTION, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_LABEL} from '../../config';
import {Postgres1DataSource} from '../../datasources';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QCreateProject extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }


  query(
    accountId: number,
    pkLanguage: number,
    label: string,
    description: string,
  ): Promise<void> {

    let insertTextProperty = '';
    if (description) {
      insertTextProperty = `
      , insert_text_property AS (
        INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
        SELECT
          pk_entity,
          pk_entity,
          ${this.addParam(description)},
          ${this.addParam(PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_DESCRIPTION)},
          ${this.addParam(pkLanguage)}
        FROM insert_project
      )`;
    }

    this.sql = `
    WITH insert_project AS (
      INSERT INTO projects.project (fk_language)
      VALUES
      (${this.addParam(pkLanguage)})
      ON CONFLICT DO NOTHING
      RETURNING pk_entity
    ),
    insert_label AS (
      INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
      SELECT
        pk_entity,
        pk_entity,
        ${this.addParam(label)},
        ${this.addParam(PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_LABEL)},
        ${this.addParam(pkLanguage)}
      FROM insert_project
      ON CONFLICT DO NOTHING
    )
    ${insertTextProperty},
    add_information_from_template_project AS (
      INSERT INTO projects.info_proj_rel (
          fk_project,
          fk_entity,
          fk_entity_version,
          fk_entity_version_concat,
          is_in_project,
          is_standard_in_project,
          ord_num_of_domain,
          ord_num_of_range,
          ord_num_of_text_property,
          entity_version
         )
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_entity,
        fk_entity_version,
        fk_entity_version_concat,
        is_in_project,
        is_standard_in_project,
        ord_num_of_domain,
        ord_num_of_range,
        ord_num_of_text_property,
        entity_version
      FROM projects.info_proj_rel
      WHERE fk_project = ${this.addParam(PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_dfh_classes AS (
      INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_class,
        enabled_in_entities
      FROM projects.dfh_class_proj_rel
      WHERE fk_project = ${this.addParam(PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_dfh_profiles AS (
      INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_profile,
        enabled
      FROM projects.dfh_profile_proj_rel
      WHERE fk_project = ${this.addParam(PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_default_namespace AS (
      INSERT INTO data.namespace (fk_project, standard_label)
      VALUES (
        (SELECT pk_entity FROM insert_project),
        'Default Namespace'
      )
    )
    INSERT INTO public.account_project_rel (fk_project, account_id, role)
    SELECT pk_entity, ${this.addParam(accountId)}, 'owner' FROM insert_project
    `;


    return this.execute();

  }

}
