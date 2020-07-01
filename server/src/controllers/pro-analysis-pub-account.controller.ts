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
  ProAnalysis,
  PubAccount,
} from '../models';
import {ProAnalysisRepository} from '../repositories';

export class ProAnalysisPubAccountController {
  constructor(
    @repository(ProAnalysisRepository) protected proAnalysisRepository: ProAnalysisRepository,
  ) { }

  @get('/pro-analyses/{id}/pub-account', {
    responses: {
      '200': {
        description: 'ProAnalysis has one PubAccount',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PubAccount),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PubAccount>,
  ): Promise<PubAccount> {
    return this.proAnalysisRepository.account(id).get(filter);
  }

  @post('/pro-analyses/{id}/pub-account', {
    responses: {
      '200': {
        description: 'ProAnalysis model instance',
        content: {'application/json': {schema: getModelSchemaRef(PubAccount)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProAnalysis.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PubAccount, {
            title: 'NewPubAccountInProAnalysis',
            exclude: ['id'],
            optional: ['fk_last_modifier']
          }),
        },
      },
    }) pubAccount: Omit<PubAccount, 'id'>,
  ): Promise<PubAccount> {
    return this.proAnalysisRepository.account(id).create(pubAccount);
  }

  @patch('/pro-analyses/{id}/pub-account', {
    responses: {
      '200': {
        description: 'ProAnalysis.PubAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PubAccount, {partial: true}),
        },
      },
    })
    pubAccount: Partial<PubAccount>,
    @param.query.object('where', getWhereSchemaFor(PubAccount)) where?: Where<PubAccount>,
  ): Promise<Count> {
    return this.proAnalysisRepository.account(id).patch(pubAccount, where);
  }

  @del('/pro-analyses/{id}/pub-account', {
    responses: {
      '200': {
        description: 'ProAnalysis.PubAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PubAccount)) where?: Where<PubAccount>,
  ): Promise<Count> {
    return this.proAnalysisRepository.account(id).delete(where);
  }
}
