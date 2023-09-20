import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Roles} from '../../components/authorization';
import {QDfhLabelsOfProject} from '../../components/query/q-dfh-labels-of-project';
import {QDfhProfilesOfProject} from '../../components/query/q-dfh-profiles-of-project';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {logAsyncPerformance} from '../../decorators/logAsyncPerformance.decorator';
import {DfhClass} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {GvSchemaModifier} from '../../models/gv-schema-modifier.model';
import {ProDfhClassProjRelRepository} from '../../repositories';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {SysConfigController} from '../backoffice/sys-config.controller';

@tags('data model')
export class FindDataModelController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject('controllers.SysConfigController')
    public sysConfigController: SysConfigController,
    @repository(ProDfhClassProjRelRepository)
    public proDfhClassProjRelRepo: ProDfhClassProjRelRepository,
  ) { }


  @get('data-model/profiles/of-project', {
    responses: {
      '200': {
        description: "Get all ontome profiles that are enabled by the given project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @logAsyncPerformance('dfhProfilesOfProject')
  async dfhProfilesOfProject(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {
    const sysConfig = await this.sysConfigController.getSystemConfig()

    const profiles = await new QDfhProfilesOfProject(this.datasource).query(pkProject, sysConfig.ontome?.requiredOntomeProfiles ?? [])
    return {positive: {dfh: {profile: profiles}}, negative: {}}
  }


  @get('data-model/classes/of-project', {
    responses: {
      '200': {
        description: "Get all classes that are selected by at least one of the profiles used by the given project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @logAsyncPerformance('dfhClassesOfProject')
  async dfhClassesOfProject(
    @param.query.number('pkProject') pkProject: number): Promise<GvSchemaModifier> {
    const sysConfig = await this.sysConfigController.getSystemConfig()

    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `
    WITH tw1 AS (
      SELECT fk_profile
      FROM projects.dfh_profile_proj_rel
      WHERE fk_project = ${q.addParam(pkProject)}
      AND enabled = true
      UNION
      SELECT DISTINCT fk_profile
      FROM unnest(ARRAY[${q.addParams(sysConfig.ontome?.requiredOntomeProfiles ?? [])}]::int[]) as fk_profile
    )
    SELECT DISTINCT ON (pk_class)
      ${q.createSelect('t3', DfhClass.definition)}
    FROM
      tw1 t1,
      data_for_history.api_class t2,
      data_for_history.v_class t3
    WHERE t1.fk_profile = t2.dfh_fk_profile
    AND t3.pk_class = t2.dfh_pk_class
    `;
    const classes = await q.execute<DfhClass[]>()
    return {positive: {dfh: {klass: classes}}, negative: {}}

  }



  @get('data-model/labels/of-project', {
    responses: {
      '200': {
        description: "Get ontome labels of classes and properties enabled by the given project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @logAsyncPerformance('dfhLabelsOfProject')
  async dfhLabelsOfProject(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {
    const sysConfig = await this.sysConfigController.getSystemConfig()

    const labels = await new QDfhLabelsOfProject(this.datasource).query(pkProject, sysConfig.ontome?.requiredOntomeProfiles ?? [])
    return {positive: {dfh: {label: labels}}, negative: {}}
  }



  @get('data-model/class-project-relations/of-project', {
    responses: {
      '200': {
        description: "Get class project relations of the project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @logAsyncPerformance('classProjectRelations')
  async classProjectRelations(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvPositiveSchemaObject> {

    const items = await this.proDfhClassProjRelRepo.find({where: {'fk_project': pkProject}})

    return {pro: {dfh_class_proj_rel: items}}
  }


}

