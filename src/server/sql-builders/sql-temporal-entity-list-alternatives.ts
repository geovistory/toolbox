import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlTemporalEntityListAlternatives extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }


  /**
   * Returns a SchemaObject with everything needed to create a paginated list of
   * temporal entities, related to the given source entity through roles not in the current project
   *
   * @param fkProject project
   * @param fkSourceEntity the entity on which we are in the GUI
   * @param fkProperty the property that connects source entity with the target temporal entities
   * @param fkTargetClass the class of the temporal entities
   * @param isOutgoing if true, source = subject + target = object; if false, source = object + target = subject
   * @param limit page size for pagination
   * @param offset offset for pagination
   */
  create(
    fkProject: number,
    fkSourceEntity: number,
    fkProperty: number,
    fkTargetClass: number,
    isOutgoing: boolean,
    limit: number,
    offset: number
  ) {
    const sql = `
      WITH
      -- alternative roles (that are in at least one other project)
      tw0 AS (
        SELECT t1.*
        FROM
        information.v_role t1,
        information.temporal_entity t2
        WHERE
        -- if isOutgoing join with fk_temporal_entity , else fk_entity
        t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} =  ${this.addParam(fkSourceEntity)}
        --  add the pk_entity of the 'source' entity here
        AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
        -- ensure the target entity is a temporal entity
        AND t1.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'}  = t2.pk_entity
        -- ensure the target temporal entity has right class
        AND t2.fk_class = ${this.addParam(fkTargetClass)}
        -- ensure the role is in at least one project
        AND t1.is_in_project_count > 0
      EXCEPT
        SELECT t1.*
        FROM
        information.v_role t1,
        projects.info_proj_rel t2,
        information.temporal_entity t3
        WHERE
        -- if isOutgoing join with fk_temporal_entity , else fk_entity
        t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} = ${this.addParam(fkSourceEntity)}
        --  add the pk_entity of the 'source' entity here
        AND t1.fk_property = ${this.addParam(fkProperty)}
         -- add the pk_property
        AND t2.fk_project = ${this.addParam(fkProject)}
        -- add the pk_project here
        -- ensure the target entity is a temporal entity
        AND t1.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'}  = t3.pk_entity
        -- ensure the target temporal entity has right class
        AND t3.fk_class = ${this.addParam(fkTargetClass)}
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
      ),
      -- count
      tw1 AS (
        SELECT
          count(*)
        FROM
          tw0
        GROUP BY
          TRUE
      ),
      -- roles
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfStatement')}
        FROM
          tw0 t1
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      -- temporal_entity
      tw3 AS (
        SELECT
          t1.fk_class,
          t1.notes,
          t1.pk_entity
        FROM
          tw2
          CROSS JOIN information.v_temporal_entity t1
        WHERE
          -- if isOutgoing join with fk_entity, else fk_temporal_entity
          tw2.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'} = t1.pk_entity
      ),
      -- outgoing_roles of temporal_entity
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfStatement')}
          --t1.fk_property,
          --t1.fk_entity,
          --t1.fk_temporal_entity,
          --t1.is_in_project_count,
          --t1.is_standard_in_project_count,
          --t1.community_favorite_calendar,
          --t1.range_max_quantifier,
          --t1.domain_max_quantifier,
          --t1.pk_entity
        FROM
          tw3
          CROSS JOIN information.v_role t1
        WHERE
          tw3.pk_entity = t1.fk_temporal_entity
      ),
      --appellation
      tw5 AS (
        SELECT
          t1.quill_doc,
          t1.fk_class,
          t1.string,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_appellation t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- language
      tw6 AS (
        SELECT
          t1.fk_class,
          t1.pk_language,
          t1.lang_type,
          t1.scope,
          t1.iso6392b,
          t1.iso6392t,
          t1.iso6391,
          t1.notes,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_language t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- time_primitive
      tw7 AS (
        SELECT
          t1.fk_class,
          t1.julian_day,
          t1.duration,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_time_primitive t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- place
      tw8 AS (
        SELECT
          t1.long,
          t1.lat,
          t1.fk_class,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_place t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),

      ------------------------------------
      --- group parts by model
      ------------------------------------
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfStatement')} as objects
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
      LEFT JOIN place ON true;
    `;
    logSql(sql, this.params)
    return { sql, params: this.params };
  }

}
