import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {get, param} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {QContentTree} from '../components/query/q-content-tree';
import {Postgres1DataSource} from '../datasources';
import {GvPositiveSchemaObject} from '../models/gv-positive-schema-object.model';

/**
 * A controller to get data for the content tree
 * (Sections, Digital Reproductions)
 */
@tags('content tree')
export class ContentTreeController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
  ) { }


  @get('/get-content-tree', {
    description: "Get SchemaObject with everything needed to build the tree of the content of an F2 Expression.",
    responses: {
      '200': {
        description: 'Ok',
        content: {'application/json': {schema: {'x-ts-type': GvPositiveSchemaObject}}},
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  getContentTree(
    @param.query.number('pkProject', {
      required: true,
      description: 'Primary key of the project'
    }) pkProject: number,
    @param.query.number('pkExpressionEntity', {
      required: true,
      description: "Primary Key of the F2 Expression entity for which the content tree is needed.",
    }) pkExpressionEntity: number
  ): Promise<GvPositiveSchemaObject> {
    return new QContentTree(this.dataSource).query(pkProject, pkExpressionEntity)
  }


}
