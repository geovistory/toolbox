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
  InfTemporalEntity,
  InfTextProperty,
} from '../models';
import {InfTemporalEntityRepository} from '../repositories';

export class InfTemporalEntityInfTextPropertyController {
  constructor(
    @repository(InfTemporalEntityRepository) protected infTemporalEntityRepository: InfTemporalEntityRepository,
  ) { }

  @get('/inf-temporal-entities/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'Array of InfTemporalEntity has many InfTextProperty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfTextProperty)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfTextProperty>,
  ): Promise<InfTextProperty[]> {
    return this.infTemporalEntityRepository.text_properties(id).find(filter);
  }

  @post('/inf-temporal-entities/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfTemporalEntity model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfTextProperty)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfTemporalEntity.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfTextProperty, {
            title: 'NewInfTextPropertyInInfTemporalEntity',
            exclude: ['pk_entity'],
            optional: ['fk_concerned_entity']
          }),
        },
      },
    }) infTextProperty: Omit<InfTextProperty, 'pk_entity'>,
  ): Promise<InfTextProperty> {
    return this.infTemporalEntityRepository.text_properties(id).create(infTextProperty);
  }

  @patch('/inf-temporal-entities/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfTemporalEntity.InfTextProperty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfTextProperty, {partial: true}),
        },
      },
    })
    infTextProperty: Partial<InfTextProperty>,
    @param.query.object('where', getWhereSchemaFor(InfTextProperty)) where?: Where<InfTextProperty>,
  ): Promise<Count> {
    return this.infTemporalEntityRepository.text_properties(id).patch(infTextProperty, where);
  }

  @del('/inf-temporal-entities/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfTemporalEntity.InfTextProperty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfTextProperty)) where?: Where<InfTextProperty>,
  ): Promise<Count> {
    return this.infTemporalEntityRepository.text_properties(id).delete(where);
  }
}
