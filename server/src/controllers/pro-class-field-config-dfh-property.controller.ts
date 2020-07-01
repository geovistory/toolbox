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
  DfhProperty,
} from '../models';
import {ProClassFieldConfigRepository} from '../repositories';

export class ProClassFieldConfigDfhPropertyController {
  constructor(
    @repository(ProClassFieldConfigRepository) protected proClassFieldConfigRepository: ProClassFieldConfigRepository,
  ) { }

  @get('/pro-class-field-configs/{id}/dfh-property', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig has one DfhProperty',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DfhProperty),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DfhProperty>,
  ): Promise<DfhProperty> {
    return this.proClassFieldConfigRepository.property(id).get(filter);
  }

  @post('/pro-class-field-configs/{id}/dfh-property', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig model instance',
        content: {'application/json': {schema: getModelSchemaRef(DfhProperty)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProClassFieldConfig.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DfhProperty, {
            title: 'NewDfhPropertyInProClassFieldConfig',
            exclude: ['pk_property'],
            optional: ['fk_property']
          }),
        },
      },
    }) dfhProperty: Omit<DfhProperty, 'pk_property'>,
  ): Promise<DfhProperty> {
    return this.proClassFieldConfigRepository.property(id).create(dfhProperty);
  }

  @patch('/pro-class-field-configs/{id}/dfh-property', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.DfhProperty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DfhProperty, {partial: true}),
        },
      },
    })
    dfhProperty: Partial<DfhProperty>,
    @param.query.object('where', getWhereSchemaFor(DfhProperty)) where?: Where<DfhProperty>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.property(id).patch(dfhProperty, where);
  }

  @del('/pro-class-field-configs/{id}/dfh-property', {
    responses: {
      '200': {
        description: 'ProClassFieldConfig.DfhProperty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DfhProperty)) where?: Where<DfhProperty>,
  ): Promise<Count> {
    return this.proClassFieldConfigRepository.property(id).delete(where);
  }
}
