import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { SchemaActionsFactory } from 'projects/app-toolbox/src/app/core/redux-store/schema-actions-factory';
import { filter } from 'rxjs/operators';
import { dfhRoot } from './dfh.config';
export class DfhProfileActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
export class DfhClassActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
export class DfhPropertyActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
export class DfhLabelActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
let DfhActions = class DfhActions {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
        this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
        this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
        this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
    }
};
DfhActions = tslib_1.__decorate([
    Injectable()
], DfhActions);
export { DfhActions };
//# sourceMappingURL=dfh.actions.js.map