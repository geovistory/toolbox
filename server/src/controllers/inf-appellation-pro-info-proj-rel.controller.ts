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
  InfAppellation,
  ProInfoProjRel,
} from '../models';
import {InfAppellationRepository} from '../repositories';

export class InfAppellationProInfoProjRelController {
  constructor(
    @repository(InfAppellationRepository) protected infAppellationRepository: InfAppellationRepository,
  ) { }

  @get('/inf-appellations/{id}/pro-info-proj-rels', {
    responses: {
      '200': {
        description: 'Array of InfAppellation has many ProInfoProjRel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProInfoProjRel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProInfoProjRel>,
  ): Promise<ProInfoProjRel[]> {
    return this.infAppellationRepository.entity_version_project_rels(id).find(filter);
  }

  @post('/inf-appellations/{id}/pro-info-proj-rels', {
    responses: {
      '200': {
        description: 'InfAppellation model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProInfoProjRel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfAppellation.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProInfoProjRel, {
            title: 'NewProInfoProjRelInInfAppellation',
            exclude: ['pk_entity'],
            optional: ['fk_entity']
          }),
        },
      },
    }) proInfoProjRel: Omit<ProInfoProjRel, 'pk_entity'>,
  ): Promise<ProInfoProjRel> {
    return this.infAppellationRepository.entity_version_project_rels(id).create(proInfoProjRel);
  }

  @patch('/inf-appellations/{id}/pro-info-proj-rels', {
    responses: {
      '200': {
        description: 'InfAppellation.ProInfoProjRel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProInfoProjRel, {partial: true}),
        },
      },
    })
    proInfoProjRel: Partial<ProInfoProjRel>,
    @param.query.object('where', getWhereSchemaFor(ProInfoProjRel)) where?: Where<ProInfoProjRel>,
  ): Promise<Count> {
    return this.infAppellationRepository.entity_version_project_rels(id).patch(proInfoProjRel, where);
  }

  @del('/inf-appellations/{id}/pro-info-proj-rels', {
    responses: {
      '200': {
        description: 'InfAppellation.ProInfoProjRel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProInfoProjRel)) where?: Where<ProInfoProjRel>,
  ): Promise<Count> {
    return this.infAppellationRepository.entity_version_project_rels(id).delete(where);
  }
}
