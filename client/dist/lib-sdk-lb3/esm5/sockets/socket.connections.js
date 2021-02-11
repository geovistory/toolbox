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
var SocketConnection = /** @class */ (function () {
    /**
     * @method constructor
     * @param {SocketDriver} driver Socket IO Driver
     * @param {NgZone} zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    function SocketConnection(driver, zone) {
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
    SocketConnection.prototype.connect = function (token) {
        var _this = this;
        if (token === void 0) { token = null; }
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
            this.on('connect', function () {
                _this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now    
                _this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', function () {
                _this.authenticated = true;
                _this.subjects.onAuthenticated.next();
                _this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', function (err) {
                _this.authenticated = false;
                _this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', function (status) { return _this.subjects.onDisconnect.next(status); });
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
    };
    /**
     * @method isConnected
     * @return {boolean}
     * @description
     * This method will return true or false depending on established connections
     **/
    SocketConnection.prototype.isConnected = function () {
        return (this.socket && this.socket.connected);
    };
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
    SocketConnection.prototype.on = function (event, handler) {
        var _this = this;
        this.socket.on(event, function (data) { return _this.zone.run(function () { return handler(data); }); });
    };
    /**
     * @method emit
     * @param {string} event Event name
     * @param {any=} data Any type of data
     * @return {void}
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    SocketConnection.prototype.emit = function (event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    };
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
    SocketConnection.prototype.removeListener = function (event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    };
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
    SocketConnection.prototype.removeAllListeners = function (event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    };
    /**
     * @method disconnect
     * @return {void}
     * @description
     * This will disconnect the client from the server
     **/
    SocketConnection.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    /**
     * @method heartbeater
     * @return {void}
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    SocketConnection.prototype.heartbeater = function () {
        var _this = this;
        var heartbeater = setInterval(function () {
            if (_this.isConnected()) {
                _this.socket.emit('lb-ping');
            }
            else {
                _this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
    };
    SocketConnection.ctorParameters = function () { return [
        { type: SocketDriver, decorators: [{ type: Inject, args: [SocketDriver,] }] },
        { type: NgZone, decorators: [{ type: Inject, args: [NgZone,] }] }
    ]; };
    SocketConnection = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(SocketDriver)),
        tslib_1.__param(1, Inject(NgZone))
    ], SocketConnection);
    return SocketConnection;
}());
export { SocketConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmNvbm5lY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUM7Ozs7Ozs7O0dBUUc7QUFFSDtJQW9CRTs7Ozs7Ozs7UUFRSTtJQUNKLDBCQUNnQyxNQUFvQixFQUMxQixJQUFZO1FBRE4sV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUMxQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBN0I5QixhQUFRLEdBS1o7WUFDRixTQUFTLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDeEIsWUFBWSxFQUFFLElBQUksT0FBTyxFQUFFO1lBQzNCLGVBQWUsRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUM5QixjQUFjLEVBQUUsSUFBSSxPQUFPLEVBQUU7U0FDOUIsQ0FBQztRQUNLLHNCQUFpQixHQUtwQixFQUFFLENBQUM7UUFDQSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQWNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUc7WUFDdkIsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJ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QUQsdUJBQUM7Q0FBQSxBQTdMRCxJQTZMQztTQTdMWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldERyaXZlciB9IGZyb20gJy4vc29ja2V0LmRyaXZlcic7XG5pbXBvcnQgeyBBY2Nlc3NUb2tlbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vbGIuY29uZmlnJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIFNvY2tldENvbm5lY3Rpb25cbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgc29ja2V0IGNvbm5lY3Rpb25zIGFuZCByZXR1cm4gc2luZ2xldG9uIGluc3RhbmNlcyBmb3IgZWFjaFxuKiBjb25uZWN0aW9uLCBpdCB3aWxsIHVzZSB0aGUgU0RLIFNvY2tldCBEcml2ZXIgQXZhaWxhYmxlIGN1cnJlbnRseSBzdXBwb3J0aW5nXG4qIEFuZ3VsYXIgMiBmb3Igd2ViLCBOYXRpdmVTY3JpcHQgMiBhbmQgQW5ndWxhciBVbml2ZXJzYWwuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2NrZXRDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcbiAgcHJpdmF0ZSBzdWJqZWN0czoge1xuICAgIG9uQ29ubmVjdDogU3ViamVjdDxhbnk+LFxuICAgIG9uRGlzY29ubmVjdDogU3ViamVjdDxhbnk+LFxuICAgIG9uQXV0aGVudGljYXRlZDogU3ViamVjdDxhbnk+LFxuICAgIG9uVW5BdXRob3JpemVkOiBTdWJqZWN0PGFueT5cbiAgfSA9IHtcbiAgICBvbkNvbm5lY3Q6IG5ldyBTdWJqZWN0KCksXG4gICAgb25EaXNjb25uZWN0OiBuZXcgU3ViamVjdCgpLFxuICAgIG9uQXV0aGVudGljYXRlZDogbmV3IFN1YmplY3QoKSxcbiAgICBvblVuQXV0aG9yaXplZDogbmV3IFN1YmplY3QoKVxuICB9O1xuICBwdWJsaWMgc2hhcmVkT2JzZXJ2YWJsZXM6IHtcbiAgICBzaGFyZWRPbkNvbm5lY3Q/OiBPYnNlcnZhYmxlPGFueT4sXG4gICAgc2hhcmVkT25EaXNjb25uZWN0PzogT2JzZXJ2YWJsZTxhbnk+LFxuICAgIHNoYXJlZE9uQXV0aGVudGljYXRlZD86IE9ic2VydmFibGU8YW55PixcbiAgICBzaGFyZWRPblVuQXV0aG9yaXplZD86IE9ic2VydmFibGU8YW55PlxuICB9ID0ge307XG4gIHB1YmxpYyBhdXRoZW50aWNhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U29ja2V0RHJpdmVyfSBkcml2ZXIgU29ja2V0IElPIERyaXZlclxuICAgKiBAcGFyYW0ge05nWm9uZX0gem9uZSBBbmd1bGFyIDIgWm9uZVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGNvbnN0cnVjdG9yIHdpbGwgc2V0IHJlZmVyZW5jZXMgZm9yIHRoZSBzaGFyZWQgaG90IG9ic2VydmFibGVzIGZyb21cbiAgICogdGhlIGNsYXNzIHN1YmplY3RzLiBUaGVuIGl0IHdpbGwgc3Vic2NyaWJlIGVhY2ggb2YgdGhlc2Ugb2JzZXJ2YWJsZXNcbiAgICogdGhhdCB3aWxsIGNyZWF0ZSBhIGNoYW5uZWwgdGhhdCBsYXRlciB3aWxsIGJlIHNoYXJlZCBiZXR3ZWVuIHN1YnNjcmliZXJzLlxuICAgKiovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoU29ja2V0RHJpdmVyKSBwcml2YXRlIGRyaXZlcjogU29ja2V0RHJpdmVyLFxuICAgIEBJbmplY3QoTmdab25lKSBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzID0ge1xuICAgICAgc2hhcmVkT25Db25uZWN0OiB0aGlzLnN1YmplY3RzLm9uQ29ubmVjdC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpLFxuICAgICAgc2hhcmVkT25EaXNjb25uZWN0OiB0aGlzLnN1YmplY3RzLm9uRGlzY29ubmVjdC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpLFxuICAgICAgc2hhcmVkT25BdXRoZW50aWNhdGVkOiB0aGlzLnN1YmplY3RzLm9uQXV0aGVudGljYXRlZC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpLFxuICAgICAgc2hhcmVkT25VbkF1dGhvcml6ZWQ6IHRoaXMuc3ViamVjdHMub25VbkF1dGhvcml6ZWQuYXNPYnNlcnZhYmxlKCkucGlwZShzaGFyZSgpKVxuICAgIH07XG4gICAgLy8gVGhpcyBpcyBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaXJzdCBjaGFubmVsLCBzdWJzZXF1ZW50cyB3aWxsIHNoYXJlIHRoZSBjb25uZWN0aW9uXG4gICAgLy8gV2UgYXJlIHVzaW5nIEhvdCBPYnNlcnZhYmxlcyB0byBhdm9pZCBkdXBsaWNhdGluZyBjb25uZWN0aW9uIHN0YXR1cyBldmVudHMuXG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkNvbm5lY3Quc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkRpc2Nvbm5lY3Quc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkF1dGhlbnRpY2F0ZWQuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPblVuQXV0aG9yaXplZC5zdWJzY3JpYmUoKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBjb25uZWN0XG4gICAqIEBwYXJhbSB7QWNjZXNzVG9rZW59IHRva2VuIEFjY2VzVG9rZW4gaW5zdGFuY2VcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgY3JlYXRlIGEgbmV3IHNvY2tldCBjb25uZWN0aW9uIHdoZW4gbm90IHByZXZpb3VzbHkgZXN0YWJsaXNoZWQuXG4gICAqIElmIHRoZXJlIGlzIGEgYnJva2VuIGNvbm5lY3Rpb24gaXQgd2lsbCByZS1jb25uZWN0LlxuICAgKiovXG4gIHB1YmxpYyBjb25uZWN0KHRva2VuOiBBY2Nlc3NUb2tlbiA9IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc29ja2V0KSB7XG4gICAgICBjb25zb2xlLmluZm8oJ0NyZWF0aW5nIGEgbmV3IGNvbm5lY3Rpb24gd2l0aDogJywgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpKTtcbiAgICAgIC8vIENyZWF0ZSBuZXcgc29ja2V0IGNvbm5lY3Rpb25cbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5kcml2ZXIuY29ubmVjdChMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksIHtcbiAgICAgICAgbG9nOiBmYWxzZSxcbiAgICAgICAgc2VjdXJlOiBMb29wQmFja0NvbmZpZy5pc1NlY3VyZVdlYlNvY2tldHNTZXQoKSxcbiAgICAgICAgZm9yY2VOZXc6IHRydWUsXG4gICAgICAgIGZvcmNlV2Vic29ja2V0czogdHJ1ZSxcbiAgICAgICAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXVxuICAgICAgfSk7XG4gICAgICAvLyBMaXN0ZW4gZm9yIGNvbm5lY3Rpb25cbiAgICAgIHRoaXMub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3ViamVjdHMub25Db25uZWN0Lm5leHQoJ2Nvbm5lY3RlZCcpO1xuICAgICAgICAvLyBBdXRoZW50aWNhdGUgb3Igc3RhcnQgaGVhcnRiZWF0IG5vdyAgICBcbiAgICAgICAgdGhpcy5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHRva2VuKTtcbiAgICAgIH0pO1xuICAgICAgLy8gTGlzdGVuIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAgdGhpcy5vbignYXV0aGVudGljYXRlZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdWJqZWN0cy5vbkF1dGhlbnRpY2F0ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdGVyKCk7XG4gICAgICB9KVxuICAgICAgLy8gTGlzdGVuIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAgdGhpcy5vbigndW5hdXRob3JpemVkJywgKGVycjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1YmplY3RzLm9uVW5BdXRob3JpemVkLm5leHQoZXJyKTtcbiAgICAgIH0pXG4gICAgICAvLyBMaXN0ZW4gZm9yIGRpc2Nvbm5lY3Rpb25zXG4gICAgICB0aGlzLm9uKCdkaXNjb25uZWN0JywgKHN0YXR1czogYW55KSA9PiB0aGlzLnN1YmplY3RzLm9uRGlzY29ubmVjdC5uZXh0KHN0YXR1cykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zb2NrZXQgJiYgIXRoaXMuc29ja2V0LmNvbm5lY3RlZCl7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuc29ja2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNvY2tldC5vZmYoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zb2NrZXQuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNvY2tldC5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5zb2NrZXQ7XG4gICAgICB0aGlzLmNvbm5lY3QodG9rZW4pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBpc0Nvbm5lY3RlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gZXN0YWJsaXNoZWQgY29ubmVjdGlvbnNcbiAgICoqL1xuICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLnNvY2tldCAmJiB0aGlzLnNvY2tldC5jb25uZWN0ZWQpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgbGlzdGVuZXIgaGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2QgbGlzdGVuIGZvciBzZXJ2ZXIgZXZlbnRzIGZyb20gdGhlIGN1cnJlbnQgV2ViU29ja2V0IGNvbm5lY3Rpb24uXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgZmFjYWRlIHRoYXQgd2lsbCB3cmFwIHRoZSBvcmlnaW5hbCBcIm9uXCIgbWV0aG9kIGFuZCBydW4gaXRcbiAgICogd2l0aGluIHRoZSBBbmd1bGFyIFpvbmUgdG8gYXZvaWQgdXBkYXRlIGlzc3Vlcy5cbiAgICoqL1xuICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKGRhdGE6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBoYW5kbGVyKGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZW1pdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge2FueT19IGRhdGEgQW55IHR5cGUgb2YgZGF0YVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZW5kIGFueSB0eXBlIG9mIGRhdGEgdG8gdGhlIHNlcnZlciBhY2NvcmRpbmcgdGhlIGV2ZW50IHNldC5cbiAgICoqL1xuICBwdWJsaWMgZW1pdChldmVudDogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnQsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlTGlzdGVuZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBsaXN0ZW5lciBoYW5kbGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHdyYXAgdGhlIG9yaWdpbmFsIFwib25cIiBtZXRob2QgYW5kIHJ1biBpdCB3aXRoaW4gdGhlIEFuZ3VsYXIgWm9uZVxuICAgKiBOb3RlOiBvZmYgaXMgYmVpbmcgdXNlZCBzaW5jZSB0aGUgbmF0aXZlc2NyaXB0IHNvY2tldCBpbyBjbGllbnQgZG9lcyBub3QgcHJvdmlkZVxuICAgKiByZW1vdmVMaXN0ZW5lciBtZXRob2QsIGJ1dCBvbmx5IHByb3ZpZGVzIHdpdGggb2ZmIHdoaWNoIGlzIHByb3ZpZGVkIGluIGFueSBwbGF0Zm9ybS5cbiAgICoqL1xuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ja2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zb2NrZXQub2ZmKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsTGlzdGVuZXJzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgbGlzdGVuZXIgaGFuZGxlclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCB3cmFwIHRoZSBvcmlnaW5hbCBcIm9uXCIgbWV0aG9kIGFuZCBydW4gaXQgd2l0aGluIHRoZSBBbmd1bGFyIFpvbmVcbiAgICogTm90ZTogb2ZmIGlzIGJlaW5nIHVzZWQgc2luY2UgdGhlIG5hdGl2ZXNjcmlwdCBzb2NrZXQgaW8gY2xpZW50IGRvZXMgbm90IHByb3ZpZGVcbiAgICogcmVtb3ZlTGlzdGVuZXIgbWV0aG9kLCBidXQgb25seSBwcm92aWRlcyB3aXRoIG9mZiB3aGljaCBpcyBwcm92aWRlZCBpbiBhbnkgcGxhdGZvcm0uXG4gICAqKi9cbiAgcHVibGljIHJlbW92ZUFsbExpc3RlbmVycyhldmVudDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhldmVudCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGRpc2Nvbm5lY3RcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgd2lsbCBkaXNjb25uZWN0IHRoZSBjbGllbnQgZnJvbSB0aGUgc2VydmVyXG4gICAqKi9cbiAgcHVibGljIGRpc2Nvbm5lY3QoKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGhlYXJ0YmVhdGVyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIHdpbGwga2VlcCB0aGUgY29ubmVjdGlvbiBhcyBhY3RpdmUsIGV2ZW4gd2hlbiB1c2VycyBhcmUgbm90IHNlbmRpbmdcbiAgICogZGF0YSwgdGhpcyBhdm9pZHMgZGlzY29ubmVjdGlvbiBiZWNhdXNlIG9mIGEgY29ubmVjdGlvbiBub3QgYmVpbmcgdXNlZC5cbiAgICoqL1xuICBwcml2YXRlIGhlYXJ0YmVhdGVyKCk6IHZvaWQge1xuICAgIGxldCBoZWFydGJlYXRlcjogYW55ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdsYi1waW5nJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2xiLXBvbmcnKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRlcik7XG4gICAgICB9XG4gICAgfSwgMTUwMDApO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdsYi1wb25nJywgKGRhdGE6IGFueSkgPT4gY29uc29sZS5pbmZvKCdIZWFydGJlYXQ6ICcsIGRhdGEpKTtcbiAgfVxufVxuIl19