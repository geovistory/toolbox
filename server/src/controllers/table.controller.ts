import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {get, param, Request, RestBindings} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Roles} from '../components/authorization/keys';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {GvSchemaObject} from '../models/gv-schema-object.model';
import {QTableColumns} from '../components/query/q-table-columns';
import {QueryBindings} from '../components/query/keys';


/**
 * A simple controller to bounce back http requests
 */
@tags('table')
export class TableController {
  constructor(
    @inject(QueryBindings.qTableColumns) private qTableColumns: QTableColumns
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
    return this.qTableColumns.query(pkProject, pkDigital)
  }


}
