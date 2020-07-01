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
  SysClassField,
} from '../models';
import {ProClassFieldConfigRepository} from '../repositories';

export class ProClassFieldConfigSysClassFieldController {
  constructor(
    @repository(ProClassFieldConfigRepository) protected proClassFieldConfigRepository: ProClassFieldConfigRepository,
  ) { }

  @get('/pro-class-field-configs/{id}/sys-class-field', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig has one SysClassField',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SysClassField),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SysClassField>,
  ): Promise<SysClassField> {
    return this.proClassFieldConfigRepository.class_field(id).get(filter);
  }

  @post('/pro-class-field-configs/{id}/sys-class-field', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig model instance',
        content: {'application/json': {schema: getModelSchemaRef(SysClassField)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProClassFieldConfig.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SysClassField, {
            title: 'NewSysClassFieldInProClassFieldConfig',
            exclude: ['pk_entity'],
            optional: ['fk_class_field']
          }),
        },
      },
    }) sysClassField: Omit<SysClassField, 'pk_entity'>,
  ): Promise<SysClassField> {
    return this.proClassFieldConfigRepository.class_field(id).create(sysClassField);
  }

  @patch('/pro-class-field-configs/{id}/sys-class-field', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.SysClassField PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SysClassField, {partial: true}),
        },
      },
    })
    sysClassField: Partial<SysClassField>,
    @param.query.object('where', getWhereSchemaFor(SysClassField)) where?: Where<SysClassField>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.class_field(id).patch(sysClassField, where);
  }

  @del('/pro-class-field-configs/{id}/sys-class-field', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.SysClassField DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SysClassField)) where?: Where<SysClassField>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.class_field(id).delete(where);
  }
}
