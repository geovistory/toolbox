/* eslint-disable @typescript-eslint/camelcase */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Roles} from '../../components/authorization';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {GvSchemaModifier} from '../../models/gv-schema-modifier.model';
import {DatNamespaceRepository, ProClassFieldConfigRepository, ProDfhClassProjRelRepository, ProDfhProfileProjRelRepository, ProTextPropertyRepository} from '../../repositories';
import {SysSystemRelevantClassRepository} from '../../repositories/sys-system-relevant-class.repository';
import {mergeSchemaModifier} from '../../utils/helpers';
import {DfhPropertyController} from '../data-model/dfh-property.controller';
import {FindDataModelController} from '../data-model/find-data-model.controller';
import {FindProjectDataController} from '../project-data/find-project-data.controller';
import {SysConfigController} from '../sys-config.controller';

@tags('project configuration')
export class FindProjectConfigController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject('controllers.DfhPropertyController')
    public dfhPropertyController: DfhPropertyController,
    @inject('controllers.FindDataModelController')
    public dataModelController: FindDataModelController,
    @inject('controllers.SysConfigController')
    public sysConfigController: SysConfigController,
    @inject('controllers.FindProjectDataController')
    public findProjectDataController: FindProjectDataController,

    @repository(SysSystemRelevantClassRepository)
    public sysSystemRelevantClass: SysSystemRelevantClassRepository,
    @repository(DatNamespaceRepository)
    public datNamespaceRepository: DatNamespaceRepository,
    @repository(ProTextPropertyRepository)
    public proTextPropertyRepository: ProTextPropertyRepository,
    @repository(ProDfhClassProjRelRepository)
    public proDfhClassProjRelRepository: ProDfhClassProjRelRepository,
    @repository(ProDfhProfileProjRelRepository)
    public proDfhProfileProjRelRepository: ProDfhProfileProjRelRepository,
    @repository(ProClassFieldConfigRepository)
    public proClassFieldConfigRepository: ProClassFieldConfigRepository,
  ) { }


  @get('project-config/of-project', {
    responses: {
      '200': {
        description: "Get all data to initialize a project in the geovistory toolbox.",
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
  async getAllConfigsOfProject(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {

    let schemaModifier: GvSchemaModifier = {negative: {}, positive: {}}
    // const t1 = Logger.getTime()
    // const x1 = await this.dataModelController.dfhProfilesOfProject(pkProject)
    // Logger.itTook('x1', t1, `keys: ${JSON.stringify(x1.positive).length}`)

    // const t2 = Logger.getTime()
    // const x2 = await this.dataModelController.dfhClassesOfProject(pkProject)
    // Logger.itTook('x2', t2, `keys: ${JSON.stringify(x2.positive).length}`)

    // const t3 = Logger.getTime()
    // const x3 = await this.dataModelController.dfhLabelsOfProject(pkProject)
    // Logger.itTook('x3', t3, `keys: ${JSON.stringify(x3.positive).length}`)

    // const t4 = Logger.getTime()
    // const x4 = await this.dfhPropertyController.ofProject(pkProject)
    // Logger.itTook('x4', t4, `keys: ${JSON.stringify(x4.positive).length}`)
    const schemaModifiers = await Promise.all([
      this.dataModelController.dfhProfilesOfProject(pkProject),
      this.dataModelController.dfhClassesOfProject(pkProject),
      this.dataModelController.dfhLabelsOfProject(pkProject),
      this.dfhPropertyController.ofProject(pkProject)
    ])

    for (const x of schemaModifiers) {
      schemaModifier = mergeSchemaModifier(schemaModifier, x)
    }

    // add all system_relevant_classes
    const sysRelevantClasses = await this.sysSystemRelevantClass.find();
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {sys: {system_relevant_class: sysRelevantClasses}}
    })
    // add sys config
    const sysConfig = await this.sysConfigController.getSystemConfig();
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {sys: {config: [sysConfig]}}
    })
    // add all namespaces of project
    const namespaces = await this.datNamespaceRepository.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {dat: {namespace: namespaces}}
    })

    // add all textproperties of project
    const textproperties = await this.proTextPropertyRepository.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {text_property: textproperties}}
    })

    // add all proDfhClassProjRels of project
    const proDfhClassProjRels = await this.proDfhClassProjRelRepository.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {dfh_class_proj_rel: proDfhClassProjRels}}
    })


    // add all proDfhProfileProjRels of project
    const proDfhProfileProjRels = await this.proDfhProfileProjRelRepository.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {dfh_profile_proj_rel: proDfhProfileProjRels}}
    })

    // add all proClassFieldConfig of project
    const proClassFieldConfig = await this.proClassFieldConfigRepository.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {class_field_config: proClassFieldConfig}}
    })

    // add all types of project
    const schemaOb = await this.findProjectDataController.getTypesOfProject(pkProject)
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: schemaOb
    })

    return schemaModifier
  }



}

