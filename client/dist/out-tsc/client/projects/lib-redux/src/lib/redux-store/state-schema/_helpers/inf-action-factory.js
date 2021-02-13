import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { SchemaActionsFactory } from './schema-actions-factory';
let InfActionFactory = class InfActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createInfActions(actionPrefix, modelName) {
        this.createCrudActions(actionPrefix, modelName);
        /**
         * Call the Redux Action to remove model instances from project.
         */
        this.remove = (items, pk) => {
            const addPending = U.uuid();
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::REMOVE',
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
        this.removeSucceeded = (items, removePending, pk) => {
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::REMOVE_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        };
        return this;
    }
};
InfActionFactory = tslib_1.__decorate([
    Injectable()
], InfActionFactory);
export { InfActionFactory };
//# sourceMappingURL=inf-action-factory.js.map