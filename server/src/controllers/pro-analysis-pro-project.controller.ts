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
  ProProject,
} from '../models';
import {ProAnalysisRepository} from '../repositories';

export class ProAnalysisProProjectController {
  constructor(
    @repository(ProAnalysisRepository) protected proAnalysisRepository: ProAnalysisRepository,
  ) { }

  @get('/pro-analyses/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProAnalysis has one ProProject',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProProject),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProProject>,
  ): Promise<ProProject> {
    return this.proAnalysisRepository.project(id).get(filter);
  }

  @post('/pro-analyses/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProAnalysis model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProProject)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProAnalysis.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProProject, {
            title: 'NewProProjectInProAnalysis',
            exclude: ['pk_entity'],
            optional: ['fk_project']
          }),
        },
      },
    }) proProject: Omit<ProProject, 'pk_entity'>,
  ): Promise<ProProject> {
    return this.proAnalysisRepository.project(id).create(proProject);
  }

  @patch('/pro-analyses/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProAnalysis.ProProject PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProProject, {partial: true}),
        },
      },
    })
    proProject: Partial<ProProject>,
    @param.query.object('where', getWhereSchemaFor(ProProject)) where?: Where<ProProject>,
  ): Promise<Count> {
    return this.proAnalysisRepository.project(id).patch(proProject, where);
  }

  @del('/pro-analyses/{id}/pro-project', {
    responses: {
      '200': {
        description: 'ProAnalysis.ProProject DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProProject)) where?: Where<ProProject>,
  ): Promise<Count> {
    return this.proAnalysisRepository.project(id).delete(where);
  }
}
