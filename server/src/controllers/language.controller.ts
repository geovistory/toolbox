

import {inject} from '@loopback/core';
import {post, requestBody, tags} from '@loopback/openapi-v3';
import {Filter, repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {InfLanguage} from '../models';
import {InfLanguageRepository} from '../repositories';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';

@tags('languages')
export class FindLanguagesController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @repository(InfLanguageRepository)
    public infLanguageRepository: InfLanguageRepository,
  ) { }

  @get('languages/search-by-name', {
    responses: {
      '200': {
        description: 'Perform a ranked search on languages by search string.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': InfLanguage
              }
            }
          }
        }
      },
    },
  })
  async searchInLanguages(
    @param.query.string('searchString', {required: false}) searchstring?: string,
  ): Promise<InfLanguage[]> {

    const q = new SqlBuilderLb4Models(this.datasource)

    if (!searchstring) {
      q.sql = `
        select ${q.createSelect('t1', InfLanguage.definition)}
        FROM information."language" t1
        WHERE iso6391 IN ('en','de','fr','nl','it','es')
        ORDER BY POSITION(iso6391 IN 'en, de, fr, nl, it, es');
        `;
    } else {
      q.sql = `
      select ${q.createSelect('s', InfLanguage.definition)}
      from (
        SELECT
        ${q.createSelect('t1', InfLanguage.definition)},
        ts_rank(to_tsvector('english', notes),
        to_tsquery(${q.addParam(searchstring + ':*')}), 1) AS score
        FROM information."language" t1
        ) s
        WHERE score > 0
        ORDER BY score DESC
        LIMIT 6;
        `;

    }

    const langs = await q.execute<InfLanguage[]>()
    langs.forEach(lang => {
      Object.entries(lang).forEach(e => {if (e[1] === null) delete lang[e[0] as keyof InfLanguage]});
    })
    return langs
  }



  @post('languages/find', {
    responses: {
      '200': {
        description: 'Find languages by filter.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': InfLanguage
              }
            }
          }
        }
      },
    },
  })
  async find(
    @requestBody() filter: Filter<InfLanguage>,
  ): Promise<InfLanguage[]> {
    return this.infLanguageRepository.find(filter)
  }


}
