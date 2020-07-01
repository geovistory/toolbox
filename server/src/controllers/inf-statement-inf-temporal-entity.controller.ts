import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InfStatement,
  InfTemporalEntity,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfTemporalEntityController {
  constructor(
    @repository(InfStatementRepository)
    public infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-temporal-entity', {
    responses: {
      '200': {
        description: 'InfTemporalEntity belonging to InfStatement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfTemporalEntity)},
          },
        },
      },
    },
  })
  async getInfTemporalEntity(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
  ): Promise<InfTemporalEntity> {
    return this.infStatementRepository.subject_temporal_entity(id);
  }
}
