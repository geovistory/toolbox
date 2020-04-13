"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
const utils_1 = require("../utils");
class SqlEntityPreviewList extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     * Returns a SchemaObject with everything needed to create a paginated list of
     * EntityPreview, related to the given source entity
     *
     * @param fkProject project
     * @param fkSourceEntity the entity on which we are in the GUI
     * @param fkProperty the property that connects source entity with the target entities
     * @param fkTargetClass the class of the entity previews
     * @param isOutgoing if true, source = subject + target = object; if false, source = object + target = subject
     * @param limit page size for pagination
     * @param offset offset for pagination
     */
    create(fkProject, fkSourceEntity, fkProperty, fkTargetClass, isOutgoing, limit, offset) {
        const mainWhere = `
      --if isOutgoing join with fk_temporal_entity , else fk_entity
      t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} =
        ${this.addParam(fkSourceEntity)}
      --  add the pk_entity of the 'source' entity here
      AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
      AND t2.fk_project = ${this.addParam(fkProject)} -- add the pk_project here
      AND t1.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'} = t3.pk_entity
      AND t1.pk_entity = t2.fk_entity
      AND t2.is_in_project = true
      AND t3.fk_class = ${this.addParam(fkTargetClass)}
    `;
        const sql = `
      WITH
      -- count
      tw1 AS (
       SELECT count(*)
       FROM
          information.v_role t1,
          projects.info_proj_rel t2,
          information.v_entity_class_map t3
       WHERE
         ${mainWhere}
       GROUP BY TRUE
      ),
      -- roles
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_role t1,
          projects.info_proj_rel t2,
          information.v_entity_class_map t3
        WHERE
          ${mainWhere}
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------
      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.proj_rel ->> 'pk_entity') t1.proj_rel as objects
          FROM
          (
            SELECT
            proj_rel
            FROM
            tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      paginatedRoles AS (
        SELECT COALESCE(json_agg(t1.pk_entity), '[]'::json) as json
        FROM
          tw2 as t1
      )
      select
      json_build_object(
        'count', tw1.count,
        'schemas', json_build_object (
          'inf', json_strip_nulls(json_build_object(
            'role', role.json
          )),
          'pro', json_strip_nulls(json_build_object(
            'info_proj_rel', info_proj_rel.json
          ))
        ),
        'paginatedRoles', paginatedRoles.json
      ) as data

      FROM
      tw1
      LEFT JOIN paginatedRoles ON true
      LEFT JOIN role ON true
      LEFT JOIN info_proj_rel ON true

    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
}
exports.SqlEntityPreviewList = SqlEntityPreviewList;
//# sourceMappingURL=sql-entity-preview-list.js.map