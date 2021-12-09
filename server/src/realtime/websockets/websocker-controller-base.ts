import {Socket} from 'socket.io';

export abstract class WebsocketControllerBase {

  logs = true;

  // Cache of streamed items
  protected cache: StreamedItems = {

    // the gevistory project
    currentProjectPk: undefined,

    // a object where the keys identify the items that are streamed
    streamedIds: {},
  };

  // The socket, which handles our connection for a namespace.
  protected socket: Socket;

  constructor() { }

  /**
   *
   * Implement the connect() function so:
   *
   *    // The method is invoked when a client connects to the server
   *    @ws.connect() connect(socket: Socket) {
   *      this.socket = socket;
   *        // your custom logic
   *    }
   *
   */
  abstract connect(socket: Socket): void


  /**
  *
  * Implement the disconnect() function so:
  *
  *    // The method is invoked when a client disconnects from the server
  *    @ws.disconnect() disconnect(socket: Socket) {
  *      this.log('Client disconnected: %s', this.socket.id);
  *        // your custom logic
  *    }
  *
  */
  abstract disconnect(socket: Socket): void

  // reset cache
  protected resetCache() {
    this.cache.currentProjectPk = undefined;
    this.resetStreamedIds()
  }

  // Reset the set of streamed ids
  protected resetStreamedIds() {
    this.cache.streamedIds = {};
  };

  // Extend the set of streamed ids
  protected extendStreamedIds(pkEntity: string) {
    this.cache.streamedIds[pkEntity] = true;
  };

  // removes key from the set of streamed ids
  protected removeFromStreamIds(pkEntity: string) {
    delete this.cache.streamedIds[pkEntity];
  };

  // Extend the object whith the keys identifying the streamed items
  protected extendStream(pkProject: number, ids: string[]) {

    if (pkProject) {
      // verify that the socket is in the right room
      this.safeJoin(pkProject);

      if (ids?.length) {
        // extend cache of streamedPks
        ids.forEach((pk) => this.extendStreamedIds(pk));

        this.log(`${this.constructor.name}: project ${this.cache.currentProjectPk} extended stream ${this.socket.id} with: ${JSON.stringify(ids)}`);
      }
    }
    else {
      this.warn('Please provide a pkProject');
    }
    return {pkProject, ids};
  }

  // Remove keys from the streamed items
  protected removefromStream(pkProject: number, ids: string[]) {

    if (pkProject) {
      // verify that the socket is in the right room
      this.safeJoin(pkProject);

      if (ids?.length) {
        // extend cache of streamedPks
        ids.forEach((pk) => this.removeFromStreamIds(pk));

        this.log(`${this.constructor.name}: project ${this.cache.currentProjectPk} removed ids from stream ${this.socket.id}: ${JSON.stringify(ids)}`);
      }
    }
    else {
      this.warn('Please provide a pkProject');
    }
    return {pkProject, ids};
  }


  /**
   * Safely join the project room.
   * If the new project is different from the cached project
   * it leaves the cached project room, joins the new project room
   * and resets the cached project and streamed ids
   */
  protected safeJoin(newProjPk: number) {
    const newProjectPk = newProjPk.toString();
    if (newProjectPk !== this.cache.currentProjectPk) {
      if (this.cache.currentProjectPk) {
        this.socket.leave(this.cache.currentProjectPk);
      }

      this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);

      this.socket.join(newProjectPk);

      this.log(this.socket.id + ' joined project ' + newProjectPk);

      this.resetStreamedIds();
      this.cache.currentProjectPk = newProjectPk;

      // make this cache available on app scope
      // this.streams.streamedEntityPreviews[newProjPk] = this.cache;
    }
  };


  /**
   * Safely leave the project room.
   * If there is a cached project, it leaves the project room
   * and resets the cache
   */
  protected saveLeave() {
    if (this.cache.currentProjectPk)
      this.socket.leave(this.cache.currentProjectPk);
    this.log(this.socket.id + ' left project ' + this.cache.currentProjectPk);
    this.resetCache();
  }


  /************************ Generics ****************************/

  protected log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true' || !this.logs) return;
    console.log(msg, ...params)
  }

  protected warn(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true' || !this.logs) return;
    console.warn(msg, ...params)
  }

}






export interface StreamedItems {
  currentProjectPk: string | undefined,
  streamedIds: {[key: string]: boolean}
}

export interface AddToStreamMsg {
  pkProject: number;
  pks: string[];
}
