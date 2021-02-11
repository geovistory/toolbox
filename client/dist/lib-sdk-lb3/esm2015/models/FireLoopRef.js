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
export class FireLoopRef {
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
    constructor(model, socket, parent = null, relationship = null) {
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
        this.socket.emit(`Subscribe.${!parent ? model.getModelName() : parent.model.getModelName()}`, { id: this.id, scope: model.getModelName(), relationship: relationship });
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
    dispose() {
        const subscription = this.operation('dispose', {}).subscribe(() => {
            Object.keys(this.disposable).forEach((channel) => {
                this.socket.removeListener(channel, this.disposable[channel]);
                this.socket.removeAllListeners(channel);
            });
            subscription.unsubscribe();
        });
    }
    /**
    * @method upsert
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for upsert function.
    **/
    upsert(data) {
        return this.operation('upsert', data);
    }
    /**
    * @method create
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for create function.
    **/
    create(data) {
        return this.operation('create', data);
    }
    /**
    * @method remove
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for remove function.
    **/
    remove(data) {
        return this.operation('remove', data);
    }
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
    remote(method, params, broadcast = false) {
        return this.operation('remote', { method, params, broadcast });
    }
    /**
    * @method onRemote
    * @param {string} method Remote method name
    * @return {Observable<any>}
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    onRemote(method) {
        let event = 'remote';
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}`;
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
        }
        return this.broadcasts(event, {});
    }
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
    on(event, filter = { limit: 100, order: 'id DESC' }) {
        if (event === 'remote') {
            throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
        }
        let request;
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}`;
            request = { filter };
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
            request = { filter, parent: this.parent.instance };
        }
        if (event.match(/(value|change|stats)/)) {
            return merge(this.pull(event, request), this.broadcasts(event, request));
        }
        else {
            return this.broadcasts(event, request);
        }
    }
    /**
    * @method stats
    * @param {LoopBackFilter=} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    stats(filter) {
        return this.on('stats', filter);
    }
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
    make(instance) {
        let reference = new FireLoopRef(this.model, this.socket);
        reference.instance = instance;
        return reference;
    }
    /**
    * @method child
    * @param {string} relationship A defined model relationship
    * @return {FireLoopRef<T>}
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    child(relationship) {
        // Return singleton instance
        if (this.childs[relationship]) {
            return this.childs[relationship];
        }
        // Try to get relation settings from current model
        let settings = this.model.getModelDefinition().relations[relationship];
        // Verify the relationship actually exists
        if (!settings) {
            throw new Error(`Invalid model relationship ${this.model.getModelName()} <-> ${relationship}, verify your model settings.`);
        }
        // Verify if the relationship model is public
        if (settings.model === '') {
            throw new Error(`Relationship model is private, cam't use ${relationship} unless you set your model as public.`);
        }
        // Lets get a model reference and add a reference for all of the models
        let model = this.model.models.get(settings.model);
        model.models = this.model.models;
        // If everything goes well, we will store a child reference and return it.
        this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
        return this.childs[relationship];
    }
    /**
    * @method pull
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This method will pull initial data from server
    **/
    pull(event, request) {
        let sbj = new Subject();
        let that = this;
        let nowEvent = `${event}.pull.requested.${this.id}`;
        this.socket.emit(`${event}.pull.request.${this.id}`, request);
        function pullNow(data) {
            if (that.socket.removeListener) {
                that.socket.removeListener(nowEvent, pullNow);
            }
            sbj.next(data);
        }
        ;
        this.socket.on(nowEvent, pullNow);
        return sbj.asObservable();
    }
    /**
    * @method broadcasts
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    broadcasts(event, request) {
        let sbj = new Subject();
        let channels = {
            announce: `${event}.broadcast.announce.${this.id}`,
            broadcast: `${event}.broadcast.${this.id}`
        };
        let that = this;
        // Announces Handler
        this.disposable[channels.announce] = function (res) {
            that.socket.emit(`${event}.broadcast.request.${that.id}`, request);
        };
        // Broadcasts Handler
        this.disposable[channels.broadcast] = function (data) {
            sbj.next(data);
        };
        this.socket.on(channels.announce, this.disposable[channels.announce]);
        this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
        return sbj.asObservable();
    }
    /**
    * @method operation
    * @param {string} event Event name
    * @param {any} data Any type of data sent to the server
    * @return {Observable<T>}
    * @description
    * This internal method will run operations depending on current context
    **/
    operation(event, data) {
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}.${this.id}`;
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}.${this.id}`;
        }
        let subject = new Subject();
        let config = {
            data,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        this.socket.emit(event, config);
        let resultEvent = '';
        if (!this.relationship) {
            resultEvent = `${this.model.getModelName()}.value.result.${this.id}`;
        }
        else {
            resultEvent = `${this.parent.model.getModelName()}.${this.relationship}.value.result.${this.id}`;
        }
        this.socket.on(resultEvent, (res) => {
            if (res.error) {
                subject.error(res);
            }
            else {
                subject.next(res);
            }
        });
        if (event.match('dispose')) {
            setTimeout(() => subject.next());
        }
        // This event listener will be wiped within socket.connections
        this.socket.sharedObservables.sharedOnDisconnect.subscribe(() => subject.complete());
        return subject.asObservable().pipe(catchError((error) => Observable.throw(error)));
    }
    /**
    * @method buildId
    * @return {number}
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    buildId() {
        return Date.now() + Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3BSZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvRmlyZUxvb3BSZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUM7Ozs7Ozs7O0lBUUk7QUFDSixNQUFNLE9BQU8sV0FBVztJQVN0Qjs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQ1UsS0FBVSxFQUNWLE1BQXdCLEVBQ3hCLFNBQTJCLElBQUksRUFDL0IsZUFBdUIsSUFBSTtRQUgzQixVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWU7UUF4QnJDLGVBQWU7UUFDUCxPQUFFLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBR3BDLGVBQWU7UUFDUCxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLG9CQUFvQjtRQUNaLGVBQVUsR0FBMkIsRUFBRSxDQUFDO1FBbUI5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFDM0UsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FDekUsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7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QU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNsQztRQUNELDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyRixPQUFPLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ssT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsIFN0YXRGaWx0ZXIgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG4vKipcbiAqIEBjbGFzcyBGaXJlTG9vcFJlZjxUPlxuICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gKiBAbGljZW5zZSBNSVRcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBjbGFzcyBhbGxvd3MgdG8gY3JlYXRlIEZpcmVMb29wIFJlZmVyZW5jZXMgd2hpY2ggd2lsbCBiZSBpbiBzeW5jIHdpdGhcbiAqIFNlcnZlci4gSXQgYWxzbyBhbGxvd3MgdG8gY3JlYXRlIEZpcmVMb29wIFJlZmVyZW5jZSBDaGlsZHMsIHRoYXQgYWxsb3dzIHRvXG4gKiBwZXJzaXN0IGRhdGEgYWNjb3JkaW5nIHRoZSBnZW5lcmljIG1vZGVsIHJlbGF0aW9uc2hpcHMuXG4gKiovXG5leHBvcnQgY2xhc3MgRmlyZUxvb3BSZWY8VD4ge1xuICAvLyBSZWZlcmVuY2UgSURcbiAgcHJpdmF0ZSBpZDogbnVtYmVyID0gdGhpcy5idWlsZElkKCk7XG4gIC8vIE1vZGVsIEluc3RhbmNlIChGb3IgY2hpbGQgcmVmZXJlbmNlcywgZW1wdHkgb24gcm9vdCByZWZlcmVuY2VzKVxuICBwcml2YXRlIGluc3RhbmNlOiBhbnk7XG4gIC8vIE1vZGVsIENoaWxkc1xuICBwcml2YXRlIGNoaWxkczogYW55ID0ge307XG4gIC8vIERpc3Bvc2FibGUgRXZlbnRzXG4gIHByaXZhdGUgZGlzcG9zYWJsZTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAvKipcbiAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICogQHBhcmFtIHthbnl9IG1vZGVsIFRoZSBtb2RlbCB3ZSB3YW50IHRvIGNyZWF0ZSBhIHJlZmVyZW5jZVxuICAqIEBwYXJhbSB7U29ja2V0Q29ubmVjdGlvbn0gc29ja2V0IFNvY2tldCBjb25uZWN0aW9uIHRvIGhhbmRsZSBldmVudHNcbiAgKiBAcGFyYW0ge0ZpcmVMb29wUmVmPGFueT59IHBhcmVudCBQYXJlbnQgRmlyZUxvb3AgbW9kZWwgcmVmZXJlbmNlXG4gICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcCBUaGUgZGVmaW5lZCBtb2RlbCByZWxhdGlvbnNoaXBcbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGUgY29uc3RydWN0b3Igd2lsbCByZWNlaXZlIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFuZCB0aGVuIHdpbGwgcmVnaXN0ZXIgdGhpcyByZWZlcmVuY2VcbiAgKiBpbnRvIHRoZSBzZXJ2ZXIsIG5lZWRlZCB0byBhbGxvdyBtdWx0aXBsZSByZWZlcmVuY2VzIGZvciB0aGUgc2FtZSBtb2RlbC5cbiAgKiBUaGlzIGlkcyBhcmUgcmVmZXJlbmNlZCBpbnRvIHRoaXMgc3BlY2lmaWMgY2xpZW50IGNvbm5lY3Rpb24gYW5kIHdvbid0IGhhdmUgaXNzdWVzXG4gICogd2l0aCBvdGhlciBjbGllbnQgaWRzLlxuICAqKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtb2RlbDogYW55LFxuICAgIHByaXZhdGUgc29ja2V0OiBTb2NrZXRDb25uZWN0aW9uLFxuICAgIHByaXZhdGUgcGFyZW50OiBGaXJlTG9vcFJlZjxhbnk+ID0gbnVsbCxcbiAgICBwcml2YXRlIHJlbGF0aW9uc2hpcDogc3RyaW5nID0gbnVsbFxuICApIHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KFxuICAgICAgYFN1YnNjcmliZS4keyFwYXJlbnQgPyBtb2RlbC5nZXRNb2RlbE5hbWUoKSA6IHBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX1gLFxuICAgICAgeyBpZDogdGhpcy5pZCwgc2NvcGU6IG1vZGVsLmdldE1vZGVsTmFtZSgpLCByZWxhdGlvbnNoaXA6IHJlbGF0aW9uc2hpcCB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGRpc3Bvc2VcbiAgKiBAcmV0dXJuIHt2b2lkfVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIGlzIHN1cGVyIGltcG9ydGFudCB0byBhdm9pZCBtZW1vcnkgbGVha3MgaW4gdGhlIHNlcnZlci5cbiAgKiBUaGlzIG1ldGhvZCByZXF1aXJlcyB0byBiZSBjYWxsZWQgb24gY29tcG9uZW50cyBkZXN0cm95XG4gICpcbiAgKiBuZ09uRGVzdHJveSgpIHtcbiAgKiAgdGhpcy5zb21lUmVmLmRpc3Bvc2UoKSBcbiAgKiB9XG4gICoqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLm9wZXJhdGlvbignZGlzcG9zZScsIHt9KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5kaXNwb3NhYmxlKS5mb3JFYWNoKChjaGFubmVsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxdKTtcbiAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xuICAgICAgfSk7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIHVwc2VydFxuICAqIEBwYXJhbSB7VH0gZGF0YSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2VcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIE9wZXJhdGlvbiB3cmFwcGVyIGZvciB1cHNlcnQgZnVuY3Rpb24uXG4gICoqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24oJ3Vwc2VydCcsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgY3JlYXRlXG4gICogQHBhcmFtIHtUfSBkYXRhIFBlcnNpc3RlZCBtb2RlbCBpbnN0YW5jZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogT3BlcmF0aW9uIHdyYXBwZXIgZm9yIGNyZWF0ZSBmdW5jdGlvbi5cbiAgKiovXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbignY3JlYXRlJywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCByZW1vdmVcbiAgKiBAcGFyYW0ge1R9IGRhdGEgUGVyc2lzdGVkIG1vZGVsIGluc3RhbmNlXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBPcGVyYXRpb24gd3JhcHBlciBmb3IgcmVtb3ZlIGZ1bmN0aW9uLlxuICAqKi9cbiAgcHVibGljIHJlbW92ZShkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uKCdyZW1vdmUnLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIHJlbW90ZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgUmVtb3RlIG1ldGhvZCBuYW1lXG4gICogQHBhcmFtIHthbnlbXT19IHBhcmFtcyBQYXJhbWV0ZXJzIHRvIGJlIGFwcGxpZWQgaW50byB0aGUgcmVtb3RlIG1ldGhvZFxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gYnJvYWRjYXN0IEZsYWcgdG8gZGVmaW5lIGlmIHRoZSBtZXRob2QgcmVzdWx0cyBzaG91bGQgYmUgYnJvYWRjYXN0ZWRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2QgY2FsbHMgZm9yIGFueSByZW1vdGUgbWV0aG9kLiBJdCBpcyBmbGV4aWJsZSBlbm91Z2ggdG9cbiAgKiBhbGxvdyB5b3UgY2FsbCBlaXRoZXIgYnVpbHQtaW4gb3IgY3VzdG9tIHJlbW90ZSBtZXRob2RzLlxuICAqXG4gICogRmlyZUxvb3AgcHJvdmlkZXMgdGhpcyBpbnRlcmZhY2UgdG8gZW5hYmxlIGNhbGxpbmcgcmVtb3RlIG1ldGhvZHNcbiAgKiBidXQgYWxzbyB0byBvcHRpb25hbGx5IHNlbmQgYW55IGRlZmluZWQgYWNjZXB0IHBhcmFtcyB0aGF0IHdpbGwgYmVcbiAgKiBhcHBsaWVkIHdpdGhpbiB0aGUgc2VydmVyLlxuICAqKi9cbiAgcHVibGljIHJlbW90ZShtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55W10sIGJyb2FkY2FzdDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24oJ3JlbW90ZScsIHsgbWV0aG9kLCBwYXJhbXMsIGJyb2FkY2FzdCB9KTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9uUmVtb3RlXG4gICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBSZW1vdGUgbWV0aG9kIG5hbWVcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2QgbGlzdGVuIGZvciBwdWJsaWMgYnJvYWRjYXN0ZWQgcmVtb3RlIG1ldGhvZCByZXN1bHRzLiBJZiB0aGUgcmVtb3RlIG1ldGhvZFxuICAqIGV4ZWN1dGlvbiBpcyBub3QgcHVibGljIG9ubHkgdGhlIG93bmVyIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0IGRhdGEuXG4gICoqL1xuICBwdWJsaWMgb25SZW1vdGUobWV0aG9kOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBldmVudDogc3RyaW5nID0gJ3JlbW90ZSc7XG4gICAgaWYgKCF0aGlzLnJlbGF0aW9uc2hpcCkge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke2V2ZW50fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5wYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7dGhpcy5yZWxhdGlvbnNoaXB9LiR7ZXZlbnR9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYnJvYWRjYXN0cyhldmVudCwge30pO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2Qgb25cbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAqIEBwYXJhbSB7TG9vcEJhY2tGaWx0ZXJ9IGZpbHRlciBMb29wQmFjayBxdWVyeSBmaWx0ZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIExpc3RlbmVyIGZvciBkaWZmZXJlbnQgdHlwZSBvZiBldmVudHMuIFZhbGlkIGV2ZW50cyBhcmU6XG4gICogICAtIGNoYW5nZSAoVHJpZ2dlcnMgb24gYW55IG1vZGVsIGNoYW5nZSAtY3JlYXRlLCB1cGRhdGUsIHJlbW92ZS0pXG4gICogICAtIHZhbHVlIChUcmlnZ2VycyBvbiBuZXcgZW50cmllcylcbiAgKiAgIC0gY2hpbGRfYWRkZWQgKFRyaWdnZXJzIHdoZW4gYSBjaGlsZCBpcyBhZGRlZClcbiAgKiAgIC0gY2hpbGRfdXBkYXRlZCAoVHJpZ2dlcnMgd2hlbiBhIGNoaWxkIGlzIHVwZGF0ZWQpXG4gICogICAtIGNoaWxkX3JlbW92ZWQgKFRyaWdnZXJzIHdoZW4gYSBjaGlsZCBpcyByZW1vdmVkKVxuICAqKi9cbiAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7IGxpbWl0OiAxMDAsIG9yZGVyOiAnaWQgREVTQycgfSk6IE9ic2VydmFibGU8VCB8IFRbXT4ge1xuICAgIGlmIChldmVudCA9PT0gJ3JlbW90ZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwicmVtb3RlXCIgZXZlbnQgaXMgbm90IGFsbG93ZWQgdXNpbmcgXCJvbigpXCIgbWV0aG9kLCB1c2UgXCJvblJlbW90ZSgpXCIgaW5zdGVhZCcpO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdDogYW55O1xuICAgIGlmICghdGhpcy5yZWxhdGlvbnNoaXApIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH1gO1xuICAgICAgcmVxdWVzdCA9IHsgZmlsdGVyIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5wYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7dGhpcy5yZWxhdGlvbnNoaXB9LiR7ZXZlbnR9YDtcbiAgICAgIHJlcXVlc3QgPSB7IGZpbHRlciwgcGFyZW50OiB0aGlzLnBhcmVudC5pbnN0YW5jZSB9O1xuICAgIH1cbiAgICBpZiAoZXZlbnQubWF0Y2goLyh2YWx1ZXxjaGFuZ2V8c3RhdHMpLykpIHtcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgdGhpcy5wdWxsKGV2ZW50LCByZXF1ZXN0KSxcbiAgICAgICAgdGhpcy5icm9hZGNhc3RzKGV2ZW50LCByZXF1ZXN0KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYnJvYWRjYXN0cyhldmVudCwgcmVxdWVzdCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAqIEBtZXRob2Qgc3RhdHNcbiAgKiBAcGFyYW0ge0xvb3BCYWNrRmlsdGVyPX0gZmlsdGVyIExvb3BCYWNrIHF1ZXJ5IGZpbHRlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogTGlzdGVuZXIgZm9yIHJlYWwtdGltZSBzdGF0aXN0aWNzLCB3aWxsIHRyaWdnZXIgb24gZXZlcnlcbiAgKiBzdGF0aXN0aWMgbW9kaWZpY2F0aW9uLlxuICAqIFRJUDogWW91IGNhbiBpbXByb3ZlIHBlcmZvcm1hbmNlIGJ5IGFkZGluZyBtZW1jYWNoZWQgdG8gTG9vcEJhY2sgbW9kZWxzLlxuICAqKi9cbiAgcHVibGljIHN0YXRzKGZpbHRlcj86IFN0YXRGaWx0ZXIpOiBPYnNlcnZhYmxlPFQgfCBUW10+IHtcbiAgICByZXR1cm4gdGhpcy5vbignc3RhdHMnLCBmaWx0ZXIpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgbWFrZVxuICAqIEBwYXJhbSB7YW55fSBpbnN0YW5jZSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2UgcmVmZXJlbmNlXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIG1vZGVsIGluc3RhbmNlIGludG8gdGhpcyBhIG5ldyBGaXJlTG9vcCBSZWZlcmVuY2UuXG4gICogVGhpcyBhbGxvd3MgdG8gcGVyc2lzdGUgcGFyZW50c2hpcCB3aGVuIGNyZWF0aW5nIHJlbGF0ZWQgaW5zdGFuY2VzLlxuICAqXG4gICogSXQgYWxzbyBhbGxvd3MgdG8gaGF2ZSBtdWx0aXBsZSBkaWZmZXJlbnQgcGVyc2lzdGVkIGluc3RhbmNlIHJlZmVyZW5jZXMgdG8gc2FtZSBtb2RlbC5cbiAgKiBvdGhlcndpc2UgaWYgdXNpbmcgc2luZ2xldG9uIHdpbGwgcmVwbGFjZSBhIHByZXZpb3VzIGluc3RhbmNlIGZvciBhIG5ldyBpbnN0YW5jZSwgd2hlblxuICAqIHdlIGFjdHVhbGx5IHdhbnQgdG8gaGF2ZSBtb3JlIHRoYW4gMSBpbnN0YW5jZSBvZiBzYW1lIG1vZGVsLlxuICAqKi9cbiAgcHVibGljIG1ha2UoaW5zdGFuY2U6IGFueSk6IEZpcmVMb29wUmVmPFQ+IHtcbiAgICBsZXQgcmVmZXJlbmNlOiBGaXJlTG9vcFJlZjxUPiA9IG5ldyBGaXJlTG9vcFJlZjxUPih0aGlzLm1vZGVsLCB0aGlzLnNvY2tldCk7XG4gICAgcmVmZXJlbmNlLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgcmV0dXJuIHJlZmVyZW5jZTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGNoaWxkXG4gICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uc2hpcCBBIGRlZmluZWQgbW9kZWwgcmVsYXRpb25zaGlwXG4gICogQHJldHVybiB7RmlyZUxvb3BSZWY8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBjaGlsZCByZWZlcmVuY2VzLCB3aGljaCB3aWxsIHBlcnNpc3QgcmVsYXRlZCBtb2RlbFxuICAqIGluc3RhbmNlcy4gZS5nLiBSb29tLm1lc3NhZ2VzLCB3aGVyZSBtZXNzYWdlcyBiZWxvbmdzIHRvIGEgc3BlY2lmaWMgUm9vbS5cbiAgKiovXG4gIHB1YmxpYyBjaGlsZDxUPihyZWxhdGlvbnNoaXA6IHN0cmluZyk6IEZpcmVMb29wUmVmPFQ+IHtcbiAgICAvLyBSZXR1cm4gc2luZ2xldG9uIGluc3RhbmNlXG4gICAgaWYgKHRoaXMuY2hpbGRzW3JlbGF0aW9uc2hpcF0pIHsgcmV0dXJuIHRoaXMuY2hpbGRzW3JlbGF0aW9uc2hpcF07IH1cbiAgICAvLyBUcnkgdG8gZ2V0IHJlbGF0aW9uIHNldHRpbmdzIGZyb20gY3VycmVudCBtb2RlbFxuICAgIGxldCBzZXR0aW5nczogYW55ID0gdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5yZWxhdGlvbnNbcmVsYXRpb25zaGlwXTtcbiAgICAvLyBWZXJpZnkgdGhlIHJlbGF0aW9uc2hpcCBhY3R1YWxseSBleGlzdHNcbiAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbW9kZWwgcmVsYXRpb25zaGlwICR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0gPC0+ICR7cmVsYXRpb25zaGlwfSwgdmVyaWZ5IHlvdXIgbW9kZWwgc2V0dGluZ3MuYCk7XG4gICAgfVxuICAgIC8vIFZlcmlmeSBpZiB0aGUgcmVsYXRpb25zaGlwIG1vZGVsIGlzIHB1YmxpY1xuICAgIGlmIChzZXR0aW5ncy5tb2RlbCA9PT0gJycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVsYXRpb25zaGlwIG1vZGVsIGlzIHByaXZhdGUsIGNhbSd0IHVzZSAke3JlbGF0aW9uc2hpcH0gdW5sZXNzIHlvdSBzZXQgeW91ciBtb2RlbCBhcyBwdWJsaWMuYCk7XG4gICAgfVxuICAgIC8vIExldHMgZ2V0IGEgbW9kZWwgcmVmZXJlbmNlIGFuZCBhZGQgYSByZWZlcmVuY2UgZm9yIGFsbCBvZiB0aGUgbW9kZWxzXG4gICAgbGV0IG1vZGVsOiBhbnkgPSB0aGlzLm1vZGVsLm1vZGVscy5nZXQoc2V0dGluZ3MubW9kZWwpO1xuICAgIG1vZGVsLm1vZGVscyA9IHRoaXMubW9kZWwubW9kZWxzO1xuICAgIC8vIElmIGV2ZXJ5dGhpbmcgZ29lcyB3ZWxsLCB3ZSB3aWxsIHN0b3JlIGEgY2hpbGQgcmVmZXJlbmNlIGFuZCByZXR1cm4gaXQuXG4gICAgdGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXSA9IG5ldyBGaXJlTG9vcFJlZjxUPihtb2RlbCwgdGhpcy5zb2NrZXQsIHRoaXMsIHJlbGF0aW9uc2hpcCk7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRzW3JlbGF0aW9uc2hpcF07XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBwdWxsXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgKiBAcGFyYW0ge2FueX0gcmVxdWVzdCBUeXBlIG9mIHJlcXVlc3QsIGNhbiBiZSBMQi1vbmx5IGZpbHRlciBvciBGTCtMQiBmaWx0ZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIHdpbGwgcHVsbCBpbml0aWFsIGRhdGEgZnJvbSBzZXJ2ZXJcbiAgKiovXG4gIHByaXZhdGUgcHVsbChldmVudDogc3RyaW5nLCByZXF1ZXN0OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgc2JqOiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBsZXQgdGhhdDogRmlyZUxvb3BSZWY8VD4gPSB0aGlzO1xuICAgIGxldCBub3dFdmVudDogYW55ID0gYCR7ZXZlbnR9LnB1bGwucmVxdWVzdGVkLiR7dGhpcy5pZH1gO1xuICAgIHRoaXMuc29ja2V0LmVtaXQoYCR7ZXZlbnR9LnB1bGwucmVxdWVzdC4ke3RoaXMuaWR9YCwgcmVxdWVzdCk7XG4gICAgZnVuY3Rpb24gcHVsbE5vdyhkYXRhOiBhbnkpIHtcbiAgICAgIGlmICh0aGF0LnNvY2tldC5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICB0aGF0LnNvY2tldC5yZW1vdmVMaXN0ZW5lcihub3dFdmVudCwgcHVsbE5vdyk7XG4gICAgICB9XG4gICAgICBzYmoubmV4dChkYXRhKTtcbiAgICB9O1xuICAgIHRoaXMuc29ja2V0Lm9uKG5vd0V2ZW50LCBwdWxsTm93KTtcbiAgICByZXR1cm4gc2JqLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgYnJvYWRjYXN0c1xuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICogQHBhcmFtIHthbnl9IHJlcXVlc3QgVHlwZSBvZiByZXF1ZXN0LCBjYW4gYmUgTEItb25seSBmaWx0ZXIgb3IgRkwrTEIgZmlsdGVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIHdpbGwgbGlzdGVuIGZvciBwdWJsaWMgYnJvYWRjYXN0cyBhbm5vdW5jZXMgYW5kIHRoZW4gcmVxdWVzdFxuICAqIGZvciBkYXRhIGFjY29yZGluZyBhIHNwZWNpZmljIGNsaWVudCByZXF1ZXN0LCBub3Qgc2hhcmVkIHdpdGggb3RoZXIgY2xpZW50cy5cbiAgKiovXG4gIHByaXZhdGUgYnJvYWRjYXN0cyhldmVudDogc3RyaW5nLCByZXF1ZXN0OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgc2JqOiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBsZXQgY2hhbm5lbHM6IHsgYW5ub3VuY2U6IHN0cmluZywgYnJvYWRjYXN0OiBzdHJpbmcgfSA9IHtcbiAgICAgIGFubm91bmNlOiBgJHtldmVudH0uYnJvYWRjYXN0LmFubm91bmNlLiR7dGhpcy5pZH1gLFxuICAgICAgYnJvYWRjYXN0OiBgJHtldmVudH0uYnJvYWRjYXN0LiR7dGhpcy5pZH1gXG4gICAgfTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gQW5ub3VuY2VzIEhhbmRsZXJcbiAgICB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbHMuYW5ub3VuY2VdID0gZnVuY3Rpb24gKHJlczogVCkge1xuICAgICAgdGhhdC5zb2NrZXQuZW1pdChgJHtldmVudH0uYnJvYWRjYXN0LnJlcXVlc3QuJHt0aGF0LmlkfWAsIHJlcXVlc3QpXG4gICAgfTtcbiAgICAvLyBCcm9hZGNhc3RzIEhhbmRsZXJcbiAgICB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbHMuYnJvYWRjYXN0XSA9IGZ1bmN0aW9uIChkYXRhOiBhbnkpIHtcbiAgICAgIHNiai5uZXh0KGRhdGEpO1xuICAgIH07XG4gICAgdGhpcy5zb2NrZXQub24oY2hhbm5lbHMuYW5ub3VuY2UsIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVscy5hbm5vdW5jZV0pO1xuICAgIHRoaXMuc29ja2V0Lm9uKGNoYW5uZWxzLmJyb2FkY2FzdCwgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmJyb2FkY2FzdF0pO1xuICAgIHJldHVybiBzYmouYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvcGVyYXRpb25cbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAqIEBwYXJhbSB7YW55fSBkYXRhIEFueSB0eXBlIG9mIGRhdGEgc2VudCB0byB0aGUgc2VydmVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIGludGVybmFsIG1ldGhvZCB3aWxsIHJ1biBvcGVyYXRpb25zIGRlcGVuZGluZyBvbiBjdXJyZW50IGNvbnRleHQgXG4gICoqL1xuICBwcml2YXRlIG9wZXJhdGlvbihldmVudDogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XG4gICAgICBldmVudCA9IGAke3RoaXMubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7ZXZlbnR9LiR7dGhpcy5pZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudCA9IGAke3RoaXMucGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke3RoaXMucmVsYXRpb25zaGlwfS4ke2V2ZW50fS4ke3RoaXMuaWR9YDtcbiAgICB9XG4gICAgbGV0IHN1YmplY3Q6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xuICAgIGxldCBjb25maWc6IHsgZGF0YTogYW55LCBwYXJlbnQ6IGFueSB9ID0ge1xuICAgICAgZGF0YSxcbiAgICAgIHBhcmVudDogdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuaW5zdGFuY2UgPyB0aGlzLnBhcmVudC5pbnN0YW5jZSA6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnQsIGNvbmZpZyk7XG4gICAgbGV0IHJlc3VsdEV2ZW50OiBzdHJpbmcgPSAnJztcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XG4gICAgICByZXN1bHRFdmVudCA9IGAke3RoaXMubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LnZhbHVlLnJlc3VsdC4ke3RoaXMuaWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0RXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0udmFsdWUucmVzdWx0LiR7dGhpcy5pZH1gO1xuICAgIH1cbiAgICB0aGlzLnNvY2tldC5vbihyZXN1bHRFdmVudCwgKHJlczogYW55KSA9PiB7XG4gICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgIHN1YmplY3QuZXJyb3IocmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YmplY3QubmV4dChyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChldmVudC5tYXRjaCgnZGlzcG9zZScpKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHN1YmplY3QubmV4dCgpKTtcbiAgICB9XG4gICAgLy8gVGhpcyBldmVudCBsaXN0ZW5lciB3aWxsIGJlIHdpcGVkIHdpdGhpbiBzb2NrZXQuY29ubmVjdGlvbnNcbiAgICB0aGlzLnNvY2tldC5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkRpc2Nvbm5lY3Quc3Vic2NyaWJlKCgpID0+IHN1YmplY3QuY29tcGxldGUoKSk7XG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShjYXRjaEVycm9yKChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKSkpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgYnVpbGRJZFxuICAqIEByZXR1cm4ge251bWJlcn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIGludGVybmFsIG1ldGhvZCBidWlsZCBhbiBJRCBmb3IgdGhpcyByZWZlcmVuY2UsIHRoaXMgYWxsb3dzIHRvIGhhdmVcbiAgKiBtdWx0aXBsZSByZWZlcmVuY2VzIGZvciB0aGUgc2FtZSBtb2RlbCBvciByZWxhdGlvbnNoaXBzLlxuICAqKi9cbiAgcHJpdmF0ZSBidWlsZElkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIERhdGUubm93KCkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDA4MDApICpcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDcwMCkgKlxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTk4NTAwKTtcbiAgfVxufVxuIl19