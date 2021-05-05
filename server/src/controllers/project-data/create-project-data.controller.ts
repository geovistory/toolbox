/* eslint-disable @typescript-eslint/camelcase */
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {HttpErrors, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {isEmpty} from 'ramda';
import {Roles} from '../../components/authorization';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {InfStatement} from '../../models';
import {InfResourceWithRelations} from '../../models/inf-resource-with-relations.model';
import {InfStatementObjectFks} from '../../models/statement/InfStatementObjectFks';
import {InfStatementObjectValues} from '../../models/statement/InfStatementObjectValues';
import {InfStatementSubjectFks} from '../../models/statement/InfStatementSubjectFks';
import {InfStatementSubjectValues} from '../../models/statement/InfStatementSubjectValues';
import {InfStatementWithRelations} from '../../models/statement/InfStatementWithRelations';
import {DatChunkRepository, InfAppellationRepository, InfDimensionRepository, InfLangStringRepository, InfLanguageRepository, InfPlaceRepository, InfStatementRepository, InfResourceRepository, InfTimePrimitiveRepository, ProInfoProjRelRepository} from '../../repositories';

@tags('project data')
export class CreateProjectDataController {
  constructor(
    @repository(InfResourceRepository)
    public infTemporalEntityRepository: InfResourceRepository,
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
        description: 'InfResourceWithRelations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': InfResourceWithRelations
              },
            }
          }
        }
      },
    },
  })
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async create(
    @param.path.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              'x-ts-type': InfResourceWithRelations
            },
          }
        }
      },
    }) entities: InfResourceWithRelations[]
  ): Promise<InfResourceWithRelations[]> {

    const promisedEntities = entities.map(entity => this.findOrCreateResourceWithRelations(entity, pkProject))
    const upsertedEntities = await Promise.all(promisedEntities)

    return upsertedEntities
  }






  async findOrCreateResourceWithRelations(entity: InfResourceWithRelations, project: number): Promise<InfResourceWithRelations> {

    // find or create the entity
    const promisedEntity = entity.pk_entity ?
      this.infTemporalEntityRepository.findById(entity.pk_entity) :
      this.createResourceWithRelations(entity, project);

    const returnedEntity: InfResourceWithRelations = await promisedEntity;
    if (!returnedEntity) throw new HttpErrors.NotAcceptable(`Could not find entity with id ${entity.pk_entity}`)

    const promisedOutStmts: Promise<InfStatement>[] = []
    const promisedInStmts: Promise<InfStatement>[] = []

    // find or create the statements
    if (entity.outgoing_statements) {
      for (const statement of entity.outgoing_statements) {
        statement.fk_subject_info = returnedEntity.pk_entity;
        const promisedStatement = this.findOrCreateStatement(statement, project);
        promisedOutStmts.push(promisedStatement)
      }
    }
    if (entity.incoming_statements) {
      for (const statement of entity.incoming_statements) {
        statement.fk_object_info = returnedEntity.pk_entity;
        const promisedStatement = this.findOrCreateStatement(statement, project);
        promisedInStmts.push(promisedStatement)
      }
    }

    returnedEntity.outgoing_statements = await Promise.all(promisedOutStmts)
    returnedEntity.incoming_statements = await Promise.all(promisedInStmts)

    return returnedEntity
  }




  /**
   * creates entity with relation to project
   * @param entity entity to create. optional: first item in entity_version_project_rels is taken as template
   *               the relation to project. E.g. set is_in_project=false will takein into account.
   *               only fk_project can't be modified this way.
   * @param fkProject the project to relate the entity to
   */
  async createResourceWithRelations(entity: InfResourceWithRelations, fkProject: number) {
    const createdEntity = await this.infTemporalEntityRepository.create(entity);
    if (!createdEntity) throw new HttpErrors.NotAcceptable(`Could not create entity with id ${entity.pk_entity}`)

    const override = entity?.entity_version_project_rels?.[0] ?? {}

    const projRel = await this.proInfoProjRelRepository.create({
      fk_entity: createdEntity.pk_entity,
      is_in_project: true,
      fk_creator: parseInt(this.user[securityId]),

      // add visibility
      // add fk_creator_project

      ...override,

      fk_project: fkProject, // add after override for security reasons
    })
    createdEntity.entity_version_project_rels = [projRel]

    return createdEntity;

  }


  async findOrCreateStatement(statement: InfStatementWithRelations, project: number) {
    const subject = await this.getStatementSubject(project, statement);
    const object = await this.getStatementObject(project, statement);
    const promisedStatement = this.infStatementRepo.create({
      ...statement,
      ...subject.fk,
      ...object.fk,
    });
    return promisedStatement;
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
      stmtSubVal.subject_resource = await this.createResourceWithRelations(stmt.subject_resource, pkProject)
      stmtSubFk.fk_subject_info = stmtSubVal.subject_resource.pk_entity
    }

    else if (stmt.subject_chunk && !isEmpty(stmt.subject_chunk)) {
      stmtSubVal.subject_chunk = await this.datChunkRepo.create(stmt.subject_chunk)
      stmtSubFk.fk_subject_data = stmtSubVal.subject_chunk.pk_entity
    }

    // if subject is a inf statement (we have a statement of statement)
    else if (stmt.subject_statement && !isEmpty(stmt.subject_statement)) {
      stmtSubVal.subject_statement = await this.infStatementRepo.create(stmt.subject_statement)
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
      stmtObVal.object_resource = await this.createResourceWithRelations(stmt.object_resource, pkProject)
      stmtObFk.fk_object_info = stmtObVal.object_resource.pk_entity

    }

    else if (stmt.object_place && !isEmpty(stmt.object_place)) {
      stmtObVal.object_place = await this.infPlaceRepo.create(stmt.object_place)
      stmtObFk.fk_object_info = stmtObVal.object_place.pk_entity
    }

    else if (stmt.object_dimension && !isEmpty(stmt.object_dimension)) {
      stmtObVal.object_dimension = await this.infDimensionRepo.create(stmt.object_dimension)
      stmtObFk.fk_object_info = stmtObVal.object_dimension.pk_entity
    }

    else if (stmt.object_appellation && !isEmpty(stmt.object_appellation)) {
      stmtObVal.object_appellation = await this.infAppellationRepo.create(stmt.object_appellation)
      stmtObFk.fk_object_info = stmtObVal.object_appellation.pk_entity
    }

    else if (stmt.object_lang_string && !isEmpty(stmt.object_lang_string)) {
      stmtObVal.object_lang_string = await this.infLangStringRepo.create(stmt.object_lang_string)
      stmtObFk.fk_object_info = stmtObVal.object_lang_string.pk_entity
    }

    else if (stmt.object_language && !isEmpty(stmt.object_language)) {
      stmtObVal.object_language = await this.infLanguageRepo.findById(stmt.object_language.pk_entity)
      stmtObFk.fk_object_info = stmtObVal.object_language.pk_entity

    }

    else if (stmt.object_time_primitive && !isEmpty(stmt.object_time_primitive)) {
      stmtObVal.object_time_primitive = await this.infTimePrimitiveRepo.create(stmt.object_time_primitive)
      stmtObFk.fk_object_info = stmtObVal.object_time_primitive.pk_entity
    }

    else if (stmt.object_chunk && !isEmpty(stmt.object_chunk)) {
      stmtObVal.object_chunk = await this.datChunkRepo.create(stmt.object_chunk)
      stmtObFk.fk_object_data = stmtObVal.object_chunk.pk_entity
    } else {
      throw new HttpErrors.UnprocessableEntity('Object of statement not found: ' + JSON.stringify(stmt));
    }
    return {fk: stmtObFk, relatedModel: stmtObVal}
  }




}

