/* eslint-disable @typescript-eslint/camelcase */
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { model, property, repository } from '@loopback/repository';
import { get, HttpErrors, param, post, requestBody } from '@loopback/rest';
import { Roles } from '../components/authorization';
import { QFactoidsFromEntity } from '../components/query/q-factoids-from-entity';
import { Postgres1DataSource } from '../datasources';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfTimePrimitive } from '../models';
import { DatFactoidPropertyMapping } from '../models/dat-factoid-property-mapping.model';
import { GvPositiveSchemaObject } from '../models/gv-positive-schema-object.model';
import { SysConfigValue } from '../models/sys-config/sys-config-value.model';
import { DatDigitalRepository, DatFactoidMappingRepository, DatFactoidPropertyMappingRepository, InfAppellationRepository, InfDimensionRepository, InfLangStringRepository, InfLanguageRepository, InfPlaceRepository, InfResourceRepository, InfStatementRepository, InfTimePrimitiveRepository, ProInfoProjRelRepository } from '../repositories';

enum ValueObjectTypeName {
  appellation = 'appellation',
  place = 'place',
  dimension = 'dimension',
  timePrimitive = 'time_primitive',
  langString = 'lang_string',
  language = 'language'
}

@model()
export class DefaultFactoidPropertyMapping {
  @property()
  appellation?: Partial<InfAppellation>
  @property()
  place?: Partial<InfPlace>
  @property()
  dimension?: Partial<InfDimension>
  @property()
  langString?: Partial<InfLangString>
  @property()
  language?: Partial<InfLanguage>
  @property()
  timePrimitive?: Partial<InfTimePrimitive>
  @property()
  resource?: Partial<InfResource>
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
  default?: DefaultFactoidPropertyMapping
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
          if (vot === ValueObjectTypeName.appellation) schemaObject.inf.appellation = await this.infAppellationRepository.find({ where: { pk_entity: bs.pkEntity } })
          if (vot === ValueObjectTypeName.langString) schemaObject.inf.lang_string = await this.infLangStringRepository.find({ where: { pk_entity: bs.pkEntity } })
          if (vot === ValueObjectTypeName.language) schemaObject.inf.language = await this.infLanguageRepo.find({ where: { pk_entity: bs.pkEntity } })
          if (vot === ValueObjectTypeName.place) schemaObject.inf.place = await this.infPlaceRepository.find({ where: { pk_entity: bs.pkEntity } })
          if (vot === ValueObjectTypeName.dimension) schemaObject.inf.dimension = await this.infDimensionRepository.find({ where: { pk_entity: bs.pkEntity } })
          if (vot === ValueObjectTypeName.timePrimitive) {
            schemaObject.inf.time_primitive = await this.infTimePrimitiveRepository.find({ where: { pk_entity: bs.pkEntity } })
            bs.pkStatement = (await this.infStatementRepository.find({ where: { fk_object_info: bs.pkEntity, fk_property: 1334 } }))[0].pk_entity;
            schemaObject.pro = { info_proj_rel: (await this.proInfProjRelRepository.find({ where: { fk_entity: bs.pkStatement, fk_project: pkProject } })) }
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

    // does the digital existst?
    const digital = await this.datDigitalRepository.find({ where: { pk_entity: pkTable } })
    if (digital.length == 0) throw new HttpErrors.UnprocessableEntity('The table does not exists');


    // get all current factoid mappings and property mappings
    const currentFM = await this.datFactoidMappingRepository.find({ where: { fk_digital: pkTable } });
    const currentFPM: Array<DatFactoidPropertyMapping> = [];
    for (const fm of currentFM) {
      currentFPM.push(...(await this.datFactoidPropertyMappingRepository.find({ where: { fk_factoid_mapping: fm.pk_entity } })))
    }

    // delete all current factoid mappings and property mappings
    currentFPM.forEach(fpm => this.datFactoidPropertyMappingRepository.delete(fpm))
    currentFM.forEach(fm => this.datFactoidMappingRepository.delete(fm))

    // create new factoid mapping and factoid property mappings
    for (const fm of factoidMappings.mappings) {
      const newFM = await this.datFactoidMappingRepository.create({
        fk_digital: fm.pkDigital,
        fk_class: fm.pkClass,
        title: fm.title,
        comment: fm.comment
      })

      for (const fpm of fm.properties) {
        const theDefault = await this.getOrCreateDefault(fpm);
        await this.datFactoidPropertyMappingRepository.create({
          fk_property: fpm.pkProperty,
          fk_column: fpm.pkColumn,
          fk_factoid_mapping: newFM.pk_entity,
          is_outgoing: fpm.isOutgoing,
          fk_default: theDefault?.pk_entity,
          comment: fpm.comment
        })
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
    if (digital.length == 0) throw new HttpErrors.UnprocessableEntity('The table does not exists');

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

  async getOrCreateDefault(fpm: FactoidPropertyMapping) {
    let defaultValue;
    if (fpm.default?.appellation) { // if appellation
      let d = fpm.default.appellation;
      defaultValue = (await this.infAppellationRepository.find({ where: { quill_doc: d.quill_doc, fk_class: d.fk_class, string: d.string } }))[0]
      if (!defaultValue) defaultValue = await this.infAppellationRepository.create({ quill_doc: d.quill_doc, fk_class: d.fk_class, string: d.string })
    } else if (fpm.default?.dimension) { // if dimension
      let d = fpm.default.dimension;
      defaultValue = (await this.infDimensionRepository.find({ where: { fk_class: d.fk_class, fk_measurement_unit: d.fk_measurement_unit, numeric_value: d.numeric_value } }))[0]
      if (!defaultValue) defaultValue = await this.infDimensionRepository.create({ fk_class: d.fk_class, fk_measurement_unit: d.fk_measurement_unit, numeric_value: d.numeric_value })
    } else if (fpm.default?.langString) { // if langstring
      let d = fpm.default.langString;
      defaultValue = (await this.infLangStringRepository.find({ where: { fk_class: d.fk_class, string: d.string, fk_language: d.fk_language } }))[0]
      if (!defaultValue) defaultValue = await this.infLangStringRepository.create({ fk_class: d.fk_class, quill_doc: d.quill_doc, string: d.string, fk_language: d.fk_language })
    } else if (fpm.default?.language) { // if language
      let d = fpm.default.language;
      defaultValue = (await this.infLanguageRepo.find({ where: { fk_class: d.fk_class, pk_language: d.pk_language, lang_type: d.lang_type, scope: d.scope, iso6392b: d.iso6392b, iso6392t: d.iso6392t, iso6391: d.iso6391, notes: d.notes } }))[0]
      if (!defaultValue) defaultValue = await this.infLanguageRepo.create({ fk_class: d.fk_class, pk_language: d.pk_language, lang_type: d.lang_type, scope: d.scope, iso6392b: d.iso6392b, iso6392t: d.iso6392t, iso6391: d.iso6391, notes: d.notes })
    } else if (fpm.default?.place) { // if place
      let d = fpm.default.place;
      defaultValue = (await this.infPlaceRepository.find({ where: { long: d.long, lat: d.lat, fk_class: d.fk_class } }))[0]
      if (!defaultValue) defaultValue = await this.infPlaceRepository.create({ long: d.long, lat: d.lat, fk_class: d.fk_class })
    } else if (fpm.default?.timePrimitive) { // if place
      let d = fpm.default.timePrimitive;
      defaultValue = (await this.infPlaceRepository.find({ where: { fk_class: d.fk_class, julian_day: d.julian_day, duration: d.duration } }))[0]
      if (!defaultValue) defaultValue = await this.infPlaceRepository.create({ fk_class: d.fk_class, julian_day: d.julian_day, duration: d.duration })
    } else if (fpm.default?.resource) { // if resource
      let d = fpm.default.resource;
      defaultValue = (await this.infResourceRepository.find({ where: { pk_entity: fpm.pkEntity } }))[0]
      if (!defaultValue) defaultValue = await this.infResourceRepository.create(d)
    }
    return defaultValue
  }

  async getDefaultValue(pkEntity: number): Promise<DefaultFactoidPropertyMapping> {
    const toReturn = new DefaultFactoidPropertyMapping();
    toReturn.appellation = await this.infAppellationRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.appellation) toReturn.resource = await this.infResourceRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.resource) toReturn.place = await this.infPlaceRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.place) toReturn.dimension = await this.infDimensionRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.dimension) toReturn.langString = await this.infLangStringRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.langString) toReturn.language = await this.infLanguageRepo.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    if (!toReturn.language) toReturn.timePrimitive = await this.infTimePrimitiveRepository.findOne({ where: { pk_entity: pkEntity } }) ?? undefined;
    return toReturn;
  }
}
