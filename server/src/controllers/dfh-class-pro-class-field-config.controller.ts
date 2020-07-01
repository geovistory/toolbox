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
  DfhClass,
  ProClassFieldConfig,
} from '../models';
import {DfhClassRepository} from '../repositories';

export class DfhClassProClassFieldConfigController {
  constructor(
    @repository(DfhClassRepository) protected dfhClassRepository: DfhClassRepository,
  ) { }

  @get('/dfh-classes/{id}/pro-class-field-configs', {
    responses: {
      '200': {
        description: 'Array of DfhClass has many ProClassFieldConfig',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProClassFieldConfig)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProClassFieldConfig>,
  ): Promise<ProClassFieldConfig[]> {
    return this.dfhClassRepository.class_field_configs(id).find(filter);
  }

  @post('/dfh-classes/{id}/pro-class-field-configs', {
    responses: {
      '200': {
        description: 'DfhClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProClassFieldConfig)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DfhClass.prototype.pk_class,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProClassFieldConfig, {
            title: 'NewProClassFieldConfigInDfhClass',
            exclude: ['pk_entity'],
            optional: ['fk_class_for_class_field']
          }),
        },
      },
    }) proClassFieldConfig: Omit<ProClassFieldConfig, 'pk_entity'>,
  ): Promise<ProClassFieldConfig> {
    return this.dfhClassRepository.class_field_configs(id).create(proClassFieldConfig);
  }

  @patch('/dfh-classes/{id}/pro-class-field-configs', {
    responses: {
      '200': {
        description: 'DfhClass.ProClassFieldConfig PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProClassFieldConfig, {partial: true}),
        },
      },
    })
    proClassFieldConfig: Partial<ProClassFieldConfig>,
    @param.query.object('where', getWhereSchemaFor(ProClassFieldConfig)) where?: Where<ProClassFieldConfig>,
  ): Promise<Count> {
    return this.dfhClassRepository.class_field_configs(id).patch(proClassFieldConfig, where);
  }

  @del('/dfh-classes/{id}/pro-class-field-configs', {
    responses: {
      '200': {
        description: 'DfhClass.ProClassFieldConfig DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProClassFieldConfig)) where?: Where<ProClassFieldConfig>,
  ): Promise<Count> {
    return this.dfhClassRepository.class_field_configs(id).delete(where);
  }
}
