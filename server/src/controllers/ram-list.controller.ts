import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {get, param} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {Postgres1DataSource} from '../datasources';
import {GvSchemaObject} from '../models/gv-schema-object.model';
import {QRamList} from '../components/query/q-ram-list';
import {Streams} from '../realtime/streams/streams';

/**
 * A controller to get data for the ram lists
 * (refers to, is about, mentions)
 */
@tags('ram list')
export class RamListController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @inject('streams') private streams: Streams,
  ) {}


  @get('/get-ram-list', {
    description: 'Get the schema object for the ram list.',
    responses: {
      '200': {
        description: 'Ok',
        content: {'application/json': {schema: {'x-ts-type': GvSchemaObject}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  getRamList(
    @param.query.number('pkProject', {
      required: true,
      description: 'Primary key of the project'
    }) pkProject: number,
    @param.query.number('pkEntity', {
      required: true,
      description: 'Primary key of the entity (the expression)'
    }) pkEntity: number,
    @param.query.number('fkProperty', {
      required: true,
      description: 'fkProperty of the statement connecting the entity via -> 1218 = mentions / 117 = is about / 1334 = refers to -> with Expression / Expr. Portion / Chunk / Cell'
    }) fkProperty: number,
    @param.query.string('refersTo', {
      required: false,
      description: '"Chunk" or "Cell" to restrict query to Chunk or Cell as subject of referst to statements'
    }) refersTo?: 'Chunk' | 'Cell',
  ): Promise<GvSchemaObject> {
    return new QRamList(this.dataSource, this.streams).query(pkEntity, pkProject, fkProperty, refersTo)
  }


}
