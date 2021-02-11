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
RealTime.ctorParameters = () => [
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] }
];
RealTime = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(SocketConnection)),
    tslib_1.__param(1, Inject(SDKModels)),
    tslib_1.__param(2, Inject(LoopBackAuth))
], RealTime);
export { RealTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbC50aW1lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic2VydmljZXMvY29yZS9yZWFsLnRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2Qzs7Ozs7Ozs7R0FRRztBQUVILElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFNbkI7Ozs7Ozs7T0FPRztJQUNILFlBQ21DLFVBQTRCLEVBQ2hDLE1BQWlCLEVBQ2QsSUFBa0I7UUFGakIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFkNUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3hELGtCQUFhLEdBQXVCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFjM0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7O09B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LENBQUMsWUFBWSxDQUFDLENBQUE7R0FqQlosUUFBUSxDQThGcEI7U0E5RlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElPIH0gZnJvbSAnLi9pby5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEZpcmVMb29wIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0ZpcmVMb29wJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuLi9jdXN0b20vU0RLTW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vKipcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBqb2huY2FzYXJydWJpYXM+XG4qIEBtb2R1bGUgUmVhbFRpbWVcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBpcyBhIHJlYWwtdGltZSBpbnRlcmZhY2UgZm9yIHVzaW5nIHNvY2tldCBjb25uZWN0aW9ucywgaXRzIG1haW4gcHVycG9zZVxuKiBpcyB0byBtYWtlIHN1cmUgdGhhdCB3aGVuIHRoZXJlIGlzIGEgdmFsaWQgY29ubmVjdGlvbiwgaXQgd2lsbCBjcmVhdGUgaW5zdGFuY2VzXG4qIG9mIHRoZSBkaWZmZXJlbnQgcmVhbC10aW1lIGZ1bmN0aW9uYWxpdGllcyBsaWtlIEZpcmVMb29wLCBQdWJTdWIgYW5kIElPLlxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVhbFRpbWUge1xuICBwdWJsaWMgSU86IElPO1xuICBwdWJsaWMgRmlyZUxvb3A6IEZpcmVMb29wO1xuICBwcml2YXRlIGNvbm5lY3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBvblJlYWR5U3ViamVjdDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwcml2YXRlIHNoYXJlZE9uUmVhZHk6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMub25SZWFkeVN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShzaGFyZSgpKTtcbiAgLyoqXG4gICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAqIEBwYXJhbSB7U29ja2V0Q29ubmVjdGlvbn0gY29ubmVjdGlvbiBXZWJTb2NrZXQgY29ubmVjdGlvbiBzZXJ2aWNlXG4gICogQHBhcmFtIHtTREtNb2RlbHN9IG1vZGVscyBNb2RlbCBwcm92aWRlciBzZXJ2aWNlXG4gICogQHBhcmFtIHtMb29wQmFja0F1dGh9IGF1dGggTG9vcEJhY2sgYXV0aGVudGljYXRpb24gc2VydmljZVxuICAqIEBkZXNjcmlwdGlvblxuICAqIEl0IHdpbGwgaW50aWFsaXplIHRoZSBzaGFyZWQgb24gcmVhZHkgY29tbXVuaWNhdGlvbiBjaGFubmVsLlxuICAqKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwdWJsaWMgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoXG4gICkge1xuICAgIHRoaXMuc2hhcmVkT25SZWFkeS5zdWJzY3JpYmUoKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uRGlzY29ubmVjdFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gXG4gICogQGRlc2NyaXB0aW9uXG4gICogV2lsbCB0cmlnZ2VyIHdoZW4gUmVhbC1UaW1lIFNlcnZpY2UgaXMgZGlzY29ubmVjdGVkIGZyb20gc2VydmVyLlxuICAqKi9cbiAgb25EaXNjb25uZWN0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkRpc2Nvbm5lY3Q7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvbkF1dGhlbnRpY2F0ZWRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IFxuICAqIEBkZXNjcmlwdGlvblxuICAqIFdpbGwgdHJpZ2dlciB3aGVuIFJlYWwtVGltZSBTZXJ2aWNlIGlzIGF1dGhlbnRpY2F0ZWQgd2l0aCB0aGUgc2VydmVyLlxuICAqKi9cbiAgb25BdXRoZW50aWNhdGVkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkF1dGhlbnRpY2F0ZWQ7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvblVuQXV0aG9yaXplZFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gXG4gICogQGRlc2NyaXB0aW9uXG4gICogV2lsbCB0cmlnZ2VyIHdoZW4gUmVhbC1UaW1lIFNlcnZpY2UgaXMgbm90IGF1dGhvcml6ZWQgdG8gY29ubmVjdCB3aXRoIHRoZSBzZXJ2ZXIuXG4gICoqL1xuICBvblVuQXV0aG9yaXplZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25VbkF1dGhvcml6ZWQ7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvblJlYWR5XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSBcbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBXaWxsIHRyaWdnZXIgd2hlbiBSZWFsLVRpbWUgU2VydmljZSBpcyBSZWFkeSBmb3IgYnJvYWRjYXN0aW5nLlxuICAqIGFuZCB3aWxsIHJlZ2lzdGVyIGNvbm5lY3Rpb24gZmxvdyBldmVudHMgdG8gbm90aWZ5IHN1YnNjcmliZXJzLlxuICAqKi9cbiAgcHVibGljIG9uUmVhZHkoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBJZiB0aGVyZSBpcyBhIHZhbGlkIGNvbm5lY3Rpb24sIHRoZW4gd2UganVzdCBzZW5kIGJhY2sgdG8gdGhlIEV2ZW50TG9vcFxuICAgIC8vIE9yIG5leHQgd2lsbCBiZSBleGVjdXRlZCBiZWZvcmUgdGhlIGFjdHVhbCBzdWJzY3JpcHRpb24uXG4gICAgaWYgKHRoaXMuY29ubmVjdGlvbi5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICBsZXQgdG8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vblJlYWR5U3ViamVjdC5uZXh0KCdzaGFyZWQtY29ubmVjdGlvbicpO1xuICAgICAgICBjbGVhclRpbWVvdXQodG8pO1xuICAgICAgfSk7XG4gICAgLy8gRWxzZSBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgYXR0ZW1wdCBvZiBjb25uZWN0aW9uIHdlIHdhaXQgZm9yIHRoZSBwcmlvclxuICAgIC8vIHByb2Nlc3MgdGhhdCBzdGFydGVkIHRoZSBjb25uZWN0aW9uIGZsb3cuXG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbm5lY3RpbmcpIHtcbiAgICAgIGxldCB0aSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgdGhpcy5vblJlYWR5U3ViamVjdC5uZXh0KCdzaGFyZWQtY29ubmVjdGlvbicpO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGkpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDApO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vdCB2YWxpZCBjb25uZWN0aW9uIG9yIGF0dGVtcHQsIHRoZW4gd2Ugc3RhcnQgdGhlIGNvbm5lY3Rpb24gZmxvd1xuICAgIC8vIGFuZCBtYWtlIHN1cmUgd2Ugbm90aWZ5IGFsbCB0aGUgb25SZWFkeSBzdWJzY3JpYmVycyB3aGVuIGRvbmUuXG4gICAgLy8gQWxzbyBpdCB3aWxsIGxpc3RlbiBmb3IgZGVzY29ubmVjdGlvbnMgc28gd2UgdW5zdWJzY3JpYmUgYW5kIGF2b2lkIGJvdGg6XG4gICAgLy8gTWVtb3J5IGxlYWtzIGFuZCBkdXBsaWNhdGVkIHRyaWdnZXJlZCBldmVudHMuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29ubmVjdGluZyA9IHRydWU7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCh0aGlzLmF1dGguZ2V0VG9rZW4oKSk7XG4gICAgICB0aGlzLklPICAgICAgID0gbmV3IElPKHRoaXMuY29ubmVjdGlvbik7XG4gICAgICB0aGlzLkZpcmVMb29wID0gbmV3IEZpcmVMb29wKHRoaXMuY29ubmVjdGlvbiwgdGhpcy5tb2RlbHMpO1xuICAgICAgLy8gRmlyZSBldmVudCBmb3IgdGhvc2Ugc3Vic2NyaWJlZCBcbiAgICAgIGxldCBzMTogU3Vic2NyaXB0aW9uID0gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQ29ubmVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVhbC1UaW1lIGNvbm5lY3Rpb24gaGFzIGJlZW4gZXN0YWJsaXNoZWQnKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25SZWFkeVN1YmplY3QubmV4dCgnY29ubmVjdGVkJyk7XG4gICAgICAgIGxldCBzMjogU3Vic2NyaXB0aW9uID0gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHMxLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgczIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkT25SZWFkeTtcbiAgfVxufVxuIl19