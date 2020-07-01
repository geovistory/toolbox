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
  InfStatement,
} from '../models';
import {InfPersistentItemRepository} from '../repositories';

export class InfPersistentItemInfStatementController {
  constructor(
    @repository(InfPersistentItemRepository) protected infPersistentItemRepository: InfPersistentItemRepository,
  ) { }

  @get('/inf-persistent-items/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'Array of InfPersistentItem has many InfStatement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfStatement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfStatement>,
  ): Promise<InfStatement[]> {
    return this.infPersistentItemRepository.incoming_statements(id).find(filter);
  }

  @post('/inf-persistent-items/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfPersistentItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfStatement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfPersistentItem.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {
            title: 'NewInfStatementInInfPersistentItem',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infStatement: Omit<InfStatement, 'pk_entity'>,
  ): Promise<InfStatement> {
    return this.infPersistentItemRepository.incoming_statements(id).create(infStatement);
  }

  @patch('/inf-persistent-items/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfPersistentItem.InfStatement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {partial: true}),
        },
      },
    })
    infStatement: Partial<InfStatement>,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infPersistentItemRepository.incoming_statements(id).patch(infStatement, where);
  }

  @del('/inf-persistent-items/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfPersistentItem.InfStatement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infPersistentItemRepository.incoming_statements(id).delete(where);
  }
}
