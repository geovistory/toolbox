/* eslint-disable @typescript-eslint/naming-convention */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {DataObject, repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {concat, isEmpty, mergeDeepWith} from 'ramda';
import {Roles} from '../../components/authorization';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {InfLangString, InfResource, InfResourceWithRelations, InfStatement, InfStatementWithRelations, ProInfoProjRel} from '../../models';
import {GvSchemaModifier} from '../../models/gv-schema-modifier.model';
import {InfStatementObjectFks} from '../../models/statement/InfStatementObjectFks';
import {InfStatementObjectValues} from '../../models/statement/InfStatementObjectValues';
import {InfStatementSubjectFks} from '../../models/statement/InfStatementSubjectFks';
import {InfStatementSubjectValues} from '../../models/statement/InfStatementSubjectValues';
import {DatChunkRepository, InfAppellationRepository, InfDimensionRepository, InfLangStringRepository, InfLanguageRepository, InfPlaceRepository, InfResourceRepository, InfStatementRepository, InfTimePrimitiveRepository, ProInfoProjRelRepository} from '../../repositories';

@tags('project data')
export class CreateProjectDataController {

  schemaModifier: GvSchemaModifier = {negative: {}, positive: {}};

  constructor(
    @repository(InfResourceRepository)
    public infResourceRepository: InfResourceRepository,
    @repository(InfStatementRepository)
    public infStatementRepo: InfStatementRepository,
    @repository(ProInfoProjRelRepository)
    public proInfoProjRelRepository: ProInfoProjRelRepository,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
    @repository(DatChunkRepository)
    public datChunkRepo: DatChunkRepository,

    @repository(InfAppellationRepository)
    public infAppellationRepo: InfAppellationRepository,
    @repository(InfLanguageRepository)
    public infLanguageRepo: InfLanguageRepository,
    @repository(InfLangStringRepository)
    public infLangStringRepo: InfLangStringRepository,
    @repository(InfDimensionRepository)
    public infDimensionRepo: InfDimensionRepository,
    @repository(InfPlaceRepository)
    public infPlaceRepo: InfPlaceRepository,
    @repository(InfTimePrimitiveRepository)
    public infTimePrimitiveRepo: InfTimePrimitiveRepository,
  ) { }



  @post('project-data/upsert-resources', {
    responses: {
      '200': {
        description: 'Upserted resources and returned a GvSchemaModifier',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async upsertResources(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(InfResource, {includeRelations: true}),
          }
        }
      },
    }) entities: InfResourceWithRelations[]
  ): Promise<GvSchemaModifier> {

    const promisedEntities = entities.map(entity => this.findOrCreateResourceWithRelations(entity, pkProject))
    await Promise.all(promisedEntities)
    return this.schemaModifier
  }


  @post('project-data/upsert-statements', {
    responses: {
      '200': {
        description: 'Upserted resources and returned a GvSchemaModifier',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async upsertStatements(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(InfStatement, {includeRelations: true}),
          }
        }
      },
    }) statements: InfStatementWithRelations[]
  ): Promise<GvSchemaModifier> {

    const promisedStmts = statements.map(stmt => this.findOrCreateStatementWithRelations(stmt, pkProject))
    await Promise.all(promisedStmts)
    return this.schemaModifier
  }




  async findOrCreateResourceWithRelations(resource: InfResourceWithRelations, project: number): Promise<InfResourceWithRelations> {

    // find or create the resource and its project relations
    const promisedResource = resource.pk_entity ?
      this.findResourceAndUpsertProjectRel(resource, project) :
      this.createResourceAndProjectRel(resource, project);

    const returnedResource = await promisedResource;
    if (!returnedResource?.pk_entity) throw new HttpErrors.NotAcceptable(`Could not find or create resource with id ${resource.pk_entity}`)

    // find or create the statements and their project relations
    if (resource.outgoing_statements) {
      for (const statement of resource.outgoing_statements) {
        statement.fk_subject_info = returnedResource.pk_entity;
        await this.findOrCreateStatementWithRelations(statement, project);
      }
    }
    if (resource.incoming_statements) {
      for (const statement of resource.incoming_statements) {
        statement.fk_object_info = returnedResource.pk_entity;
        await this.findOrCreateStatementWithRelations(statement, project);
      }
    }



    return returnedResource
  }




  private async findResourceAndUpsertProjectRel(resourceWithRels: InfResourceWithRelations, fkProject: number) {
    const returnedResource = await this.infResourceRepository.findById(resourceWithRels.pk_entity);
    if (!returnedResource?.pk_entity) throw new HttpErrors.NotAcceptable(`Could not find resource with id ${resourceWithRels.pk_entity}`)
    const override = resourceWithRels?.entity_version_project_rels?.[0] ?? {}
    await this.upsertInfoProjRel(returnedResource.pk_entity, override, fkProject)


    this.mergeSchemaModifier({
      positive: {
        inf: {resource: [returnedResource]}
      }
    })

    return returnedResource
  }

  /**
   * creates entity with relation to project
   * @param resourceWithRels entity to create. optional: first item in entity_version_project_rels is taken as template
   *               the relation to project. E.g. set is_in_project=false will takein into account.
   *               only fk_project can't be modified this way.
   * @param fkProject the project to relate the entity to
   */
  async createResourceAndProjectRel(resourceWithRels: InfResourceWithRelations, fkProject: number) {
    const {pk_entity, fk_class} = resourceWithRels;
    const createdResource = await this.infResourceRepository.create({pk_entity, fk_class});
    if (!createdResource?.pk_entity) throw new HttpErrors.NotAcceptable(`Could not create resource ${JSON.stringify(resourceWithRels)}`)

    const override = resourceWithRels?.entity_version_project_rels?.[0] ?? {}
    await this.upsertInfoProjRel(createdResource.pk_entity, override, fkProject)

    this.mergeSchemaModifier({
      positive: {
        inf: {resource: [createdResource]}
      }
    })

    return createdResource

  }


  private async upsertInfoProjRel(fkEntity: number, override: Partial<ProInfoProjRel> = {}, fkProject: number) {
    const dataObject: DataObject<ProInfoProjRel> = {
      // defaults:
      fk_entity: fkEntity,
      is_in_project: true,

      // add visibility
      // add fk_creator_project
      ...override,

      // not overrideable:
      fk_creator: parseInt(this.user[securityId]),
      fk_last_modifier: parseInt(this.user[securityId]),
      fk_project: fkProject,
    }
    let projRel: ProInfoProjRel;
    const existing = await this.proInfoProjRelRepository.findOne({where: {fk_entity: fkEntity, fk_project: dataObject.fk_project}})
    if (existing) {
      await this.proInfoProjRelRepository.updateById(existing.pk_entity, dataObject);
      projRel = await this.proInfoProjRelRepository.findById(existing.pk_entity);
    }
    else {
      projRel = await this.proInfoProjRelRepository.create(dataObject);
    }

    this.mergeSchemaModifier({
      positive: {
        pro: {info_proj_rel: [projRel]}
      }
    })
  }

  async findOrCreateStatementWithRelations(statementWithRels: InfStatementWithRelations, project: number) {
    const subject = await this.getStatementSubject(project, statementWithRels);
    const object = await this.getStatementObject(project, statementWithRels);
    const dataObject = this.cloneInfStatementWithoutRelations({
      ...statementWithRels,
      ...subject.fk,
      ...object.fk,
    })
    const createdStatement = await this.infStatementRepo.create(dataObject);
    if (!createdStatement?.pk_entity) throw new HttpErrors.NotAcceptable(`Could not create statement ${JSON.stringify(statementWithRels)}`)

    this.mergeSchemaModifier({
      positive: {
        inf: {
          statement: [createdStatement]
        }
      }
    })
    const override = statementWithRels?.entity_version_project_rels?.[0] ?? {}

    await this.upsertInfoProjRel(createdStatement.pk_entity, override, project)

    return createdStatement;
  }

  /**
 *
 * Get the pk_entity of the subject asyncronously.
 * The promise will return an object with two members:
 * - 'fk', containing one key-value pair
 *   - the key is the name of the statement foreign key pointing to the subject
 *   - the value is the primary key of the subject
 * - 'relatedModelone' (optional), containing one key-value pair
 *   - the key is the name of the related model according to loopbacks model definition
 *   - the value is the related model (e.g. the related time_primitive)
 *
 * @param {*} pkProject
 * @param {*} stmt
 */
  async getStatementSubject(pkProject: number, stmt: InfStatementWithRelations) {

    const stmtSubFk: InfStatementSubjectFks = {}
    const stmtSubVal: InfStatementSubjectValues = {}

    /******************************************************
     * First case: the primary key of subject is known
     *
     * -> return this key without additional function call
     ******************************************************/
    if (stmt.fk_subject_info) stmtSubFk.fk_subject_info = stmt.fk_subject_info
    else if (stmt.fk_subject_data) stmtSubFk.fk_subject_data = stmt.fk_subject_data
    else if (stmt.fk_subject_tables_cell) stmtSubFk.fk_subject_tables_cell = stmt.fk_subject_tables_cell
    else if (stmt.fk_subject_tables_row) stmtSubFk.fk_subject_tables_row = stmt.fk_subject_tables_row

    /******************************************************
     * Second case: the primary key of subject is not known
     * but a related model is given
     *
     * -> find / create the related model to get primary key
     * -> return this new key and the related model
     ******************************************************/

    else if (stmt.subject_resource && !isEmpty(stmt.subject_resource)) {
      stmtSubVal.subject_resource = await this.findOrCreateResourceWithRelations(stmt.subject_resource, pkProject)
      stmtSubFk.fk_subject_info = stmtSubVal.subject_resource.pk_entity
    }

    else if (stmt.subject_chunk && !isEmpty(stmt.subject_chunk)) {
      const created = await this.datChunkRepo.create(stmt.subject_chunk)
      stmtSubVal.subject_chunk = await this.datChunkRepo.findById(created.pk_entity)
      this.mergeSchemaModifier({positive: {dat: {chunk: [stmtSubVal.subject_chunk]}}})
      stmtSubFk.fk_subject_data = stmtSubVal.subject_chunk.pk_entity
    }

    // if subject is a inf statement (we have a statement of statement)
    else if (stmt.subject_statement && !isEmpty(stmt.subject_statement)) {
      stmtSubVal.subject_statement = await this.findOrCreateStatementWithRelations(stmt.subject_statement, pkProject)
      stmtSubFk.fk_subject_info = stmtSubVal.subject_statement.pk_entity
    }
    else {
      throw new HttpErrors.UnprocessableEntity('Subject of statement not found: ' + JSON.stringify(stmt));
    }
    return {fk: stmtSubFk, relatedModel: stmtSubVal}
  }





  /**
   *
   * Get the pk_entity of the object asyncronously.
   * The promise will return a js-object with two members:
   * - 'fk', containing one key-value pair
   *   - the key is the name of the statement foreign key pointing to the object
   *   - the value is the primary key of the object
   * - 'relatedModelone' (optional), containing one key-value pair
   *   - the key is the name of the related model according to loopbacks model definition
   *   - the value is the related model (e.g. the related time_primitive)
   *
   * @param {*} pkProject
   * @param {*} stmt
   * @param {*} ctxWithoutBody
   */
  async getStatementObject(pkProject: number, stmt: InfStatementWithRelations) {

    const stmtObFk: InfStatementObjectFks = {}
    const stmtObVal: InfStatementObjectValues = {}


    /******************************************************
       * First case: the primary key of object is known
       *
       * -> return this key without additional function call
       ******************************************************/
    if (stmt.fk_object_info) stmtObFk.fk_object_info = stmt.fk_object_info
    else if (stmt.fk_object_data) stmtObFk.fk_object_data = stmt.fk_object_data
    else if (stmt.fk_object_tables_cell) stmtObFk.fk_object_tables_cell = stmt.fk_object_tables_cell
    else if (stmt.fk_object_tables_row) stmtObFk.fk_object_tables_row = stmt.fk_object_tables_row


    /******************************************************
     * Second case: the primary key of object is not known
     * but a related model is given
     *
     * -> find / create the related model to get primary key
     * -> return this new key and the related model
     ******************************************************/

    else if (stmt.object_resource && !isEmpty(stmt.object_resource)) {
      stmtObVal.object_resource = await this.findOrCreateResourceWithRelations(stmt.object_resource, pkProject)
      stmtObFk.fk_object_info = stmtObVal.object_resource.pk_entity

    }

    else if (stmt.object_place && !isEmpty(stmt.object_place)) {
      stmtObVal.object_place = await this.infPlaceRepo.create(stmt.object_place)
      this.mergeSchemaModifier({positive: {inf: {place: [stmtObVal.object_place]}}})
      stmtObFk.fk_object_info = stmtObVal.object_place.pk_entity
    }

    else if (stmt.object_dimension && !isEmpty(stmt.object_dimension)) {
      stmtObVal.object_dimension = await this.infDimensionRepo.create(stmt.object_dimension)
      this.mergeSchemaModifier({positive: {inf: {dimension: [stmtObVal.object_dimension]}}})
      stmtObFk.fk_object_info = stmtObVal.object_dimension.pk_entity
    }

    else if (stmt.object_appellation && !isEmpty(stmt.object_appellation)) {
      const created =  await this.infAppellationRepo.create(stmt.object_appellation)
      stmtObVal.object_appellation = await this.infAppellationRepo.findById(created.pk_entity)
      this.mergeSchemaModifier({positive: {inf: {appellation: [stmtObVal.object_appellation]}}})
      stmtObFk.fk_object_info = stmtObVal.object_appellation.pk_entity
    }

    else if (stmt.object_lang_string && !isEmpty(stmt.object_lang_string)) {
      const dataObject = new InfLangString(stmt.object_lang_string).toDataObject()
      const created = await this.infLangStringRepo.create(dataObject)
      stmtObVal.object_lang_string = await this.infLangStringRepo.findById(created.pk_entity)
      this.mergeSchemaModifier({positive: {inf: {lang_string: [stmtObVal.object_lang_string]}}})

      stmtObFk.fk_object_info = stmtObVal.object_lang_string.pk_entity
    }

    else if (stmt.object_language && !isEmpty(stmt.object_language)) {
      stmtObVal.object_language = await this.infLanguageRepo.findById(stmt.object_language.pk_entity)
      this.mergeSchemaModifier({positive: {inf: {language: [stmtObVal.object_language]}}})
      stmtObFk.fk_object_info = stmtObVal.object_language.pk_entity

    }

    else if (stmt.object_time_primitive && !isEmpty(stmt.object_time_primitive)) {
      stmtObVal.object_time_primitive = await this.infTimePrimitiveRepo.create(stmt.object_time_primitive)
      this.mergeSchemaModifier({positive: {inf: {time_primitive: [stmtObVal.object_time_primitive]}}})

      stmtObFk.fk_object_info = stmtObVal.object_time_primitive.pk_entity
    }

    else if (stmt.object_chunk && !isEmpty(stmt.object_chunk)) {
      const created = await this.datChunkRepo.create(stmt.object_chunk)
      stmtObVal.object_chunk = await this.datChunkRepo.findById(created.pk_entity)
      this.mergeSchemaModifier({positive: {dat: {chunk: [stmtObVal.object_chunk]}}})
      stmtObFk.fk_object_data = stmtObVal.object_chunk.pk_entity
    } else {
      throw new HttpErrors.UnprocessableEntity('Object of statement not found: ' + JSON.stringify(stmt));
    }
    return {fk: stmtObFk, relatedModel: stmtObVal}
  }


  cloneInfStatementWithoutRelations(statementWithRels: DataObject<InfStatementWithRelations>): DataObject<InfStatement> {

    const {
      pk_entity, fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, is_in_project_count, is_standard_in_project_count, community_favorite_calendar
    } = statementWithRels;
    return {
      pk_entity, fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, is_in_project_count, is_standard_in_project_count, community_favorite_calendar
    }
  }

  /**
   * Deep merges the given object with the one on the class scope
   * that can be used to return a GvSchemaModifier
   * @param ob
   */
  mergeSchemaModifier(ob: Partial<GvSchemaModifier>) {
    this.schemaModifier = mergeDeepWith(concat, this.schemaModifier, ob)
  }

}

