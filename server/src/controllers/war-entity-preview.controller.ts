/* eslint-disable @typescript-eslint/camelcase */
import {inject, Subscription} from '@loopback/core';
import {repository, Fields} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, param} from '@loopback/rest';
import _ from 'lodash';
import {Socket} from 'socket.io';
import {ws} from '../decorators/websocket.decorator';
import {WarEntityPreviewWithFulltext, WarEntityPreviewWithRelations} from '../models';
import {Streams} from '../realtime/streams/streams';
import {WarEntityPreviewRepository} from '../repositories';
import {logSql} from '../utils/helpers';
import {SqlBuilderBase} from '../utils/sql-builders/sql-builder-base';
import {indexBy, keys} from 'ramda';
/**
 * TODO-LB3-LB4
 *
 * methods
     'project_member'
        "search",
        "searchExisting",
        "searchExistingWithRelatedStatement",
        "paginatedListByPks",
        "paginatedList"
      'system_admin
        "createAll"
 */


const log = true;

// Fields to include in streamed WarEntityPreviews
// see about Lb4 filters: https://loopback.io/doc/en/lb4/Fields-filter.html
const includeFieldsForSteam: Fields<WarEntityPreviewWithFulltext> = {
  pk_entity: true,
  fk_project: true,
  fk_class: true,
  class_label: true,
  entity_label: true,
  entity_type: true,
  type_label: true,
  fk_type: true,
}

export interface StreamedEntityPreviews {
  currentProjectPk: string | undefined,
  streamedPks: {[key: string]: boolean}
}
interface AddToStreamMsg {
  pkProject: number;
  pks: (number | string)[];
}

/**
 * EntityPreview Controller
 * Handlentity_typees also websockets
 */
@ws('/WarEntityPreview')
export class WarEntityPreviewController {

  // Websockets Connection Cache
  cache: StreamedEntityPreviews = {
    currentProjectPk: undefined, // the gevistory project
    streamedPks: {}, // the entityPreviews streamed
  };

  streamSub: Subscription;

  private socket: Socket;

  constructor(
    @repository(WarEntityPreviewRepository)
    public warEntityPreviewRepository: WarEntityPreviewRepository,
    @inject('streams')
    private streams: Streams
  ) {

  }

  /************************ WEBSOCKET ****************************/
  // everything from here until 'RestAPI' is about websockets

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect(socket: Socket) {

    this.socket = socket;

    if (log) this.log('Client connected to ws: %s', this.socket.id);

    // Subscribe to stream of timestamps emitted when warehouse updated
    this.streamSub = this.streams.warEntityPreviewModificationTmsp$.subscribe(
      (tmsp) => {
        this.findModifiedOfCacheSinceTmsp(tmsp).then(
          (res) => {
            if (res.length) this.emitEntityPreviews(res)
          },
          (err) => {
            throw new HttpErrors.InternalServerError(err.message);
          }
        )
      }
    );
  }

  /**
   * Queries entitiy previews that where modified at the time or after
   * tsmpLastModification and that belon to the subset streamed previews
   * in this server-client websocket connection.
   * If items are found in the database, these are emitted to client via websockets.
   *
   * @param tmsp
   */
  private async findModifiedOfCacheSinceTmsp(tmsp: string): Promise<WarEntityPreviewWithRelations[]> {
    const result: WarEntityPreviewWithRelations[] = [];

    if (this.cache.currentProjectPk) {
      const entityPks = Object.keys(this.cache.streamedPks).map(pk => parseInt(pk, 10));
      if (entityPks?.length) {
        const pkProject = parseInt(this.cache.currentProjectPk, 10)

        // Query entities modified and needed by current cache in project version
        const projectItems = await this.findModifiedSinceTmsp(pkProject, entityPks, tmsp);
        const projectItemsIdx = indexBy((i) => i?.pk_entity?.toString() ?? '', projectItems)

        // Query entities modified and needed by current cache in repo version
        const repoItems = await this.findRepoModifiedSinceTmsp(pkProject, entityPks, tmsp);


        result.push(...projectItems)

        for (const repoItem of repoItems) {
          if (repoItem.pk_entity && !projectItemsIdx[repoItem.pk_entity.toString()]) {
            result.push(repoItem)
          }
        }

      }

    }
    return result;
  }


  /**
 * The method is invoked when a client disconnects from the server
 * @param socket
 */
  @ws.disconnect()
  disconnect() {
    this.log('Client disconnected: %s', this.socket.id);
    // Unsubscribe the db listener
    this.streamSub.unsubscribe();
  }

  /**
   * Register a handler for 'addToStream' events
   * The function extends the cache of streamed entities with the provided data.pks
   * and it immediatly queries the entity previews with these pks and emits
   * the results via ws.
   *
   * @param data
   */
  @ws.subscribe('addToStream')
  async handleAddToStream(data: AddToStreamMsg) {
    const {pkProject, sanitizedPks} = this.extendStream(data)
    // Query and emit requested previews
    const projectItems = await this.findByProjectAndEntityPks(pkProject, sanitizedPks)
    const allItems = await this.completeProjectWithRepoPreviews(projectItems, sanitizedPks);
    this.emitEntityPreviews(allItems);
  }

  /**
   * Register a handler for 'addToStream' events
   * The function extends the cache of streamed entities with the provided data.pks
   * It does not query / emit the previews
   *
   * @param data
  */
  @ws.subscribe('extendStream')
  handleExtendStream(data: AddToStreamMsg) {
    return this.extendStream(data);
  }

  private extendStream(data: AddToStreamMsg) {
    const pkProject = data.pkProject;
    const pks = data.pks;
    let sanitizedPks: number[] = [];

    if (pkProject) {
      // verify that the socket is in the right room
      this.safeJoin(pkProject);

      // sanitize the pks
      sanitizedPks = this.sanitizeNumberArray(pks);

      if (sanitizedPks?.length) {
        // extend cache of streamedPks
        sanitizedPks.forEach((pk) => this.extendStreamedPks(pk.toString()));

        if (log) {
          this.log(
            'request for EntityPreviews ' +
            JSON.stringify(sanitizedPks) +
            ' by project ' +
            this.cache.currentProjectPk
          );
        }
      }
    }
    else {
      this.warn('Please provide a pkProject');
    }
    return {pkProject, sanitizedPks};
  }

  /**
   * takes any[] and returns number[]
   * All items that are not parsable to an integer are omitted (e.g. 'foo');
   * @param pks
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sanitizeNumberArray(pks: any[]) {
    const sanitizedPks: number[] = [];

    for (const pk of pks) {
      if (typeof pk === 'number') {
        sanitizedPks.push(pk);
      }
      else if (typeof pk === 'string' && !isNaN(parseInt(pk, 10))) {
        sanitizedPks.push(parseInt(pk, 10));
      }
      else {
        this.warn('Please provide a proper pk_entity');
      }
    }
    return sanitizedPks;
  }

  /**
   * Queries entity previews that are in the array of entityPks and belong to given project.
   * Set pkProject to null to query repo version.
   *
   * @param pkProject if null, repo version is queried, if number, project version is queried
   * @param entityPks array of pk_entity of the entity prieviews to query
   */
  private async findByProjectAndEntityPks(pkProject: number | null, entityPks: number[]) {
    return this.warEntityPreviewRepository.find({
      fields: includeFieldsForSteam,
      where: {
        and: [
          {fk_project: {eq: pkProject}},
          {pk_entity: {inq: entityPks}},
        ]
      }
    });
  }

  /**
   * Queries project entity previews that are in the array of entityPks and
   * that belong to chached project and that are modified at the same time or
   * after tsmpLastModification.
   *
   * @param tsmpLastModification
   * @param entityPks
   */
  private async findModifiedSinceTmsp(pkProject: number, entityPks: number[], tsmpLastModification: string) {
    return this.warEntityPreviewRepository.find({
      fields: includeFieldsForSteam,
      where: {
        and: [
          {tmsp_last_modification: {eq: tsmpLastModification}},
          {fk_project: {eq: pkProject}},
          {pk_entity: {inq: entityPks}}
        ]
      }
    });
  }

  /**
  * Queries repo entity previews that are in the array of entityPks and
  * and that are modified at the same time or after tsmpLastModification
  * that are not available as project version.
  *
  * @param tsmpLastModification
  * @param entityPks
  */
  private async findRepoModifiedSinceTmsp(pkProject: number, entityPks: number[], tsmpLastModification: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addParam = (val: any) => {
      params.push(val)
      return '$' + params.length
    }
    const sql = `WITH tw0 AS (
      Select pk_entity
      FROM war.entity_preview
      WHERE project = 0
      AND tmsp_last_modification >= ${addParam(tsmpLastModification)}
      AND pk_entity IN (${entityPks.map(pk => addParam(pk))})
      EXCEPT
      Select pk_entity
      FROM war.entity_preview
      WHERE project = ${addParam(pkProject)}
    )
    SELECT ${keys(includeFieldsForSteam).map(k => 't1.' + k).join(', ')}
    FROM war.entity_preview t1,
    tw0 t2
    WHERE t1.pk_entity = t2.pk_entity
    AND t1.project = 0`
    return this.warEntityPreviewRepository.dataSource.execute(sql, params);
  }




  private async completeProjectWithRepoPreviews(projectItems: WarEntityPreviewWithRelations[], requestedPks: number[]): Promise<WarEntityPreviewWithRelations[]> {
    const result: WarEntityPreviewWithRelations[] = [...projectItems]


    // find pks of requestedPks not present in projectItems
    const notInProject = _.difference(
      requestedPks.map((item) => item),
      projectItems.map((item) => item?.pk_entity)
    ).filter(x => typeof x === 'number') as number[];

    // query repo versions
    if (notInProject.length) {
      const repoItems = await this.findByProjectAndEntityPks(null, notInProject);
      // add repo versions to result
      result.push(...repoItems)
    }

    return result;
  }



  /**
   * Register a handler for 'leaveProjectRoom' events
   * @param msg
   */
  @ws.subscribe('leaveProjectRoom')
  handleLeaveProjectRoom() {
    // leave the room
    if (this.cache.currentProjectPk) this.socket.leave(this.cache.currentProjectPk);

    if (log) {this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);}

    // reset cache
    this.cache.currentProjectPk = undefined;
    this.cache.streamedPks = {}
  }




  // Reset the set of streamed pks
  resetStreamedPks() {
    this.cache.streamedPks = {};
  };

  // Extend the set of streamed pks
  extendStreamedPks(pkEntity: string) {
    this.cache.streamedPks[pkEntity] = true;
  };

  // Manage the room (project) of the socket
  safeJoin(newProjPk: number) {
    const newProjectPk = newProjPk.toString();
    if (newProjectPk !== this.cache.currentProjectPk) {
      if (this.cache.currentProjectPk) {
        this.socket.leave(this.cache.currentProjectPk);
      }

      if (log) {this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);}

      this.socket.join(newProjectPk);

      if (log) this.log(this.socket.id + ' joined project ' + newProjectPk);

      this.resetStreamedPks();
      this.cache.currentProjectPk = newProjectPk;

      // make this cache available on app scope
      this.streams.streamedEntityPreviews[newProjPk] = this.cache;
    }
  };

  // emit entity preview
  emitPreview(entityPreview: WarEntityPreviewWithRelations) {
    // check if this should be: this.socket.nsp.emit()
    this.socket.emit('entityPreview', entityPreview);

    // if (log)
    this.log(
      this.socket.id +
      ' emitted entityPreview: ' +
      entityPreview.pk_entity +
      ' ' +
      entityPreview.entity_label +
      ' for project ' +
      this.cache.currentProjectPk
    );
  };

  // emit all items in array of entity preview
  private emitEntityPreviews(items: WarEntityPreviewWithRelations[]) {
    items.forEach(item => this.emitPreview(item));
  }



  /************************ RestAPI ****************************/
  // everything from here until 'Generics' is about RestAPI

  @get('/war-entity-previews', {
    responses: {
      '200': {
        description: 'Array of WarEntityPreview model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(WarEntityPreviewWithFulltext, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  // TODO: put all query parameters into one requestBody object
  // This will allow to properly type
  // - pkClasses as number[]
  // - entityType as 'peIt'|'teEn'
  async find(
    @param.query.number('projectId') projectId: number,
    @param.query.string('searchString') searchString: string,
    @param.query.object('pkClasses') pkClasses: number[],
    @param.query.string('entityType') entityType: string,
    @param.query.number('limit') limit = 10,
    @param.query.number('page') page = 1,
  ): Promise<WarEntityPreviewWithFulltext[]> {

    // throw an error when the parameter is not a natural number
    if (!Number.isInteger(limit) || limit < 1) {
      throw new HttpErrors.UnprocessableEntity('limit is not a natural number');
    } else if (limit > 200) {
      limit = 200;
    }

    // throw an error when the parameter is not a natural number
    if (!Number.isInteger(page) || page < 1) {
      throw new HttpErrors.UnprocessableEntity('page is not zero or a natural number');
    }

    const offset = limit * (page - 1);

    const queryString = searchString ?
      searchString
        .trim()
        .split(' ')
        .map((word) => {
          return word + ':*';
        })
        .join(' & ')
      : '';

    const q = new SqlBuilderBase()

    q.sql = `
        select
        fk_project,
        pk_entity,
        fk_class,
        entity_label,
        class_label,
        entity_type,
        type_label,
        fk_type,
        time_span,
        ts_headline(full_text, q) as full_text_headline,
        ts_headline(class_label, q) as class_label_headline,
        ts_headline(entity_label, q) as entity_label_headline,
        ts_headline(type_label, q) as type_label_headline,
        count(pk_entity) OVER() AS total_count
        from war.entity_preview,
        to_tsquery(${q.addParam(queryString)}) q
        WHERE 1=1
        ${
      queryString
        ? `AND (ts_vector @@ q OR pk_entity::text = ${q.addParam(
          searchString
        )})`
        : ''
      }
        ${
      projectId
        ? `AND fk_project = ${q.addParam(projectId)}`
        : `AND fk_project IS NULL`
      }
        ${entityType ? `AND entity_type = ${q.addParam(entityType)}` : ''}
        ${
      pkClasses?.length
        ? `AND fk_class IN (${q.addParams(pkClasses)})`
        : ''
      }
        ORDER BY ts_rank(ts_vector, q) DESC, entity_label asc
        LIMIT ${q.addParam(limit)}
        OFFSET ${q.addParam(offset)};
        `;

    if (log) logSql(q.sql, q.params);

    return this.warEntityPreviewRepository.dataSource.execute(q.sql, q.params)
  }




  /************************ Generics ****************************/

  private log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.log(msg, ...params)
  }

  private warn(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.warn(msg, ...params)
  }


}
