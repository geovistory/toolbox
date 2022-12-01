/* eslint-disable @typescript-eslint/naming-convention */
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io';
import { ws } from '../../decorators/websocket.decorator';
import { WarFieldChangeAddToStream, WarFieldChangeId } from '../../models/war-field-change-id.model';
import { WarFieldChange } from '../../models/war-field-change.model';
import { Streams } from '../../realtime/streams/streams';
import { WebsocketControllerBase } from '../../realtime/websockets/websocker-controller-base';
import { WarFieldChangeRepository } from '../../repositories/war-field-change.repository';

export const IO_FIELD_CHANGE = 'FieldChange'

/**
 * FieldChange Controller
 * Handlentity_typees also websockets
 */
@ws(`/${IO_FIELD_CHANGE}`)
export class FieldChangeController extends WebsocketControllerBase {


  streamSub: Subscription;

  logs = false

  // for caching notifications, to avoid emitting the same modification timestamp more than once
  emittedNotifications: { [key: string]: true } = {}


  constructor(
    @repository(WarFieldChangeRepository)
    public warFieldChangeRepository: WarFieldChangeRepository,
    @inject('streams') private streams: Streams
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

    // Subscribe to stream of timestamps emitted when field changed
    this.streamSub = this.streams.warFieldChanges$.subscribe(
      (warFieldChange) => {
        // // is the warFieldChange a field change of the current project?
        // if (this.cache.currentProjectPk === warFieldChange.fk_project.toString()) {

        // is the changed field part of the stream?
        const fieldId = fieldChangeToStringId(warFieldChange)
        if (this.cache.streamedIds[fieldId]) {
          this.emitFieldChange(warFieldChange)
        }
        // }
      }
    );
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
   * and it immediatly queries the fieldChanges with these ids and emits
   * the results via ws.
   *
   * @param data
   */
  @ws.subscribe(`${IO_FIELD_CHANGE}::addToStream`)
  async handleAddToStream(data: WarFieldChangeAddToStream) {
    if (data.fieldIds.length) {
      this.handleExtendStream(data)

      // create where filters for each fieldId
      const ors = data.fieldIds.map(field => {
        const { fk_project, fk_property, fk_property_of_property, fk_source_info, is_outgoing } = field;
        return { fk_project, fk_property, fk_property_of_property, fk_source_info, is_outgoing }
      })

      if (ors.length > 1000 && !process.env.DISABLE_ORS_LOG) {
        console.log('>> More than 1000 OR\'s, for socked id: ' + this.socket.id)
        console.log(JSON.stringify(ors, null, 2))
      }

      // find the field changes
      const fieldChanges = await this.warFieldChangeRepository.find({ where: { or: ors } })

      // emit them
      fieldChanges.forEach(i => this.emitFieldChange(i))
    }

  }

  /**
   * Register a handler for 'extendStream' events
   * The function extends the cache of streamed entities with the provided data.pks
   * It does not query / emit the previews
   *
   * @param data
  */
  @ws.subscribe(`${IO_FIELD_CHANGE}::extendStream`)
  handleExtendStream(data: WarFieldChangeAddToStream) {
    const ids = data.fieldIds.map(i => fieldChangeToStringId(i))
    return this.extendStream(data.pkProject, ids);
  }

  /**
  * Register a handler for 'removeFromStream' events
  * The function extends the cache of streamed entities with the provided data.pks
  * It does not query / emit the previews
  *
  * @param data
 */
  @ws.subscribe(`${IO_FIELD_CHANGE}::removeFromStream`)
  handleRemoveFromStream(data: WarFieldChangeAddToStream) {
    const ids = data.fieldIds.map(i => fieldChangeToStringId(i))
    return this.removefromStream(data.pkProject, ids);
  }

  /**
   * Register a handler for 'leaveProjectRoom' events
   * @param msg
   */
  @ws.subscribe('leaveProjectRoom')
  handleLeaveProjectRoom() {
    this.saveLeave();
  }

  /**
   * Register a handler for 'general-message-forward' events
   * Useful for testing the connection
   *
   * @param msg - The message sent by client
   */
  @ws.subscribe(`${IO_FIELD_CHANGE}::general-message-forward`)
  handleGeneralMessageForward(msg: unknown) {
    this.socket.nsp.emit('general-message-forward', msg);
  }

  private emitFieldChange(i: WarFieldChange) {
    const key = this.socket.id + '_' + fieldChangeToStringId(i) + '_' + i.tmsp_last_modification;
    if (!this.emittedNotifications[key]) {

      this.socket.emit('fieldChange', i)
      this.log(
        this.socket.id +
        ' emitted fieldChange: ' + JSON.stringify(i) +
        ' for project ' +
        this.cache.currentProjectPk
      );
    }
    this.emittedNotifications[key] = true;

  }


}


export function fieldChangeToStringId(i: WarFieldChangeId): string {


  return `${i.fk_project || 0}_${i.fk_source_info || 0}_${i.fk_property || 0}_${i.fk_property_of_property || 0}_${i.is_outgoing}`
}

