import {inject, Subscription} from '@loopback/core';
import {Fields} from '@loopback/filter';
import {model, property, repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {groupBy} from 'ramda';
import {Socket} from 'socket.io';
import {QWarEntityPreviewSearchExisiting, SearchExistingRelatedStatement} from '../components/query/q-war-search-existing';
import {Postgres1DataSource} from '../datasources';
import {ws} from '../decorators/websocket.decorator';
import {WarEntityPreview, WarEntityPreviewWithFulltext, WarEntityPreviewWithRelations} from '../models';
import {WarEntityPreviewId} from '../models/entity-preview/WarEntityPreviewId';
import {Streams} from '../realtime/streams/streams';
import {AddToStreamMsg, WebsocketControllerBase} from '../realtime/websockets/websocker-controller-base';
import {WarEntityPreviewRepository} from '../repositories';
import {logSql} from '../utils/helpers';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';
import {EntitySearchHit} from './EntitySearchHit';



// Fields to include in streamed WarEntityPreviews
// see about Lb4 filters: https://loopback.io/doc/en/lb4/Fields-filter.html
const includeFieldsForStream: Fields<WarEntityPreviewWithFulltext> = {
  key: true,
  pk_entity: true,
  project_id: true,
  fk_class: true,
  class_label: true,
  entity_label: true,
  entity_type: true,
  type_label: true,
  fk_type: true,
}



@model() export class WareEntityPreviewPage {
  @property() totalCount: number
  @property.array(EntitySearchHit) data: EntitySearchHit[]

}
@model() export class WarEntityPreviewSearchReq {
  @property({required: true}) projectId: number
  @property({required: true}) searchString: string
  @property.array(Number, {required: true}) pkClasses: number[]
  @property({required: true}) limit: number
  @property({required: true}) page: number
  @property() entityType?: string
}
@model() export class WarEntityPreviewSearchExistingReq extends WarEntityPreviewSearchReq {
  @property() relatedStatement?: SearchExistingRelatedStatement
  @property() scope: string
}


@model() export class WarEntityPreviewPaginatedByPkReq {
  @property({required: true}) pkProject: number
  @property.array(Number, {required: true}) pkEntities: number[]
  @property({required: true}) limit: number
  @property({required: true}) offset: number
}

/**
 * EntityPreview Controller
 * Handlentity_typees also websockets
 */
@ws('/WarEntityPreview')
export class WarEntityPreviewController extends WebsocketControllerBase {


  streamSub: Subscription;
  logs = false

  constructor(
    @repository(WarEntityPreviewRepository)
    public warEntityPreviewRepository: WarEntityPreviewRepository,
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @inject('streams')
    private streams: Streams
  ) {
    super()
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

    if (this.logs) this.log('Client connected to ws: %s', this.socket.id);

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
      const ids = Object.keys(this.cache.streamedIds).map(pk => pk);
      if (ids?.length) {
        // Query entities modified and needed by current cache in project version
        const items = await this.findModifiedSinceTmsp(ids, tmsp);
        result.push(...items)
      }

    }
    return result;
  }


  /**
 * The method is invoked when a client disconnects from the server
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

    const {ids} = this.handleExtendStream(data)
    // const ids = ids.map(id => parseInt(id))
    // Query and emit requested previews
    const allItems = await this.findByKey(ids)
    // const allItems = await this.completeProjectWithRepoPreviews(projectItems, pks);
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
    // const {pkProject, ids} = this.sanitizeAddToStreamMsg(data);
    return this.extendStream(data.pkProject, data.pks);
  }

  /**
   * Register a handler for 'leaveProjectRoom' events
   * @param msg
   */
  @ws.subscribe('leaveProjectRoom')
  handleLeaveProjectRoom() {
    this.saveLeave();
  }

  private sanitizeAddToStreamMsg(data: AddToStreamMsg): {pkProject: number, ids: string[]} {
    return {
      pkProject: data.pkProject,
      ids: this.sanitizeNumberArray(data.pks)
    };
  }


  /**
   * takes any[] and returns string[]
   * All items that are not parsable to an integer are omitted (e.g. 'foo');
   * @param pks
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sanitizeNumberArray(pks: any[]): string[] {
    const sanitizedPks: string[] = [];

    for (const pk of pks) {
      if (typeof pk === 'number') {
        sanitizedPks.push(pk.toString());
      }
      else if (typeof pk === 'string' && !isNaN(parseInt(pk, 10))) {
        sanitizedPks.push(pk);
      }
      else {
        this.warn('Please provide a proper pk_entity');
      }
    }
    return sanitizedPks;
  }

  /**
   * Queries entity previews that are in the array of keys
   *
   * @param keys array of keys in the form of {project_id}_{pk_entity}
   */
  private async findByKey(keys: string[]) {
    // parse the keys into {project_id, pk_entity]
    const grouped = this.groupByProject(keys);

    const res: WarEntityPreviewWithFulltext[] = []
    // query the entity previews for each project_id
    for (const key in grouped) {
      const projectId = parseInt(key);
      const pkEntities = grouped[key].map(item => item.pk_entity);
      const found = await this.warEntityPreviewRepository.find({
        fields: includeFieldsForStream,
        where: {
          and: [
            {project_id: projectId},
            {pk_entity: {inq: pkEntities}}
          ]
        }
      });
      // merge the results
      res.push(...found)
    }

    return res;
  }

  /**
   * Queries project entity previews that are in the array of keys and
   * that are modified at the same time as tsmpLastModification.
   *
   * @param tsmpLastModification
   * @param keys array of keys in the form of {project_id}_{pk_entity}
   */
  private async findModifiedSinceTmsp(keys: string[], tsmpLastModification: string) {
    // parse the keys into {project_id, pk_entity]
    const grouped = this.groupByProject(keys);

    const res: WarEntityPreviewWithFulltext[] = []
    // query the entity previews for each project_id
    for (const key in grouped) {
      const projectId = parseInt(key);
      const pkEntities = grouped[key].map(item => item.pk_entity);
      const found = await this.warEntityPreviewRepository.find({
        fields: includeFieldsForStream,
        where: {
          and: [
            {tmsp_last_modification: {eq: tsmpLastModification}},
            {project_id: projectId},
            {pk_entity: {inq: pkEntities}}
          ]
        }
      });
      // merge the results
      res.push(...found)
    }

    return res;
  }

  private groupByProject(keys: string[]) {
    const parsed: WarEntityPreviewId[] = keys.map(k => {
      const s = k.split('_');
      return {project_id: parseInt(s[0]), pk_entity: parseInt(s[1])};
    });
    // group the keys by project_id
    const grouped = groupBy((item) => item.project_id.toString(), parsed);
    return grouped;
  }

  // emit entity preview
  emitPreview(entityPreview: WarEntityPreviewWithRelations) {
    // check if this should be: this.socket.nsp.emit()
    this.socket.emit('entityPreview', entityPreview);

    // if (log)
    this.log(
      this.socket.id +
      ' emitted entityPreview: ' +
      entityPreview.key +
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

  @post('/war-entity-previews/search', {
    responses: {
      '200': {
        description: 'Array of WarEntityPreview model instances',
        content: {'application/json': {schema: {'x-ts-type': WareEntityPreviewPage}}},
      },
    },
  })
  async search(
    @requestBody() req: WarEntityPreviewSearchExistingReq
  ): Promise<WareEntityPreviewPage> {

    const {tsSearchString, offset, limit} = this.prepareSearchInputs(req.limit, req.page, req.searchString);

    const q = new SqlBuilderLb4Models(this.dataSource)

    const isNumber = !isNaN(parseInt(req.searchString))

    q.sql = `
      WITH tw1 AS (
          select
          ${q.createSelect('t1', WarEntityPreview.definition)},
          ts_headline(full_text, q) as full_text_headline,
          ts_headline(class_label, q) as class_label_headline,
          ts_headline(entity_label, q) as entity_label_headline,
          ts_headline(type_label, q) as type_label_headline,
          count(pk_entity) OVER() AS total_count
          from war.entity_preview t1,
          to_tsquery(${tsSearchString === '' ? "''" : tsSearchString}) q
          WHERE 1=1
          ${tsSearchString
        ? `AND (ts_vector @@ q ${isNumber ? `OR pk_entity::text = ${q.addParam(req.searchString)}` : ''})`
        : ''
      }
          ${req.projectId
        ? `AND project_id = ${q.addParam(req.projectId)}`
        : `AND project_id = 0`
      }
          ${req.entityType ? `AND entity_type = ${q.addParam(req.entityType)}` : ''}
          ${req.pkClasses?.length
        ? `AND fk_class IN (${q.addParams(req.pkClasses)})`
        : ''
      }
          ORDER BY ts_rank(ts_vector, q) DESC, entity_label asc
          LIMIT ${q.addParam(limit)}
          OFFSET ${q.addParam(offset)}
        ),
        ------------------------------------
        --- group parts by model
        ------------------------------------
        items AS  (
          SELECT json_agg(${q.createBuildObject('t1', EntitySearchHit.definition, ['projects', 'related_statements'])}) as json
          FROM tw1 t1
          GROUP BY 1=1
        ),
        count AS  (
          SELECT total_count
          FROM tw1
          LIMIT 1
        )
        ------------------------------------
        --- build final response object
        ------------------------------------
        SELECT
        json_build_object (
          'totalCount', coalesce(count.total_count, 0),
          'data', coalesce(items.json, '[]'::json)
        ) as data
        FROM
        (select 0 ) as one_row
        LEFT JOIN items ON true
        LEFT JOIN count ON true;
        `;

    logSql(q.sql, q.params);

    return q.executeAndReturnFirstData<WareEntityPreviewPage>()
  }



  @post('/war-entity-previews/search-existing', {
    responses: {
      '200': {
        description: 'Array of WarEntityPreview model instances',
        content: {'application/json': {schema: {'x-ts-type': WareEntityPreviewPage}}},
      },
    },
  })
  async searchExisting(
    @requestBody() req: WarEntityPreviewSearchExistingReq
  ): Promise<WareEntityPreviewPage> {
    const i = this.prepareSearchInputs(req.limit, req.page, req.searchString)
    const q = new QWarEntityPreviewSearchExisiting(this.dataSource)
    return q.query(req.projectId, i.tsSearchString, req.searchString, req.pkClasses, i.limit, i.offset, req.entityType, req.relatedStatement, req.scope)
  }

  @post('/war-entity-previews/paginated-list-by-pks', {
    responses: {
      '200': {
        description: 'Array of WarEntityPreview model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': WarEntityPreview,
              },
            }
          }
        },
      },
    },
  })
  async paginatedListByPks(
    @requestBody() req: WarEntityPreviewPaginatedByPkReq
  ): Promise<WarEntityPreview[]> {
    const {pkProject, pkEntities, offset} = req;
    let {limit} = req;

    if (!limit) limit = 10;
    if (limit > 200) limit = 200;
    const q = new SqlBuilderLb4Models(this.dataSource)
    q.sql = `
    WITH tw1 AS (
      SELECT pk_entity, fk_project, fk_class, class_label, entity_label, time_span, entity_type
      FROM war.entity_preview
      WHERE pk_entity IN (${q.addParams(pkEntities)})
      AND project_id = ${q.addParam(pkProject)}
      UNION
      SELECT pk_entity, fk_project, fk_class, class_label, entity_label, time_span, entity_type
      FROM war.entity_preview
      WHERE pk_entity IN (${q.addParams(pkEntities)})
      AND project_id = 0
    ),
    tw2 AS (
      SELECT DISTINCT ON (pk_entity) *
      FROM tw1
      ORDER BY pk_entity, fk_project
    )
    SELECT *
    FROM tw2
    ORDER BY entity_label, class_label
    LIMIT ${q.addParam(limit)}
    OFFSET ${q.addParam(offset)}
  `;
    return q.execute<WarEntityPreview[]>()
  }


  private prepareSearchInputs(limit: number, page: number, searchString: string) {
    if (!Number.isInteger(limit) || limit < 1) {
      // throw an error when the parameter is not a natural number
      throw new HttpErrors.UnprocessableEntity('limit is not a natural number');
    }
    else if (limit > 200) {
      limit = 200;
    }

    // throw an error when the parameter is not a natural number
    if (!Number.isInteger(page) || page < 1) {
      throw new HttpErrors.UnprocessableEntity('page is not zero or a natural number');
    }

    const offset = limit * (page - 1);
    let tsSearchString = '';
    if (searchString) {
      tsSearchString = searchString
        .trim()
        .replace(/'/g, ' ') // replace single quote with a space
        .replace(/ +(?= )/g, '') // replace multiple spaces with a single space
        .split(' ')
        .filter(part => part.length > 0)
        .map((word) => {
          return `'"${word}"':*`;
        })
        .join(' & ')
    }
    if (tsSearchString.length > 0) tsSearchString = `$$${tsSearchString}$$`

    return {tsSearchString, offset, limit};
  }



}
