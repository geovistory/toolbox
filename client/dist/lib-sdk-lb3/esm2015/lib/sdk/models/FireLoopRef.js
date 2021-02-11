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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3BSZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9GaXJlTG9vcFJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc1Qzs7Ozs7Ozs7SUFRSTtBQUNKLE1BQU0sT0FBTyxXQUFXO0lBU3RCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFDVSxLQUFVLEVBQ1YsTUFBd0IsRUFDeEIsU0FBMkIsSUFBSSxFQUMvQixlQUF1QixJQUFJO1FBSDNCLFVBQUssR0FBTCxLQUFLLENBQUs7UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQXhCckMsZUFBZTtRQUNQLE9BQUUsR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFHcEMsZUFBZTtRQUNQLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFDekIsb0JBQW9CO1FBQ1osZUFBVSxHQUEyQixFQUFFLENBQUM7UUFtQjlDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUMzRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUN6RSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7Ozs7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IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgU3RhdEZpbHRlciB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbi8qKlxuICogQGNsYXNzIEZpcmVMb29wUmVmPFQ+XG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGNsYXNzIGFsbG93cyB0byBjcmVhdGUgRmlyZUxvb3AgUmVmZXJlbmNlcyB3aGljaCB3aWxsIGJlIGluIHN5bmMgd2l0aFxuICogU2VydmVyLiBJdCBhbHNvIGFsbG93cyB0byBjcmVhdGUgRmlyZUxvb3AgUmVmZXJlbmNlIENoaWxkcywgdGhhdCBhbGxvd3MgdG9cbiAqIHBlcnNpc3QgZGF0YSBhY2NvcmRpbmcgdGhlIGdlbmVyaWMgbW9kZWwgcmVsYXRpb25zaGlwcy5cbiAqKi9cbmV4cG9ydCBjbGFzcyBGaXJlTG9vcFJlZjxUPiB7XG4gIC8vIFJlZmVyZW5jZSBJRFxuICBwcml2YXRlIGlkOiBudW1iZXIgPSB0aGlzLmJ1aWxkSWQoKTtcbiAgLy8gTW9kZWwgSW5zdGFuY2UgKEZvciBjaGlsZCByZWZlcmVuY2VzLCBlbXB0eSBvbiByb290IHJlZmVyZW5jZXMpXG4gIHByaXZhdGUgaW5zdGFuY2U6IGFueTtcbiAgLy8gTW9kZWwgQ2hpbGRzXG4gIHByaXZhdGUgY2hpbGRzOiBhbnkgPSB7fTtcbiAgLy8gRGlzcG9zYWJsZSBFdmVudHNcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gIC8qKlxuICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgKiBAcGFyYW0ge2FueX0gbW9kZWwgVGhlIG1vZGVsIHdlIHdhbnQgdG8gY3JlYXRlIGEgcmVmZXJlbmNlXG4gICogQHBhcmFtIHtTb2NrZXRDb25uZWN0aW9ufSBzb2NrZXQgU29ja2V0IGNvbm5lY3Rpb24gdG8gaGFuZGxlIGV2ZW50c1xuICAqIEBwYXJhbSB7RmlyZUxvb3BSZWY8YW55Pn0gcGFyZW50IFBhcmVudCBGaXJlTG9vcCBtb2RlbCByZWZlcmVuY2VcbiAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwIFRoZSBkZWZpbmVkIG1vZGVsIHJlbGF0aW9uc2hpcFxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoZSBjb25zdHJ1Y3RvciB3aWxsIHJlY2VpdmUgdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgYW5kIHRoZW4gd2lsbCByZWdpc3RlciB0aGlzIHJlZmVyZW5jZVxuICAqIGludG8gdGhlIHNlcnZlciwgbmVlZGVkIHRvIGFsbG93IG11bHRpcGxlIHJlZmVyZW5jZXMgZm9yIHRoZSBzYW1lIG1vZGVsLlxuICAqIFRoaXMgaWRzIGFyZSByZWZlcmVuY2VkIGludG8gdGhpcyBzcGVjaWZpYyBjbGllbnQgY29ubmVjdGlvbiBhbmQgd29uJ3QgaGF2ZSBpc3N1ZXNcbiAgKiB3aXRoIG90aGVyIGNsaWVudCBpZHMuXG4gICoqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1vZGVsOiBhbnksXG4gICAgcHJpdmF0ZSBzb2NrZXQ6IFNvY2tldENvbm5lY3Rpb24sXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IEZpcmVMb29wUmVmPGFueT4gPSBudWxsLFxuICAgIHByaXZhdGUgcmVsYXRpb25zaGlwOiBzdHJpbmcgPSBudWxsXG4gICkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoXG4gICAgICBgU3Vic2NyaWJlLiR7IXBhcmVudCA/IG1vZGVsLmdldE1vZGVsTmFtZSgpIDogcGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfWAsXG4gICAgICB7IGlkOiB0aGlzLmlkLCBzY29wZTogbW9kZWwuZ2V0TW9kZWxOYW1lKCksIHJlbGF0aW9uc2hpcDogcmVsYXRpb25zaGlwIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZGlzcG9zZVxuICAqIEByZXR1cm4ge3ZvaWR9XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2QgaXMgc3VwZXIgaW1wb3J0YW50IHRvIGF2b2lkIG1lbW9yeSBsZWFrcyBpbiB0aGUgc2VydmVyLlxuICAqIFRoaXMgbWV0aG9kIHJlcXVpcmVzIHRvIGJlIGNhbGxlZCBvbiBjb21wb25lbnRzIGRlc3Ryb3lcbiAgKlxuICAqIG5nT25EZXN0cm95KCkge1xuICAqICB0aGlzLnNvbWVSZWYuZGlzcG9zZSgpIFxuICAqIH1cbiAgKiovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMub3BlcmF0aW9uKCdkaXNwb3NlJywge30pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmRpc3Bvc2FibGUpLmZvckVhY2goKGNoYW5uZWw6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbF0pO1xuICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbCk7XG4gICAgICB9KTtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgdXBzZXJ0XG4gICogQHBhcmFtIHtUfSBkYXRhIFBlcnNpc3RlZCBtb2RlbCBpbnN0YW5jZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogT3BlcmF0aW9uIHdyYXBwZXIgZm9yIHVwc2VydCBmdW5jdGlvbi5cbiAgKiovXG4gIHB1YmxpYyB1cHNlcnQoZGF0YTogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbigndXBzZXJ0JywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBjcmVhdGVcbiAgKiBAcGFyYW0ge1R9IGRhdGEgUGVyc2lzdGVkIG1vZGVsIGluc3RhbmNlXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBPcGVyYXRpb24gd3JhcHBlciBmb3IgY3JlYXRlIGZ1bmN0aW9uLlxuICAqKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uKCdjcmVhdGUnLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIHJlbW92ZVxuICAqIEBwYXJhbSB7VH0gZGF0YSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2VcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIE9wZXJhdGlvbiB3cmFwcGVyIGZvciByZW1vdmUgZnVuY3Rpb24uXG4gICoqL1xuICBwdWJsaWMgcmVtb3ZlKGRhdGE6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24oJ3JlbW92ZScsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgcmVtb3RlXG4gICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBSZW1vdGUgbWV0aG9kIG5hbWVcbiAgKiBAcGFyYW0ge2FueVtdPX0gcGFyYW1zIFBhcmFtZXRlcnMgdG8gYmUgYXBwbGllZCBpbnRvIHRoZSByZW1vdGUgbWV0aG9kXG4gICogQHBhcmFtIHtib29sZWFufSBicm9hZGNhc3QgRmxhZyB0byBkZWZpbmUgaWYgdGhlIG1ldGhvZCByZXN1bHRzIHNob3VsZCBiZSBicm9hZGNhc3RlZFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCBjYWxscyBmb3IgYW55IHJlbW90ZSBtZXRob2QuIEl0IGlzIGZsZXhpYmxlIGVub3VnaCB0b1xuICAqIGFsbG93IHlvdSBjYWxsIGVpdGhlciBidWlsdC1pbiBvciBjdXN0b20gcmVtb3RlIG1ldGhvZHMuXG4gICpcbiAgKiBGaXJlTG9vcCBwcm92aWRlcyB0aGlzIGludGVyZmFjZSB0byBlbmFibGUgY2FsbGluZyByZW1vdGUgbWV0aG9kc1xuICAqIGJ1dCBhbHNvIHRvIG9wdGlvbmFsbHkgc2VuZCBhbnkgZGVmaW5lZCBhY2NlcHQgcGFyYW1zIHRoYXQgd2lsbCBiZVxuICAqIGFwcGxpZWQgd2l0aGluIHRoZSBzZXJ2ZXIuXG4gICoqL1xuICBwdWJsaWMgcmVtb3RlKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBhbnlbXSwgYnJvYWRjYXN0OiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbigncmVtb3RlJywgeyBtZXRob2QsIHBhcmFtcywgYnJvYWRjYXN0IH0pO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2Qgb25SZW1vdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIFJlbW90ZSBtZXRob2QgbmFtZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCBsaXN0ZW4gZm9yIHB1YmxpYyBicm9hZGNhc3RlZCByZW1vdGUgbWV0aG9kIHJlc3VsdHMuIElmIHRoZSByZW1vdGUgbWV0aG9kXG4gICogZXhlY3V0aW9uIGlzIG5vdCBwdWJsaWMgb25seSB0aGUgb3duZXIgd2lsbCByZWNlaXZlIHRoZSByZXN1bHQgZGF0YS5cbiAgKiovXG4gIHB1YmxpYyBvblJlbW90ZShtZXRob2Q6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGV2ZW50OiBzdHJpbmcgPSAncmVtb3RlJztcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XG4gICAgICBldmVudCA9IGAke3RoaXMubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7ZXZlbnR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0uJHtldmVudH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5icm9hZGNhc3RzKGV2ZW50LCB7fSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBvblxuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICogQHBhcmFtIHtMb29wQmFja0ZpbHRlcn0gZmlsdGVyIExvb3BCYWNrIHF1ZXJ5IGZpbHRlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogTGlzdGVuZXIgZm9yIGRpZmZlcmVudCB0eXBlIG9mIGV2ZW50cy4gVmFsaWQgZXZlbnRzIGFyZTpcbiAgKiAgIC0gY2hhbmdlIChUcmlnZ2VycyBvbiBhbnkgbW9kZWwgY2hhbmdlIC1jcmVhdGUsIHVwZGF0ZSwgcmVtb3ZlLSlcbiAgKiAgIC0gdmFsdWUgKFRyaWdnZXJzIG9uIG5ldyBlbnRyaWVzKVxuICAqICAgLSBjaGlsZF9hZGRlZCAoVHJpZ2dlcnMgd2hlbiBhIGNoaWxkIGlzIGFkZGVkKVxuICAqICAgLSBjaGlsZF91cGRhdGVkIChUcmlnZ2VycyB3aGVuIGEgY2hpbGQgaXMgdXBkYXRlZClcbiAgKiAgIC0gY2hpbGRfcmVtb3ZlZCAoVHJpZ2dlcnMgd2hlbiBhIGNoaWxkIGlzIHJlbW92ZWQpXG4gICoqL1xuICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHsgbGltaXQ6IDEwMCwgb3JkZXI6ICdpZCBERVNDJyB9KTogT2JzZXJ2YWJsZTxUIHwgVFtdPiB7XG4gICAgaWYgKGV2ZW50ID09PSAncmVtb3RlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJyZW1vdGVcIiBldmVudCBpcyBub3QgYWxsb3dlZCB1c2luZyBcIm9uKClcIiBtZXRob2QsIHVzZSBcIm9uUmVtb3RlKClcIiBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIGxldCByZXF1ZXN0OiBhbnk7XG4gICAgaWYgKCF0aGlzLnJlbGF0aW9uc2hpcCkge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke2V2ZW50fWA7XG4gICAgICByZXF1ZXN0ID0geyBmaWx0ZXIgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0uJHtldmVudH1gO1xuICAgICAgcmVxdWVzdCA9IHsgZmlsdGVyLCBwYXJlbnQ6IHRoaXMucGFyZW50Lmluc3RhbmNlIH07XG4gICAgfVxuICAgIGlmIChldmVudC5tYXRjaCgvKHZhbHVlfGNoYW5nZXxzdGF0cykvKSkge1xuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICB0aGlzLnB1bGwoZXZlbnQsIHJlcXVlc3QpLFxuICAgICAgICB0aGlzLmJyb2FkY2FzdHMoZXZlbnQsIHJlcXVlc3QpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5icm9hZGNhc3RzKGV2ZW50LCByZXF1ZXN0KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBzdGF0c1xuICAqIEBwYXJhbSB7TG9vcEJhY2tGaWx0ZXI9fSBmaWx0ZXIgTG9vcEJhY2sgcXVlcnkgZmlsdGVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBMaXN0ZW5lciBmb3IgcmVhbC10aW1lIHN0YXRpc3RpY3MsIHdpbGwgdHJpZ2dlciBvbiBldmVyeVxuICAqIHN0YXRpc3RpYyBtb2RpZmljYXRpb24uXG4gICogVElQOiBZb3UgY2FuIGltcHJvdmUgcGVyZm9ybWFuY2UgYnkgYWRkaW5nIG1lbWNhY2hlZCB0byBMb29wQmFjayBtb2RlbHMuXG4gICoqL1xuICBwdWJsaWMgc3RhdHMoZmlsdGVyPzogU3RhdEZpbHRlcik6IE9ic2VydmFibGU8VCB8IFRbXT4ge1xuICAgIHJldHVybiB0aGlzLm9uKCdzdGF0cycsIGZpbHRlcik7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBtYWtlXG4gICogQHBhcmFtIHthbnl9IGluc3RhbmNlIFBlcnNpc3RlZCBtb2RlbCBpbnN0YW5jZSByZWZlcmVuY2VcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgbWV0aG9kIHdpbGwgc2V0IGEgbW9kZWwgaW5zdGFuY2UgaW50byB0aGlzIGEgbmV3IEZpcmVMb29wIFJlZmVyZW5jZS5cbiAgKiBUaGlzIGFsbG93cyB0byBwZXJzaXN0ZSBwYXJlbnRzaGlwIHdoZW4gY3JlYXRpbmcgcmVsYXRlZCBpbnN0YW5jZXMuXG4gICpcbiAgKiBJdCBhbHNvIGFsbG93cyB0byBoYXZlIG11bHRpcGxlIGRpZmZlcmVudCBwZXJzaXN0ZWQgaW5zdGFuY2UgcmVmZXJlbmNlcyB0byBzYW1lIG1vZGVsLlxuICAqIG90aGVyd2lzZSBpZiB1c2luZyBzaW5nbGV0b24gd2lsbCByZXBsYWNlIGEgcHJldmlvdXMgaW5zdGFuY2UgZm9yIGEgbmV3IGluc3RhbmNlLCB3aGVuXG4gICogd2UgYWN0dWFsbHkgd2FudCB0byBoYXZlIG1vcmUgdGhhbiAxIGluc3RhbmNlIG9mIHNhbWUgbW9kZWwuXG4gICoqL1xuICBwdWJsaWMgbWFrZShpbnN0YW5jZTogYW55KTogRmlyZUxvb3BSZWY8VD4ge1xuICAgIGxldCByZWZlcmVuY2U6IEZpcmVMb29wUmVmPFQ+ID0gbmV3IEZpcmVMb29wUmVmPFQ+KHRoaXMubW9kZWwsIHRoaXMuc29ja2V0KTtcbiAgICByZWZlcmVuY2UuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICByZXR1cm4gcmVmZXJlbmNlO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgY2hpbGRcbiAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwIEEgZGVmaW5lZCBtb2RlbCByZWxhdGlvbnNoaXBcbiAgKiBAcmV0dXJuIHtGaXJlTG9vcFJlZjxUPn1cbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGNoaWxkIHJlZmVyZW5jZXMsIHdoaWNoIHdpbGwgcGVyc2lzdCByZWxhdGVkIG1vZGVsXG4gICogaW5zdGFuY2VzLiBlLmcuIFJvb20ubWVzc2FnZXMsIHdoZXJlIG1lc3NhZ2VzIGJlbG9uZ3MgdG8gYSBzcGVjaWZpYyBSb29tLlxuICAqKi9cbiAgcHVibGljIGNoaWxkPFQ+KHJlbGF0aW9uc2hpcDogc3RyaW5nKTogRmlyZUxvb3BSZWY8VD4ge1xuICAgIC8vIFJldHVybiBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICBpZiAodGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXSkgeyByZXR1cm4gdGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXTsgfVxuICAgIC8vIFRyeSB0byBnZXQgcmVsYXRpb24gc2V0dGluZ3MgZnJvbSBjdXJyZW50IG1vZGVsXG4gICAgbGV0IHNldHRpbmdzOiBhbnkgPSB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnJlbGF0aW9uc1tyZWxhdGlvbnNoaXBdO1xuICAgIC8vIFZlcmlmeSB0aGUgcmVsYXRpb25zaGlwIGFjdHVhbGx5IGV4aXN0c1xuICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtb2RlbCByZWxhdGlvbnNoaXAgJHt0aGlzLm1vZGVsLmdldE1vZGVsTmFtZSgpfSA8LT4gJHtyZWxhdGlvbnNoaXB9LCB2ZXJpZnkgeW91ciBtb2RlbCBzZXR0aW5ncy5gKTtcbiAgICB9XG4gICAgLy8gVmVyaWZ5IGlmIHRoZSByZWxhdGlvbnNoaXAgbW9kZWwgaXMgcHVibGljXG4gICAgaWYgKHNldHRpbmdzLm1vZGVsID09PSAnJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWxhdGlvbnNoaXAgbW9kZWwgaXMgcHJpdmF0ZSwgY2FtJ3QgdXNlICR7cmVsYXRpb25zaGlwfSB1bmxlc3MgeW91IHNldCB5b3VyIG1vZGVsIGFzIHB1YmxpYy5gKTtcbiAgICB9XG4gICAgLy8gTGV0cyBnZXQgYSBtb2RlbCByZWZlcmVuY2UgYW5kIGFkZCBhIHJlZmVyZW5jZSBmb3IgYWxsIG9mIHRoZSBtb2RlbHNcbiAgICBsZXQgbW9kZWw6IGFueSA9IHRoaXMubW9kZWwubW9kZWxzLmdldChzZXR0aW5ncy5tb2RlbCk7XG4gICAgbW9kZWwubW9kZWxzID0gdGhpcy5tb2RlbC5tb2RlbHM7XG4gICAgLy8gSWYgZXZlcnl0aGluZyBnb2VzIHdlbGwsIHdlIHdpbGwgc3RvcmUgYSBjaGlsZCByZWZlcmVuY2UgYW5kIHJldHVybiBpdC5cbiAgICB0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdID0gbmV3IEZpcmVMb29wUmVmPFQ+KG1vZGVsLCB0aGlzLnNvY2tldCwgdGhpcywgcmVsYXRpb25zaGlwKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIHB1bGxcbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxuICAqIEBwYXJhbSB7YW55fSByZXF1ZXN0IFR5cGUgb2YgcmVxdWVzdCwgY2FuIGJlIExCLW9ubHkgZmlsdGVyIG9yIEZMK0xCIGZpbHRlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICogQGRlc2NyaXB0aW9uXG4gICogVGhpcyBtZXRob2Qgd2lsbCBwdWxsIGluaXRpYWwgZGF0YSBmcm9tIHNlcnZlclxuICAqKi9cbiAgcHJpdmF0ZSBwdWxsKGV2ZW50OiBzdHJpbmcsIHJlcXVlc3Q6IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBzYmo6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xuICAgIGxldCB0aGF0OiBGaXJlTG9vcFJlZjxUPiA9IHRoaXM7XG4gICAgbGV0IG5vd0V2ZW50OiBhbnkgPSBgJHtldmVudH0ucHVsbC5yZXF1ZXN0ZWQuJHt0aGlzLmlkfWA7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChgJHtldmVudH0ucHVsbC5yZXF1ZXN0LiR7dGhpcy5pZH1gLCByZXF1ZXN0KTtcbiAgICBmdW5jdGlvbiBwdWxsTm93KGRhdGE6IGFueSkge1xuICAgICAgaWYgKHRoYXQuc29ja2V0LnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoYXQuc29ja2V0LnJlbW92ZUxpc3RlbmVyKG5vd0V2ZW50LCBwdWxsTm93KTtcbiAgICAgIH1cbiAgICAgIHNiai5uZXh0KGRhdGEpO1xuICAgIH07XG4gICAgdGhpcy5zb2NrZXQub24obm93RXZlbnQsIHB1bGxOb3cpO1xuICAgIHJldHVybiBzYmouYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBicm9hZGNhc3RzXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcbiAgKiBAcGFyYW0ge2FueX0gcmVxdWVzdCBUeXBlIG9mIHJlcXVlc3QsIGNhbiBiZSBMQi1vbmx5IGZpbHRlciBvciBGTCtMQiBmaWx0ZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgd2lsbCBsaXN0ZW4gZm9yIHB1YmxpYyBicm9hZGNhc3RzIGFubm91bmNlcyBhbmQgdGhlbiByZXF1ZXN0XG4gICogZm9yIGRhdGEgYWNjb3JkaW5nIGEgc3BlY2lmaWMgY2xpZW50IHJlcXVlc3QsIG5vdCBzaGFyZWQgd2l0aCBvdGhlciBjbGllbnRzLlxuICAqKi9cbiAgcHJpdmF0ZSBicm9hZGNhc3RzKGV2ZW50OiBzdHJpbmcsIHJlcXVlc3Q6IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBzYmo6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xuICAgIGxldCBjaGFubmVsczogeyBhbm5vdW5jZTogc3RyaW5nLCBicm9hZGNhc3Q6IHN0cmluZyB9ID0ge1xuICAgICAgYW5ub3VuY2U6IGAke2V2ZW50fS5icm9hZGNhc3QuYW5ub3VuY2UuJHt0aGlzLmlkfWAsXG4gICAgICBicm9hZGNhc3Q6IGAke2V2ZW50fS5icm9hZGNhc3QuJHt0aGlzLmlkfWBcbiAgICB9O1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvLyBBbm5vdW5jZXMgSGFuZGxlclxuICAgIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVscy5hbm5vdW5jZV0gPSBmdW5jdGlvbiAocmVzOiBUKSB7XG4gICAgICB0aGF0LnNvY2tldC5lbWl0KGAke2V2ZW50fS5icm9hZGNhc3QucmVxdWVzdC4ke3RoYXQuaWR9YCwgcmVxdWVzdClcbiAgICB9O1xuICAgIC8vIEJyb2FkY2FzdHMgSGFuZGxlclxuICAgIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVscy5icm9hZGNhc3RdID0gZnVuY3Rpb24gKGRhdGE6IGFueSkge1xuICAgICAgc2JqLm5leHQoZGF0YSk7XG4gICAgfTtcbiAgICB0aGlzLnNvY2tldC5vbihjaGFubmVscy5hbm5vdW5jZSwgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmFubm91bmNlXSk7XG4gICAgdGhpcy5zb2NrZXQub24oY2hhbm5lbHMuYnJvYWRjYXN0LCB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbHMuYnJvYWRjYXN0XSk7XG4gICAgcmV0dXJuIHNiai5hc09ic2VydmFibGUoKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIG9wZXJhdGlvblxuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXG4gICogQHBhcmFtIHthbnl9IGRhdGEgQW55IHR5cGUgb2YgZGF0YSBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgaW50ZXJuYWwgbWV0aG9kIHdpbGwgcnVuIG9wZXJhdGlvbnMgZGVwZW5kaW5nIG9uIGN1cnJlbnQgY29udGV4dCBcbiAgKiovXG4gIHByaXZhdGUgb3BlcmF0aW9uKGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGlmICghdGhpcy5yZWxhdGlvbnNoaXApIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH0uJHt0aGlzLmlkfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5wYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7dGhpcy5yZWxhdGlvbnNoaXB9LiR7ZXZlbnR9LiR7dGhpcy5pZH1gO1xuICAgIH1cbiAgICBsZXQgc3ViamVjdDogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgbGV0IGNvbmZpZzogeyBkYXRhOiBhbnksIHBhcmVudDogYW55IH0gPSB7XG4gICAgICBkYXRhLFxuICAgICAgcGFyZW50OiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pbnN0YW5jZSA/IHRoaXMucGFyZW50Lmluc3RhbmNlIDogbnVsbFxuICAgIH07XG4gICAgdGhpcy5zb2NrZXQuZW1pdChldmVudCwgY29uZmlnKTtcbiAgICBsZXQgcmVzdWx0RXZlbnQ6IHN0cmluZyA9ICcnO1xuICAgIGlmICghdGhpcy5yZWxhdGlvbnNoaXApIHtcbiAgICAgIHJlc3VsdEV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0udmFsdWUucmVzdWx0LiR7dGhpcy5pZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRFdmVudCA9IGAke3RoaXMucGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke3RoaXMucmVsYXRpb25zaGlwfS52YWx1ZS5yZXN1bHQuJHt0aGlzLmlkfWA7XG4gICAgfVxuICAgIHRoaXMuc29ja2V0Lm9uKHJlc3VsdEV2ZW50LCAocmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXMuZXJyb3IpIHtcbiAgICAgICAgc3ViamVjdC5lcnJvcihyZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViamVjdC5uZXh0KHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50Lm1hdGNoKCdkaXNwb3NlJykpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3ViamVjdC5uZXh0KCkpO1xuICAgIH1cbiAgICAvLyBUaGlzIGV2ZW50IGxpc3RlbmVyIHdpbGwgYmUgd2lwZWQgd2l0aGluIHNvY2tldC5jb25uZWN0aW9uc1xuICAgIHRoaXMuc29ja2V0LnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdC5zdWJzY3JpYmUoKCkgPT4gc3ViamVjdC5jb21wbGV0ZSgpKTtcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IpKSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBidWlsZElkXG4gICogQHJldHVybiB7bnVtYmVyfVxuICAqIEBkZXNjcmlwdGlvblxuICAqIFRoaXMgaW50ZXJuYWwgbWV0aG9kIGJ1aWxkIGFuIElEIGZvciB0aGlzIHJlZmVyZW5jZSwgdGhpcyBhbGxvd3MgdG8gaGF2ZVxuICAqIG11bHRpcGxlIHJlZmVyZW5jZXMgZm9yIHRoZSBzYW1lIG1vZGVsIG9yIHJlbGF0aW9uc2hpcHMuXG4gICoqL1xuICBwcml2YXRlIGJ1aWxkSWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDgwMCkgKlxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwNzAwKSAqXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxOTg1MDApO1xuICB9XG59XG4iXX0=