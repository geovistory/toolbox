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
var RealTime = /** @class */ (function () {
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    function RealTime(connection, models, auth) {
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
    RealTime.prototype.onDisconnect = function () {
        return this.connection.sharedObservables.sharedOnDisconnect;
    };
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    RealTime.prototype.onAuthenticated = function () {
        return this.connection.sharedObservables.sharedOnAuthenticated;
    };
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    RealTime.prototype.onUnAuthorized = function () {
        return this.connection.sharedObservables.sharedOnUnAuthorized;
    };
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    RealTime.prototype.onReady = function () {
        var _this = this;
        // If there is a valid connection, then we just send back to the EventLoop
        // Or next will be executed before the actual subscription.
        if (this.connection.isConnected()) {
            var to_1 = setTimeout(function () {
                _this.onReadySubject.next('shared-connection');
                clearTimeout(to_1);
            });
            // Else if there is a current attempt of connection we wait for the prior
            // process that started the connection flow.
        }
        else if (this.connecting) {
            var ti_1 = setInterval(function () {
                if (_this.connection.isConnected()) {
                    _this.onReadySubject.next('shared-connection');
                    clearInterval(ti_1);
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
            var s1_1 = this.connection.sharedObservables.sharedOnConnect.subscribe(function () {
                console.log('Real-Time connection has been established');
                _this.connecting = false;
                _this.onReadySubject.next('connected');
                var s2 = _this.connection.sharedObservables.sharedOnDisconnect.subscribe(function () {
                    s1_1.unsubscribe();
                    s2.unsubscribe();
                });
            });
        }
        return this.sharedOnReady;
    };
    RealTime.ctorParameters = function () { return [
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] }
    ]; };
    RealTime = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(SocketConnection)),
        tslib_1.__param(1, Inject(SDKModels)),
        tslib_1.__param(2, Inject(LoopBackAuth))
    ], RealTime);
    return RealTime;
}());
export { RealTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbC50aW1lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jb3JlL3JlYWwudGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDOzs7Ozs7OztHQVFHO0FBRUg7SUFNRTs7Ozs7OztPQU9HO0lBQ0gsa0JBQ21DLFVBQTRCLEVBQ2hDLE1BQWlCLEVBQ2QsSUFBa0I7UUFGakIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFkNUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3hELGtCQUFhLEdBQXVCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFjM0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCwrQkFBWSxHQUFa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QUFRLENBOEZwQjtJQUFELGVBQUM7Q0FBQSxBQTlGRCxJQThGQztTQTlGWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU8gfSBmcm9tICcuL2lvLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlyZUxvb3AgfSBmcm9tICcuLi8uLi9tb2RlbHMvRmlyZUxvb3AnO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4uL2N1c3RvbS9TREtNb2RlbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QGpvaG5jYXNhcnJ1Ymlhcz5cbiogQG1vZHVsZSBSZWFsVGltZVxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGlzIGEgcmVhbC10aW1lIGludGVyZmFjZSBmb3IgdXNpbmcgc29ja2V0IGNvbm5lY3Rpb25zLCBpdHMgbWFpbiBwdXJwb3NlXG4qIGlzIHRvIG1ha2Ugc3VyZSB0aGF0IHdoZW4gdGhlcmUgaXMgYSB2YWxpZCBjb25uZWN0aW9uLCBpdCB3aWxsIGNyZWF0ZSBpbnN0YW5jZXNcbiogb2YgdGhlIGRpZmZlcmVudCByZWFsLXRpbWUgZnVuY3Rpb25hbGl0aWVzIGxpa2UgRmlyZUxvb3AsIFB1YlN1YiBhbmQgSU8uXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWFsVGltZSB7XG4gIHB1YmxpYyBJTzogSU87XG4gIHB1YmxpYyBGaXJlTG9vcDogRmlyZUxvb3A7XG4gIHByaXZhdGUgY29ubmVjdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG9uUmVhZHlTdWJqZWN0OiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgc2hhcmVkT25SZWFkeTogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5vblJlYWR5U3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpO1xuICAvKipcbiAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICogQHBhcmFtIHtTb2NrZXRDb25uZWN0aW9ufSBjb25uZWN0aW9uIFdlYlNvY2tldCBjb25uZWN0aW9uIHNlcnZpY2VcbiAgKiBAcGFyYW0ge1NES01vZGVsc30gbW9kZWxzIE1vZGVsIHByb3ZpZGVyIHNlcnZpY2VcbiAgKiBAcGFyYW0ge0xvb3BCYWNrQXV0aH0gYXV0aCBMb29wQmFjayBhdXRoZW50aWNhdGlvbiBzZXJ2aWNlXG4gICogQGRlc2NyaXB0aW9uXG4gICogSXQgd2lsbCBpbnRpYWxpemUgdGhlIHNoYXJlZCBvbiByZWFkeSBjb21tdW5pY2F0aW9uIGNoYW5uZWwuXG4gICoqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFNvY2tldENvbm5lY3Rpb24pIHB1YmxpYyBjb25uZWN0aW9uOiBTb2NrZXRDb25uZWN0aW9uLFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGhcbiAgKSB7XG4gICAgdGhpcy5zaGFyZWRPblJlYWR5LnN1YnNjcmliZSgpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2Qgb25EaXNjb25uZWN0XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSBcbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBXaWxsIHRyaWdnZXIgd2hlbiBSZWFsLVRpbWUgU2VydmljZSBpcyBkaXNjb25uZWN0ZWQgZnJvbSBzZXJ2ZXIuXG4gICoqL1xuICBvbkRpc2Nvbm5lY3QoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdDtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uQXV0aGVudGljYXRlZFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gXG4gICogQGRlc2NyaXB0aW9uXG4gICogV2lsbCB0cmlnZ2VyIHdoZW4gUmVhbC1UaW1lIFNlcnZpY2UgaXMgYXV0aGVudGljYXRlZCB3aXRoIHRoZSBzZXJ2ZXIuXG4gICoqL1xuICBvbkF1dGhlbnRpY2F0ZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQXV0aGVudGljYXRlZDtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uVW5BdXRob3JpemVkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSBcbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBXaWxsIHRyaWdnZXIgd2hlbiBSZWFsLVRpbWUgU2VydmljZSBpcyBub3QgYXV0aG9yaXplZCB0byBjb25uZWN0IHdpdGggdGhlIHNlcnZlci5cbiAgKiovXG4gIG9uVW5BdXRob3JpemVkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPblVuQXV0aG9yaXplZDtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uUmVhZHlcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IFxuICAqIEBkZXNjcmlwdGlvblxuICAqIFdpbGwgdHJpZ2dlciB3aGVuIFJlYWwtVGltZSBTZXJ2aWNlIGlzIFJlYWR5IGZvciBicm9hZGNhc3RpbmcuXG4gICogYW5kIHdpbGwgcmVnaXN0ZXIgY29ubmVjdGlvbiBmbG93IGV2ZW50cyB0byBub3RpZnkgc3Vic2NyaWJlcnMuXG4gICoqL1xuICBwdWJsaWMgb25SZWFkeSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIElmIHRoZXJlIGlzIGEgdmFsaWQgY29ubmVjdGlvbiwgdGhlbiB3ZSBqdXN0IHNlbmQgYmFjayB0byB0aGUgRXZlbnRMb29wXG4gICAgLy8gT3IgbmV4dCB3aWxsIGJlIGV4ZWN1dGVkIGJlZm9yZSB0aGUgYWN0dWFsIHN1YnNjcmlwdGlvbi5cbiAgICBpZiAodGhpcy5jb25uZWN0aW9uLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgIGxldCB0byA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uUmVhZHlTdWJqZWN0Lm5leHQoJ3NoYXJlZC1jb25uZWN0aW9uJyk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0byk7XG4gICAgICB9KTtcbiAgICAvLyBFbHNlIGlmIHRoZXJlIGlzIGEgY3VycmVudCBhdHRlbXB0IG9mIGNvbm5lY3Rpb24gd2Ugd2FpdCBmb3IgdGhlIHByaW9yXG4gICAgLy8gcHJvY2VzcyB0aGF0IHN0YXJ0ZWQgdGhlIGNvbm5lY3Rpb24gZmxvdy5cbiAgICB9IGVsc2UgaWYgKHRoaXMuY29ubmVjdGluZykge1xuICAgICAgbGV0IHRpID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICB0aGlzLm9uUmVhZHlTdWJqZWN0Lm5leHQoJ3NoYXJlZC1jb25uZWN0aW9uJyk7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMCk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IHZhbGlkIGNvbm5lY3Rpb24gb3IgYXR0ZW1wdCwgdGhlbiB3ZSBzdGFydCB0aGUgY29ubmVjdGlvbiBmbG93XG4gICAgLy8gYW5kIG1ha2Ugc3VyZSB3ZSBub3RpZnkgYWxsIHRoZSBvblJlYWR5IHN1YnNjcmliZXJzIHdoZW4gZG9uZS5cbiAgICAvLyBBbHNvIGl0IHdpbGwgbGlzdGVuIGZvciBkZXNjb25uZWN0aW9ucyBzbyB3ZSB1bnN1YnNjcmliZSBhbmQgYXZvaWQgYm90aDpcbiAgICAvLyBNZW1vcnkgbGVha3MgYW5kIGR1cGxpY2F0ZWQgdHJpZ2dlcmVkIGV2ZW50cy5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29ubmVjdGlvbi5jb25uZWN0KHRoaXMuYXV0aC5nZXRUb2tlbigpKTtcbiAgICAgIHRoaXMuSU8gICAgICAgPSBuZXcgSU8odGhpcy5jb25uZWN0aW9uKTtcbiAgICAgIHRoaXMuRmlyZUxvb3AgPSBuZXcgRmlyZUxvb3AodGhpcy5jb25uZWN0aW9uLCB0aGlzLm1vZGVscyk7XG4gICAgICAvLyBGaXJlIGV2ZW50IGZvciB0aG9zZSBzdWJzY3JpYmVkIFxuICAgICAgbGV0IHMxOiBTdWJzY3JpcHRpb24gPSB0aGlzLmNvbm5lY3Rpb24uc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25Db25uZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWFsLVRpbWUgY29ubmVjdGlvbiBoYXMgYmVlbiBlc3RhYmxpc2hlZCcpO1xuICAgICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vblJlYWR5U3ViamVjdC5uZXh0KCdjb25uZWN0ZWQnKTtcbiAgICAgICAgbGV0IHMyOiBTdWJzY3JpcHRpb24gPSB0aGlzLmNvbm5lY3Rpb24uc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25EaXNjb25uZWN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgczEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzMi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zaGFyZWRPblJlYWR5O1xuICB9XG59XG4iXX0=