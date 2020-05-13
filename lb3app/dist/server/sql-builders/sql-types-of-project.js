"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
const utils_1 = require("../utils");
class SqlTypesOfProject extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
    * Queries all instances of E55 Type of given project with the minimal related information
    * returning a SchemaObject
    * - the persistent_item itself
    * - the info_proj_rel
    *
    * The rest can then be queried async
    *
    * @param {*} fkProject
    */
    create(fkProject) {
        const sql = `
      WITH
      tw1 AS (
        SELECT
          ${this.createSelect('t1', 'InfPersistentItem')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_persistent_item t1
        CROSS JOIN
          projects.info_proj_rel t2,
          data_for_history.v_class  t3
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t1.fk_class = t3.pk_class
        AND t3.basic_type = 30
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
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'persistent_item', persistent_item.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      persistent_item
      LEFT JOIN info_proj_rel ON true;
    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
}
exports.SqlTypesOfProject = SqlTypesOfProject;
//# sourceMappingURL=sql-types-of-project.js.map