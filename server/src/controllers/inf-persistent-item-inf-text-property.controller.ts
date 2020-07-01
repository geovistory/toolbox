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
  InfPersistentItem,
  InfTextProperty,
} from '../models';
import {InfPersistentItemRepository} from '../repositories';

export class InfPersistentItemInfTextPropertyController {
  constructor(
    @repository(InfPersistentItemRepository) protected infPersistentItemRepository: InfPersistentItemRepository,
  ) { }

  @get('/inf-persistent-items/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'Array of InfPersistentItem has many InfTextProperty',
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
    return this.infPersistentItemRepository.text_properties(id).find(filter);
  }

  @post('/inf-persistent-items/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfPersistentItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfTextProperty)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfPersistentItem.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfTextProperty, {
            title: 'NewInfTextPropertyInInfPersistentItem',
            exclude: ['pk_entity'],
            optional: ['fk_concerned_entity']
          }),
        },
      },
    }) infTextProperty: Omit<InfTextProperty, 'pk_entity'>,
  ): Promise<InfTextProperty> {
    return this.infPersistentItemRepository.text_properties(id).create(infTextProperty);
  }

  @patch('/inf-persistent-items/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfPersistentItem.InfTextProperty PATCH success count',
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
    return this.infPersistentItemRepository.text_properties(id).patch(infTextProperty, where);
  }

  @del('/inf-persistent-items/{id}/inf-text-properties', {
    responses: {
      '200': {
        description: 'InfPersistentItem.InfTextProperty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfTextProperty)) where?: Where<InfTextProperty>,
  ): Promise<Count> {
    return this.infPersistentItemRepository.text_properties(id).delete(where);
  }
}
