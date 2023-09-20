import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {model, property, repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {omit} from 'ramda';
import {Roles} from '../../components/authorization/keys';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../config';
import {ProClassFieldConfig, ProDfhClassProjRel, ProEntityLabelConfig} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {ProClassFieldConfigRepository, ProDfhClassProjRelRepository} from '../../repositories';
import {ProEntityLabelConfigRepository} from '../../repositories/pro-entity-label-config.repository';


@model()
export class GetEntityLabelConfigResponse {
  @property() defaultConfig?: ProEntityLabelConfig;
  @property() customConfig?: ProEntityLabelConfig;
}


/**
 * A controller for all configurations on project level
 */
@tags('project configuration')
export class CreateProjectConfigController {
  constructor(
    @repository(ProEntityLabelConfigRepository)
    public proEntityLabelConfigRepo: ProEntityLabelConfigRepository,
    @repository(ProClassFieldConfigRepository)
    public proClassFieldConfigRepo: ProClassFieldConfigRepository,
    @repository(ProDfhClassProjRelRepository)
    public proDfhClassProjRelRepo: ProDfhClassProjRelRepository,
  ) { }



  @get('/entity-label-config', {
    description: 'Get the entity label config by class and project. This always includes the default configuration as well.',
    responses: {
      '200': {
        description: 'GET success',
        content: {'application/json': {schema: {'x-ts-type': GetEntityLabelConfigResponse}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getEntityLabelConfig(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('fkClass') fkClass: number
  ): Promise<GetEntityLabelConfigResponse> {


    const def = await this.proEntityLabelConfigRepo.findOne({
      where: {
        fk_project: {eq: PK_DEFAULT_CONFIG_PROJECT},
        fk_class: {eq: fkClass}
      }
    })

    const custom = await this.proEntityLabelConfigRepo.findOne({
      where: {
        fk_project: {eq: pkProject},
        fk_class: {eq: fkClass}
      }
    })

    return {
      customConfig: custom ?? undefined,
      defaultConfig: def ?? undefined
    }

  }


  @post('/entity-label-config', {
    description: 'Insert or update the entity label config by class and project.',
    responses: {
      '200': {
        description: 'POST success',
        content: {'application/json': {schema: {'x-ts-type': ProEntityLabelConfig}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async postEntityLabelConfig(
    @requestBody() req: ProEntityLabelConfig,
  ): Promise<ProEntityLabelConfig> {

    const proEntityLabelConfig = new ProEntityLabelConfig(omit(['pk_entity'], req))
    const existing = await this.proEntityLabelConfigRepo.findOne({
      where: {
        fk_project: {eq: req.fk_project},
        fk_class: {eq: req.fk_class}
      }
    })
    let res: ProEntityLabelConfig;
    if (existing) {
      await this.proEntityLabelConfigRepo.updateById(existing.pk_entity, proEntityLabelConfig)
      res = await this.proEntityLabelConfigRepo.findById(existing.pk_entity)
    }
    else {
      res = await this.proEntityLabelConfigRepo.create(proEntityLabelConfig)
    }
    return res
  }


  @del('/entity-label-config', {
    description: 'Delete entity label config by class and project.',
    responses: {
      '204': {
        description: 'DELETE success',
      },

    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async deleteEntityLabelConfig(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('fkClass') fkClass: number
  ): Promise<void> {

    const existing = await this.proEntityLabelConfigRepo.findOne({
      where: {
        fk_project: {eq: pkProject},
        fk_class: {eq: fkClass}
      }
    })

    if (!existing) {
      throw new HttpErrors.NotFound()
    }
    else {
      await this.proEntityLabelConfigRepo.deleteById(existing.pk_entity)
    }
  }





  @post('/upsert-class-field-configs', {
    description: 'Insert or update class field configurations.',
    responses: {
      '200': {
        description: 'POST success',
        content: {'application/json': {schema: {'x-ts-type': GvPositiveSchemaObject}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async upsertClassFieldConfigs(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(ProClassFieldConfig),
          }
        }
      },
    }) proClassFieldConfigs: ProClassFieldConfig[]
  ): Promise<GvPositiveSchemaObject> {
    const promises = proClassFieldConfigs.map(async (item) => {
      item.fk_project = pkProject;
      if (item.pk_entity) {
        await this.proClassFieldConfigRepo.updateById(item.pk_entity, item);
        const updated = await this.proClassFieldConfigRepo.findById(item.pk_entity);
        return updated
      }
      else {
        return this.proClassFieldConfigRepo.create(item)
      }
    });
    const resultingItems = await Promise.all(promises);
    return {pro: {class_field_config: resultingItems}}
  }

  @post('/upsert-poject-class-relations', {
    description: 'Insert or update project class relations.',
    responses: {
      '200': {
        description: 'POST success',
        content: {'application/json': {schema: {'x-ts-type': GvPositiveSchemaObject}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async upsertProjectClassRelations(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(ProDfhClassProjRel),
          }
        }
      },
    }) proDfhClassProjRel: ProDfhClassProjRel[]
  ): Promise<GvPositiveSchemaObject> {
    const promises = proDfhClassProjRel.map(async (item) => {
      item.fk_project = pkProject;
      // find by project and class
      const existing = await this.proDfhClassProjRelRepo.findOne({where: {fk_class: item.fk_class, fk_project: item.fk_project}})
      if (existing) {
        await this.proDfhClassProjRelRepo.updateById(existing.pk_entity, item);
        return this.proDfhClassProjRelRepo.findById(existing.pk_entity);
      }
      else {
        return this.proDfhClassProjRelRepo.create(item)
      }
    });
    const resultingItems = await Promise.all(promises);
    return {pro: {dfh_class_proj_rel: resultingItems}}
  }



}
