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
  InfPlace,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfPlaceController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-place', {
    responses: {
      '200': {
        description: 'InfStatement has one InfPlace',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfPlace),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfPlace>,
  ): Promise<InfPlace> {
    return this.infStatementRepository.object_place(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-place', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfPlace)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPlace, {
            title: 'NewInfPlaceInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infPlace: Omit<InfPlace, 'pk_entity'>,
  ): Promise<InfPlace> {
    return this.infStatementRepository.object_place(id).create(infPlace);
  }

  @patch('/inf-statements/{id}/inf-place', {
    responses: {
      '200': {
        description: 'InfStatement.InfPlace PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPlace, {partial: true}),
        },
      },
    })
    infPlace: Partial<InfPlace>,
    @param.query.object('where', getWhereSchemaFor(InfPlace)) where?: Where<InfPlace>,
  ): Promise<Count> {
    return this.infStatementRepository.object_place(id).patch(infPlace, where);
  }

  @del('/inf-statements/{id}/inf-place', {
    responses: {
      '200': {
        description: 'InfStatement.InfPlace DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfPlace)) where?: Where<InfPlace>,
  ): Promise<Count> {
    return this.infStatementRepository.object_place(id).delete(where);
  }
}
