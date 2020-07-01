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
  InfTextProperty,
  InfTemporalEntity,
} from '../models';
import {InfTextPropertyRepository} from '../repositories';

export class InfTextPropertyInfTemporalEntityController {
  constructor(
    @repository(InfTextPropertyRepository) protected infTextPropertyRepository: InfTextPropertyRepository,
  ) { }

  @get('/inf-text-properties/{id}/inf-temporal-entity', {
    responses: {
      '200': {
        description: 'InfTextProperty has one InfTemporalEntity',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfTemporalEntity),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfTemporalEntity>,
  ): Promise<InfTemporalEntity> {
    return this.infTextPropertyRepository.temporal_entity(id).get(filter);
  }

  @post('/inf-text-properties/{id}/inf-temporal-entity', {
    responses: {
      '200': {
        description: 'InfTextProperty model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfTemporalEntity)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfTextProperty.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfTemporalEntity, {
            title: 'NewInfTemporalEntityInInfTextProperty',
            exclude: ['pk_entity'],
            optional: ['fk_concerned_entity']
          }),
        },
      },
    }) infTemporalEntity: Omit<InfTemporalEntity, 'pk_entity'>,
  ): Promise<InfTemporalEntity> {
    return this.infTextPropertyRepository.temporal_entity(id).create(infTemporalEntity);
  }

  @patch('/inf-text-properties/{id}/inf-temporal-entity', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfTemporalEntity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfTemporalEntity, {partial: true}),
        },
      },
    })
    infTemporalEntity: Partial<InfTemporalEntity>,
    @param.query.object('where', getWhereSchemaFor(InfTemporalEntity)) where?: Where<InfTemporalEntity>,
  ): Promise<Count> {
    return this.infTextPropertyRepository.temporal_entity(id).patch(infTemporalEntity, where);
  }

  @del('/inf-text-properties/{id}/inf-temporal-entity', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfTemporalEntity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfTemporalEntity)) where?: Where<InfTemporalEntity>,
  ): Promise<Count> {
    return this.infTextPropertyRepository.temporal_entity(id).delete(where);
  }
}
