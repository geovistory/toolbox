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
  DfhClass,
  ProDfhClassProjRel,
} from '../models';
import {DfhClassRepository} from '../repositories';

export class DfhClassProDfhClassProjRelController {
  constructor(
    @repository(DfhClassRepository) protected dfhClassRepository: DfhClassRepository,
  ) { }

  @get('/dfh-classes/{id}/pro-dfh-class-proj-rels', {
    responses: {
      '200': {
        description: 'Array of DfhClass has many ProDfhClassProjRel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProDfhClassProjRel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProDfhClassProjRel>,
  ): Promise<ProDfhClassProjRel[]> {
    return this.dfhClassRepository.proj_rels(id).find(filter);
  }

  @post('/dfh-classes/{id}/pro-dfh-class-proj-rels', {
    responses: {
      '200': {
        description: 'DfhClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProDfhClassProjRel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DfhClass.prototype.pk_class,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProDfhClassProjRel, {
            title: 'NewProDfhClassProjRelInDfhClass',
            exclude: ['pk_entity'],
            optional: ['fk_class']
          }),
        },
      },
    }) proDfhClassProjRel: Omit<ProDfhClassProjRel, 'pk_entity'>,
  ): Promise<ProDfhClassProjRel> {
    return this.dfhClassRepository.proj_rels(id).create(proDfhClassProjRel);
  }

  @patch('/dfh-classes/{id}/pro-dfh-class-proj-rels', {
    responses: {
      '200': {
        description: 'DfhClass.ProDfhClassProjRel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProDfhClassProjRel, {partial: true}),
        },
      },
    })
    proDfhClassProjRel: Partial<ProDfhClassProjRel>,
    @param.query.object('where', getWhereSchemaFor(ProDfhClassProjRel)) where?: Where<ProDfhClassProjRel>,
  ): Promise<Count> {
    return this.dfhClassRepository.proj_rels(id).patch(proDfhClassProjRel, where);
  }

  @del('/dfh-classes/{id}/pro-dfh-class-proj-rels', {
    responses: {
      '200': {
        description: 'DfhClass.ProDfhClassProjRel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProDfhClassProjRel)) where?: Where<ProDfhClassProjRel>,
  ): Promise<Count> {
    return this.dfhClassRepository.proj_rels(id).delete(where);
  }
}
