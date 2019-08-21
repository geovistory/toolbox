var logFn = require("../../server/scripts/log-deserialized-sql");

class PeItFlatObject {
  constructor(models) {
    this.params = [];
    this.models = models;
  }

  getColumns(model) {
    const propDefs = this.models[model].definition.properties;
    const columns = []
    for (const colName in propDefs) {
      if (propDefs.hasOwnProperty(colName)) {
        if (!propDefs[colName].hidden) columns.push(colName)
      }
    }
    return columns;
  }
  createSelect(alias, model) {
    const columns = this.getColumns(model)
    return columns.map(c => alias + '.' + c).join(`,
    `)
  }
  createBuildObject(alias, model) {
    const columns = this.getColumns(model)
    return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `
  }


  createMainQuery(fk_project, pk_entity) {
    const sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        information.v_persistent_item t1
      CROSS JOIN
        projects.info_proj_rel t2
      WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(fk_project)}
      AND t1.pk_entity = ${this.addParam(pk_entity)}
    ),
    -- pi_roles
    tw2 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE tw1.pk_entity = t1.fk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- temporal_entity
    tw3 AS (
      SELECT
        ${this.createSelect('t1', 'InfTemporalEntity')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw2
        CROSS JOIN
        information.v_temporal_entity t1,
        projects.info_proj_rel t2
      WHERE tw2.fk_temporal_entity = t1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- te_roles
    tw4 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE  tw3.pk_entity = t1.fk_temporal_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    --appellation
    tw5 AS (
      SELECT
        ${this.createSelect('t1', 'InfAppellation')}
      FROM
        tw4
        CROSS JOIN
        information.v_appellation t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- language
    tw6 AS (
      SELECT
        ${this.createSelect('t1', 'InfLanguage')}
      FROM
        tw4
        CROSS JOIN
        information.v_language t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- time_primitive
    tw7 AS (
      SELECT
        ${this.createSelect('t1', 'InfTimePrimitive')}
      FROM
        tw4
        CROSS JOIN
        information.v_time_primitive t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- place
    tw8 AS (
      SELECT
        ${this.createSelect('t1', 'InfPlace')}
      FROM
        tw4
        CROSS JOIN
        information.v_place t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- persistent_item (geo)
    tw9 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')}
      FROM
        information.v_persistent_item t1
        CROSS JOIN
        tw4
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- ingoing_roles
    tw10 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
      CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE t1.fk_entity = tw3.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- domain_entity_associations
    tw11 AS (
      SELECT
        ${this.createSelect('t1', 'InfEntityAssociation')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_entity_association t1,
        projects.info_proj_rel t2
      WHERE t1.fk_info_domain = tw1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- text_properties
    tw12 AS (
      SELECT
        ${this.createSelect('t1', 'InfTextProperty')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_text_property t1,
        projects.info_proj_rel t2
      WHERE t1.fk_concerned_entity = tw1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    ------------------------------------
    --- group parts by model
    ------------------------------------

    info_proj_rels AS (
      select distinct on (t1.proj_rel->>'pk_entity')
        t1.proj_rel
      FROM (
        SELECT proj_rel FROM tw1
        UNION ALL
        SELECT proj_rel FROM tw2
        UNION ALL
        SELECT proj_rel FROM tw3
        UNION ALL
        SELECT proj_rel FROM tw4
        UNION ALL
        SELECT proj_rel FROM tw10
        UNION ALL
        SELECT proj_rel FROM tw11
        UNION ALL
        SELECT proj_rel FROM tw12
      ) AS t1
    ),
    persistent_items AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPersistentItem')} as json
      FROM (
        SELECT * FROM tw1
      ) AS t1
    ),
    geo_persistent_items AS (
      select distinct on (t1.pk_entity)
        t1.pk_entity
      FROM (
        SELECT * FROM tw9
      ) AS t1
    ),
    roles AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfRole')} as json
      FROM (
        SELECT * FROM tw2
        UNION ALL
        SELECT * FROM tw4
        UNION ALL
        SELECT * FROM tw10
      ) AS t1
    ),
    entity_associations AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfEntityAssociation')} as json
      FROM (
        SELECT * FROM tw11
      ) AS t1
    ),
    temporal_entities AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTemporalEntity')} as json
      FROM (
        SELECT * FROM tw3
      ) AS t1
    ),
    appellations AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfAppellation')} as json
      FROM (
        SELECT * FROM tw5
      ) AS t1
    ),
    languages AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfLanguage')} as json
      FROM (
        SELECT * FROM tw6
      ) AS t1
    ),
    time_primitives AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTimePrimitive')} as json
      FROM (
        SELECT * FROM tw7
      ) AS t1
    ),
    places AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPlace')} as json
      FROM (
        SELECT * FROM tw8
      ) AS t1
    ),
    text_properties AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTextProperty')} as json
      FROM (
        SELECT * FROM tw12
      ) AS t1
    )
    SELECT 'persistent_item' as model, json_agg(json), count(*) from persistent_items GROUP BY true
    UNION ALL
    SELECT 'role' as model, json_agg(json), count(*) from roles GROUP BY true
    UNION ALL
    SELECT 'entity_association' as model, json_agg(json), count(*) from entity_associations GROUP BY true
    UNION ALL
    SELECT 'temporal_entity' as model, json_agg(json), count(*) from temporal_entities GROUP BY true
    UNION ALL
    SELECT 'appellation' as model, json_agg(json), count(*) from appellations GROUP BY true
    UNION ALL
    SELECT 'language' as model, json_agg(json), count(*) from languages GROUP BY true
    UNION ALL
    SELECT 'time_primitive' as model, json_agg(json), count(*) from time_primitives GROUP BY true
    UNION ALL
    SELECT 'place' as model, json_agg(json), count(*) from places GROUP BY true
    UNION ALL
    SELECT 'text_property' as model, json_agg(json), count(*) from text_properties GROUP BY true
    UNION ALL
    SELECT 'info_proj_rel' as model, json_agg(proj_rel), count(*) from info_proj_rels GROUP BY true
    UNION ALL
    SELECT 'geos' as model, json_agg(pk_entity), count(*) from geo_persistent_items GROUP BY true;
    `
    logFn(sql, this.params)
    return { sql, params: this.params }
  }


  createGeoQuery(fk_project, pkEntities) {
    const sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        information.v_persistent_item t1
      CROSS JOIN
        projects.info_proj_rel t2
      WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(fk_project)}
      AND t1.pk_entity IN (${this.addParams(pkEntities)})
    ),
    -- pi_roles
    tw2 AS (
    SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_role t1
      CROSS JOIN
        information.v_temporal_entity t3,
        projects.info_proj_rel t2
      WHERE tw1.pk_entity = t1.fk_entity
      AND t3.fk_class = 84 AND t1.fk_temporal_entity = t3.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- temporal_entity
    tw3 AS (
      SELECT
        ${this.createSelect('t1', 'InfTemporalEntity')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw2
        CROSS JOIN
        information.v_temporal_entity t1,
        projects.info_proj_rel t2
      WHERE tw2.fk_temporal_entity = t1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- te_roles
    tw4 AS (
    SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE  tw3.pk_entity = t1.fk_temporal_entity
      AND t1.fk_property = ANY(ARRAY[148, 71, 72, 150, 151, 152, 153])
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(fk_project)}
    ),
    -- time_primitive
    tw5 AS (
      SELECT
        ${this.createSelect('t1', 'InfTimePrimitive')}
      FROM
        tw4
        CROSS JOIN
        information.v_time_primitive t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- place
    tw6 AS (
      SELECT
        ${this.createSelect('t1', 'InfPlace')}
      FROM
        tw4
        CROSS JOIN
        information.v_place t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    info_proj_rels AS (
      select distinct on (t1.proj_rel->>'pk_entity')
        t1.proj_rel
      FROM (
        SELECT proj_rel FROM tw1
        UNION ALL
        SELECT proj_rel FROM tw2
        UNION ALL
        SELECT proj_rel FROM tw3
        UNION ALL
        SELECT proj_rel FROM tw4
      ) AS t1
    ),
    persistent_items AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPersistentItem')} as json
      FROM (
        SELECT * FROM tw1
      ) AS t1
    ),
    roles AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfRole')} as json
      FROM (
        SELECT * FROM tw2
        UNION ALL
        SELECT * FROM tw4
      ) AS t1
    ),
    temporal_entities AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTemporalEntity')} as json
      FROM (
        SELECT * FROM tw3
      ) AS t1
    ),
    time_primitives AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTimePrimitive')} as json
      FROM (
        SELECT * FROM tw5
      ) AS t1
    ),
    places AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPlace')} as json
      FROM (
        SELECT * FROM tw6
      ) AS t1
    )


    SELECT 'persistent_item' as model, json_agg(json), count(*) from persistent_items GROUP BY true
    UNION ALL
    SELECT 'role' as model, json_agg(json), count(*) from roles GROUP BY true
    UNION ALL
    SELECT 'temporal_entity' as model, json_agg(json), count(*) from temporal_entities GROUP BY true
    UNION ALL
    SELECT 'time_primitive' as model, json_agg(json), count(*) from time_primitives GROUP BY true
    UNION ALL
    SELECT 'place' as model, json_agg(json), count(*) from places GROUP BY true
    UNION ALL
    SELECT 'info_proj_rel' as model, json_agg(proj_rel), count(*) from info_proj_rels GROUP BY true

    `
    return { sql, params: this.params }
  }



  addParam(val) {
    this.params.push(val);
    return '$' + this.params.length;
  }

  addParams(vals) {
    return vals.map(val => this.addParam(val)).join(',');
  }

}
module.exports = PeItFlatObject;
