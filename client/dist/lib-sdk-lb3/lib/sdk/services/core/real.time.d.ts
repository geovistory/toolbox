import { IO } from './io.service';
import { LoopBackAuth } from './auth.service';
import { FireLoop } from '../../models/FireLoop';
import { SocketConnection } from '../../sockets/socket.connections';
import { SDKModels } from '../custom/SDKModels';
import { Observable } from 'rxjs';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
export declare class RealTime {
    connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    IO: IO;
    FireLoop: FireLoop;
    private connecting;
    private onReadySubject;
    private sharedOnReady;
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    constructor(connection: SocketConnection, models: SDKModels, auth: LoopBackAuth);
    /**
    * @method onDisconnect
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is disconnected from server.
    **/
    onDisconnect(): Observable<any>;
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    onAuthenticated(): Observable<any>;
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    onUnAuthorized(): Observable<any>;
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    onReady(): Observable<any>;
}
