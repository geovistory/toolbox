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
  InfPersistentItem,
} from '../models';
import {InfTextPropertyRepository} from '../repositories';

export class InfTextPropertyInfPersistentItemController {
  constructor(
    @repository(InfTextPropertyRepository) protected infTextPropertyRepository: InfTextPropertyRepository,
  ) { }

  @get('/inf-text-properties/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfTextProperty has one InfPersistentItem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfPersistentItem),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfPersistentItem>,
  ): Promise<InfPersistentItem> {
    return this.infTextPropertyRepository.persistent_item(id).get(filter);
  }

  @post('/inf-text-properties/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfTextProperty model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfPersistentItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfTextProperty.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPersistentItem, {
            title: 'NewInfPersistentItemInInfTextProperty',
            exclude: ['pk_entity'],
            optional: ['fk_concerned_entity']
          }),
        },
      },
    }) infPersistentItem: Omit<InfPersistentItem, 'pk_entity'>,
  ): Promise<InfPersistentItem> {
    return this.infTextPropertyRepository.persistent_item(id).create(infPersistentItem);
  }

  @patch('/inf-text-properties/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfPersistentItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPersistentItem, {partial: true}),
        },
      },
    })
    infPersistentItem: Partial<InfPersistentItem>,
    @param.query.object('where', getWhereSchemaFor(InfPersistentItem)) where?: Where<InfPersistentItem>,
  ): Promise<Count> {
    return this.infTextPropertyRepository.persistent_item(id).patch(infPersistentItem, where);
  }

  @del('/inf-text-properties/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfPersistentItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfPersistentItem)) where?: Where<InfPersistentItem>,
  ): Promise<Count> {
    return this.infTextPropertyRepository.persistent_item(id).delete(where);
  }
}
