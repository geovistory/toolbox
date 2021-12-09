import {ModelDefinition} from '@loopback/repository';
import {keys, values} from 'ramda';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldTargetViewType, GvPaginationObject, GvSubentitFieldPageReq, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview} from '../../models';
import {GvSubfieldPageInfo} from '../../models/field-response/GvSubfieldPageInfo';
import {SatementTarget} from '../../models/field-response/SatementTarget';
import {GvFieldProperty} from '../../models/field/gv-field-property';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';
import {logSql} from '../../utils/helpers';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


type With = {
  sql: string;
  name: string;
};

type ResTargetKey = keyof SatementTarget


type ModelConfig = {
  modelDefinition: ModelDefinition,
  modelPk: string,
  projectFk?: string
  statementObjectFk: string,
  statementSubjectFk: string,
  classFk: string,
  tableName: string,
  createLabelSql: string
}
type GvTargetTypeKey = keyof GvFieldTargetViewType

type ReqToResTargetMap = {
  [key in GvTargetTypeKey]: ResTargetKey
}

type Models = {
  appellation: ModelConfig
  place: ModelConfig
  language: ModelConfig
  dimension: ModelConfig
  langString: ModelConfig
  timePrimitive: ModelConfig
  resource: ModelConfig
  entityPreview: ModelConfig
}
type ModelKey = keyof Models
type ResTargetModelMap = {
  [key in ResTargetKey]: ModelKey
}

interface PropertyConstraint {
  sourceClass?: number,
  resTargetKey: ResTargetKey,
  targetClasses: number[]
}
interface NestedRequest {
  sourceTable?: SourceTable,
  directedProps: DirectedProperty[]
}
interface DirectedProperty {
  isOutgoing: boolean;
  scope: GvFieldPageScope
  limit: number
  offset: number
  property: GvFieldProperty;
  constraints: PropertyConstraint[];
  _req: GvFieldPageReq // only for the final result
  nestedReqs?: NestedRequest[]
}

interface FinalSelectSpec {
  property: GvFieldProperty,
  isOutgoing: boolean,
  sourceClasses: number[]
  _req: GvFieldPageReq // only for the final result
}
interface JoinTargetSqls {
  join: string;
  selectTarget: string;
  selectTargetLabel: string;
  selectTargetClass: string;
}
interface SourceTable {
  sourceClass?: number
  tw: string
}
interface Source {
  sourceTable?: SourceTable
  sourceEntities?: GvFieldSourceEntity[]
}

// type GvFieldPageWithoutFkSource = PartialBy<GvFieldPage, 'source'>
export class QFieldPage3 extends SqlBuilderLb4Models {

  withClauses: With[] = [];
  withCount = 0
  get nextWith() {
    return 'tw' + this.withCount++
  }

  tCount = 0
  get nextT() {
    return 't_' + this.tCount++
  }

  reqResMap: ReqToResTargetMap;

  modelConfig: Models;

  resTargetModelMap: ResTargetModelMap

  pageInfoTws: string[] = []
  pageInfoNestedTws: string[] = []


  // tableToFindOriginalItems: ModelToFindClassConfig
  constructor(
    public dataSource: Postgres1DataSource,
    private joinNestedInSql = false
  ) {
    super(dataSource)

    this.reqResMap = {
      appellation: 'appellation',
      language: 'language',
      dimension: 'dimension',
      langString: 'langString',
      place: 'place',
      timePrimitive: 'timePrimitive',
      nestedResource: 'entity',
      entityPreview: 'entity',
      typeItem: 'entity',
    }
    this.resTargetModelMap = {
      appellation: 'appellation',
      language: 'language',
      dimension: 'dimension',
      langString: 'langString',
      place: 'place',
      timePrimitive: 'timePrimitive',
      entity: 'resource',
    }
    this.modelConfig = {
      appellation: {
        modelDefinition: InfAppellation.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.appellation',
        classFk: 'fk_class',
        createLabelSql: 'string'
      },
      language: {
        modelDefinition: InfLanguage.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.language',
        classFk: 'fk_class',
        createLabelSql: 'notes'
      },
      dimension: {
        modelDefinition: InfDimension.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.dimension',
        classFk: 'fk_class',
        createLabelSql: `concat_ws(' ', x.numeric_value, u.entity_label)`
      },
      langString: {
        modelDefinition: InfLangString.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.lang_string',
        classFk: 'fk_class',
        createLabelSql: `concat(x.string, ' (', l.iso6391, ')' )`
      },
      place: {
        modelDefinition: InfPlace.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.v_place',
        classFk: 'fk_class',
        createLabelSql: `concat('WGS84: ', lat, '°, ', long, '°')`
      },
      timePrimitive: {
        modelDefinition: InfTimePrimitive.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.time_primitive',
        classFk: 'fk_class',
        createLabelSql: `'todo'`
      },
      resource: {
        modelDefinition: InfResource.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.resource',
        classFk: 'fk_class',
        createLabelSql: `null`
      },
      entityPreview: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        createLabelSql: `'todo'`,
        projectFk: 'fk_project'
      }
    }

  }



  async query(req: GvFieldPageReq): Promise<GvPaginationObject> {



    this.createSql(req);

    // const t2 = performance.now()
    const p = await this.execute<{data: GvSubfieldPageInfo}[]>()
    // const t3 = performance.now()
    // console.log(`Call to QFieldPage3 executeSql, prop ${req.page.property.fkProperty}, chars: ${this.sql.length} took ms `, t3 - t2)

    return {subfieldPages: p.map(x => x.data)}
  }

  async queryFields(reqs: GvFieldPageReq[], sourceEntities: GvFieldSourceEntity[]): Promise<GvPaginationObject> {
    // const t0 = performance.now()
    this.mainSql(reqs.map(req => this.transformReq(req)), {sourceEntities});
    // const t1 = performance.now()
    // console.log(`Call to QFieldPage3 queryFields->mainSql, took ms `, t1 - t0)
    logSql(this.sql, this.params, 'qfields-')

    // const t2 = performance.now()
    const p = await this.execute<{data: GvSubfieldPageInfo}[]>()
    // const t3 = performance.now()
    // console.log(`Call to QFieldPage3 executeSql, ${reqs.length} props, chars: ${this.sql.length} took ms `, t3 - t2)

    return {subfieldPages: p.map(x => x.data)}
  }




  createSql(req: GvFieldPageReq) {
    // const t0 = performance.now()

    const directedProps = [this.transformReq(req)]
    const source: Source = {
      sourceEntities: [req.page.source]
    }
    this.mainSql(directedProps, source)

    // const t1 = performance.now()
    // console.log(`Call to QFieldPage3 createSql, prop ${req.page.property.fkProperty} took ms `, t1 - t0)

  }
  mainSql(directedProps: DirectedProperty[], source: Source, isNested = false) {

    // ONE SOURCE
    const sourceSubquery = this.sourceSubquery(source)

    // MANY PROPS
    const joinSubquery = this.joinSubquery(sourceSubquery.tw, directedProps,)
    const finalSelecSpecs = transformFinalSpecs(directedProps)
    const pageInfoSubquery = this.pageInfoSubquery(
      sourceSubquery.tw,
      joinSubquery.tw,
      finalSelecSpecs,
      isNested
    )
    const finalSelect = this.finalSelectQuery()

    this.sql = `
      WITH
      ${sourceSubquery.sql},
      ${joinSubquery.sql},
      ${pageInfoSubquery.sql}
      ${finalSelect}
    `;
    // logSql(this.sql, this.params)


  }

  /**
   * creates sql that selects the source entity,
   * to which we join statements.
   *
   * The source can be
   * - another table of entities, for which we then need the source class to
   *   filter these source entities. This is defined in Source[fkClass]
   * - or a specific entity. in this case we don't need a source class, since
   *   it is given by the entity referenced in Source[sourceEntity]
   *
   *
   */
  sourceSubquery(source: Source) {

    const tw = this.nextWith;

    if (source.sourceTable) {
      // TODO left source table
      const sql = `
      ${tw} AS (
          SELECT fk_target as pk_entity
          FROM ${source.sourceTable.tw}
        )
        `
      return {sql, tw}
    }
    else if (source.sourceEntities) {

      const entities = source?.sourceEntities
      if (entities) {
        const selects = entities.map(entity => {
          const pk = entity?.fkInfo ?? entity.fkData ?? entity.fkTablesCell ?? entity.fkTablesRow;
          return `SELECT ${this.addParam(pk)}::int as pk_entity`
        }).join('\n UNION ALL \n')

        const sql = `
        ${tw} AS (
            ${selects}
          )
          `
        return {sql, tw}
      }
    }
    throw new Error('no source specified implemented')

  }
  joinSubquery(
    sourceTw: string,
    directedProps: DirectedProperty[],
  ) {
    const tw = this.nextWith


    const joinStatementsOfProperty = directedProps
      .map(directedProp => this.joinStatementsOfProperty(directedProp))
      .join('\n UNION ALL \n')

    const sql = `
    -- join statements with target
    ${tw} AS (
      SELECT
        t2.fk_source,
        t2.fk_property,
        t2.fk_property_of_property,
        t2.is_outgoing,
        COALESCE(jsonb_agg(t2.stmt_with_target) FILTER (WHERE t2.stmt_with_target IS NOT NULL), '[]'::jsonb) paginatedStatements,
        jsonb_agg(t2."data") FILTER (WHERE t2."data" IS NOT NULL) nested,
        t2.count
      FROM
       ${sourceTw} t1 -- entities
      JOIN LATERAL (
        -- join statements
        ${joinStatementsOfProperty}
      ) AS t2 ON t1.pk_entity = t2.fk_source
      GROUP BY
        fk_source,
        fk_property,
        fk_property_of_property,
        is_outgoing,
        count
    )
    `

    this.pageInfoNestedTws.push(tw)

    return {sql, tw}
  }



  joinStatementsOfProperty(
    directedProperty: DirectedProperty,

  ) {
    const property = directedProperty.property
    const scope = directedProperty.scope
    const limit = directedProperty.limit
    const offset = directedProperty.offset
    const isOutgoing = directedProperty.isOutgoing
    const constraints = directedProperty.constraints

    const statementsWithTarget = constraints
      .map(constraint => this.joinStatementsOfPropertertySourceAndTarget(
        scope,
        property,
        isOutgoing,
        constraint
      ))
      .join('\n UNION \n')

    const sql = `
    (
     WITH paginatedStmtWithTarget AS (
        -- join entity with statements on property  ${isOutgoing ? 'outgoing' : 'incoming'} ${property.fkProperty}
        WITH allStmts AS (
          ${statementsWithTarget}
        )
        SELECT
          t1.pk_entity as fk_source,
          ${this.addParam(property.fkProperty ?? 0)} as fk_property,
          ${this.addParam(property.fkPropertyOfProperty ?? 0)} as fk_property_of_property,
          ${this.addParam(isOutgoing)}::boolean as is_outgoing,
          filteredStmts.fk_target,
          filteredStmts.stmt_with_target,
          c.count
        FROM (
            TABLE allStmts
            -- WHERE stmt_with_target->'targetLabel' %ilike 'foo'
            LIMIT ${this.addParam(limit)}
            OFFSET ${this.addParam(offset)}
          ) AS filteredStmts
        RIGHT  JOIN (SELECT count(*) FROM allStmts) AS c(count) ON true
      )

      ${this.joinNestedRequestsSql(directedProperty.nestedReqs)}
    )
    `

    return sql
  }


  joinNestedRequestsSql(nestedReqs?: NestedRequest[]): string {

    if (!nestedReqs?.length || !this.joinNestedInSql) {
      return `
      SELECT
        *,
        NULL::jsonb AS "data",
	  		paginatedStmtWithTarget.fk_target AS "x"
      FROM paginatedStmtWithTarget
      `
    }

    const nestedReqsSql = nestedReqs.map(n => this.joinNestedRequestSql(n)).join('\nUNION ALL\n')
    return `
      SELECT *
      FROM paginatedStmtWithTarget

      -- left join nested
      LEFT JOIN LATERAL (
        ${nestedReqsSql}
      ) AS "data" ON "data".pk_entity= paginatedStmtWithTarget.fk_target

    `


  }
  joinNestedRequestSql(d: NestedRequest): string {

    const source: Source = {
      sourceTable: {
        tw: 'paginatedStmtWithTarget',
        sourceClass: d.sourceTable?.sourceClass
      }
    }
    const nQ = new QFieldPage3(this.dataSource)
    nQ.paramsOffset = this.params.length
    nQ.mainSql(d.directedProps, source, true)
    this.params.push(...nQ.params)
    const nestedSql = nQ.sql;

    const sql = `
    ------- Join Nested Fields
     ( ${nestedSql} )
   `
    return sql
  }

  joinStatementsOfPropertertySourceAndTarget(
    scope: GvFieldPageScope,
    property: GvFieldProperty,
    isOutgoing: boolean,
    contraint: PropertyConstraint
  ): string {
    const sourceModel = this.modelConfig.resource
    const statementSourceFk = getSourceFk(isOutgoing, sourceModel)
    const statementTargetFk = getTargetFk(isOutgoing, sourceModel)
    const propertyFk = property.fkProperty ? 'fk_property' : 'fk_property_of_property'
    const propertyId = property.fkProperty ?? property.fkPropertyOfProperty;
    const target = this.joinTargetOfStatement(isOutgoing, scope, contraint.resTargetKey, contraint.targetClasses, 't2', 't3')

    const joinProjRels = () => `
    -- join project rels
    INNER JOIN projects.info_proj_rel t3
    ON
      t2.pk_entity = t3.fk_entity
    AND
      t3.fk_project = ${this.addParam(scope.inProject)}
    AND
      t3.is_in_project = true`

    const sql = `
    -- select source, statement and target
    SELECT
      t1.pk_entity as fk_source,
      t2.${statementTargetFk} as fk_target,
      t2.fk_property,
      t2.fk_property_of_property,
      jsonb_strip_nulls(jsonb_build_object(
        'isOutgoing', ${this.addParam(isOutgoing)}::boolean,
        ${scope.inProject ? `
        'projRel',     ${this.createBuildObject('t3', ProInfoProjRel.definition)},
        'ordNum',       ${isOutgoing ? `t3.ord_num_of_range` : `t3.ord_num_of_domain`},
      ` : ''}
        'statement',   ${this.createBuildObject('t2', InfStatement.definition)},
        'target',      ${target.selectTarget},
        'targetLabel', ${target.selectTargetLabel},
        'targetClass', ${target.selectTargetClass}
      )) AS stmt_with_target
    FROM	information.v_statement t2

    ${scope.inProject ? joinProjRels() : ''}

    -- join target
    JOIN LATERAL (
      ${target.join}
    ) target on true

    WHERE
      -- join source entity with statement
      t1.pk_entity = t2.${statementSourceFk}
    ${contraint.sourceClass ? `
    AND
      -- where source class is ok
      t1.fk_class = ${this.addParam(contraint.sourceClass)} ` : ''
      }
    AND
      -- where statement property is ok
      t2.${propertyFk} = ${this.addParam(propertyId)}


    ${scope.inRepo || scope.notInProject ? `
    AND
      -- where stmt is in at least one project
      t2.is_in_project_count > 0 `: ''}

    ${scope.notInProject ? `
    AND
      -- where stmt is not in the project
      t2.pk_entity NOT IN (
        SELECT t4.pk_entity
        FROM information.statement t4,
             projects.info_proj_rel t5
        WHERE
          t1.pk_entity = t4.${statementSourceFk}
        AND
          t4.${propertyFk} = ${this.addParam(propertyId)}
        AND
          t4.pk_entity = t5.fk_entity
        AND
          t5.fk_project = ${this.addParam(scope.notInProject)}
        AND
          t5.is_in_project = true

      ) `: ''}
    `

    return sql
  }


  /*****************************************************************************
   * JOIN TARGET ->>>
   *****************************************************************************/

  joinTargetOfStatement(
    isOutgoing: boolean,
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey,
    targetClasses: number[],
    tStatements: string,
    tProjRel: string,
  ): JoinTargetSqls {

    const sqls: JoinTargetSqls[] = []

    const modelKey = this.resTargetModelMap[resTargetKey]
    const modelConfig = this.modelConfig[modelKey]
    if (!modelConfig) throw new Error("This resTargetKey is not implemented: " + resTargetKey);
    if (resTargetKey === 'dimension') {
      sqls.push(this.joinTargetDimension(isOutgoing, tStatements, modelConfig, resTargetKey));
    }
    else if (resTargetKey === 'langString') {
      sqls.push(this.joinTargetLangString(isOutgoing, tStatements, modelConfig, resTargetKey));
    }
    else if (resTargetKey === 'timePrimitive') {
      sqls.push(this.joinTargetTimePrimitive(isOutgoing, tStatements, modelConfig, resTargetKey, tProjRel, scope));
    }
    else if (resTargetKey === 'entity') {
      sqls.push(this.joinTargetEntity(isOutgoing, tStatements, scope, resTargetKey));
    }
    else {
      sqls.push(this.joinTargetSimple(isOutgoing, tStatements, modelConfig, resTargetKey, targetClasses))
    }



    const join = sqls.map(j => j.join).join(' \n ')
    const selectTarget = `
    jsonb_strip_nulls(jsonb_build_object(
        ${sqls.map(s => s.selectTarget).join(',\n ')}
    )) `
    const selectTargetLabel = `concat_ws(' ', ${sqls.map(s => s.selectTargetLabel).join(', ')}) `
    const selectTargetClass = `COALESCE(${sqls.map(s => s.selectTargetClass).join(', ')}) `


    return {join, selectTarget, selectTargetLabel, selectTargetClass}
  }

  private joinTargetSimple(
    isOutgoing: boolean,
    tStatements: string,
    spec: ModelConfig,
    resTargetKey: ResTargetKey,
    targetClasses: number[]
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = 'target'

    const join = `
         -- ${tableName}
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              ${this.createBuildObject('x', modelDefinition)} obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
            AND x.${classFk} IN (${this.addParams(targetClasses)})
      `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }


  private joinTargetDimension(
    isOutgoing: boolean,
    tStatements: string,
    spec: ModelConfig,
    resTargetKey: ResTargetKey
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = 'target'

    const join = `
         -- ${tableName}
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              json_strip_nulls(json_build_object(
                'dimension', ${this.createBuildObject('x', modelDefinition)},
                'unitPreview', ${this.createBuildObject('u', this.modelConfig.entityPreview.modelDefinition)}
              )) obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x,
              ${this.modelConfig.entityPreview.tableName} u
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
            AND x.fk_measurement_unit = u.${this.modelConfig.entityPreview.modelPk}
      `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }

  private joinTargetLangString(
    isOutgoing: boolean,
    tStatements: string,
    spec: ModelConfig,
    resTargetKey: ResTargetKey
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = 'target'

    const join = `
         -- ${tableName}
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              json_strip_nulls(json_build_object(
                'langString', ${this.createBuildObject('x', modelDefinition)},
                'language', ${this.createBuildObject('l', this.modelConfig.language.modelDefinition)}
              )) obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x,
              ${this.modelConfig.language.tableName} l
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
            AND x.fk_language = l.${this.modelConfig.language.modelPk}
      `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }


  private joinTargetTimePrimitive(
    isOutgoing: boolean,
    tStatements: string,
    spec: ModelConfig,
    resTargetKey: ResTargetKey,
    tProjRel: string,
    scope: GvFieldPageScope
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = 'target'

    const join = `
         -- ${tableName}
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              json_strip_nulls(json_build_object(
                'infTimePrimitive', ${this.createBuildObject('x', modelDefinition)},
                'timePrimitive', json_build_object(
                  'duration', x.duration,
                  'julianDay', x.julian_day,
                  'calendar', ${scope.inProject ?
        `             coalesce(${tProjRel}.calendar, ${tStatements}.community_favorite_calendar)` :
        `             ${tStatements}.community_favorite_calendar`}
                )
              )) obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
      `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }



  private joinTargetEntity(
    isOutgoing: boolean,
    tStatements: string,
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey,
  ): JoinTargetSqls {

    const re = this.modelConfig.resource
    const ep = this.modelConfig.entityPreview
    const tAlias = 'target'

    const join = `
         -- ${re.tableName}
            SELECT
              re.${re.modelPk} AS pk_entity,
              re.${re.classFk} AS fk_class,
              json_strip_nulls(json_build_object(
                'resource', ${this.createBuildObject('re', re.modelDefinition)},
                'entityPreview', ${scope.inProject ?
        `           COALESCE(
                      ${this.createBuildObject('ep2', ep.modelDefinition)},
                      ${this.createBuildObject('ep1', ep.modelDefinition)}
                      )` :
        `            ${this.createBuildObject('ep1', ep.modelDefinition)}`}
              )) AS obj,
              ${scope.inProject ?
        `        COALESCE(ep2.entity_label, ep1.entity_label)` :
        `        ep1.entity_label`} AS target_label
            FROM
              ${re.tableName} re
            -- community version of entity preview
            LEFT JOIN ${ep.tableName} ep1
              ON ep1.${ep.modelPk} = ${tStatements}.${isOutgoing ? ep.statementObjectFk : ep.statementSubjectFk}
              AND ep1.${ep.projectFk} IS NULL
            ${scope.inProject ?
        ` -- project version of entity preview
            LEFT JOIN ${ep.tableName} ep2
              ON ep2.${ep.modelPk} = ${tStatements}.${isOutgoing ? ep.statementObjectFk : ep.statementSubjectFk}
              AND ep2.${ep.projectFk} = ${scope.inProject}    `
        : ''
      }
            WHERE re.${re.modelPk} = ${tStatements}.${isOutgoing ? re.statementObjectFk : re.statementSubjectFk}

      `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }

  /*****************************************************************************
   * ->>> JOIN TARGET
   *****************************************************************************/


  pageInfoSubquery(
    sourceSubqueryTw: string,
    joinSubqueryTw: string,
    finalSelectSpecs: FinalSelectSpec[],
    isNested: boolean
  ) {
    const tw = this.nextWith;
    const finalSelect = finalSelectSpecs
      .map(x => this.paginationInfoPerSourceAndProperty(
        sourceSubqueryTw,
        joinSubqueryTw,
        x.property,
        x.isOutgoing,
        x.sourceClasses,
        x._req
      ))
      .join('\n UNION ALL \n')
    const sql = `
    ${tw} AS (
      -- create pagination info for each source with correct class and and property
      ${finalSelect}
    )
    `
    this.pageInfoTws.push(tw)

    return {sql, tw}
  }


  paginationInfoPerSourceAndProperty(
    sourceSubqueryTw: string,
    groupBySubqueryTw: string,
    property: GvFieldProperty,
    isOutgoing: boolean,
    sourceClasses: number[],
    req: GvFieldPageReq
  ): string {

    const sql = `
    SELECT
      jsonb_build_object (
        'validFor', now(),
        'req', jsonb_set(
                '${JSON.stringify(req)}'::jsonb,
                '{page,source,fkInfo}',
                to_jsonb(${sourceSubqueryTw}.pk_entity)
              ),
        'count', COALESCE(${groupBySubqueryTw}.count,0),
        'paginatedStatements', COALESCE(${groupBySubqueryTw}.paginatedStatements, '[]'::jsonb)
      ) "data",
			${sourceSubqueryTw}.pk_entity
    FROM ${sourceSubqueryTw}
    LEFT JOIN ${groupBySubqueryTw}
      on ${groupBySubqueryTw}.fk_source = ${sourceSubqueryTw}.pk_entity
      AND ${groupBySubqueryTw}.fk_property = ${this.addParam(property.fkProperty ?? 0)}
      AND ${groupBySubqueryTw}.fk_property_of_property = ${this.addParam(property.fkPropertyOfProperty ?? 0)}
      AND ${groupBySubqueryTw}.is_outgoing = ${this.addParam(isOutgoing)}
      ${sourceClasses.length ?
        `WHERE ${sourceSubqueryTw}.fk_class IN (${this.addParams(sourceClasses)})`
        : ''}
    `
    return sql


  }

  finalSelectQuery() {
    return [
      ...this.pageInfoTws.map(tw => `SELECT "data", pk_entity FROM ${tw}`),
      ...this.pageInfoNestedTws.map(tw => `SELECT nested as "data", fk_source as pk_entity from ${tw} WHERE nested IS NOT NULL`)
    ].join('\nUNION ALL\n')
  }

  transformReq(req: GvFieldPageReq, sourceTable?: SourceTable): DirectedProperty {
    const targets = req.targets;
    const map: {[key: string]: PropertyConstraint} = {}
    const nestedReqs: NestedRequest[] = []
    const sourceClass = sourceTable?.sourceClass

    for (const targetClassStr in targets) {
      const target = targets[targetClassStr]
      const targetClass = parseInt(targetClassStr)
      const reqTargetKey = keys(target)?.[0] as GvTargetTypeKey
      const resTargetKey = this.reqResMap[reqTargetKey]
      if (resTargetKey) {
        if (!map[resTargetKey]) {
          map[resTargetKey] = {
            sourceClass,
            resTargetKey,
            targetClasses: [targetClass]
          }
        } else {
          map[resTargetKey].targetClasses.push(targetClass)
        }
      }

      if (target?.nestedResource) {
        const reqs = transformNestedToNormalReq(req, target.nestedResource)
        const directedProps: DirectedProperty[] = reqs.map(r => this.transformReq(r, sourceTable))
        const nestedReq: NestedRequest = {
          sourceTable,
          directedProps
        }
        nestedReqs.push(nestedReq)
      }
    }
    const constraints: PropertyConstraint[] = values(map)
    const result: DirectedProperty = {
      scope: req.page.scope,
      limit: req.page.limit,
      offset: req.page.offset,
      property: req.page.property,
      isOutgoing: req.page.isOutgoing,
      constraints,
      _req: req,
      nestedReqs
    }
    return result

  }
}
function transformFinalSpecs(directedProps: DirectedProperty[]): FinalSelectSpec[] {
  return directedProps.map(d => {
    const sourceClasses: number[] = []
    d.constraints.forEach(c => {
      if (c.sourceClass) sourceClasses.push(c.sourceClass)
    })
    const s: FinalSelectSpec = {
      _req: d._req,
      property: d.property,
      isOutgoing: d.isOutgoing,
      sourceClasses
    }
    return s
  })
}



function getSourceFk(isOutgoing: boolean, sourceModel: ModelConfig) {
  return isOutgoing ? sourceModel.statementSubjectFk : sourceModel.statementObjectFk;
}


function getTargetFk(isOutgoing: boolean, sourceModel: ModelConfig) {
  return isOutgoing ? sourceModel.statementObjectFk : sourceModel.statementSubjectFk;
}


export function transformNestedToNormalReq(
  parentReq: GvFieldPageReq,
  subReqs: GvSubentitFieldPageReq[],
): GvFieldPageReq[] {
  const parentScope = parentReq.page.scope

  const pkProject = parentReq.pkProject
  // we have no source entity! instead we join a table / tw
  const source: GvFieldSourceEntity = {}

  /**
   * generate the scope of the subpages
   */
  let scope: GvFieldPageScope;
  if (parentScope.notInProject)
    scope = {inRepo: true};
  else
    scope = parentScope;

  // const promises$ = []
  const results = []
  for (const subReq of subReqs) {
    /**
     * convert GvLoadSubentitySubfieldPageReq to GvLoadSubfieldPageReq
     */
    const page: GvFieldPage = {
      ...subReq.page,
      scope,
      source
    };
    const targets = subReq.targets;
    const req: GvFieldPageReq = {
      page,
      targets,
      pkProject
    }

    results.push(req)
  }
  return results;

  // return Promise.all(promises$)
}
