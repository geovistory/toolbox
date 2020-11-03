import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { model } from '@loopback/repository';
import { get, param } from '@loopback/rest';
import { Roles } from '../components/authorization';
import { QFactoidsFromEntity } from '../components/query/q-factoids-from-entity';
import { Postgres1DataSource } from '../datasources';

export type Factoid = {
  fkDigital: number;
  fkFactoidMapping: number;
  fkClass: number;
  fkProperty: number;
  value: string;
}

@model()
export class Factoids {
  pkEntity: string;
  factoids: Factoid[];

  constructor(pkEntity: string, factoids: Factoid[]) {
    this.pkEntity = pkEntity;
    this.factoids = factoids;
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
              'x-ts-type': Factoids,
            },
          },
        },
      },
    },
  })
  async factoidsFromEntity(
    @param.query.string('pkProject', { required: true }) pkProject: string,
    @param.query.string('pkEntity', { required: true }) pkEntity: string
  ): Promise<Factoids> {
    return new Factoids(pkEntity, await new QFactoidsFromEntity(this.dataSource).query(pkProject, pkEntity));
  }

}
