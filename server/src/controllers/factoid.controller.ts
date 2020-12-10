import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { model, property } from '@loopback/repository';
import { get, param } from '@loopback/rest';
import { Roles } from '../components/authorization';
import { QFactoidsFromEntity } from '../components/query/q-factoids-from-entity';
import { Postgres1DataSource } from '../datasources';

@model()
export class FactoidStatement {

  @property()
  fkProperty: number;

  @property()
  isOutgoing: boolean;

  @property()
  value: string;

  @property()
  pkEntity: number;

  @property()
  pkCell: number

  constructor(fkProperty: number, isOutgoing: boolean, value: string, pkEntity: number, pkCell: number) {
    this.fkProperty = fkProperty;
    this.isOutgoing = isOutgoing;
    this.value = value;
    this.pkEntity = pkEntity;
    this.pkCell = pkCell;
  }

}

@model()
export class FactoidEntity {

  @property()
  pkDigital: number;

  @property()
  pkClass: number;

  @property()
  pkRow: number;

  @property()
  pkColumn: number;

  @property()
  pkFactoidMapping: number;


  @property.array(FactoidStatement)
  headerStatements: FactoidStatement[];

  @property.array(FactoidStatement)
  bodyStatements: FactoidStatement[];

  constructor(pkDigital: number, pkClass: number, pkRow: number, pkFactoidMapping: number) {
    this.pkDigital = pkDigital;
    this.pkClass = pkClass;
    this.pkRow = pkRow;
    this.pkFactoidMapping = pkFactoidMapping;
    this.headerStatements = [];
    this.bodyStatements = [];
  }
}

@model()
export class GetFactoidsFromEntityResponse {
  @property()
  pkEntity: string;

  @property.array(FactoidEntity)
  factoidEntities: FactoidEntity[];

  @property()
  totalLength: Number;

  constructor(pkEntity: string, factoidEntities: FactoidEntity[], totalLength: number) {
    this.pkEntity = pkEntity;
    this.factoidEntities = factoidEntities;
    this.totalLength = totalLength;
  }
}

export class FactoidController {

  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
  ) { }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  @get('/get-factoids-from-entity', {
    description: 'Fetch all factoids about an entity',
    responses: {
      '200': {
        description: 'Factoids',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GetFactoidsFromEntityResponse,
            },
          },
        },
      },
    },
  })
  async factoidsFromEntity(
    @param.query.string('pkProject', { required: true }) pkProject: string,
    @param.query.string('pkEntity', { required: true }) pkEntity: string,
    @param.query.string('factoidNumber', { required: true }) factoidNumber: number,
    @param.query.string('page', { required: true }) page: number
  ): Promise<GetFactoidsFromEntityResponse> {

    const offset = page * factoidNumber;
    const request = new QFactoidsFromEntity(this.dataSource);
    const length = (await request.getFactoidNumber(pkProject, pkEntity))[0];
    const factoidEntities = await request.query(pkProject, pkEntity, offset, factoidNumber);

    return new GetFactoidsFromEntityResponse(pkEntity, factoidEntities, length.length);
  }
}
