import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
;
/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 */
export class SchemaActionsFactory {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
    }
    createCrudActions(actionPrefix, modelName) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.load = (suffix = '', pk) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
                meta: { addPending, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        };
        this.loadSucceeded = (items, removePending, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        };
        /**
         * Call the Redux Action to upsert model instances.
         */
        this.upsert = (items, pk) => {
            const addPending = U.uuid();
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::UPSERT',
                meta: { items, addPending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        };
        this.upsertSucceeded = (items, removePending, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        };
        /**
         * this action is not model specific but pendingKey specific.
         * Reducer will add whole meta part to the resolved key
         */
        this.succeeded = (items, removePending, pk) => {
            const action = ({
                type: 'general::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        };
        /**
        * Call the Redux Action to delete model instances.
        */
        this.delete = (items, pk) => {
            const addPending = U.uuid();
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE',
                meta: { items, addPending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        this.deleteSucceeded = (items, removePending, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        };
        this.failed = (error, removePending, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::FAILED',
                meta: { removePending, pk },
                payload: null,
                error,
            });
            this.ngRedux.dispatch(action);
        };
        this.loadPage = (paginateBy, limit, offset, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
                meta: { paginateBy, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        };
        this.loadPageSucceeded = (pks, count, paginateBy, limit, offset, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { pks, paginateBy, count, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        };
        this.loadPageFailed = (paginateBy, limit, offset, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
                meta: { paginateBy, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        };
        return this;
    }
}
//# sourceMappingURL=schema-actions-factory.js.map