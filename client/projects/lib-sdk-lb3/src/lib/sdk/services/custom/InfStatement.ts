/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { SocketConnection } from '../../sockets/socket.connections';
import { LoopBackAuth } from '../core/auth.service';
import { BaseLoopBackApi } from '../core/base.service';
import { ErrorHandler } from '../core/error.service';
import { SDKModels } from './SDKModels';


/**
 * Api services for the `InfStatement` model.
 */
@Injectable()
export class InfStatementApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, connection, models, auth, errorHandler);
  }


  /**
   * The name of the model represented by this $resource,
   * i.e. `InfStatement`.
   */
  public getModelName() {
    return "InfStatement";
  }
}
