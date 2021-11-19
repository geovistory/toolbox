import {ModelDefinition} from '@loopback/repository';
import {keys} from 'lodash';
import {groupBy, uniq} from 'ramda';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldTargetViewType, GvPaginationObject, GvPaginationStatementFilter, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview} from '../../models';
import {GvSubfieldPageInfo} from '../../models/field-response/GvSubfieldPageInfo';
import {SatementTarget} from '../../models/field-response/SatementTarget';
import {GvFieldTargets} from '../../models/field/gv-field-targets';
import {DatObject, DfhObject, InfObject, ProObject, SysObject, WarObject} from '../../models/gv-positive-schema-object.model';
import {logSql} from '../../utils/helpers';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


type With = {
  sql: string;
  name: string;
};
type InfObjectKey = keyof InfObject;
type InfObjWiths = {[key in InfObjectKey]: string[]}
type ProObjectKey = keyof ProObject;
type ProObjWiths = {[key in ProObjectKey]: string[]}
type DatObjectKey = keyof DatObject;
type DatObjWiths = {[key in DatObjectKey]: string[]}
type WarObjectKey = keyof WarObject;
type WarObjWiths = {[key in WarObjectKey]: string[]}
type DfhObjectKey = keyof DfhObject;
type DfhObjWiths = {[key in DfhObjectKey]: string[]}
type SysObjectKey = keyof SysObject;
type SysObjWiths = {[key in SysObjectKey]: string[]}

interface ObjectWiths {
  schemas: {
    inf: InfObjWiths,
    pro: ProObjWiths,
    dat: DatObjWiths,
    war: WarObjWiths,
    dfh: DfhObjWiths,
    sys: SysObjWiths,
  }
  subfieldPages: string[];
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
  objectWith: string[],
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

// type ModelToFindClassConfig = {
//   [key in GvTargetTypeKey]: StatementTargetMeta[]
// }

interface JoinTargetSqls {
  join: string;
  selectTarget: string;
  selectTargetLabel: string;
  selectTargetClass: string;
}

// type GvFieldPageWithoutFkSource = PartialBy<GvFieldPage, 'source'>
export class QFieldPage2 extends SqlBuilderLb4Models {

  withClauses: With[] = [];
  withCount = 0
  get nextWith() {
    return 'tw' + this.withCount++
  }

  tCount = 0
  get nextT() {
    return 't_' + this.tCount++
  }


  objectWiths: ObjectWiths = {
    schemas: {
      inf: {
        statement: [],
        appellation: [],
        lang_string: [],
        language: [],
        time_primitive: [],
        place: [],
        dimension: [],

        resource: [],
      },
      dat: {
        namespace: [],
        class_column_mapping: [],
        text_property: [],
        chunk: [],
        column: [],
        digital: []
      },
      pro: {
        analysis: [],
        text_property: [],
        class_field_config: [],
        dfh_class_proj_rel: [],
        dfh_profile_proj_rel: [],
        project: [],
        info_proj_rel: [],
        table_config: [],
      },
      dfh: {
        profile: [],
        property: [],
        label: [],
        klass: []
      },
      sys: {
        config: [],
        klass: [],
        label: [],
        property: [],
        system_relevant_class: []
      },
      war: {
        entity_preview: [],
      },
    },
    subfieldPages: [],
  }

  subentityWiths = []
  reqResMap: ReqToResTargetMap;

  modelConfig: Models;

  resTargetModelMap: ResTargetModelMap

  // tableToFindOriginalItems: ModelToFindClassConfig
  constructor(
    public dataSource: Postgres1DataSource,
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
        objectWith: this.objectWiths.schemas.inf.appellation,
        createLabelSql: 'string'
      },
      language: {
        modelDefinition: InfLanguage.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.language',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.language,
        createLabelSql: 'notes'
      },
      dimension: {
        modelDefinition: InfDimension.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.dimension',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.dimension,
        createLabelSql: `concat_ws(' ', x.numeric_value, u.entity_label)`
      },
      langString: {
        modelDefinition: InfLangString.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.lang_string',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.lang_string,
        createLabelSql: `concat(x.string, ' (', l.iso6391, ')' )`
      },
      place: {
        modelDefinition: InfPlace.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.v_place',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.place,
        createLabelSql: `concat('WGS84: ', lat, '°, ', long, '°')`
      },
      timePrimitive: {
        modelDefinition: InfTimePrimitive.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.time_primitive',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.time_primitive,
        createLabelSql: `'todo'`
      },
      resource: {
        modelDefinition: InfResource.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.resource',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.resource,
        createLabelSql: `null`
      },
      entityPreview: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.war.entity_preview,
        createLabelSql: `'todo'`,
        projectFk: 'fk_project'
      }
    }
    // const configResource: StatementTargetMeta = {
    //   modelDefinition: InfResource.definition,
    //   modelPk: 'pk_entity',
    //   statementObjectFk: 'fk_object_info',
    //   statementSubjectFk: 'fk_subject_info',
    //   tableName: 'information.resource',
    //   classFk: 'fk_class',
    //   objectWith: this.objectWiths.schemas.inf.resource
    // }

    // this.tableToFindOriginalItems = {
    //   appellation: [this.config.appellation],
    //   place: [this.config.place],
    //   dimension: [this.config.dimension],
    //   langString: [this.config.langString],
    //   language: [this.config.language],
    //   nestedResource: [this.config.nestedResource],
    //   timeSpan: [this.config.timeSpan],
    //   timePrimitive: [this.config.timePrimitive],
    //   typeItem: [
    //     // list all models that can be represented by typeItem
    //     this.config.nestedResource,
    //     // configResource
    //   ],
    //   entityPreview: [
    //     // list all models that can be represented by entityPreview
    //     this.config.nestedResource,
    //     // configResource
    //   ],
    // }
  }



  async query(req: GvFieldPageReq): Promise<GvPaginationObject> {


    const select = this.createSelects(req);


    this.sql = `
      WITH
      ------------------------------------
      --- do select logic
      ------------------------------------
      ${select}

    `;

    logSql(this.sql, this.params)

    const p = await this.executeAndReturnFirstData<GvSubfieldPageInfo>()
    return {subfieldPages: [p]}
  }



  createSelects(req: GvFieldPageReq) {
    return this.createSelectForPage(req);
  }



  /**
   * Select all statements of field without limit and offset
   * this is the base for retieving the total count of the page
   * and for selecting the statement-page according to limit and offset.
   *
   * This select depends on the scope:
   * inRepo: selects all statements with is_in_project_count > 0
   * inProject: selects only statements with info_proj_rel.is_in_project=true
   * notInProject: selects all statements except for the ones inProject
   */
  private createSelectForPage(req: GvFieldPageReq) {

    const page = req.page;
    const filterObject: GvPaginationStatementFilter = {
      fk_subject_info: page.isOutgoing ? page.source.fkInfo : undefined,
      fk_object_info: page.isOutgoing ? undefined : page.source.fkInfo,
      fk_subject_data: page.isOutgoing ? page.source.fkData : undefined,
      fk_object_data: page.isOutgoing ? undefined : page.source.fkData,
      fk_subject_tables_cell: page.isOutgoing ? page.source.fkTablesCell : undefined,
      fk_object_tables_cell: page.isOutgoing ? undefined : page.source.fkTablesCell,
      fk_subject_tables_row: page.isOutgoing ? page.source.fkTablesRow : undefined,
      fk_object_tables_row: page.isOutgoing ? undefined : page.source.fkTablesRow,
      fk_property: page.property.fkProperty,
      fk_property_of_property: page.property.fkPropertyOfProperty
    };
    const scope = page.scope
    const twAllStatements = this.nextWith
    let sqlAllStatements: string;

    // inner join target already to filter on its class!
    const innerJoinTarget = this.joinTargetFilteredByClass(page, req.targets, 't1')

    if (scope.inProject) {
      // this is for scope inProject: TODO other scopes
      sqlAllStatements = `
      -- all statements
      ${twAllStatements} AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)},
        target.fk_class
        FROM
        information.v_statement t1
        INNER JOIN projects.info_proj_rel t2
        ON t1.pk_entity = t2.fk_entity
        ${innerJoinTarget}
        WHERE
        ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t2.fk_project = ${this.addParam(scope.inProject)}`,
          `t2.is_in_project = true`
        ].join(' AND ')}
        )`
    }
    else if (scope.notInProject) {
      // this is for scope inProject: TODO other scopes
      sqlAllStatements = `
        -- all statements
        ${twAllStatements} AS (
          SELECT ${this.createSelect('t1', InfStatement.definition)},
          target.fk_class
          FROM
          information.v_statement t1
          ${innerJoinTarget}
          WHERE
          ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t1.is_in_project_count > 0`
        ].join(' AND ')}
        EXCEPT
          SELECT ${this.createSelect('t1', InfStatement.definition)},
          target.fk_class
          FROM
          information.v_statement t1
          INNER JOIN projects.info_proj_rel t2
          ON t1.pk_entity = t2.fk_entity
          ${innerJoinTarget}
          WHERE
          ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t2.fk_project = ${this.addParam(scope.notInProject)}`,
          `t2.is_in_project = true`
        ].join(' AND ')}
       )`
    }
    else if (scope.inRepo) {
      sqlAllStatements = `
      -- all statements
      ${twAllStatements} AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)},
        target.fk_class
        FROM
        information.v_statement t1
        ${innerJoinTarget}
        WHERE
        ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t1.is_in_project_count > 0`
        ].join(' AND ')}
     )`
    }
    else {
      throw new Error("scope not implemented: " + JSON.stringify(scope));
    }

    return [
      sqlAllStatements,
      this.joinPage(twAllStatements, page, scope, req.targets)
    ].join(',\n')
  }


  joinTargetFilteredByClass(
    p: GvFieldPage,
    targets: GvFieldTargets,
    stmtTable: string
  ) {
    const reqTargetArray = keys(targets).map((key) => ({fkClass: key, target: keys(targets[parseInt(key)])[0] as GvTargetTypeKey}))
    const classesByTarget = groupBy((t) => t.target, reqTargetArray)
    const configs: {meta: ModelConfig, classes: number[]}[] = [];
    keys(classesByTarget).forEach((key) => {
      const resTarget = this.reqResMap[key as GvTargetTypeKey]
      const modelKey = this.resTargetModelMap[resTarget]
      const meta = this.modelConfig[modelKey]
      if (!meta) throw new Error("tableToFindClass missing for: " + key);
      const classes = classesByTarget[key].map(val => parseInt(val.fkClass))
      configs.push({meta, classes})
    })
    const join = `
    JOIN LATERAL (
      ${configs.map(config => [config.meta].map(m => `
      SELECT ${m.modelPk} pk_entity, ${m.classFk} fk_class
      FROM ${m.tableName}
      WHERE ${m.modelPk} = ${stmtTable}.${p.isOutgoing ? m.statementObjectFk : m.statementSubjectFk}
      AND ${m.classFk} IN (${this.addParams(config.classes)})
      `).join('UNION ALL \n')
    ).join('UNION ALL \n')}
    ) target ON TRUE
    `
    return join
  }

  private joinPage(
    twAllStatements: string,
    page: GvFieldPage,
    scope: GvFieldPageScope,
    targets: GvFieldTargets,
    twSource?: string
  ) {
    const sqls: string[] = []

    /**
     * counts the total number of statements (before applying limit and offset)
     */
    const twCount = this.nextWith;
    const sqlCount = `
      -- count
      ${twCount} AS (
        SELECT
        count(*)
        FROM
        ${twAllStatements}
        GROUP BY
        TRUE
      )`;
    sqls.push(sqlCount);


    /**
     * selects the page-statements by applying limit and offset
     */

    const twPageStatements = this.nextWith;
    /**
  * joins the targets of twPageStatements
  */
    const tProjRel = this.nextT;
    const target = this.joinTargetOfStatement(page, targets, twAllStatements, tProjRel)
    const sqlPaginatedStatements = `
      -- paginated statements
      ${twPageStatements} AS (
        SELECT
        ${this.createBuildObject(twAllStatements, InfStatement.definition)} as "statement",

        ${scope.inProject ? `
          ${this.createBuildObject(tProjRel, ProInfoProjRel.definition)} as "projRel",
          ${page.isOutgoing ? `${tProjRel}.ord_num_of_range` : `${tProjRel}.ord_num_of_domain`} as "ordNum",
        ` : ''}

        ${this.addParam(page.isOutgoing)}::boolean as "isOutgoing",
        ${target.selectTarget} as "target",
        ${target.selectTargetLabel} as "targetLabel",
        ${target.selectTargetClass} as "targetClass"

        FROM
        ${twAllStatements}
        ${scope.inProject ? `INNER JOIN projects.info_proj_rel ${tProjRel} ON ${twAllStatements}.pk_entity = ${tProjRel}.fk_entity` : ''}

        ${target.join}

        LIMIT ${this.addParam(page.limit)} -- add limit
        OFFSET ${this.addParam(page.offset)} -- add offset
    )`;
    sqls.push(sqlPaginatedStatements);





    /**
     * builds the GvSubfieldPageInfo object
     */
    const twPkStatementArray = this.nextWith;
    const twSubfieldPages = this.nextWith;

    const sqlGvSubfieldPageInfoObjects = `
        ${twPkStatementArray} AS (
          SELECT json_agg(json_strip_nulls(to_json(t1.*))) obj
          FROM ${twPageStatements} t1
          GROUP BY true
        )
        -- GvSubfieldPageInfo as objects

          SELECT jsonb_build_object (
            'validFor', now(),
            'page', '${JSON.stringify(page)}'::json,
            'count', COALESCE(count.count,0),
            'paginatedStatements', COALESCE(paginatedStatements.obj, '[]'::json)
            ) "data"
          FROM
          (select 0) as one_row
          LEFT JOIN ${twCount} count ON true
          LEFT JOIN ${twPkStatementArray} paginatedStatements ON TRUE
       `;
    sqls.push(sqlGvSubfieldPageInfoObjects);
    this.objectWiths.subfieldPages.push(twSubfieldPages);



    return sqls.join(',\n');
  }

  joinTargetOfStatement(page: GvFieldPage, targets: GvFieldTargets, tStatements: string, tProjRel: string): {
    join: string,
    selectTarget: string
    selectTargetLabel: string
    selectTargetClass: string
  } {

    const sqls: JoinTargetSqls[] = []
    const reqTargetArray = keys(targets).map((key) => ({fkClass: key, target: keys(targets[parseInt(key)])[0] as GvTargetTypeKey}))
    const reqTargetTypes: GvTargetTypeKey[] = uniq(reqTargetArray.map(t => t.target))
    for (const reqTargetType of reqTargetTypes) {
      const resTargetKey = this.reqResMap[reqTargetType]
      const modelKey = this.resTargetModelMap[resTargetKey]
      const modelConfig = this.modelConfig[modelKey]
      if (!modelConfig) throw new Error("This subfield type is not implemented: " + reqTargetType);
      if (resTargetKey === 'dimension') {
        sqls.push(this.joinTargetDimension(page.isOutgoing, tStatements, modelConfig, page.scope, resTargetKey));
        continue;
      }
      else if (resTargetKey === 'langString') {
        sqls.push(this.joinTargetLangString(page.isOutgoing, tStatements, modelConfig, page.scope, resTargetKey));
        continue;
      }
      else if (resTargetKey === 'timePrimitive') {
        sqls.push(this.joinTargetTimePrimitive(page.isOutgoing, tStatements, modelConfig, page.scope, resTargetKey, tProjRel));
        continue;
      }
      else if (resTargetKey === 'entity') {
        sqls.push(this.joinTargetEntity(page.isOutgoing, tStatements, page.scope, resTargetKey));
        continue;
      }

      const join = this.joinTargetSimple(page.isOutgoing, tStatements, modelConfig, page.scope, resTargetKey)
      sqls.push(join)
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
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = this.nextT
    let whereProject = ''
    if (spec.projectFk) {
      const fkProject = scope.inProject ?? scope.notInProject ?? null;
      whereProject = `AND (x.${spec.projectFk} IS NOT DISTINCT FROM ${fkProject})`
    }
    const join = `
         -- ${tableName}
        LEFT JOIN LATERAL (
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              ${this.createBuildObject('x', modelDefinition)} obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
            ${whereProject}
      ) AS ${tAlias} ON true `;

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
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = this.nextT
    let whereProject = ''
    if (spec.projectFk) {
      const fkProject = scope.inProject ?? scope.notInProject ?? null;
      whereProject = `AND (x.${spec.projectFk} IS NOT DISTINCT FROM ${fkProject})`
    }
    const join = `
         -- ${tableName}
        LEFT JOIN LATERAL (
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
            ${whereProject}
      ) AS ${tAlias} ON true `;

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
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = this.nextT
    let whereProject = ''
    if (spec.projectFk) {
      const fkProject = scope.inProject ?? scope.notInProject ?? null;
      whereProject = `AND (x.${spec.projectFk} IS NOT DISTINCT FROM ${fkProject})`
    }
    const join = `
         -- ${tableName}
        LEFT JOIN LATERAL (
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
            ${whereProject}
      ) AS ${tAlias} ON true `;

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
    scope: GvFieldPageScope,
    resTargetKey: ResTargetKey,
    tProjRel: string
  ): JoinTargetSqls {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, classFk, createLabelSql} = spec
    const tAlias = this.nextT
    let whereProject = ''
    if (spec.projectFk) {
      const fkProject = scope.inProject ?? scope.notInProject ?? null;
      whereProject = `AND (x.${spec.projectFk} IS NOT DISTINCT FROM ${fkProject})`
    }
    const join = `
         -- ${tableName}
        LEFT JOIN LATERAL (
            SELECT
              x.${modelPk} pk_entity,
              x.${classFk} fk_class,
              json_strip_nulls(json_build_object(
                'infTimePrimitive', ${this.createBuildObject('x', modelDefinition)},
                'timePrimitive', json_build_object(
                  'duration', x.duration,
                  'julianDay', x.julian_day,
                  'calendar', coalesce(${tProjRel}.calendar, ${tStatements}.community_favorite_calendar)
                )
              )) obj,
              ${createLabelSql} as target_label

            FROM
              ${tableName} x
            WHERE x.${modelPk} = ${tStatements}.${isOutgoing ? statementObjectFk : statementSubjectFk}
            ${whereProject}
      ) AS ${tAlias} ON true `;

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
    const tAlias = this.nextT

    const join = `
         -- ${re.tableName}
        LEFT JOIN LATERAL (
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

      ) AS ${tAlias} ON true `;

    return {
      join,
      selectTarget: `'${resTargetKey}', ${tAlias}.obj`,
      selectTargetLabel: `${tAlias}.target_label`,
      selectTargetClass: `${tAlias}.fk_class`,
    }
  }



  buildFinalObject(): string {
    const leftJoins: string[] = []
    const addLefJoin = (tw: string) => {
      leftJoins.push(`LEFT JOIN "${tw}" ON true`)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recursive = (object: any, prefix = ''): string => {

      const keyVals: string[] = []
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          const tw = prefix + key
          if (Array.isArray(element)) {
            if (element.length) {
              addLefJoin(tw)
              keyVals.push(`'${key}', "${tw}".json`)
            }
          }
          else {
            keyVals.push(`'${key}', ${recursive(element, tw + '_')}`)
          }
        }
      }
      return `json_strip_nulls(json_build_object(
        ${keyVals.join(',\n')}
      ))`
    }

    const buildOject = recursive(this.objectWiths)

    return `select
    ${buildOject} as data
    FROM
    (select 0 ) as one_row
    ${leftJoins.join('\n')};`
  }



  getFiltersByObject(tableAlias: string, filterObject: GvPaginationStatementFilter) {
    const filters: string[] = []
    let column: keyof GvPaginationStatementFilter;
    for (column in filterObject) {
      const value = filterObject[column];
      if (value) {
        filters.push(`${tableAlias}.${column}=${this.addParam(value)}`)
      }
    }
    return filters;
  }




}
