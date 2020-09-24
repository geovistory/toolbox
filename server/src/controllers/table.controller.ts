import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {get, param} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {Postgres1DataSource} from '../datasources';
import {GvSchemaObject} from '../models/gv-schema-object.model';
import {QTableColumns} from '../components/query/q-table-columns';


/**
 * A simple controller to bounce back http requests
 */
@tags('table')
export class TableController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
  ) {}


  @get('/get-columns-of-table', {
    description: 'Get the columns of a table (digital) with column names and column mappings.',
    responses: {
      '200': {
        description: 'Ok',
        content: {'application/json': {schema: {'x-ts-type': GvSchemaObject}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  projectPing(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkDigital', {required: true}) pkDigital: number,
  ): Promise<GvSchemaObject> {
    return new QTableColumns(this.dataSource).query(pkProject, pkDigital)
  }


}
