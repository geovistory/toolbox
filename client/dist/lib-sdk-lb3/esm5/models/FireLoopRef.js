/* tslint:disable */
import { merge, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
/**
 * @class FireLoopRef<T>
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
var FireLoopRef = /** @class */ (function () {
    /**
    * @method constructor
    * @param {any} model The model we want to create a reference
    * @param {SocketConnection} socket Socket connection to handle events
    * @param {FireLoopRef<any>} parent Parent FireLoop model reference
    * @param {string} relationship The defined model relationship
    * @description
    * The constructor will receive the required parameters and then will register this reference
    * into the server, needed to allow multiple references for the same model.
    * This ids are referenced into this specific client connection and won't have issues
    * with other client ids.
    **/
    function FireLoopRef(model, socket, parent, relationship) {
        if (parent === void 0) { parent = null; }
        if (relationship === void 0) { relationship = null; }
        this.model = model;
        this.socket = socket;
        this.parent = parent;
        this.relationship = relationship;
        // Reference ID
        this.id = this.buildId();
        // Model Childs
        this.childs = {};
        // Disposable Events
        this.disposable = {};
        this.socket.emit("Subscribe." + (!parent ? model.getModelName() : parent.model.getModelName()), { id: this.id, scope: model.getModelName(), relationship: relationship });
        return this;
    }
    /**
    * @method dispose
    * @return {void}
    * @description
    * This method is super important to avoid memory leaks in the server.
    * This method requires to be called on components destroy
    *
    * ngOnDestroy() {
    *  this.someRef.dispose()
    * }
    **/
    FireLoopRef.prototype.dispose = function () {
        var _this = this;
        var subscription = this.operation('dispose', {}).subscribe(function () {
            Object.keys(_this.disposable).forEach(function (channel) {
                _this.socket.removeListener(channel, _this.disposable[channel]);
                _this.socket.removeAllListeners(channel);
            });
            subscription.unsubscribe();
        });
    };
    /**
    * @method upsert
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for upsert function.
    **/
    FireLoopRef.prototype.upsert = function (data) {
        return this.operation('upsert', data);
    };
    /**
    * @method create
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for create function.
    **/
    FireLoopRef.prototype.create = function (data) {
        return this.operation('create', data);
    };
    /**
    * @method remove
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for remove function.
    **/
    FireLoopRef.prototype.remove = function (data) {
        return this.operation('remove', data);
    };
    /**
    * @method remote
    * @param {string} method Remote method name
    * @param {any[]=} params Parameters to be applied into the remote method
    * @param {boolean} broadcast Flag to define if the method results should be broadcasted
    * @return {Observable<any>}
    * @description
    * This method calls for any remote method. It is flexible enough to
    * allow you call either built-in or custom remote methods.
    *
    * FireLoop provides this interface to enable calling remote methods
    * but also to optionally send any defined accept params that will be
    * applied within the server.
    **/
    FireLoopRef.prototype.remote = function (method, params, broadcast) {
        if (broadcast === void 0) { broadcast = false; }
        return this.operation('remote', { method: method, params: params, broadcast: broadcast });
    };
    /**
    * @method onRemote
    * @param {string} method Remote method name
    * @return {Observable<any>}
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    FireLoopRef.prototype.onRemote = function (method) {
        var event = 'remote';
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
        }
        return this.broadcasts(event, {});
    };
    /**
    * @method on
    * @param {string} event Event name
    * @param {LoopBackFilter} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for different type of events. Valid events are:
    *   - change (Triggers on any model change -create, update, remove-)
    *   - value (Triggers on new entries)
    *   - child_added (Triggers when a child is added)
    *   - child_updated (Triggers when a child is updated)
    *   - child_removed (Triggers when a child is removed)
    **/
    FireLoopRef.prototype.on = function (event, filter) {
        if (filter === void 0) { filter = { limit: 100, order: 'id DESC' }; }
        if (event === 'remote') {
            throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
        }
        var request;
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
            request = { filter: filter };
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
            request = { filter: filter, parent: this.parent.instance };
        }
        if (event.match(/(value|change|stats)/)) {
            return merge(this.pull(event, request), this.broadcasts(event, request));
        }
        else {
            return this.broadcasts(event, request);
        }
    };
    /**
    * @method stats
    * @param {LoopBackFilter=} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    FireLoopRef.prototype.stats = function (filter) {
        return this.on('stats', filter);
    };
    /**
    * @method make
    * @param {any} instance Persisted model instance reference
    * @return {Observable<T>}
    * @description
    * This method will set a model instance into this a new FireLoop Reference.
    * This allows to persiste parentship when creating related instances.
    *
    * It also allows to have multiple different persisted instance references to same model.
    * otherwise if using singleton will replace a previous instance for a new instance, when
    * we actually want to have more than 1 instance of same model.
    **/
    FireLoopRef.prototype.make = function (instance) {
        var reference = new FireLoopRef(this.model, this.socket);
        reference.instance = instance;
        return reference;
    };
    /**
    * @method child
    * @param {string} relationship A defined model relationship
    * @return {FireLoopRef<T>}
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    FireLoopRef.prototype.child = function (relationship) {
        // Return singleton instance
        if (this.childs[relationship]) {
            return this.childs[relationship];
        }
        // Try to get relation settings from current model
        var settings = this.model.getModelDefinition().relations[relationship];
        // Verify the relationship actually exists
        if (!settings) {
            throw new Error("Invalid model relationship " + this.model.getModelName() + " <-> " + relationship + ", verify your model settings.");
        }
        // Verify if the relationship model is public
        if (settings.model === '') {
            throw new Error("Relationship model is private, cam't use " + relationship + " unless you set your model as public.");
        }
        // Lets get a model reference and add a reference for all of the models
        var model = this.model.models.get(settings.model);
        model.models = this.model.models;
        // If everything goes well, we will store a child reference and return it.
        this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
        return this.childs[relationship];
    };
    /**
    * @method pull
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This method will pull initial data from server
    **/
    FireLoopRef.prototype.pull = function (event, request) {
        var sbj = new Subject();
        var that = this;
        var nowEvent = event + ".pull.requested." + this.id;
        this.socket.emit(event + ".pull.request." + this.id, request);
        function pullNow(data) {
            if (that.socket.removeListener) {
                that.socket.removeListener(nowEvent, pullNow);
            }
            sbj.next(data);
        }
        ;
        this.socket.on(nowEvent, pullNow);
        return sbj.asObservable();
    };
    /**
    * @method broadcasts
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    FireLoopRef.prototype.broadcasts = function (event, request) {
        var sbj = new Subject();
        var channels = {
            announce: event + ".broadcast.announce." + this.id,
            broadcast: event + ".broadcast." + this.id
        };
        var that = this;
        // Announces Handler
        this.disposable[channels.announce] = function (res) {
            that.socket.emit(event + ".broadcast.request." + that.id, request);
        };
        // Broadcasts Handler
        this.disposable[channels.broadcast] = function (data) {
            sbj.next(data);
        };
        this.socket.on(channels.announce, this.disposable[channels.announce]);
        this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
        return sbj.asObservable();
    };
    /**
    * @method operation
    * @param {string} event Event name
    * @param {any} data Any type of data sent to the server
    * @return {Observable<T>}
    * @description
    * This internal method will run operations depending on current context
    **/
    FireLoopRef.prototype.operation = function (event, data) {
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event + "." + this.id;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event + "." + this.id;
        }
        var subject = new Subject();
        var config = {
            data: data,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        this.socket.emit(event, config);
        var resultEvent = '';
        if (!this.relationship) {
            resultEvent = this.model.getModelName() + ".value.result." + this.id;
        }
        else {
            resultEvent = this.parent.model.getModelName() + "." + this.relationship + ".value.result." + this.id;
        }
        this.socket.on(resultEvent, function (res) {
            if (res.error) {
                subject.error(res);
            }
            else {
                subject.next(res);
            }
        });
        if (event.match('dispose')) {
            setTimeout(function () { return subject.next(); });
        }
        // This event listener will be wiped within socket.connections
        this.socket.sharedObservables.sharedOnDisconnect.subscribe(function () { return subject.complete(); });
        return subject.asObservable().pipe(catchError(function (error) { return Observable.throw(error); }));
    };
    /**
    * @method buildId
    * @return {number}
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    FireLoopRef.prototype.buildId = function () {
        return Date.now() + Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
    };
    return FireLoopRef;
}());
export { FireLoopRef };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3BSZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvRmlyZUxvb3BSZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUM7Ozs7Ozs7O0lBUUk7QUFDSjtJQVNFOzs7Ozs7Ozs7OztPQVdHO0lBQ0gscUJBQ1UsS0FBVSxFQUNWLE1BQXdCLEVBQ3hCLE1BQStCLEVBQy9CLFlBQTJCO1FBRDNCLHVCQUFBLEVBQUEsYUFBK0I7UUFDL0IsNkJBQUEsRUFBQSxtQkFBMkI7UUFIM0IsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUNWLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBeEJyQyxlQUFlO1FBQ1AsT0FBRSxHQUFXLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUdwQyxlQUFlO1FBQ1AsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUN6QixvQkFBb0I7UUFDWixlQUFVLEdBQTJCLEVBQUUsQ0FBQztRQW1COUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsZ0JBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBRSxFQUMzRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUN6RSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxD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QyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCBTdGF0RmlsdGVyIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuLyoqXG4gKiBAY2xhc3MgRmlyZUxvb3BSZWY8VD5cbiAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICogQGxpY2Vuc2UgTUlUXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgY2xhc3MgYWxsb3dzIHRvIGNyZWF0ZSBGaXJlTG9vcCBSZWZlcmVuY2VzIHdoaWNoIHdpbGwgYmUgaW4gc3luYyB3aXRoXG4gKiBTZXJ2ZXIuIEl0IGFsc28gYWxsb3dzIHRvIGNyZWF0ZSBGaXJlTG9vcCBSZWZlcmVuY2UgQ2hpbGRzLCB0aGF0IGFsbG93cyB0b1xuICogcGVyc2lzdCBkYXRhIGFjY29yZGluZyB0aGUgZ2VuZXJpYyBtb2RlbCByZWxhdGlvbnNoaXBzLlxuICoqL1xuZXhwb3J0IGNsYXNzIEZpcmVMb29wUmVmPFQ+IHtcbiAgLy8gUmVmZXJlbmNlIElEXG4gIHByaXZhdGUgaWQ6IG51bWJlciA9IHRoaXMuYnVpbGRJZCgpO1xuICAvLyBNb2RlbCBJbnN0YW5jZSAoRm9yIGNoaWxkIHJlZmVyZW5jZXMsIGVtcHR5IG9uIHJvb3QgcmVmZXJlbmNlcylcbiAgcHJpdmF0ZSBpbnN0YW5jZTogYW55O1xuICAvLyBNb2RlbCBDaGlsZHNcbiAgcHJpdmF0ZSBjaGlsZHM6IGFueSA9IHt9O1xuICAvLyBEaXNwb3NhYmxlIEV2ZW50c1xuICBwcml2YXRlIGRpc3Bvc2FibGU6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgLyoqXG4gICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAqIEBwYXJhbSB7YW55fSBtb2RlbCBUaGUgbW9kZWwgd2Ugd2FudCB0byBjcmVhdGUgYSByZWZlcmVuY2VcbiAgKiBAcGFyYW0ge1NvY2tldENvbm5lY3Rpb259IHNvY2tldCBTb2NrZXQgY29ubmVjdGlvbiB0byBoYW5kbGUgZXZlbnRzXG4gICogQHBhcmFtIHtGaXJlTG9vcFJlZjxhbnk+fSBwYXJlbnQgUGFyZW50IEZpcmVMb29wIG1vZGVsIHJlZmVyZW5jZVxuICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXAgVGhlIGRlZmluZWQgbW9kZWwgcmVsYXRpb25zaGlwXG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhlIGNvbnN0cnVjdG9yIHdpbGwgcmVjZWl2ZSB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBhbmQgdGhlbiB3aWxsIHJlZ2lzdGVyIHRoaXMgcmVmZXJlbmNlXG4gICogaW50byB0aGUgc2VydmVyLCBuZWVkZWQgdG8gYWxsb3cgbXVsdGlwbGUgcmVmZXJlbmNlcyBmb3IgdGhlIHNhbWUgbW9kZWwuXG4gICogVGhpcyBpZHMgYXJlIHJlZmVyZW5jZWQgaW50byB0aGlzIHNwZWNpZmljIGNsaWVudCBjb25uZWN0aW9uIGFuZCB3b24ndCBoYXZlIGlzc3Vlc1xuICAqIHdpdGggb3RoZXIgY2xpZW50IGlkcy5cbiAgKiovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbW9kZWw6IGFueSxcbiAgICBwcml2YXRlIHNvY2tldDogU29ja2V0Q29ubmVjdGlvbixcbiAgICBwcml2YXRlIHBhcmVudDogRmlyZUxvb3BSZWY8YW55PiA9IG51bGwsXG4gICAgcHJpdmF0ZSByZWxhdGlvbnNoaXA6IHN0cmluZyA9IG51bGxcbiAgKSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChcbiAgICAgIGBTdWJzY3JpYmUuJHshcGFyZW50ID8gbW9kZWwuZ2V0TW9kZWxOYW1lKCkgOiBwYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9YCxcbiAgICAgIHsgaWQ6IHRoaXMuaWQsIHNjb3BlOiBtb2RlbC5nZXRNb2RlbE5hbWUoKSwgcmVsYXRpb25zaGlwOiByZWxhdGlvbnNoaXAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBkaXNwb3NlXG4gICogQHJldHVybiB7dm9pZH1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCBpcyBzdXBlciBpbXBvcnRhbnQgdG8gYXZvaWQgbWVtb3J5IGxlYWtzIGluIHRoZSBzZXJ2ZXIuXG4gICogVGhpcyBtZXRob2QgcmVxdWlyZXMgdG8gYmUgY2FsbGVkIG9uIGNvbXBvbmVudHMgZGVzdHJveVxuICAqXG4gICogbmdPbkRlc3Ryb3koKSB7XG4gICogIHRoaXMuc29tZVJlZi5kaXNwb3NlKCkgXG4gICogfVxuICAqKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5vcGVyYXRpb24oJ2Rpc3Bvc2UnLCB7fSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZGlzcG9zYWJsZSkuZm9yRWFjaCgoY2hhbm5lbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVsXSk7XG4gICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsKTtcbiAgICAgIH0pO1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCB1cHNlcnRcbiAgKiBAcGFyYW0ge1R9IGRhdGEgUGVyc2lzdGVkIG1vZGVsIGluc3RhbmNlXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBPcGVyYXRpb24gd3JhcHBlciBmb3IgdXBzZXJ0IGZ1bmN0aW9uLlxuICAqKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uKCd1cHNlcnQnLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGNyZWF0ZVxuICAqIEBwYXJhbSB7VH0gZGF0YSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2VcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIE9wZXJhdGlvbiB3cmFwcGVyIGZvciBjcmVhdGUgZnVuY3Rpb24uXG4gICoqL1xuICBwdWJsaWMgY3JlYXRlKGRhdGE6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24oJ2NyZWF0ZScsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgcmVtb3ZlXG4gICogQHBhcmFtIHtUfSBkYXRhIFBlcnNpc3RlZCBtb2RlbCBpbnN0YW5jZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogT3BlcmF0aW9uIHdyYXBwZXIgZm9yIHJlbW92ZSBmdW5jdGlvbi5cbiAgKiovXG4gIHB1YmxpYyByZW1vdmUoZGF0YTogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbigncmVtb3ZlJywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCByZW1vdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIFJlbW90ZSBtZXRob2QgbmFtZVxuICAqIEBwYXJhbSB7YW55W109fSBwYXJhbXMgUGFyYW1ldGVycyB0byBiZSBhcHBsaWVkIGludG8gdGhlIHJlbW90ZSBtZXRob2RcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IGJyb2FkY2FzdCBGbGFnIHRvIGRlZmluZSBpZiB0aGUgbWV0aG9kIHJlc3VsdHMgc2hvdWxkIGJlIGJyb2FkY2FzdGVkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIGNhbGxzIGZvciBhbnkgcmVtb3RlIG1ldGhvZC4gSXQgaXMgZmxleGlibGUgZW5vdWdoIHRvXG4gICogYWxsb3cgeW91IGNhbGwgZWl0aGVyIGJ1aWx0LWluIG9yIGN1c3RvbSByZW1vdGUgbWV0aG9kcy5cbiAgKlxuICAqIEZpcmVMb29wIHByb3ZpZGVzIHRoaXMgaW50ZXJmYWNlIHRvIGVuYWJsZSBjYWxsaW5nIHJlbW90ZSBtZXRob2RzXG4gICogYnV0IGFsc28gdG8gb3B0aW9uYWxseSBzZW5kIGFueSBkZWZpbmVkIGFjY2VwdCBwYXJhbXMgdGhhdCB3aWxsIGJlXG4gICogYXBwbGllZCB3aXRoaW4gdGhlIHNlcnZlci5cbiAgKiovXG4gIHB1YmxpYyByZW1vdGUobWV0aG9kOiBzdHJpbmcsIHBhcmFtcz86IGFueVtdLCBicm9hZGNhc3Q6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uKCdyZW1vdGUnLCB7IG1ldGhvZCwgcGFyYW1zLCBicm9hZGNhc3QgfSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvblJlbW90ZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgUmVtb3RlIG1ldGhvZCBuYW1lXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIGxpc3RlbiBmb3IgcHVibGljIGJyb2FkY2FzdGVkIHJlbW90ZSBtZXRob2QgcmVzdWx0cy4gSWYgdGhlIHJlbW90ZSBtZXRob2RcbiAgKiBleGVjdXRpb24gaXMgbm90IHB1YmxpYyBvbmx5IHRoZSBvd25lciB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdCBkYXRhLlxuICAqKi9cbiAgcHVibGljIG9uUmVtb3RlKG1ldGhvZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZXZlbnQ6IHN0cmluZyA9ICdyZW1vdGUnO1xuICAgIGlmICghdGhpcy5yZWxhdGlvbnNoaXApIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudCA9IGAke3RoaXMucGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke3RoaXMucmVsYXRpb25zaGlwfS4ke2V2ZW50fWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJyb2FkY2FzdHMoZXZlbnQsIHt9KTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgKiBAcGFyYW0ge0xvb3BCYWNrRmlsdGVyfSBmaWx0ZXIgTG9vcEJhY2sgcXVlcnkgZmlsdGVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBMaXN0ZW5lciBmb3IgZGlmZmVyZW50IHR5cGUgb2YgZXZlbnRzLiBWYWxpZCBldmVudHMgYXJlOlxuICAqICAgLSBjaGFuZ2UgKFRyaWdnZXJzIG9uIGFueSBtb2RlbCBjaGFuZ2UgLWNyZWF0ZSwgdXBkYXRlLCByZW1vdmUtKVxuICAqICAgLSB2YWx1ZSAoVHJpZ2dlcnMgb24gbmV3IGVudHJpZXMpXG4gICogICAtIGNoaWxkX2FkZGVkIChUcmlnZ2VycyB3aGVuIGEgY2hpbGQgaXMgYWRkZWQpXG4gICogICAtIGNoaWxkX3VwZGF0ZWQgKFRyaWdnZXJzIHdoZW4gYSBjaGlsZCBpcyB1cGRhdGVkKVxuICAqICAgLSBjaGlsZF9yZW1vdmVkIChUcmlnZ2VycyB3aGVuIGEgY2hpbGQgaXMgcmVtb3ZlZClcbiAgKiovXG4gIHB1YmxpYyBvbihldmVudDogc3RyaW5nLCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVyID0geyBsaW1pdDogMTAwLCBvcmRlcjogJ2lkIERFU0MnIH0pOiBPYnNlcnZhYmxlPFQgfCBUW10+IHtcbiAgICBpZiAoZXZlbnQgPT09ICdyZW1vdGUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcInJlbW90ZVwiIGV2ZW50IGlzIG5vdCBhbGxvd2VkIHVzaW5nIFwib24oKVwiIG1ldGhvZCwgdXNlIFwib25SZW1vdGUoKVwiIGluc3RlYWQnKTtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3Q6IGFueTtcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XG4gICAgICBldmVudCA9IGAke3RoaXMubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7ZXZlbnR9YDtcbiAgICAgIHJlcXVlc3QgPSB7IGZpbHRlciB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudCA9IGAke3RoaXMucGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke3RoaXMucmVsYXRpb25zaGlwfS4ke2V2ZW50fWA7XG4gICAgICByZXF1ZXN0ID0geyBmaWx0ZXIsIHBhcmVudDogdGhpcy5wYXJlbnQuaW5zdGFuY2UgfTtcbiAgICB9XG4gICAgaWYgKGV2ZW50Lm1hdGNoKC8odmFsdWV8Y2hhbmdlfHN0YXRzKS8pKSB7XG4gICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgIHRoaXMucHVsbChldmVudCwgcmVxdWVzdCksXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0cyhldmVudCwgcmVxdWVzdClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmJyb2FkY2FzdHMoZXZlbnQsIHJlcXVlc3QpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIHN0YXRzXG4gICogQHBhcmFtIHtMb29wQmFja0ZpbHRlcj19IGZpbHRlciBMb29wQmFjayBxdWVyeSBmaWx0ZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIExpc3RlbmVyIGZvciByZWFsLXRpbWUgc3RhdGlzdGljcywgd2lsbCB0cmlnZ2VyIG9uIGV2ZXJ5XG4gICogc3RhdGlzdGljIG1vZGlmaWNhdGlvbi5cbiAgKiBUSVA6IFlvdSBjYW4gaW1wcm92ZSBwZXJmb3JtYW5jZSBieSBhZGRpbmcgbWVtY2FjaGVkIHRvIExvb3BCYWNrIG1vZGVscy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0cyhmaWx0ZXI/OiBTdGF0RmlsdGVyKTogT2JzZXJ2YWJsZTxUIHwgVFtdPiB7XG4gICAgcmV0dXJuIHRoaXMub24oJ3N0YXRzJywgZmlsdGVyKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG1ha2VcbiAgKiBAcGFyYW0ge2FueX0gaW5zdGFuY2UgUGVyc2lzdGVkIG1vZGVsIGluc3RhbmNlIHJlZmVyZW5jZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBtb2RlbCBpbnN0YW5jZSBpbnRvIHRoaXMgYSBuZXcgRmlyZUxvb3AgUmVmZXJlbmNlLlxuICAqIFRoaXMgYWxsb3dzIHRvIHBlcnNpc3RlIHBhcmVudHNoaXAgd2hlbiBjcmVhdGluZyByZWxhdGVkIGluc3RhbmNlcy5cbiAgKlxuICAqIEl0IGFsc28gYWxsb3dzIHRvIGhhdmUgbXVsdGlwbGUgZGlmZmVyZW50IHBlcnNpc3RlZCBpbnN0YW5jZSByZWZlcmVuY2VzIHRvIHNhbWUgbW9kZWwuXG4gICogb3RoZXJ3aXNlIGlmIHVzaW5nIHNpbmdsZXRvbiB3aWxsIHJlcGxhY2UgYSBwcmV2aW91cyBpbnN0YW5jZSBmb3IgYSBuZXcgaW5zdGFuY2UsIHdoZW5cbiAgKiB3ZSBhY3R1YWxseSB3YW50IHRvIGhhdmUgbW9yZSB0aGFuIDEgaW5zdGFuY2Ugb2Ygc2FtZSBtb2RlbC5cbiAgKiovXG4gIHB1YmxpYyBtYWtlKGluc3RhbmNlOiBhbnkpOiBGaXJlTG9vcFJlZjxUPiB7XG4gICAgbGV0IHJlZmVyZW5jZTogRmlyZUxvb3BSZWY8VD4gPSBuZXcgRmlyZUxvb3BSZWY8VD4odGhpcy5tb2RlbCwgdGhpcy5zb2NrZXQpO1xuICAgIHJlZmVyZW5jZS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHJldHVybiByZWZlcmVuY2U7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBjaGlsZFxuICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXAgQSBkZWZpbmVkIG1vZGVsIHJlbGF0aW9uc2hpcFxuICAqIEByZXR1cm4ge0ZpcmVMb29wUmVmPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgY2hpbGQgcmVmZXJlbmNlcywgd2hpY2ggd2lsbCBwZXJzaXN0IHJlbGF0ZWQgbW9kZWxcbiAgKiBpbnN0YW5jZXMuIGUuZy4gUm9vbS5tZXNzYWdlcywgd2hlcmUgbWVzc2FnZXMgYmVsb25ncyB0byBhIHNwZWNpZmljIFJvb20uXG4gICoqL1xuICBwdWJsaWMgY2hpbGQ8VD4ocmVsYXRpb25zaGlwOiBzdHJpbmcpOiBGaXJlTG9vcFJlZjxUPiB7XG4gICAgLy8gUmV0dXJuIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgIGlmICh0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdKSB7IHJldHVybiB0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdOyB9XG4gICAgLy8gVHJ5IHRvIGdldCByZWxhdGlvbiBzZXR0aW5ncyBmcm9tIGN1cnJlbnQgbW9kZWxcbiAgICBsZXQgc2V0dGluZ3M6IGFueSA9IHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucmVsYXRpb25zW3JlbGF0aW9uc2hpcF07XG4gICAgLy8gVmVyaWZ5IHRoZSByZWxhdGlvbnNoaXAgYWN0dWFsbHkgZXhpc3RzXG4gICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG1vZGVsIHJlbGF0aW9uc2hpcCAke3RoaXMubW9kZWwuZ2V0TW9kZWxOYW1lKCl9IDwtPiAke3JlbGF0aW9uc2hpcH0sIHZlcmlmeSB5b3VyIG1vZGVsIHNldHRpbmdzLmApO1xuICAgIH1cbiAgICAvLyBWZXJpZnkgaWYgdGhlIHJlbGF0aW9uc2hpcCBtb2RlbCBpcyBwdWJsaWNcbiAgICBpZiAoc2V0dGluZ3MubW9kZWwgPT09ICcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbGF0aW9uc2hpcCBtb2RlbCBpcyBwcml2YXRlLCBjYW0ndCB1c2UgJHtyZWxhdGlvbnNoaXB9IHVubGVzcyB5b3Ugc2V0IHlvdXIgbW9kZWwgYXMgcHVibGljLmApO1xuICAgIH1cbiAgICAvLyBMZXRzIGdldCBhIG1vZGVsIHJlZmVyZW5jZSBhbmQgYWRkIGEgcmVmZXJlbmNlIGZvciBhbGwgb2YgdGhlIG1vZGVsc1xuICAgIGxldCBtb2RlbDogYW55ID0gdGhpcy5tb2RlbC5tb2RlbHMuZ2V0KHNldHRpbmdzLm1vZGVsKTtcbiAgICBtb2RlbC5tb2RlbHMgPSB0aGlzLm1vZGVsLm1vZGVscztcbiAgICAvLyBJZiBldmVyeXRoaW5nIGdvZXMgd2VsbCwgd2Ugd2lsbCBzdG9yZSBhIGNoaWxkIHJlZmVyZW5jZSBhbmQgcmV0dXJuIGl0LlxuICAgIHRoaXMuY2hpbGRzW3JlbGF0aW9uc2hpcF0gPSBuZXcgRmlyZUxvb3BSZWY8VD4obW9kZWwsIHRoaXMuc29ja2V0LCB0aGlzLCByZWxhdGlvbnNoaXApO1xuICAgIHJldHVybiB0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgcHVsbFxuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICogQHBhcmFtIHthbnl9IHJlcXVlc3QgVHlwZSBvZiByZXF1ZXN0LCBjYW4gYmUgTEItb25seSBmaWx0ZXIgb3IgRkwrTEIgZmlsdGVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCB3aWxsIHB1bGwgaW5pdGlhbCBkYXRhIGZyb20gc2VydmVyXG4gICoqL1xuICBwcml2YXRlIHB1bGwoZXZlbnQ6IHN0cmluZywgcmVxdWVzdDogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IHNiajogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgbGV0IHRoYXQ6IEZpcmVMb29wUmVmPFQ+ID0gdGhpcztcbiAgICBsZXQgbm93RXZlbnQ6IGFueSA9IGAke2V2ZW50fS5wdWxsLnJlcXVlc3RlZC4ke3RoaXMuaWR9YDtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGAke2V2ZW50fS5wdWxsLnJlcXVlc3QuJHt0aGlzLmlkfWAsIHJlcXVlc3QpO1xuICAgIGZ1bmN0aW9uIHB1bGxOb3coZGF0YTogYW55KSB7XG4gICAgICBpZiAodGhhdC5zb2NrZXQucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgdGhhdC5zb2NrZXQucmVtb3ZlTGlzdGVuZXIobm93RXZlbnQsIHB1bGxOb3cpO1xuICAgICAgfVxuICAgICAgc2JqLm5leHQoZGF0YSk7XG4gICAgfTtcbiAgICB0aGlzLnNvY2tldC5vbihub3dFdmVudCwgcHVsbE5vdyk7XG4gICAgcmV0dXJuIHNiai5hc09ic2VydmFibGUoKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGJyb2FkY2FzdHNcbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAqIEBwYXJhbSB7YW55fSByZXF1ZXN0IFR5cGUgb2YgcmVxdWVzdCwgY2FuIGJlIExCLW9ubHkgZmlsdGVyIG9yIEZMK0xCIGZpbHRlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyB3aWxsIGxpc3RlbiBmb3IgcHVibGljIGJyb2FkY2FzdHMgYW5ub3VuY2VzIGFuZCB0aGVuIHJlcXVlc3RcbiAgKiBmb3IgZGF0YSBhY2NvcmRpbmcgYSBzcGVjaWZpYyBjbGllbnQgcmVxdWVzdCwgbm90IHNoYXJlZCB3aXRoIG90aGVyIGNsaWVudHMuXG4gICoqL1xuICBwcml2YXRlIGJyb2FkY2FzdHMoZXZlbnQ6IHN0cmluZywgcmVxdWVzdDogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IHNiajogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgbGV0IGNoYW5uZWxzOiB7IGFubm91bmNlOiBzdHJpbmcsIGJyb2FkY2FzdDogc3RyaW5nIH0gPSB7XG4gICAgICBhbm5vdW5jZTogYCR7ZXZlbnR9LmJyb2FkY2FzdC5hbm5vdW5jZS4ke3RoaXMuaWR9YCxcbiAgICAgIGJyb2FkY2FzdDogYCR7ZXZlbnR9LmJyb2FkY2FzdC4ke3RoaXMuaWR9YFxuICAgIH07XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8vIEFubm91bmNlcyBIYW5kbGVyXG4gICAgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmFubm91bmNlXSA9IGZ1bmN0aW9uIChyZXM6IFQpIHtcbiAgICAgIHRoYXQuc29ja2V0LmVtaXQoYCR7ZXZlbnR9LmJyb2FkY2FzdC5yZXF1ZXN0LiR7dGhhdC5pZH1gLCByZXF1ZXN0KVxuICAgIH07XG4gICAgLy8gQnJvYWRjYXN0cyBIYW5kbGVyXG4gICAgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmJyb2FkY2FzdF0gPSBmdW5jdGlvbiAoZGF0YTogYW55KSB7XG4gICAgICBzYmoubmV4dChkYXRhKTtcbiAgICB9O1xuICAgIHRoaXMuc29ja2V0Lm9uKGNoYW5uZWxzLmFubm91bmNlLCB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbHMuYW5ub3VuY2VdKTtcbiAgICB0aGlzLnNvY2tldC5vbihjaGFubmVscy5icm9hZGNhc3QsIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVscy5icm9hZGNhc3RdKTtcbiAgICByZXR1cm4gc2JqLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2Qgb3BlcmF0aW9uXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSBBbnkgdHlwZSBvZiBkYXRhIHNlbnQgdG8gdGhlIHNlcnZlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBpbnRlcm5hbCBtZXRob2Qgd2lsbCBydW4gb3BlcmF0aW9ucyBkZXBlbmRpbmcgb24gY3VycmVudCBjb250ZXh0IFxuICAqKi9cbiAgcHJpdmF0ZSBvcGVyYXRpb24oZXZlbnQ6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgaWYgKCF0aGlzLnJlbGF0aW9uc2hpcCkge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke2V2ZW50fS4ke3RoaXMuaWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0uJHtldmVudH0uJHt0aGlzLmlkfWA7XG4gICAgfVxuICAgIGxldCBzdWJqZWN0OiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBsZXQgY29uZmlnOiB7IGRhdGE6IGFueSwgcGFyZW50OiBhbnkgfSA9IHtcbiAgICAgIGRhdGEsXG4gICAgICBwYXJlbnQ6IHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50Lmluc3RhbmNlID8gdGhpcy5wYXJlbnQuaW5zdGFuY2UgOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50LCBjb25maWcpO1xuICAgIGxldCByZXN1bHRFdmVudDogc3RyaW5nID0gJyc7XG4gICAgaWYgKCF0aGlzLnJlbGF0aW9uc2hpcCkge1xuICAgICAgcmVzdWx0RXZlbnQgPSBgJHt0aGlzLm1vZGVsLmdldE1vZGVsTmFtZSgpfS52YWx1ZS5yZXN1bHQuJHt0aGlzLmlkfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdEV2ZW50ID0gYCR7dGhpcy5wYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7dGhpcy5yZWxhdGlvbnNoaXB9LnZhbHVlLnJlc3VsdC4ke3RoaXMuaWR9YDtcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQub24ocmVzdWx0RXZlbnQsIChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICBzdWJqZWN0LmVycm9yKHJlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJqZWN0Lm5leHQocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXZlbnQubWF0Y2goJ2Rpc3Bvc2UnKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzdWJqZWN0Lm5leHQoKSk7XG4gICAgfVxuICAgIC8vIFRoaXMgZXZlbnQgbGlzdGVuZXIgd2lsbCBiZSB3aXBlZCB3aXRoaW4gc29ja2V0LmNvbm5lY3Rpb25zXG4gICAgdGhpcy5zb2NrZXQuc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25EaXNjb25uZWN0LnN1YnNjcmliZSgoKSA9PiBzdWJqZWN0LmNvbXBsZXRlKCkpO1xuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcikpKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGJ1aWxkSWRcbiAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBpbnRlcm5hbCBtZXRob2QgYnVpbGQgYW4gSUQgZm9yIHRoaXMgcmVmZXJlbmNlLCB0aGlzIGFsbG93cyB0byBoYXZlXG4gICogbXVsdGlwbGUgcmVmZXJlbmNlcyBmb3IgdGhlIHNhbWUgbW9kZWwgb3IgcmVsYXRpb25zaGlwcy5cbiAgKiovXG4gIHByaXZhdGUgYnVpbGRJZCgpOiBudW1iZXIge1xuICAgIHJldHVybiBEYXRlLm5vdygpICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwODAwKSAqXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDA3MDApICpcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE5ODUwMCk7XG4gIH1cbn1cbiJdfQ==