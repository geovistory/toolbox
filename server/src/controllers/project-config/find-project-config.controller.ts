import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {get, HttpErrors, param} from '@loopback/rest';
import {uniq} from 'ramda';
import {Roles} from '../../components/authorization';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_1_LABEL, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_1_URL, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_2_LABEL, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_2_URL, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_DESCRIPTION, PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_LABEL} from '../../config';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {logAsyncPerformance} from '../../decorators/logAsyncPerformance.decorator';
import {GvSchemaModifier} from '../../models/gv-schema-modifier.model';
import {InfLanguage} from '../../models/inf-language.model';
import {DatNamespaceRepository, InfLanguageRepository, ProClassFieldConfigRepository, ProDfhClassProjRelRepository, ProDfhProfileProjRelRepository, ProProjectRepository, ProTextPropertyRepository} from '../../repositories';
import {SysSystemRelevantClassRepository} from '../../repositories/sys-system-relevant-class.repository';
import {mergeSchemaModifier} from '../../utils/helpers';
import {SysConfigController} from '../backoffice/sys-config.controller';
import {DfhPropertyController} from '../data-model/dfh-property.controller';
import {FindDataModelController} from '../data-model/find-data-model.controller';
import {FindProjectDataController} from '../project-data/find-project-data.controller';

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
    @repository(InfLanguageRepository)
    public infLanguageRepo: InfLanguageRepository,
    @repository(SysSystemRelevantClassRepository)
    public sysSystemRelevantClassRepo: SysSystemRelevantClassRepository,
    @repository(DatNamespaceRepository)
    public datNamespaceRepo: DatNamespaceRepository,
    @repository(ProProjectRepository)
    public proProjectRepo: ProProjectRepository,
    @repository(ProTextPropertyRepository)
    public proTextPropertyRepo: ProTextPropertyRepository,
    @repository(ProDfhClassProjRelRepository)
    public proDfhClassProjRelRepo: ProDfhClassProjRelRepository,
    @repository(ProDfhProfileProjRelRepository)
    public proDfhProfileProjRelRepo: ProDfhProfileProjRelRepository,
    @repository(ProClassFieldConfigRepository)
    public proClassFieldConfigRepo: ProClassFieldConfigRepository,
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
  @logAsyncPerformance('getAllConfigsOfProject')
  async getAllConfigsOfProject(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {

    let schemaModifier: GvSchemaModifier = {negative: {}, positive: {}}

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
    const sysRelevantClasses = await this.sysSystemRelevantClassRepo.find();
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {sys: {system_relevant_class: sysRelevantClasses}}
    })
    // add sys config
    const sysConfig = await this.sysConfigController.getSystemConfig();
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {sys: {config: [sysConfig]}}
    })
    // add all namespaces of project
    const namespaces = await this.datNamespaceRepo.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {dat: {namespace: namespaces}}
    })

    // find default language of project
    const project = await this.proProjectRepo.findById(pkProject)
    if (!project) throw new HttpErrors.NotFound(`Project with id ${pkProject} not found.`);


    // add all textproperties...
    const textproperties = await this.proTextPropertyRepo.find({
      where: {
        or: [
          {fk_project: pkProject}, // ...of project, and
          {
            fk_project: PK_DEFAULT_CONFIG_PROJECT, // ...of default config project...
            or: [
              {fk_language: PK_ENGLISH}, // ...in english, and
              {fk_language: project.fk_language} // in the language of the project
            ]
          }
        ]
      }
    });
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {text_property: textproperties}}
    })

    // add all languages needed by the textproperties
    const pkLangs = uniq(textproperties.map(t => t.fk_language).filter(fkLanguage => !!fkLanguage))
    if (pkLangs.length) {
      const languages = await this.infLanguageRepo.find({where: {pk_entity: {inq: pkLangs}}});
      schemaModifier = mergeSchemaModifier(schemaModifier, {
        positive: {inf: {language: languages}}
      })
    }

    // add all proDfhClassProjRels of project
    const proDfhClassProjRels = await this.proDfhClassProjRelRepo.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {dfh_class_proj_rel: proDfhClassProjRels}}
    })


    // add all proDfhProfileProjRels of project
    const proDfhProfileProjRels = await this.proDfhProfileProjRelRepo.find({where: {fk_project: pkProject}});
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {dfh_profile_proj_rel: proDfhProfileProjRels}}
    })

    // add all proClassFieldConfig of project and default config project
    const proClassFieldConfig = await this.proClassFieldConfigRepo.find({
      where: {
        fk_project: {
          inq: [
            pkProject,
            PK_DEFAULT_CONFIG_PROJECT
          ]
        }
      }
    });
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: {pro: {class_field_config: proClassFieldConfig}}
    })

    // add all types of project
    const schemaOb = await this.findProjectDataController.getTypesOfProject(pkProject)
    schemaModifier = mergeSchemaModifier(schemaModifier, {
      positive: schemaOb
    })

    // add all platform vocabularies
    if (sysConfig.platformVocabularies)
      for (const pv of sysConfig.platformVocabularies) {
        const platformVocabularies = await this.findProjectDataController
          .getPlatformVocabularyInstances(pv.projectId, pv.parentOrAncestorClassId)
        schemaModifier = mergeSchemaModifier(schemaModifier, {
          positive: platformVocabularies
        })
      }

    return schemaModifier
  }



  @get('project-config/get-basics', {
    responses: {
      '200': {
        description: "Get label and description of the project.",
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
  @logAsyncPerformance('getBasics')
  async getBasics(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {

    // find default language of project
    const project = await this.proProjectRepo.findById(pkProject)
    if (!project) throw new HttpErrors.NotFound(`Project with id ${pkProject} not found.`);

    // add descriptions and labels about the project...
    const textproperties = await this.proTextPropertyRepo.find({
      where: {
        and: [
          {fk_project: pkProject}, // ...of project, and
          {fk_pro_project: pkProject}, // ...about project...
          {
            fk_system_type: {
              inq: [
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_LABEL,
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_DESCRIPTION,
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_1_LABEL,
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_1_URL,
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_2_LABEL,
                PK_SYSTEM_TYPE_PRO_TEXT_PROPERTY_BTN_2_URL,
              ]
            }
          }
        ]
      }
    });

    // add all languages needed by the textproperties and the project
    const pkLangs = uniq(
      [
        ...textproperties.map(t => t.fk_language).filter(fkLanguage => !!fkLanguage),
        project.fk_language
      ])
    let languages: InfLanguage[] = []
    if (pkLangs.length) {
      languages = await this.infLanguageRepo.find({where: {pk_entity: {inq: pkLangs}}});
    }

    return {
      negative: {},
      positive: {
        pro: {
          project: [project],
          text_property: textproperties
        },
        inf: {language: languages}
      }
    }
  }
}

