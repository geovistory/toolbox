import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InfLangString,
  InfLanguage,
} from '../models';
import {InfLangStringRepository} from '../repositories';

export class InfLangStringInfLanguageController {
  constructor(
    @repository(InfLangStringRepository)
    public infLangStringRepository: InfLangStringRepository,
  ) { }

  @get('/inf-lang-strings/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfLanguage belonging to InfLangString',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfLanguage)},
          },
        },
      },
    },
  })
  async getInfLanguage(
    @param.path.number('id') id: typeof InfLangString.prototype.pk_entity,
  ): Promise<InfLanguage> {
    return this.infLangStringRepository.language(id);
  }
}
