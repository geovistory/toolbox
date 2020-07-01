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
  InfStatement,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfStatementController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-statement', {
    responses: {
      '200': {
        description: 'InfStatement has one InfStatement',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfStatement),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfStatement>,
  ): Promise<InfStatement> {
    return this.infStatementRepository.subject_statement(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-statement', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfStatement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {
            title: 'NewInfStatementInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_subject_info']
          }),
        },
      },
    }) infStatement: Omit<InfStatement, 'pk_entity'>,
  ): Promise<InfStatement> {
    return this.infStatementRepository.subject_statement(id).create(infStatement);
  }

  @patch('/inf-statements/{id}/inf-statement', {
    responses: {
      '200': {
        description: 'InfStatement.InfStatement PATCH success count',
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
    return this.infStatementRepository.subject_statement(id).patch(infStatement, where);
  }

  @del('/inf-statements/{id}/inf-statement', {
    responses: {
      '200': {
        description: 'InfStatement.InfStatement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_statement(id).delete(where);
  }
}
