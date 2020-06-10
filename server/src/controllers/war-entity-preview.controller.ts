import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, param} from '@loopback/rest';
import {Socket} from 'socket.io';
import {ws} from '../decorators/websocket.decorator';
import {WarEntityPreview} from '../models';
import {WarEntityPreviewRepository} from '../repositories';
import {logSql} from '../utils/helpers';
import {SqlBuilderBase} from '../utils/sql-builder-base';


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

interface Cache {
  currentProjectPk: string | undefined,
  streamedPks: {[key: string]: boolean}
}
/**
 * EntityPreview Controller
 * Handles also websockets
 */
@ws('/WarEntityPreview')
export class WarEntityPreviewController {

  // Websockets Connection Cache
  cache: Cache = {
    currentProjectPk: undefined, // the gevistory project
    streamedPks: {}, // the entityPreviews streamed
  };

  constructor(
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
    @repository(WarEntityPreviewRepository)
    public warEntityPreviewRepository: WarEntityPreviewRepository,
  ) {}

  /************************ WEBSOCKET ****************************/
  // everything from here until 'RestAPI' is about websockets

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect(socket: Socket) {
    if (log) this.log('Client connected to ws: %s', this.socket.id);
  }

  /**
   * Register a handler for 'addToStream' events
   * @param msg
   */
  @ws.subscribe('addToStream')
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  handleAddToStream(data: {pkProject: number, pks: (number | string)[]}) {
    const pkProject = data.pkProject;
    const pks = data.pks

    if (!pkProject) return this.warn('Please provide a pkProject');

    // verify that the socket is in the right room
    this.safeJoin(pkProject);

    // sanitize the pks
    const sanitizedPks: string[] = [];

    for (const pk of pks) {
      if (typeof pk === 'number') {
        sanitizedPks.push(pk.toString());
      } else if (typeof pk === 'string') {
        sanitizedPks.push(pk);
      } else {
        this.warn('Please provide a proper pk_entity');
      }
    }

    if (sanitizedPks?.length) {
      // extend the object of streamed sanitizedPks
      sanitizedPks.forEach((pk) => this.extendStreamedPks(pk));

      if (log) {
        this.log(
          'request for EntityPreviews ' +
          JSON.stringify(sanitizedPks) +
          ' by project ' +
          this.cache.currentProjectPk
        );
      }

      // TODO: Migrate the WarEntityPreview Model and replaces the
      // following lines by refactored commented code below
      sanitizedPks.forEach((pk) => this.emitPreview({
        // eslint-disable-next-line @typescript-eslint/camelcase
        pk_entity: parseInt(pk, 10),
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_label: 'ToDo (Lb3->Lb4)'
      }));

      // TODO: Query the entityPreview in DB
      // WarEntityPreview.findComplex(
      //   {
      //     where: [
      //       'fk_project',
      //       '=',
      //       pk_project,
      //       'AND',
      //       'pk_entity',
      //       'IN',
      //       sanitizedPks,
      //     ],
      //   },
      //   (err, projectItems) => {
      //     if (err) return new Error(err);

      //     if (projectItems) {
      //       // emit the ones found in Project
      //       projectItems.forEach((item) => emitPreview(item));

      //       // query repo for the ones not (yet) in project
      //       const notInProject = _.difference(
      //         sanitizedPks,
      //         projectItems.map((item) => item.pk_entity.toString())
      //       );
      //       if (notInProject.length) {
      //         WarEntityPreview.findComplex(
      //           {
      //             where: [
      //               'fk_project',
      //               'IS NULL',
      //               'AND',
      //               'pk_entity',
      //               'IN',
      //               notInProject,
      //             ],
      //           },
      //           (err, repoItems) => {
      //             // emit the ones found in Repo
      //             if (repoItems)
      //               repoItems.forEach((item) => emitPreview(item));
      //           }
      //         );
      //       }
      //     }
      //   }
      // );
    }

  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @ws.disconnect()
  disconnect() {
    this.log('Client disconnected: %s', this.socket.id);
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

      // TODO: make this cache available on app scope
      // WarEntityPreview.cachesByProject[newProjectPk] = cache;
    }
  };

  // emit entity preview
  emitPreview(entityPreview: {pk_entity: number, entity_label: string}) {
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
              items: getModelSchemaRef(WarEntityPreview, {includeRelations: true}),
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
    @param.query.number('page') page: number,
  ): Promise<WarEntityPreview[]> {

    // throw an error when the parameter is not a natural number
    if (!Number.isInteger(limit) || limit < 1) {
      throw new HttpErrors.UnprocessableEntity('limit is not a natural number');
    } else if (limit > 200) {
      limit = 200;
    }

    // throw an error when the parameter is no integer or negative
    if (!Number.isInteger(page) || page < 0) {
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
