/* eslint-disable @typescript-eslint/camelcase */
import {inject, Subscription} from '@loopback/core';
import {Socket} from 'socket.io';
import {ws} from '../decorators/websocket.decorator';
import {Streams} from '../realtime/streams/streams';


/**
 * SysStatus Controller
 * Reads system status from database and streams it to client via websockets
 */
@ws('/SysStatus')
export class SysStatusController {


  streamSub: Subscription;

  private socket: Socket;

  constructor(
    @inject('streams') private streams: Streams
  ) {

  }

  /************************ WEBSOCKET ****************************/

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect(socket: Socket) {

    this.socket = socket;

    // Subscribe to stream of timestamps emitted when warehouse updated
    this.streamSub = this.streams.warehouseInitializing$.subscribe((b) => {
      this.socket.emit('warehouseInitializing', b);
    })
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
