/* eslint-disable @typescript-eslint/camelcase */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {model, property, repository} from '@loopback/repository';
import {get, param, post, requestBody, del, HttpErrors} from '@loopback/rest';
import {Roles} from '../../components/authorization/keys';
import {ProEntityLabelConfig} from '../../models';
import {ProEntityLabelConfigRepository} from '../../repositories/pro-entity-label-config.repository';
import {omit} from 'ramda';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../config';


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
  ) {}



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



}
