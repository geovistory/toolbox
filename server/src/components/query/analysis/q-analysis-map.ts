import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {QAnalysisBase, ColDefWithAliases} from './q-analysis-base';
import {QueryDefinition} from '../../../models/pro-analysis.model';
import {GeoEntityMapAndTimeCont} from '../../../models/analysis/analysis-map-response.model';

export class QAnalysisMap extends QAnalysisBase {

  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
  }


  async queryMap(query: QueryDefinition, fkProject: number) {
    const rootTableAlias = this.addTableAlias();

    // root table where
    this.filterWheres.push(
      this.createEntityWhere(query.filter, rootTableAlias, fkProject)
    );

    // root table from
    this.filterFroms.push(`war.entity_preview ${rootTableAlias}`);
    this.froms.push(`tw1 ${rootTableAlias}`);

    // create froms and wheres according to filter definition
    const filterWithAliases = this.createFilterFroms(query.filter, rootTableAlias, rootTableAlias, fkProject);
    this.createFilterWheres(filterWithAliases);

    // create froms and selects according to column definition
    const columnsWithAliases = this.createColumnsFroms(query.columns, rootTableAlias, fkProject);
    // this.createColumnsSelects(columnsWithAliases, rootTableAlias, fkProject);
    this.createColumnGroupBys(columnsWithAliases, rootTableAlias);

    // // create limit, offset
    // this.createLimitAndOffset(query);


    const {selectPkEntities, selectTemporalData} = this.createSqlForEntitiesAndTemporalData(columnsWithAliases, fkProject);

    this.sql = `
        WITH tw1 AS (
          -- apply the query filter
          SELECT DISTINCT
            t_1.pk_entity,
            t_1.entity_type,
            t_1.entity_label,
            t_1.class_label,
            t_1.type_label,
            t_1.time_span,
            t_1.fk_project
          FROM
            ${this.joinFroms(this.filterFroms)}
          WHERE
            ${this.joinWheres(this.filterWheres, 'AND')}
        ),
        tw2 AS (
          SELECT
          t_1.pk_entity geo_entity_pk,
          jsonb_strip_nulls(jsonb_build_object(
            'pk_entity',
            t_1.pk_entity,
            'entity_type',
            t_1.entity_type,
            'entity_label',
            t_1.entity_label,
            'class_label',
            t_1.class_label,
            'type_label',
            t_1.type_label,
            'time_span',
            t_1.time_span,
            'fk_project',
            t_1.fk_project
          )) geo_entity_preview,
          ${selectPkEntities} pk_entities,
          ${selectTemporalData} temporal_data
        FROM
          ${this.joinFroms(this.froms)}
        GROUP BY
          t_1.pk_entity,
          t_1.entity_type,
          t_1.entity_label,
          t_1.class_label,
          t_1.type_label,
          t_1.time_span,
          t_1.fk_project
        ),
        -- select geo positions (Geographical Place --> Presence --> Place)
        tw3 AS (
          SELECT
            t0.geo_entity_pk,
            json_strip_nulls(json_build_object(
              'from', t2.first_second,
              'to', t2.last_second,
              'iso_from', commons.julian_second__to_iso_8601( t2.first_second),
              'iso_to', commons.julian_second__to_iso_8601( t2.last_second),
              'lat', t4.lat,
              'long', t4.long
            )) geo_positions
          FROM
            tw2 t0,
            war.vm_statement t1,
            war.entity_preview t2,
            war.vm_statement t3,
            information.v_place t4
          WHERE
            t1.fk_object_info = t0.geo_entity_pk
            AND	t1.fk_project = ${fkProject}
          AND
            t2.pk_entity = t1.fk_subject_info AND t2.fk_project = ${fkProject}
            AND t2.fk_class = 84 --Presence
          AND
            t3.fk_subject_info = t2.pk_entity AND t3.fk_project = ${fkProject}
          AND
            t4.pk_entity = t3.fk_object_info

        )
        SELECT
          tw2.geo_entity_pk,
          tw2.geo_entity_preview,
          coalesce(json_agg(tw3.geo_positions) Filter (Where tw3.geo_positions Is Not Null), '[]') As geo_positions,
          tw2.pk_entities,
          tw2.temporal_data
        FROM
          tw2
        LEFT JOIN tw3 ON tw3.geo_entity_pk = tw2.geo_entity_pk
        GROUP BY
          tw2.geo_entity_pk,
          tw2.geo_entity_preview,
          tw2.pk_entities,
          tw2.temporal_data;
     `

    // let forLog = this.sql;
    // this.params.forEach((param, i) => {
    //   const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
    //   forLog = forLog.replace(replaceStr, param);
    // });
    // console.log(`
    // "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
    // ${sqlFormatter.format(forLog, {language: 'pl/sql'})}

    // `);
    return this.execute<GeoEntityMapAndTimeCont[]>()

  }


  private createSqlForEntitiesAndTemporalData(columnsWithAliases: ColDefWithAliases[], fkProject: number) {
    const p = columnsWithAliases[0].queryPathWithAlias;
    const lastSegment = p?.[p?.length - 1]
    const pathEndsWithClass = (lastSegment?.data.classes?.length ?? 0) + (lastSegment?.data?.types?.length ?? 0) > 0;

    if (!lastSegment || !pathEndsWithClass) {
      const selectPkEntities = `'[]'::jsonb`;
      const selectTemporalData = `'{
        "data_lookup": {},
        "timeLinePoints": [],
        "timeCzmlValues": []
      }'::jsonb`;
      return {selectPkEntities, selectTemporalData};
    } else {

      const aliasOfEntityTable = lastSegment._tableAlias;

      const selectPkEntities = `coalesce(jsonb_agg(${aliasOfEntityTable}.pk_entity) Filter (Where ${aliasOfEntityTable}.pk_entity Is Not Null), '[]')`;
      const selectTemporalData = `commons.analysis__time_chart_cont__czml_time_values(array_agg(${aliasOfEntityTable}.pk_entity), ${fkProject})`;
      return {selectPkEntities, selectTemporalData};
    }
  }
}
