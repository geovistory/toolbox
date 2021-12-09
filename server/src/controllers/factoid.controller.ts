/* eslint-disable @typescript-eslint/camelcase */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {model, property, repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Roles} from '../components/authorization';
import {QFactoidsFromEntity} from '../components/query/q-factoids-from-entity';
import {Postgres1DataSource} from '../datasources';
import {GvPositiveSchemaObject} from '../models/gv-positive-schema-object.model';
import {SysConfigValue} from '../models/sys-config/sys-config-value.model';
import {InfAppellationRepository, InfDimensionRepository, InfLangStringRepository, InfLanguageRepository, InfPlaceRepository, InfStatementRepository, InfTimePrimitiveRepository, ProInfoProjRelRepository} from '../repositories';

enum ValueObjectTypeName {
  appellation = 'appellation',
  place = 'place',
  dimension = 'dimension',
  timePrimitive = 'time_primitive',
  langString = 'lang_string',
  language = 'language'
}

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
  pkCell: number;

  @property()
  vot?: ValueObjectTypeName;

  @property()
  pkStatement?: number;

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

  @property()
  schemaObject: GvPositiveSchemaObject;

  constructor(pkEntity: string, factoidEntities: FactoidEntity[], totalLength: number, schemaObject: GvPositiveSchemaObject) {
    this.pkEntity = pkEntity;
    this.factoidEntities = factoidEntities;
    this.totalLength = totalLength;
    this.schemaObject = schemaObject;
  }
}

export class FactoidController {

  sysconfig: SysConfigValue;

  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @repository(InfLanguageRepository) public infLanguageRepo: InfLanguageRepository,
    @repository(InfLangStringRepository) public infLangStringRepository: InfLangStringRepository,
    @repository(InfAppellationRepository) public infAppellationRepository: InfAppellationRepository,
    @repository(InfPlaceRepository) public infPlaceRepository: InfPlaceRepository,
    @repository(InfDimensionRepository) public infDimensionRepository: InfDimensionRepository,
    @repository(InfTimePrimitiveRepository) public infTimePrimitiveRepository: InfTimePrimitiveRepository,
    @repository(ProInfoProjRelRepository) public proInfProjRelRepository: ProInfoProjRelRepository,
    @repository(InfStatementRepository) public infStatementRepository: InfStatementRepository
  ) { }

  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
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
    @param.query.string('pkProject', {required: true}) pkProject: string,
    @param.query.string('pkEntity', {required: true}) pkEntity: string,
    @param.query.string('factoidNumber', {required: true}) factoidNumber: number,
    @param.query.string('page', {required: true}) page: number
  ): Promise<GetFactoidsFromEntityResponse> {

    const offset = page * factoidNumber;
    const request = new QFactoidsFromEntity(this.dataSource);
    const length = (await request.getFactoidNumber(pkProject, pkEntity))[0];
    const factoidEntities = await request.query(pkProject, pkEntity, offset, factoidNumber);


    const schemaObject: GvPositiveSchemaObject = {
      inf: {
        appellation: [],
        time_primitive: [],
        place: [],
        dimension: [],
        lang_string: []
      }
    };

    for (const fe of factoidEntities) {
      for (const bs of fe.bodyStatements) {
        const vot = await this.getVOT(await this.getClassFromProperty(bs.fkProperty, bs.isOutgoing));
        if (vot) {
          bs.vot = vot;
          if (!schemaObject.inf || !bs.pkEntity) continue;
          if (vot === ValueObjectTypeName.appellation) schemaObject.inf.appellation = await this.infAppellationRepository.find({where: {pk_entity: bs.pkEntity}})
          if (vot === ValueObjectTypeName.langString) schemaObject.inf.lang_string = await this.infLangStringRepository.find({where: {pk_entity: bs.pkEntity}})
          if (vot === ValueObjectTypeName.language) schemaObject.inf.language = await this.infLanguageRepo.find({where: {pk_entity: bs.pkEntity}})
          if (vot === ValueObjectTypeName.place) schemaObject.inf.place = await this.infPlaceRepository.find({where: {pk_entity: bs.pkEntity}})
          if (vot === ValueObjectTypeName.dimension) schemaObject.inf.dimension = await this.infDimensionRepository.find({where: {pk_entity: bs.pkEntity}})
          if (vot === ValueObjectTypeName.timePrimitive) {
            schemaObject.inf.time_primitive = await this.infTimePrimitiveRepository.find({where: {pk_entity: bs.pkEntity}})
            bs.pkStatement = (await this.infStatementRepository.find({where: {fk_object_info: bs.pkEntity, fk_property: 1334}}))[0].pk_entity;
            schemaObject.pro = {info_proj_rel: (await this.proInfProjRelRepository.find({where: {fk_entity: bs.pkStatement, fk_project: parseInt(pkProject)}}))}
          }
        }
      }
    }
    return new GetFactoidsFromEntityResponse(pkEntity, factoidEntities, length.length, schemaObject);
  }

  async getClassFromProperty(fkProperty: number, outgoing: boolean): Promise<number> {
    const p = (await this.dataSource.execute('SELECT dfh_property_domain, dfh_property_range FROM data_for_history.api_property WHERE dfh_pk_property = ' + fkProperty + ';'))[0]
    return outgoing ? p.dfh_property_range : p.dfh_property_domain;
  }


  async getVOT(pkClass: number): Promise<ValueObjectTypeName | undefined> {
    if (!this.sysconfig) this.sysconfig = (await this.dataSource.execute('SELECT config FROM system.config'))[0].config

    if (this.sysconfig.classes[pkClass]?.valueObjectType?.appellation) return ValueObjectTypeName.appellation;
    if (this.sysconfig.classes[pkClass]?.valueObjectType?.place) return ValueObjectTypeName.place;
    if (this.sysconfig.classes[pkClass]?.valueObjectType?.dimension) return ValueObjectTypeName.dimension;
    if (this.sysconfig.classes[pkClass]?.valueObjectType?.langString) return ValueObjectTypeName.langString;
    if (this.sysconfig.classes[pkClass]?.valueObjectType?.timePrimitive) return ValueObjectTypeName.timePrimitive;
    if (this.sysconfig.classes[pkClass]?.valueObjectType?.language) return ValueObjectTypeName.language;
    return undefined;
  }

}
