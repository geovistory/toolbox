"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
class SqlPeItOwnProperties extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     * Creates SQL for querying a SchemaObject containing everything directly related
     * with a persistent item, that can be loaded without pagination, because
     * the number of related items is not too big.
     *
     * @param {*} fkProject
     * @param {*} pkEntity primary key of the persistent item.
     */
    create(fkProject, pkEntity) {
        const sql = `
      WITH tw1 AS (
        SELECT
          ${this.createSelect('t1', 'InfPersistentItem')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_persistent_item t1
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(fkProject)}
        AND t1.pk_entity = ${this.addParam(pkEntity)}
      ),
      -- text_properties
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTextProperty')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_text_property t1,
          projects.info_proj_rel t2
        WHERE t1.fk_concerned_entity = tw1.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- language
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfLanguage')}
        FROM
          tw3
        CROSS JOIN
          information.v_language t1
        WHERE t1.pk_entity = tw3.fk_language
      ),
      -- has type statement
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfStatement')},
          ${this.createBuildObject('t3', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_statement t1,
          data_for_history.v_property t2,
          projects.info_proj_rel t3
        WHERE t1.fk_subject_info = tw1.pk_entity
        AND t1.fk_property = t2.pk_property
        AND t2.is_has_type_subproperty = true
        AND t1.pk_entity = t3.fk_entity
        AND t3.is_in_project = true
        AND t3.fk_project = ${this.addParam(fkProject)}
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.proj_rel->>'pk_entity') t1.proj_rel as objects
          FROM (
            SELECT proj_rel FROM tw1
            UNION ALL
            SELECT proj_rel FROM tw3
            UNION ALL
            SELECT proj_rel FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      persistent_item AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPersistentItem')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTextProperty')} as objects
          FROM (
            SELECT * FROM tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM (
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      statement AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfStatement')} as objects
          FROM (
            SELECT * FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'statement', statement.json,
          'persistent_item', persistent_item.json,
          'text_property', text_property.json,
          'language', language.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      persistent_item
      LEFT JOIN text_property ON true
      LEFT JOIN language ON true
      LEFT JOIN statement ON true
      LEFT JOIN info_proj_rel ON true
    `;
        return { sql, params: this.params };
    }
}
exports.SqlPeItOwnProperties = SqlPeItOwnProperties;
//# sourceMappingURL=sql-pe-it-own-properties.js.map