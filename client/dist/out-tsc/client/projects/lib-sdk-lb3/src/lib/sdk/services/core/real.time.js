import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { IO } from './io.service';
import { LoopBackAuth } from './auth.service';
import { FireLoop } from '../../models/FireLoop';
import { SocketConnection } from '../../sockets/socket.connections';
import { SDKModels } from '../custom/SDKModels';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
let RealTime = class RealTime {
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    constructor(connection, models, auth) {
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.connecting = false;
        this.onReadySubject = new Subject();
        this.sharedOnReady = this.onReadySubject.asObservable().pipe(share());
        this.sharedOnReady.subscribe();
    }
    /**
    * @method onDisconnect
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is disconnected from server.
    **/
    onDisconnect() {
        return this.connection.sharedObservables.sharedOnDisconnect;
    }
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    onAuthenticated() {
        return this.connection.sharedObservables.sharedOnAuthenticated;
    }
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    onUnAuthorized() {
        return this.connection.sharedObservables.sharedOnUnAuthorized;
    }
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    onReady() {
        // If there is a valid connection, then we just send back to the EventLoop
        // Or next will be executed before the actual subscription.
        if (this.connection.isConnected()) {
            let to = setTimeout(() => {
                this.onReadySubject.next('shared-connection');
                clearTimeout(to);
            });
            // Else if there is a current attempt of connection we wait for the prior
            // process that started the connection flow.
        }
        else if (this.connecting) {
            let ti = setInterval(() => {
                if (this.connection.isConnected()) {
                    this.onReadySubject.next('shared-connection');
                    clearInterval(ti);
                }
            }, 500);
            // If there is not valid connection or attempt, then we start the connection flow
            // and make sure we notify all the onReady subscribers when done.
            // Also it will listen for desconnections so we unsubscribe and avoid both:
            // Memory leaks and duplicated triggered events.
        }
        else {
            this.connecting = true;
            this.connection.connect(this.auth.getToken());
            this.IO = new IO(this.connection);
            this.FireLoop = new FireLoop(this.connection, this.models);
            // Fire event for those subscribed 
            let s1 = this.connection.sharedObservables.sharedOnConnect.subscribe(() => {
                console.log('Real-Time connection has been established');
                this.connecting = false;
                this.onReadySubject.next('connected');
                let s2 = this.connection.sharedObservables.sharedOnDisconnect.subscribe(() => {
                    s1.unsubscribe();
                    s2.unsubscribe();
                });
            });
        }
        return this.sharedOnReady;
    }
};
RealTime = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(SocketConnection)),
    tslib_1.__param(1, Inject(SDKModels)),
    tslib_1.__param(2, Inject(LoopBackAuth))
], RealTime);
export { RealTime };
//# sourceMappingURL=real.time.js.map