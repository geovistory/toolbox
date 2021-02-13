import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from 'projects/app-toolbox/src/app/core/redux-store/schema-actions-factory';
import { proRoot } from './pro.config';
import { U } from '../util/util';
;
export class ProProjectActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'project'));
        this.loadOfAccount = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProProjectActionFactory.OF_ACCOUNT,
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
        this.loadBasics = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProProjectActionFactory.LOAD_BASICS,
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
ProProjectActionFactory.OF_ACCOUNT = 'OF_ACCOUNT';
ProProjectActionFactory.LOAD_BASICS = 'LOAD_BASICS';
export class ProInfoProjRelActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'info_proj_rel'));
        this.markStatementAsFavorite = (pkProject, pkStatement, isOutgoing) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkStatement: pkStatement,
                    isOutgoing
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
ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';
export class ProDfhClassProjRelActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_class_proj_rel'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProDfhClassProjRelActionFactory.OF_PROJECT,
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
ProDfhClassProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
export class ProDfhProfileProjRelActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_profile_proj_rel'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProDfhProfileProjRelActionFactory.OF_PROJECT,
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
ProDfhProfileProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
export class ProClassFieldConfigActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'class_field_config'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProClassFieldConfigActionFactory.OF_PROJECT,
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
ProClassFieldConfigActionFactory.OF_PROJECT = 'OF_PROJECT';
export class ProTextPropertyActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'text_property'));
        this.loadOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProTextPropertyActionFactory.OF_PROJECT,
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
ProTextPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
export class ProAnalysisActionFactory extends SchemaActionsFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'analysis'));
        this.loadByIdAndVersion = (pkProject, pkEntity, version) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProAnalysisActionFactory.BY_PK_AND_VERSION,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkEntity,
                    version
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
ProAnalysisActionFactory.BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';
let ProActions = class ProActions {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.project = new ProProjectActionFactory(this.ngRedux).createActions();
        this.info_proj_rel = new ProInfoProjRelActionFactory(this.ngRedux).createActions();
        this.text_property = new ProTextPropertyActionFactory(this.ngRedux).createActions();
        this.dfh_class_proj_rel = new ProDfhClassProjRelActionFactory(this.ngRedux).createActions();
        this.dfh_profile_proj_rel = new ProDfhProfileProjRelActionFactory(this.ngRedux).createActions();
        this.class_field_config = new ProClassFieldConfigActionFactory(this.ngRedux).createActions();
        this.analysis = new ProAnalysisActionFactory(this.ngRedux).createActions();
    }
};
ProActions = tslib_1.__decorate([
    Injectable()
], ProActions);
export { ProActions };
//# sourceMappingURL=pro.actions.js.map