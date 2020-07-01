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
  DatChunk,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementDatChunkController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/dat-chunk', {
    responses: {
      '200': {
        description: 'InfStatement has one DatChunk',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DatChunk),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DatChunk>,
  ): Promise<DatChunk> {
    return this.infStatementRepository.subject_chunk(id).get(filter);
  }

  @post('/inf-statements/{id}/dat-chunk', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatChunk)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatChunk, {
            title: 'NewDatChunkInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_subject_data']
          }),
        },
      },
    }) datChunk: Omit<DatChunk, 'pk_entity'>,
  ): Promise<DatChunk> {
    return this.infStatementRepository.subject_chunk(id).create(datChunk);
  }

  @patch('/inf-statements/{id}/dat-chunk', {
    responses: {
      '200': {
        description: 'InfStatement.DatChunk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatChunk, {partial: true}),
        },
      },
    })
    datChunk: Partial<DatChunk>,
    @param.query.object('where', getWhereSchemaFor(DatChunk)) where?: Where<DatChunk>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_chunk(id).patch(datChunk, where);
  }

  @del('/inf-statements/{id}/dat-chunk', {
    responses: {
      '200': {
        description: 'InfStatement.DatChunk DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DatChunk)) where?: Where<DatChunk>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_chunk(id).delete(where);
  }
}
