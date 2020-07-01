import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProClassFieldConfig,
  ProProject,
} from '../models';
import {ProClassFieldConfigRepository} from '../repositories';

export class ProClassFieldConfigProProjectController {
  constructor(
    @repository(ProClassFieldConfigRepository) protected proClassFieldConfigRepository: ProClassFieldConfigRepository,
  ) { }

  @get('/pro-class-field-configs/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig has one ProProject',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProProject),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProProject>,
  ): Promise<ProProject> {
    return this.proClassFieldConfigRepository.project(id).get(filter);
  }

  @post('/pro-class-field-configs/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProProject)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProClassFieldConfig.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProProject, {
            title: 'NewProProjectInProClassFieldConfig',
            exclude: ['pk_entity'],
            optional: ['fk_project']
          }),
        },
      },
    }) proProject: Omit<ProProject, 'pk_entity'>,
  ): Promise<ProProject> {
    return this.proClassFieldConfigRepository.project(id).create(proProject);
  }

  @patch('/pro-class-field-configs/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.ProProject PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProProject, {partial: true}),
        },
      },
    })
    proProject: Partial<ProProject>,
    @param.query.object('where', getWhereSchemaFor(ProProject)) where?: Where<ProProject>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.project(id).patch(proProject, where);
  }

  @del('/pro-class-field-configs/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.ProProject DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProProject)) where?: Where<ProProject>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.project(id).delete(where);
  }
}
