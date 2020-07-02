import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {DatChunk} from '../models';
import {DatChunkRepository} from '../repositories';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {inject} from '@loopback/core';

export class DatChunkController {
  constructor(
    @repository(DatChunkRepository)
    public datChunkRepository: DatChunkRepository,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) {}
  @get('/dat-chunks/{id}', {
    responses: {
      '200': {
        description: 'DatChunk model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DatChunk, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DatChunk, {exclude: 'where'}) filter?: FilterExcludingWhere<DatChunk>
  ): Promise<DatChunk> {
    return this.datChunkRepository.findById(id, filter);
  }



}
