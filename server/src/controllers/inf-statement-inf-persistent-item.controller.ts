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
  InfStatement,
  InfPersistentItem,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfPersistentItemController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfStatement has one InfPersistentItem',
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
    return this.infStatementRepository.subject_persistent_item(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfPersistentItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPersistentItem, {
            title: 'NewInfPersistentItemInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_subject_info']
          }),
        },
      },
    }) infPersistentItem: Omit<InfPersistentItem, 'pk_entity'>,
  ): Promise<InfPersistentItem> {
    return this.infStatementRepository.subject_persistent_item(id).create(infPersistentItem);
  }

  @patch('/inf-statements/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfStatement.InfPersistentItem PATCH success count',
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
    return this.infStatementRepository.subject_persistent_item(id).patch(infPersistentItem, where);
  }

  @del('/inf-statements/{id}/inf-persistent-item', {
    responses: {
      '200': {
        description: 'InfStatement.InfPersistentItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfPersistentItem)) where?: Where<InfPersistentItem>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_persistent_item(id).delete(where);
  }
}
