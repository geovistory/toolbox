import {Socket} from 'socket.io';
import {ws} from '../decorators/websocket.decorator';

const log = true;

interface Cache {
  currentProjectPk: string | undefined,
  streamedPks: {[key: string]: boolean}
}
/**
 * A demo controller for websocket
 */
@ws('/WarEntityPreview')
export class WarEntityPreviewController {

  // Connection Cache
  cache: Cache = {
    currentProjectPk: undefined, // the gevistory project
    streamedPks: {}, // the entityPreviews streamed
  };

  constructor(
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
  ) {}

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

      if (log)
        this.log(
          'request for EntityPreviews ' +
          JSON.stringify(sanitizedPks) +
          ' by project ' +
          this.cache.currentProjectPk
        );

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

    if (log)
      this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);

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

      if (log)
        this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);

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



  private log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.log(msg, ...params)
  }

  private warn(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.warn(msg, ...params)
  }


}
