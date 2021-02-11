import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, NgZone } from '@angular/core';
import { SocketDriver } from './socket.driver';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoopBackConfig } from '../lb.config';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
let SocketConnection = class SocketConnection {
    /**
     * @method constructor
     * @param {SocketDriver} driver Socket IO Driver
     * @param {NgZone} zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    constructor(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new Subject(),
            onDisconnect: new Subject(),
            onAuthenticated: new Subject(),
            onUnAuthorized: new Subject()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().pipe(share()),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().pipe(share()),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().pipe(share()),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().pipe(share())
        };
        // This is needed to create the first channel, subsequents will share the connection
        // We are using Hot Observables to avoid duplicating connection status events.
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    /**
     * @method connect
     * @param {AccessToken} token AccesToken instance
     * @return {void}
     * @description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     **/
    connect(token = null) {
        if (!this.socket) {
            console.info('Creating a new connection with: ', LoopBackConfig.getPath());
            // Create new socket connection
            this.socket = this.driver.connect(LoopBackConfig.getPath(), {
                log: false,
                secure: LoopBackConfig.isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            // Listen for connection
            this.on('connect', () => {
                this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now    
                this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', () => {
                this.authenticated = true;
                this.subjects.onAuthenticated.next();
                this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', (err) => {
                this.authenticated = false;
                this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', (status) => this.subjects.onDisconnect.next(status));
        }
        else if (this.socket && !this.socket.connected) {
            if (typeof this.socket.off === 'function') {
                this.socket.off();
            }
            if (typeof this.socket.destroy === 'function') {
                this.socket.destroy();
            }
            delete this.socket;
            this.connect(token);
        }
    }
    /**
     * @method isConnected
     * @return {boolean}
     * @description
     * This method will return true or false depending on established connections
     **/
    isConnected() {
        return (this.socket && this.socket.connected);
    }
    /**
     * @method on
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     **/
    on(event, handler) {
        this.socket.on(event, (data) => this.zone.run(() => handler(data)));
    }
    /**
     * @method emit
     * @param {string} event Event name
     * @param {any=} data Any type of data
     * @return {void}
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    emit(event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    }
    /**
     * @method removeListener
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeListener(event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    }
    /**
     * @method removeAllListeners
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeAllListeners(event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    }
    /**
     * @method disconnect
     * @return {void}
     * @description
     * This will disconnect the client from the server
     **/
    disconnect() {
        this.socket.disconnect();
    }
    /**
     * @method heartbeater
     * @return {void}
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    heartbeater() {
        let heartbeater = setInterval(() => {
            if (this.isConnected()) {
                this.socket.emit('lb-ping');
            }
            else {
                this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', (data) => console.info('Heartbeat: ', data));
    }
};
SocketConnection.ctorParameters = () => [
    { type: SocketDriver, decorators: [{ type: Inject, args: [SocketDriver,] }] },
    { type: NgZone, decorators: [{ type: Inject, args: [NgZone,] }] }
];
SocketConnection = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(SocketDriver)),
    tslib_1.__param(1, Inject(NgZone))
], SocketConnection);
export { SocketConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmNvbm5lY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM5Qzs7Ozs7Ozs7R0FRRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBb0IzQjs7Ozs7Ozs7UUFRSTtJQUNKLFlBQ2dDLE1BQW9CLEVBQzFCLElBQVk7UUFETixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVE7UUE3QjlCLGFBQVEsR0FLWjtZQUNGLFNBQVMsRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUN4QixZQUFZLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDM0IsZUFBZSxFQUFFLElBQUksT0FBTyxFQUFFO1lBQzlCLGNBQWMsRUFBRSxJQUFJLE9BQU8sRUFBRTtTQUM5QixDQUFDO1FBQ0ssc0JBQWlCLEdBS3BCLEVBQUUsQ0FBQztRQUNBLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBY3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRztZQUN2QixlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JFLGtCQUFrQixFQUFFLElBQUksQ0FB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YmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0RHJpdmVyIH0gZnJvbSAnLi9zb2NrZXQuZHJpdmVyJztcbmltcG9ydCB7IEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi9sYi5jb25maWcnO1xuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4qIEBtb2R1bGUgU29ja2V0Q29ubmVjdGlvblxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBzb2NrZXQgY29ubmVjdGlvbnMgYW5kIHJldHVybiBzaW5nbGV0b24gaW5zdGFuY2VzIGZvciBlYWNoXG4qIGNvbm5lY3Rpb24sIGl0IHdpbGwgdXNlIHRoZSBTREsgU29ja2V0IERyaXZlciBBdmFpbGFibGUgY3VycmVudGx5IHN1cHBvcnRpbmdcbiogQW5ndWxhciAyIGZvciB3ZWIsIE5hdGl2ZVNjcmlwdCAyIGFuZCBBbmd1bGFyIFVuaXZlcnNhbC5cbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2tldENvbm5lY3Rpb24ge1xuICBwcml2YXRlIHNvY2tldDogYW55O1xuICBwcml2YXRlIHN1YmplY3RzOiB7XG4gICAgb25Db25uZWN0OiBTdWJqZWN0PGFueT4sXG4gICAgb25EaXNjb25uZWN0OiBTdWJqZWN0PGFueT4sXG4gICAgb25BdXRoZW50aWNhdGVkOiBTdWJqZWN0PGFueT4sXG4gICAgb25VbkF1dGhvcml6ZWQ6IFN1YmplY3Q8YW55PlxuICB9ID0ge1xuICAgIG9uQ29ubmVjdDogbmV3IFN1YmplY3QoKSxcbiAgICBvbkRpc2Nvbm5lY3Q6IG5ldyBTdWJqZWN0KCksXG4gICAgb25BdXRoZW50aWNhdGVkOiBuZXcgU3ViamVjdCgpLFxuICAgIG9uVW5BdXRob3JpemVkOiBuZXcgU3ViamVjdCgpXG4gIH07XG4gIHB1YmxpYyBzaGFyZWRPYnNlcnZhYmxlczoge1xuICAgIHNoYXJlZE9uQ29ubmVjdD86IE9ic2VydmFibGU8YW55PixcbiAgICBzaGFyZWRPbkRpc2Nvbm5lY3Q/OiBPYnNlcnZhYmxlPGFueT4sXG4gICAgc2hhcmVkT25BdXRoZW50aWNhdGVkPzogT2JzZXJ2YWJsZTxhbnk+LFxuICAgIHNoYXJlZE9uVW5BdXRob3JpemVkPzogT2JzZXJ2YWJsZTxhbnk+XG4gIH0gPSB7fTtcbiAgcHVibGljIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTb2NrZXREcml2ZXJ9IGRyaXZlciBTb2NrZXQgSU8gRHJpdmVyXG4gICAqIEBwYXJhbSB7Tmdab25lfSB6b25lIEFuZ3VsYXIgMiBab25lXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgY29uc3RydWN0b3Igd2lsbCBzZXQgcmVmZXJlbmNlcyBmb3IgdGhlIHNoYXJlZCBob3Qgb2JzZXJ2YWJsZXMgZnJvbVxuICAgKiB0aGUgY2xhc3Mgc3ViamVjdHMuIFRoZW4gaXQgd2lsbCBzdWJzY3JpYmUgZWFjaCBvZiB0aGVzZSBvYnNlcnZhYmxlc1xuICAgKiB0aGF0IHdpbGwgY3JlYXRlIGEgY2hhbm5lbCB0aGF0IGxhdGVyIHdpbGwgYmUgc2hhcmVkIGJldHdlZW4gc3Vic2NyaWJlcnMuXG4gICAqKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChTb2NrZXREcml2ZXIpIHByaXZhdGUgZHJpdmVyOiBTb2NrZXREcml2ZXIsXG4gICAgQEluamVjdChOZ1pvbmUpIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge1xuICAgIHRoaXMuc2hhcmVkT2JzZXJ2YWJsZXMgPSB7XG4gICAgICBzaGFyZWRPbkNvbm5lY3Q6IHRoaXMuc3ViamVjdHMub25Db25uZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoc2hhcmUoKSksXG4gICAgICBzaGFyZWRPbkRpc2Nvbm5lY3Q6IHRoaXMuc3ViamVjdHMub25EaXNjb25uZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoc2hhcmUoKSksXG4gICAgICBzaGFyZWRPbkF1dGhlbnRpY2F0ZWQ6IHRoaXMuc3ViamVjdHMub25BdXRoZW50aWNhdGVkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoc2hhcmUoKSksXG4gICAgICBzaGFyZWRPblVuQXV0aG9yaXplZDogdGhpcy5zdWJqZWN0cy5vblVuQXV0aG9yaXplZC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpXG4gICAgfTtcbiAgICAvLyBUaGlzIGlzIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpcnN0IGNoYW5uZWwsIHN1YnNlcXVlbnRzIHdpbGwgc2hhcmUgdGhlIGNvbm5lY3Rpb25cbiAgICAvLyBXZSBhcmUgdXNpbmcgSG90IE9ic2VydmFibGVzIHRvIGF2b2lkIGR1cGxpY2F0aW5nIGNvbm5lY3Rpb24gc3RhdHVzIGV2ZW50cy5cbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQ29ubmVjdC5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdC5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQXV0aGVudGljYXRlZC5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uVW5BdXRob3JpemVkLnN1YnNjcmliZSgpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbm5lY3RcbiAgICogQHBhcmFtIHtBY2Nlc3NUb2tlbn0gdG9rZW4gQWNjZXNUb2tlbiBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBjcmVhdGUgYSBuZXcgc29ja2V0IGNvbm5lY3Rpb24gd2hlbiBub3QgcHJldmlvdXNseSBlc3RhYmxpc2hlZC5cbiAgICogSWYgdGhlcmUgaXMgYSBicm9rZW4gY29ubmVjdGlvbiBpdCB3aWxsIHJlLWNvbm5lY3QuXG4gICAqKi9cbiAgcHVibGljIGNvbm5lY3QodG9rZW46IEFjY2Vzc1Rva2VuID0gbnVsbCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zb2NrZXQpIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnQ3JlYXRpbmcgYSBuZXcgY29ubmVjdGlvbiB3aXRoOiAnLCBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkpO1xuICAgICAgLy8gQ3JlYXRlIG5ldyBzb2NrZXQgY29ubmVjdGlvblxuICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmRyaXZlci5jb25uZWN0KExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSwge1xuICAgICAgICBsb2c6IGZhbHNlLFxuICAgICAgICBzZWN1cmU6IExvb3BCYWNrQ29uZmlnLmlzU2VjdXJlV2ViU29ja2V0c1NldCgpLFxuICAgICAgICBmb3JjZU5ldzogdHJ1ZSxcbiAgICAgICAgZm9yY2VXZWJzb2NrZXRzOiB0cnVlLFxuICAgICAgICB0cmFuc3BvcnRzOiBbJ3dlYnNvY2tldCddXG4gICAgICB9KTtcbiAgICAgIC8vIExpc3RlbiBmb3IgY29ubmVjdGlvblxuICAgICAgdGhpcy5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWJqZWN0cy5vbkNvbm5lY3QubmV4dCgnY29ubmVjdGVkJyk7XG4gICAgICAgIC8vIEF1dGhlbnRpY2F0ZSBvciBzdGFydCBoZWFydGJlYXQgbm93ICAgIFxuICAgICAgICB0aGlzLmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywgdG9rZW4pO1xuICAgICAgfSk7XG4gICAgICAvLyBMaXN0ZW4gZm9yIGF1dGhlbnRpY2F0aW9uXG4gICAgICB0aGlzLm9uKCdhdXRoZW50aWNhdGVkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1YmplY3RzLm9uQXV0aGVudGljYXRlZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0ZXIoKTtcbiAgICAgIH0pXG4gICAgICAvLyBMaXN0ZW4gZm9yIGF1dGhlbnRpY2F0aW9uXG4gICAgICB0aGlzLm9uKCd1bmF1dGhvcml6ZWQnLCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3ViamVjdHMub25VbkF1dGhvcml6ZWQubmV4dChlcnIpO1xuICAgICAgfSlcbiAgICAgIC8vIExpc3RlbiBmb3IgZGlzY29ubmVjdGlvbnNcbiAgICAgIHRoaXMub24oJ2Rpc2Nvbm5lY3QnLCAoc3RhdHVzOiBhbnkpID0+IHRoaXMuc3ViamVjdHMub25EaXNjb25uZWN0Lm5leHQoc3RhdHVzKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNvY2tldCAmJiAhdGhpcy5zb2NrZXQuY29ubmVjdGVkKXtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zb2NrZXQub2ZmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9mZigpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnNvY2tldC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLnNvY2tldDtcbiAgICAgIHRoaXMuY29ubmVjdCh0b2tlbik7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGlzQ29ubmVjdGVkXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBlc3RhYmxpc2hlZCBjb25uZWN0aW9uc1xuICAgKiovXG4gIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuc29ja2V0ICYmIHRoaXMuc29ja2V0LmNvbm5lY3RlZCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBsaXN0ZW5lciBoYW5kbGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW4gZm9yIHNlcnZlciBldmVudHMgZnJvbSB0aGUgY3VycmVudCBXZWJTb2NrZXQgY29ubmVjdGlvbi5cbiAgICogVGhpcyBtZXRob2QgaXMgYSBmYWNhZGUgdGhhdCB3aWxsIHdyYXAgdGhlIG9yaWdpbmFsIFwib25cIiBtZXRob2QgYW5kIHJ1biBpdFxuICAgKiB3aXRoaW4gdGhlIEFuZ3VsYXIgWm9uZSB0byBhdm9pZCB1cGRhdGUgaXNzdWVzLlxuICAgKiovXG4gIHB1YmxpYyBvbihldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50LCAoZGF0YTogYW55KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGhhbmRsZXIoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICAqIEBwYXJhbSB7YW55PX0gZGF0YSBBbnkgdHlwZSBvZiBkYXRhXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNlbmQgYW55IHR5cGUgb2YgZGF0YSB0byB0aGUgc2VydmVyIGFjY29yZGluZyB0aGUgZXZlbnQgc2V0LlxuICAgKiovXG4gIHB1YmxpYyBlbWl0KGV2ZW50OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdChldmVudCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVMaXN0ZW5lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIEV2ZW50IGxpc3RlbmVyIGhhbmRsZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgd3JhcCB0aGUgb3JpZ2luYWwgXCJvblwiIG1ldGhvZCBhbmQgcnVuIGl0IHdpdGhpbiB0aGUgQW5ndWxhciBab25lXG4gICAqIE5vdGU6IG9mZiBpcyBiZWluZyB1c2VkIHNpbmNlIHRoZSBuYXRpdmVzY3JpcHQgc29ja2V0IGlvIGNsaWVudCBkb2VzIG5vdCBwcm92aWRlXG4gICAqIHJlbW92ZUxpc3RlbmVyIG1ldGhvZCwgYnV0IG9ubHkgcHJvdmlkZXMgd2l0aCBvZmYgd2hpY2ggaXMgcHJvdmlkZWQgaW4gYW55IHBsYXRmb3JtLlxuICAgKiovXG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lcihldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zb2NrZXQub2ZmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNvY2tldC5vZmYoZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVBbGxMaXN0ZW5lcnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBsaXN0ZW5lciBoYW5kbGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHdyYXAgdGhlIG9yaWdpbmFsIFwib25cIiBtZXRob2QgYW5kIHJ1biBpdCB3aXRoaW4gdGhlIEFuZ3VsYXIgWm9uZVxuICAgKiBOb3RlOiBvZmYgaXMgYmVpbmcgdXNlZCBzaW5jZSB0aGUgbmF0aXZlc2NyaXB0IHNvY2tldCBpbyBjbGllbnQgZG9lcyBub3QgcHJvdmlkZVxuICAgKiByZW1vdmVMaXN0ZW5lciBtZXRob2QsIGJ1dCBvbmx5IHByb3ZpZGVzIHdpdGggb2ZmIHdoaWNoIGlzIHByb3ZpZGVkIGluIGFueSBwbGF0Zm9ybS5cbiAgICoqL1xuICBwdWJsaWMgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzY29ubmVjdFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyB3aWxsIGRpc2Nvbm5lY3QgdGhlIGNsaWVudCBmcm9tIHRoZSBzZXJ2ZXJcbiAgICoqL1xuICBwdWJsaWMgZGlzY29ubmVjdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgaGVhcnRiZWF0ZXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgd2lsbCBrZWVwIHRoZSBjb25uZWN0aW9uIGFzIGFjdGl2ZSwgZXZlbiB3aGVuIHVzZXJzIGFyZSBub3Qgc2VuZGluZ1xuICAgKiBkYXRhLCB0aGlzIGF2b2lkcyBkaXNjb25uZWN0aW9uIGJlY2F1c2Ugb2YgYSBjb25uZWN0aW9uIG5vdCBiZWluZyB1c2VkLlxuICAgKiovXG4gIHByaXZhdGUgaGVhcnRiZWF0ZXIoKTogdm9pZCB7XG4gICAgbGV0IGhlYXJ0YmVhdGVyOiBhbnkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2xiLXBpbmcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycygnbGItcG9uZycpO1xuICAgICAgICBjbGVhckludGVydmFsKGhlYXJ0YmVhdGVyKTtcbiAgICAgIH1cbiAgICB9LCAxNTAwMCk7XG4gICAgdGhpcy5zb2NrZXQub24oJ2xiLXBvbmcnLCAoZGF0YTogYW55KSA9PiBjb25zb2xlLmluZm8oJ0hlYXJ0YmVhdDogJywgZGF0YSkpO1xuICB9XG59XG4iXX0=