"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
const utils_1 = require("../utils");
class SqlTemporalEntityList extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     *
     * @param fkProject project
     * @param fkSourceEntity the entity on which we are in the GUI
     * @param fkProperty the property that connects source entity with the target temporal entities
     * @param fkTargetClass the class of the temporal entities
     * @param isOutgoing if true, source = subject + target = object; if false, source = object + target = subject
     * @param limit page size for pagination
     * @param offset offset for pagination
     */
    create(fkProject, fkSourceEntity, fkProperty, fkTargetClass, isOutgoing, limit, offset) {
        const mainWhere = `
      --if isOutgoing join with fk_temporal_entity , else fk_entity
      t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} = ${this.addParam(fkSourceEntity)} --  add the pk_entity of the 'source' entity here
      AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
      AND t2.fk_project = ${this.addParam(fkProject)} -- add the pk_project here
      -- ensure the target entity is a temporal entity
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
          information.temporal_entity t3
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
          information.temporal_entity t3
        WHERE
          ${mainWhere}
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      -- temporal_entity
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTemporalEntity')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw2
          CROSS JOIN information.v_temporal_entity t1,
          projects.info_proj_rel t2
        WHERE
          -- if isOutgoing join with fk_entity, else fk_temporal_entity
          tw2.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'} = t1.pk_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- outgoing_roles of temporal_entity
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw3
          CROSS JOIN information.v_role t1,
          projects.info_proj_rel t2
        WHERE
          tw3.pk_entity = t1.fk_temporal_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      --appellation
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfAppellation')}
        FROM
          tw4
          CROSS JOIN information.v_appellation t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- language
      tw6 AS (
        SELECT
          ${this.createSelect('t1', 'InfLanguage')}
        FROM
          tw4
          CROSS JOIN information.v_language t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- time_primitive
      tw7 AS (
        SELECT
          ${this.createSelect('t1', 'InfTimePrimitive')}
        FROM
          tw4
          CROSS JOIN information.v_time_primitive t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- place
      tw8 AS (
        SELECT
          ${this.createSelect('t1', 'InfPlace')}
        FROM
          tw4
          CROSS JOIN information.v_place t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- ingoing_roles of temporal_entity
      tw9 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw3
          CROSS JOIN information.v_role t1,
          projects.info_proj_rel t2
        WHERE
          tw3.pk_entity = t1.fk_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
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
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw3
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw4
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw9
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
            UNION ALL
            SELECT
            *
            FROM
            tw4
            UNION ALL
            SELECT
            *
            FROM
            tw9
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      temporal_entity AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTemporalEntity')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      appellation AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfAppellation')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t2.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw6
          ) AS t1
        ) as t2
        GROUP BY true
      ),
      time_primitive AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTimePrimitive')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw7
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      place AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPlace')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw8
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
            'role', role.json,
            'temporal_entity', temporal_entity.json,
            'appellation', appellation.json,
            'language', language.json,
            'time_primitive', time_primitive.json,
            'place', place.json
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
      LEFT JOIN temporal_entity ON true
      LEFT JOIN appellation ON true
      LEFT JOIN language ON true
      LEFT JOIN time_primitive ON true
      LEFT JOIN place ON true
      LEFT JOIN info_proj_rel ON true

    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
}
exports.SqlTemporalEntityList = SqlTemporalEntityList;
//# sourceMappingURL=sql-temporal-entity-list copy.js.map