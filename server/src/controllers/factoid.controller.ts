/* eslint-disable @typescript-eslint/camelcase */
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { model, property, repository } from '@loopback/repository';
import { HttpErrors, get, param, post, requestBody } from '@loopback/rest';
import { Roles } from '../components/authorization';
import { QFactoidsFromEntity } from '../components/query/q-factoids-from-entity';
import { Postgres1DataSource } from '../datasources';
import { DatFactoidMapping } from '../models/dat-factoid-mapping.model';
import { DatFactoidPropertyMapping } from '../models/dat-factoid-property-mapping.model';
import { GvPositiveSchemaObject } from '../models/gv-positive-schema-object.model';
import { SysConfigValue } from '../models/sys-config/sys-config-value.model';
import { DatDigitalRepository, DatFactoidMappingRepository, DatFactoidPropertyMappingRepository, InfAppellationRepository, InfDimensionRepository, InfLangStringRepository, InfLanguageRepository, InfPlaceRepository, InfResourceRepository, InfStatementRepository, InfTimePrimitiveRepository, ProInfoProjRelRepository } from '../repositories';
import { InfData } from './project-data/create-project-data.controller';

enum ValueObjectTypeName {
  appellation = 'appellation',
  place = 'place',
  dimension = 'dimension',
  timePrimitive = 'time_primitive',
  langString = 'lang_string',
  language = 'language'
}

@model()
export class DefaultFPM {
  @property()
  pkEntity?: number;
  @property()
  value: InfData;
}

@model()
export class FactoidPropertyMapping {

  @property()
  pkEntity?: number; // id of the factoid property mapping (itself)
  @property()
  pkFactoidMapping?: number; // id of the factoid mapping (parent)
  @property()
  pkProperty?: number; // id of the property
  @property()
  isOutgoing: boolean; // is the property incoming or outgoing
  @property()
  pkColumn: number; // id of the mapped column
  @property()
  comment?: string;
  @property()
  default?: DefaultFPM
}


@model()
export class FactoidMapping {
  @property()
  pkEntity?: number;  // id of the factoid mapping (itself)
  @property()
  pkDigital: number; // id of the table (parent)
  @property()
  pkClass?: number; // id of the mapped class
  @property()
  title?: string;
  @property()
  comment?: string;
  @property.array(FactoidPropertyMapping)
  properties: Array<FactoidPropertyMapping>
}

@model()
export class DigitalFactoidMapping {
  @property()
  pkTable: number; // the table
  @property.array(FactoidMapping)
  mappings: Array<FactoidMapping>
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

  @property()
  fkDefault: number;

  constructor(fkProperty: number, isOutgoing: boolean, value: string, pkEntity: number, pkCell: number, fkDefault: number) {
    this.fkProperty = fkProperty;
    this.isOutgoing = isOutgoing;
    this.value = value;
    this.pkEntity = pkEntity;
    this.pkCell = pkCell;
    this.fkDefault = fkDefault
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
    @repository(InfResourceRepository) public infResourceRepository: InfResourceRepository,
    @repository(ProInfoProjRelRepository) public proInfProjRelRepository: ProInfoProjRelRepository,
    @repository(InfStatementRepository) public infStatementRepository: InfStatementRepository,
    @repository(DatFactoidMappingRepository) public datFactoidMappingRepository: DatFactoidMappingRepository,
    @repository(DatFactoidPropertyMappingRepository) public datFactoidPropertyMappingRepository: DatFactoidPropertyMappingRepository,
    @repository(DatDigitalRepository) public datDigitalRepository: DatDigitalRepository,
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

    // const l1 = (await request.getFactoidNumber(pkProject, pkEntity))[0]
    // const l2 = (await request.getDefaultFactoidNumber(pkProject, pkEntity))[0]
    // const length = parseInt(l1.length) + parseInt(l2.length)
    // const factoidEntities = await request.query(pkProject, pkEntity, offset, factoidNumber);

    const allFactoidEntities = await request.query(pkProject, pkEntity, offset, factoidNumber);
    const length = allFactoidEntities.length
    const factoidEntities = allFactoidEntities
      .sort((a, b) => a.pkClass - b.pkClass)
      .slice(offset, offset + parseInt(factoidNumber + ''));


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
          const pk = isNaN(bs.pkEntity) ? bs.fkDefault : bs.pkEntity;
          if (!schemaObject.inf || !pk) continue;
          if (vot === ValueObjectTypeName.appellation) schemaObject.inf.appellation?.push(...await this.infAppellationRepository.find({ where: { pk_entity: pk } }))
          if (vot === ValueObjectTypeName.langString) schemaObject.inf.lang_string?.push(...await this.infLangStringRepository.find({ where: { pk_entity: pk } }))
          if (vot === ValueObjectTypeName.language) schemaObject.inf.language?.push(...await this.infLanguageRepo.find({ where: { pk_entity: pk } }))
          if (vot === ValueObjectTypeName.place) schemaObject.inf.place?.push(...await this.infPlaceRepository.find({ where: { pk_entity: pk } }))
          if (vot === ValueObjectTypeName.dimension) schemaObject.inf.dimension?.push(...await this.infDimensionRepository.find({ where: { pk_entity: pk } }))
          if (vot === ValueObjectTypeName.timePrimitive) {
            schemaObject.inf.time_primitive?.push(...await this.infTimePrimitiveRepository.find({ where: { pk_entity: pk } }))
          }
        }
      }
    }
    return new GetFactoidsFromEntityResponse(pkEntity, factoidEntities, length, schemaObject);
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



  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  @post('/set-factoid-mapping', {
    description: 'set the factoids mapping, with properties',
    responses: {
      '200': {
        description: 'Factoids',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': DigitalFactoidMapping,
            },
          },
        },
      },
    },
  })
  async setDigitalFactoidMapping(
    @param.query.string('pkProject', { required: true }) pkProject: string,
    @param.query.number('pkTable', { required: true }) pkTable: number,
    @requestBody({ required: true }) factoidMappings: DigitalFactoidMapping
  ): Promise<DigitalFactoidMapping> {

    // does the digital exist?
    const digital = await this.datDigitalRepository.find({ where: { pk_entity: pkTable } })
    if (digital.length === 0) throw new HttpErrors.UnprocessableEntity('The table does not exists');

    // get all current (in db) factoid mappings and property mappings
    const currentFM = await this.datFactoidMappingRepository.find({ where: { fk_digital: pkTable } });
    const currentFPM: Array<DatFactoidPropertyMapping> = [];
    for (const fm of currentFM) {
      currentFPM.push(...(await this.datFactoidPropertyMappingRepository.find({ where: { fk_factoid_mapping: fm.pk_entity } })))
    }


    for (const incFM of factoidMappings.mappings) {

      if (!incFM.pkEntity) { // needs to be created (according to the presence of the incoming pkEntity)
        // the Factoid mapping
        const newFM = await this.datFactoidMappingRepository.create({
          fk_digital: incFM.pkDigital,
          fk_class: incFM.pkClass,
          title: incFM.title ?? "",
          comment: incFM.comment ?? ""
        })
        // the factoid property mappings
        for (const fpm of incFM.properties) {
          await this.datFactoidPropertyMappingRepository.create({
            fk_property: fpm.pkProperty,
            fk_column: fpm.pkColumn,
            fk_factoid_mapping: newFM.pk_entity,
            is_outgoing: fpm.isOutgoing,
            fk_default: fpm.default?.pkEntity,
            comment: fpm.comment ?? ""
          })
        }
      } else { // needs to be updated (according to the presence of the incoming pkEntity)
        // the Factoid mapping
        await this.datFactoidMappingRepository.update(new DatFactoidMapping({
          pk_entity: incFM.pkEntity,
          fk_digital: incFM.pkDigital,
          fk_class: incFM.pkClass,
          title: incFM.title ?? "",
          comment: incFM.comment ?? ""
        }))
        // the factoid property mappings
        for (const fpm of incFM.properties) {
          // the new properties  (according to the presence of the incoming pkEntity)
          if (!fpm.pkEntity) {
            await this.datFactoidPropertyMappingRepository.create({
              fk_property: fpm.pkProperty,
              fk_column: fpm.pkColumn,
              fk_factoid_mapping: incFM.pkEntity,
              is_outgoing: fpm.isOutgoing,
              fk_default: fpm.default?.pkEntity,
              comment: fpm.comment ?? ""
            })
          } else { // the existing properties (according to the presence of the incoming pkEntity)
            await this.datFactoidPropertyMappingRepository.update(new DatFactoidPropertyMapping({
              pk_entity: fpm.pkEntity,
              fk_property: fpm.pkProperty,
              fk_column: fpm.pkColumn,
              fk_factoid_mapping: incFM.pkEntity,
              is_outgoing: fpm.isOutgoing,
              fk_default: fpm.default?.pkEntity,
              comment: fpm.comment ?? ""
            }))
          }
        }
        // look if there were properties that were deleted for this factoid mapping
        const properties = currentFPM.filter(fpm => fpm.fk_factoid_mapping == incFM.pkEntity);
        for (const prop of properties) {
          if (!incFM.properties.some(p => p.pkEntity == prop.pk_entity)) {
            await this.datFactoidPropertyMappingRepository.deleteById(prop.pk_entity)
          }
        }
      }
    }

    // look if there were factoid mapping that were deleted
    for (const cfm of currentFM) {
      if (!factoidMappings.mappings.some(fm => fm.pkEntity == cfm.pk_entity)) {
        // first delete all properties
        const props = currentFPM.filter(p => p.fk_factoid_mapping == cfm.pk_entity);
        for (const p of props) { await this.datFactoidPropertyMappingRepository.deleteById(p.pk_entity) }
        // delete the factoid mappings
        await this.datFactoidMappingRepository.deleteById(cfm.pk_entity)
      }
    }
    return this.getDigitalFactoidMapping(pkProject, pkTable);
  }


  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  @get('/get-factoid-mapping', {
    description: 'get the factoids mapping, with properties and default values',
    responses: {
      '200': {
        description: 'Factoids',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': DigitalFactoidMapping,
            },
          },
        },
      },
    },
  })
  async getDigitalFactoidMapping(
    @param.query.string('pkProject', { required: true }) pkProject: string,
    @param.query.number('pkTable', { required: true }) pkTable: number,
  ): Promise<DigitalFactoidMapping> {

    // does the digital existst?
    const digital = await this.datDigitalRepository.find({ where: { pk_entity: pkTable } })
    if (digital.length === 0) throw new HttpErrors.UnprocessableEntity('The table does not exists');

    const datFMs = await this.datFactoidMappingRepository.find({ where: { fk_digital: pkTable } });
    return {
      pkTable,
      mappings: await Promise.all(datFMs.map(async datFM => {
        return {
          pkEntity: datFM.pk_entity,
          pkDigital: pkTable,
          pkClass: datFM.fk_class,
          title: datFM.title,
          comment: datFM.comment,
          properties: await Promise.all((await this.datFactoidPropertyMappingRepository.find({ where: { fk_factoid_mapping: datFM.pk_entity } })).map(async datFPM => {
            return {
              pkEntity: datFPM.pk_entity,
              pkFactoidMapping: datFPM.fk_factoid_mapping,
              pkProperty: datFPM.fk_property,
              isOutgoing: datFPM.is_outgoing,
              pkColumn: datFPM.fk_column,
              comment: datFPM.comment,
              default: await this.getDefaultValue(datFPM.fk_default),
            }
          }
          ))
        }
      }))
    }
  }

  async getDefaultValue(pkEntity: number): Promise<{ pkEntity: number | undefined, value: InfData } | undefined> {
    const toReturn = new InfData();
    toReturn.appellation = await this.infAppellationRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.appellation) return { pkEntity: toReturn.appellation.pk_entity, value: toReturn };
    toReturn.resource = await this.infResourceRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.resource) return { pkEntity: toReturn.resource.pk_entity, value: toReturn };
    toReturn.place = await this.infPlaceRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.place) return { pkEntity: toReturn.place.pk_entity, value: toReturn };;
    toReturn.dimension = await this.infDimensionRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.dimension) return { pkEntity: toReturn.dimension.pk_entity, value: toReturn };;
    toReturn.langString = await this.infLangStringRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.langString) return { pkEntity: toReturn.langString.pk_entity, value: toReturn };;
    toReturn.language = await this.infLanguageRepo.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.language) return { pkEntity: toReturn.language.pk_entity, value: toReturn };
    toReturn.timePrimitive = await this.infTimePrimitiveRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (toReturn.timePrimitive) return { pkEntity: toReturn.timePrimitive.pk_entity, value: toReturn };
  }
}
