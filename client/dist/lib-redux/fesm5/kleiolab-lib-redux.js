import { dispatch, NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { Injectable, ɵɵdefineInjectable, ɵɵinject, InjectionToken, NgModule, Optional, SkipSelf, Inject } from '@angular/core';
import { SlimLoadingBarService, SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { ToastyService, ToastyConfig, ToastyModule } from '@cime/ngx-toasty';
import { PubAccountApi, SchemaObjectApi, ProProjectApi, ProInfoProjRel, ProDfhClassProjRel, ProDfhProfileProjRel, InfPersistentItem, InfTemporalEntity, InfStatement, InfAppellation, InfPlace, InfTimePrimitive, InfLanguage, InfLangString, InfDimension, InfTextProperty, DatDigital, DatChunk, ProProject, ProTextProperty, ProClassFieldConfig, DatDigitalApi, DatChunkApi, DatColumnApi, DatNamespaceApi, DfhProfileApi, DfhLabelApi, InfPersistentItemApi, InfTemporalEntityApi, InfStatementApi, InfTextPropertyApi, ProInfoProjRelApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProClassFieldConfigApi, ProTextPropertyApi, SysSystemRelevantClassApi, SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService, AnalysisService, PaginatedStatementsControllerService, SystemConfigurationService, Configuration, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { omit, keys, values, pathOr, equals, indexBy } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { combineEpics, ofType, createEpicMiddleware } from 'redux-observable-es6-compat';
import { Observable, Subject, combineLatest, of, BehaviorSubject } from 'rxjs';
import { mergeMap, filter, switchMap, mapTo, map } from 'rxjs/operators';
import { __decorate, __metadata, __extends, __spread, __assign, __values } from 'tslib';
import { SysConfig } from '@kleiolab/lib-config';
import { U } from '@kleiolab/lib-utils';
import { SlimLoadingBarService as SlimLoadingBarService$1 } from '@cime/ngx-slim-loading-bar/src/slim-loading-bar.service';
import { ToastyService as ToastyService$1, ToastyConfig as ToastyConfig$1 } from '@cime/ngx-toasty/src/toasty.service';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/account.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AccountActionMeta() { }
if (false) {
    /** @type {?|undefined} */
    AccountActionMeta.prototype.accountId;
    /** @type {?|undefined} */
    AccountActionMeta.prototype.accountRoles;
    /** @type {?|undefined} */
    AccountActionMeta.prototype.account;
}
;
var AccountActions = /** @class */ (function () {
    function AccountActions() {
    }
    /**
     * @return {?}
     */
    AccountActions.prototype.login = /**
     * @return {?}
     */
    function () {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    };
    /**
     * @param {?} account
     * @return {?}
     */
    AccountActions.prototype.loginSucceeded = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account: account }
        };
    };
    /**
     * @param {?} error
     * @return {?}
     */
    AccountActions.prototype.loginFailed = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return {
            type: AccountActions.LOGIN_FAILED,
            payload: null,
            meta: null,
            error: error
        };
    };
    /**
     * @param {?} account
     * @return {?}
     */
    AccountActions.prototype.accountUpdated = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload: null,
            meta: { account: account }
        };
    };
    // Roles of the account, used to check permissions
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    AccountActions.prototype.loadRoles = 
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    function (accountId) {
        return {
            type: AccountActions.LOAD_ROLES,
            payload: null,
            meta: { accountId: accountId }
        };
    };
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    AccountActions.prototype.loadRolesSucceeded = /**
     * @param {?} accountRoles
     * @return {?}
     */
    function (accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles: accountRoles }
        };
    };
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    AccountActions.prototype.loadRolesFailed = /**
     * @param {?} accountRoles
     * @return {?}
     */
    function (accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    };
    AccountActions.LOGIN = 'Account::LOGIN';
    AccountActions.LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
    AccountActions.LOGIN_FAILED = 'Account::LOGIN_FAILED';
    AccountActions.LOAD_ROLES = 'Account::LOAD_ROLES';
    AccountActions.LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
    AccountActions.LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';
    AccountActions.ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';
    AccountActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ AccountActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function AccountActions_Factory() { return new AccountActions(); }, token: AccountActions, providedIn: "root" });
    return AccountActions;
}());
if (false) {
    /** @type {?} */
    AccountActions.LOGIN;
    /** @type {?} */
    AccountActions.LOGIN_SUCCEEDED;
    /** @type {?} */
    AccountActions.LOGIN_FAILED;
    /** @type {?} */
    AccountActions.LOAD_ROLES;
    /** @type {?} */
    AccountActions.LOAD_ROLES_SUCCEEDED;
    /** @type {?} */
    AccountActions.LOAD_ROLES_FAILED;
    /** @type {?} */
    AccountActions.ACCOUNT_UPDATED;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/loading-bar.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MetaData() { }
if (false) {
    /** @type {?} */
    MetaData.prototype.null;
}
;
/**
 * This actions start, stop and complete the global loading bar
 * using a SlimLoadingBarService instantiated within the loading-bar
 * module.
 *
 * In order to show a loading bar in GUI, use the LoadingBarComponent
 * exported by this module.
 */
var LoadingBarActions = /** @class */ (function () {
    function LoadingBarActions() {
        this.startLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.START,
            meta: null,
            payload: null,
        }); });
        this.stopLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.STOP,
            meta: null,
            payload: null
        }); });
        this.completeLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.COPMLETE,
            meta: null,
            payload: null,
        }); });
    }
    LoadingBarActions.START = 'LOADING_BAR_START';
    LoadingBarActions.STOP = 'LOADING_BAR_STOP';
    LoadingBarActions.COPMLETE = 'LOADING_BAR_COPMLETE';
    LoadingBarActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ LoadingBarActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadingBarActions_Factory() { return new LoadingBarActions(); }, token: LoadingBarActions, providedIn: "root" });
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], LoadingBarActions.prototype, "startLoading", void 0);
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], LoadingBarActions.prototype, "stopLoading", void 0);
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], LoadingBarActions.prototype, "completeLoading", void 0);
    return LoadingBarActions;
}());
if (false) {
    /** @type {?} */
    LoadingBarActions.START;
    /** @type {?} */
    LoadingBarActions.STOP;
    /** @type {?} */
    LoadingBarActions.COPMLETE;
    /** @type {?} */
    LoadingBarActions.prototype.startLoading;
    /** @type {?} */
    LoadingBarActions.prototype.stopLoading;
    /** @type {?} */
    LoadingBarActions.prototype.completeLoading;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/notifications.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MetaData$1() { }
if (false) {
    /** @type {?|undefined} */
    MetaData$1.prototype.itemsArray;
}
;
var NotificationsAPIActions = /** @class */ (function () {
    function NotificationsAPIActions() {
        this.addToast = (/**
         * @param {?} payload
         * @return {?}
         */
        function (payload) { return ({
            type: NotificationsAPIActions.ADD_TOAST,
            meta: null,
            payload: payload
        }); });
    }
    NotificationsAPIActions.ADD_TOAST = 'Notifications::ADD_TOAST';
    NotificationsAPIActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ NotificationsAPIActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function NotificationsAPIActions_Factory() { return new NotificationsAPIActions(); }, token: NotificationsAPIActions, providedIn: "root" });
    return NotificationsAPIActions;
}());
if (false) {
    /** @type {?} */
    NotificationsAPIActions.ADD_TOAST;
    /** @type {?} */
    NotificationsAPIActions.prototype.addToast;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/account.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AccountEpics = /** @class */ (function () {
    function AccountEpics(actions, loadingBarActions, accountApi, notificationActions) {
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.accountApi = accountApi;
        this.notificationActions = notificationActions;
    }
    /**
     * @return {?}
     */
    AccountEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.loadRoles());
    };
    /**
     * @private
     * @return {?}
     */
    AccountEpics.prototype.loadRoles = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(AccountActions.LOAD_ROLES), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            globalStore.next(_this.loadingBarActions.startLoading());
            _this.accountApi.getRoles(action.meta.accountId)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                globalStore.next(_this.loadingBarActions.completeLoading());
                globalStore.next(_this.actions.loadRolesSucceeded(data));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                globalStore.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); });
    };
    AccountEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AccountEpics.ctorParameters = function () { return [
        { type: AccountActions },
        { type: LoadingBarActions },
        { type: PubAccountApi },
        { type: NotificationsAPIActions }
    ]; };
    /** @nocollapse */ AccountEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function AccountEpics_Factory() { return new AccountEpics(ɵɵinject(AccountActions), ɵɵinject(LoadingBarActions), ɵɵinject(PubAccountApi), ɵɵinject(NotificationsAPIActions)); }, token: AccountEpics, providedIn: "root" });
    return AccountEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.accountApi;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.notificationActions;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/active-project.action.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ActiveProjectMeta() { }
if (false) {
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.projectPreview;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_project;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_entity;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_entities;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_classes;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_ui_context;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.entity_version;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.chunk;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.teEnGraphs;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.peItGraphs;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.types;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.projRel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.dfh_pk_class;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.infProjRel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panels;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.list;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panelSerial;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.tabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.uiIdSerial;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.focusedPanel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.previousPanelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.currentPanelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.previousTabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.currentTabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.tab;
}
;
var ActiveProjectActions = /** @class */ (function () {
    function ActiveProjectActions() {
    }
    /**
     * @param {?} pk_project
     * @return {?}
     */
    ActiveProjectActions.prototype.loadProjectBasics = /**
     * @param {?} pk_project
     * @return {?}
     */
    function (pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS,
            payload: null,
            meta: {
                pk_project: pk_project
            }
        };
    };
    /**
     * @param {?} projectPreview
     * @return {?}
     */
    ActiveProjectActions.prototype.loadProjectBasiscsSucceded = /**
     * @param {?} projectPreview
     * @return {?}
     */
    function (projectPreview) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
            payload: null,
            meta: { projectPreview: projectPreview },
        };
    };
    /**
     * @param {?} pk_project
     * @return {?}
     */
    ActiveProjectActions.prototype.loadProjectConfig = /**
     * @param {?} pk_project
     * @return {?}
     */
    function (pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG,
            payload: null,
            meta: {
                pk_project: pk_project
            },
        };
    };
    /**
     * @return {?}
     */
    ActiveProjectActions.prototype.loadProjectConfigSucceeded = /**
     * @return {?}
     */
    function () {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED,
            payload: {
            // crm
            },
            meta: null,
        };
    };
    /**
     * @param {?} list
     * @return {?}
     */
    ActiveProjectActions.prototype.setListType = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        return {
            type: ActiveProjectActions.SET_LIST_TYPE,
            payload: null,
            meta: {
                list: list
            }
        };
    };
    /**
     * @param {?} panels
     * @param {?} uiIdSerial
     * @param {?} panelSerial
     * @param {?} focusedPanel
     * @return {?}
     */
    ActiveProjectActions.prototype.setPanels = /**
     * @param {?} panels
     * @param {?} uiIdSerial
     * @param {?} panelSerial
     * @param {?} focusedPanel
     * @return {?}
     */
    function (panels, uiIdSerial, panelSerial, focusedPanel) {
        return {
            type: ActiveProjectActions.SET_PANELS,
            payload: null,
            meta: { panels: panels, uiIdSerial: uiIdSerial, panelSerial: panelSerial, focusedPanel: focusedPanel }
        };
    };
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.activateTab = /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    function (panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.ACTIVATE_TAB,
            payload: null,
            meta: {
                panelIndex: panelIndex, tabIndex: tabIndex
            }
        };
    };
    /**
     * @param {?} previousPanelIndex
     * @param {?} currentPanelIndex
     * @param {?} previousTabIndex
     * @param {?} currentTabIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.moveTab = /**
     * @param {?} previousPanelIndex
     * @param {?} currentPanelIndex
     * @param {?} previousTabIndex
     * @param {?} currentTabIndex
     * @return {?}
     */
    function (previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex) {
        return {
            type: ActiveProjectActions.MOVE_TAB,
            payload: null,
            meta: {
                previousPanelIndex: previousPanelIndex, currentPanelIndex: currentPanelIndex, previousTabIndex: previousTabIndex, currentTabIndex: currentTabIndex
            }
        };
    };
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.closeTab = /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    function (panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.CLOSE_TAB,
            payload: null,
            meta: {
                panelIndex: panelIndex, tabIndex: tabIndex
            }
        };
    };
    /**
     * @template TabData
     * @param {?} tab
     * @return {?}
     */
    ActiveProjectActions.prototype.addTab = /**
     * @template TabData
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        return {
            type: ActiveProjectActions.ADD_TAB,
            payload: null,
            meta: { tab: tab }
        };
    };
    /**
     * @param {?} previousPanelIndex
     * @param {?} tabIndex
     * @param {?} currentPanelIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.splitPanel = /**
     * @param {?} previousPanelIndex
     * @param {?} tabIndex
     * @param {?} currentPanelIndex
     * @return {?}
     */
    function (previousPanelIndex, tabIndex, currentPanelIndex) {
        return {
            type: ActiveProjectActions.SPLIT_PANEL,
            payload: null,
            meta: { previousPanelIndex: previousPanelIndex, tabIndex: tabIndex, currentPanelIndex: currentPanelIndex }
        };
    };
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.closePanel = /**
     * @param {?} panelIndex
     * @return {?}
     */
    function (panelIndex) {
        return {
            type: ActiveProjectActions.CLOSE_PANEL,
            payload: null,
            meta: { panelIndex: panelIndex }
        };
    };
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    ActiveProjectActions.prototype.focusPanel = /**
     * @param {?} panelIndex
     * @return {?}
     */
    function (panelIndex) {
        return {
            type: ActiveProjectActions.FOCUS_PANEL,
            payload: null,
            meta: { panelIndex: panelIndex }
        };
    };
    // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
    //     payload: { selectedChunk },
    //     meta: null
    //   }
    // }
    // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
    //     payload: { selectedChunk },
    //     meta: null
    //   }
    // }
    /**
     * @param {?} refiningChunk
     * @return {?}
     */
    ActiveProjectActions.prototype.setRefiningChunk = 
    // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
    //     payload: { selectedChunk },
    //     meta: null
    //   }
    // }
    /**
     * @param {?} refiningChunk
     * @return {?}
     */
    function (refiningChunk) {
        return {
            type: ActiveProjectActions.SET_REFINING_CHUNK,
            payload: { refiningChunk: refiningChunk },
            meta: null
        };
    };
    /**
     * @param {?} creatingMentioning
     * @return {?}
     */
    ActiveProjectActions.prototype.setCreatingMentioning = /**
     * @param {?} creatingMentioning
     * @return {?}
     */
    function (creatingMentioning) {
        return {
            type: ActiveProjectActions.SET_CREATING_MENTIONING,
            payload: { creatingMentioning: creatingMentioning },
            meta: null
        };
    };
    /**
     * @param {?} mentioningsFocusedInText
     * @return {?}
     */
    ActiveProjectActions.prototype.setMentioningsFocusedInText = /**
     * @param {?} mentioningsFocusedInText
     * @return {?}
     */
    function (mentioningsFocusedInText) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
            payload: { mentioningsFocusedInText: mentioningsFocusedInText },
            meta: null
        };
    };
    /**
     * @param {?} mentioningsFocusedInTable
     * @return {?}
     */
    ActiveProjectActions.prototype.setMentioningsFocusedInTable = /**
     * @param {?} mentioningsFocusedInTable
     * @return {?}
     */
    function (mentioningsFocusedInTable) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
            payload: { mentioningsFocusedInTable: mentioningsFocusedInTable },
            meta: null
        };
    };
    /**
     * @return {?}
     */
    ActiveProjectActions.prototype.destroy = /**
     * @return {?}
     */
    function () {
        return {
            type: ActiveProjectActions.DESTROY,
            payload: null,
            meta: null,
        };
    };
    /* tslint:disable:member-ordering */
    /**
     * *********************************************************************************
     * CRM and Config (metadata, crm)
     * **********************************************************************************
     */
    ActiveProjectActions.LOAD_PROJECT_BASICS = 'ActiveProject::LOAD_PROJECT_BASICS';
    ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED = 'ActiveProject::LOAD_PROJECT_BASICS_FAILED';
    ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_BASICS_SUCCEEDED';
    ActiveProjectActions.LOAD_PROJECT_CONFIG = 'ActiveProject::LOAD_PROJECT_CONFIG';
    ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_CONFIG_SUCCEEDED';
    /**
     * *********************************************************************************
     * Layout -- Tabs
     * **********************************************************************************
     */
    ActiveProjectActions.SET_LIST_TYPE = 'ActiveProject::SET_LIST_TYPE';
    ActiveProjectActions.SET_PANELS = 'ActiveProject::SET_PANELS';
    ActiveProjectActions.ACTIVATE_TAB = 'ActiveProject::ACTIVATE_TAB';
    ActiveProjectActions.MOVE_TAB = 'ActiveProject::MOVE_TAB';
    ActiveProjectActions.CLOSE_TAB = 'ActiveProject::CLOSE_TAB';
    ActiveProjectActions.ADD_TAB = 'ActiveProject::ADD_TAB';
    ActiveProjectActions.SPLIT_PANEL = 'ActiveProject::SPLIT_PANEL';
    ActiveProjectActions.CLOSE_PANEL = 'ActiveProject::CLOSE_PANEL';
    ActiveProjectActions.FOCUS_PANEL = 'ActiveProject::FOCUS_PANEL';
    // /************************************************************************************
    //  * Layout -- Modals
    // ************************************************************************************/
    // // create or add entity modal
    // static readonly OPEN_ADD_FORM = 'ActiveProject::OPEN_ADD_FORM';
    // static readonly CLOSE_ADD_FORM = 'ActiveProject::CLOSE_ADD_FORM';
    // openAddForm = (createOrAddEntity: CreateOrAddEntity): ActiveProjectAction => ({
    //   type: ActiveProjectActions.OPEN_ADD_FORM,
    //   meta: { createOrAddEntity },
    //   payload: null
    // })
    // closeAddForm = (): ActiveProjectAction => ({
    //   type: ActiveProjectActions.CLOSE_ADD_FORM,
    //   meta: null,
    //   payload: null
    // })
    /************************************************************************************
      * Information cache
      ************************************************************************************/
    // EntityPreviews
    // static LOAD_ENTITY_PREVIEW = 'ActiveProject::LOAD_ENTITY_PREVIEW';
    // static LOAD_ENTITY_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_ENTITY_PREVIEW_SUCCEEDED';
    // static LOAD_ENTITY_PREVIEW_FAILED = 'ActiveProject::LOAD_ENTITY_PREVIEW_FAILED';
    // loadEntityPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entity, pk_ui_context
    //     }
    //   }
    // }
    // loadEntityPreviewSucceeded(entityPreview: EntityPreview): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       entityPreview
    //     },
    //   }
    // }
    // loadEntityPreviewFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // EntityPreviews
    // static LOAD_TYPES = 'ActiveProject::LOAD_TYPES';
    // static LOAD_TYPES_SUCCEEDED = 'ActiveProject::LOAD_TYPES_SUCCEEDED';
    // static LOAD_TYPES_FAILED = 'ActiveProject::LOAD_TYPES_FAILED';
    // loadTypes(pk_project: number, pk_classes: number[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TYPES,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_classes
    //     }
    //   }
    // }
    // loadTypesSucceeded(types: TypePeIt[], pk_classes: number[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TYPES_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       types, pk_classes
    //     },
    //   }
    // }
    // loadTypesFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TYPES_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Entities Details for display in Modals
    // static LOAD_ENTITY_DETAIL_FOR_MODAL = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL';
    // static LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED';
    // static LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED'; // TODO: Implement action/reducer
    // static LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED';
    // loadEntityDetailForModal(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entity, pk_ui_context
    //     }
    //   }
    // }
    // loadPeItDetailsForModalSucceeded(peItDetail: EntityDetail): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       peItDetail
    //     },
    //   }
    // }
    // loaEntitytDetailsForModalFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Chunks
    // static LOAD_CHUNK = 'ActiveProject::LOAD_CHUNK';
    // static LOAD_CHUNK_SUCCEEDED = 'ActiveProject::LOAD_CHUNK_SUCCEEDED';
    // static LOAD_CHUNK_FAILED = 'ActiveProject::LOAD_CHUNK_FAILED';
    // loadChunk(pk_project: number, pk_entity: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_CHUNK,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entity
    //     }
    //   }
    // }
    // loadChunkSucceeded(chunk: DatChunk): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_CHUNK_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       chunk
    //     },
    //   }
    // }
    // loadChunkFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_CHUNK_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // PeIt Graphs
    // static LOAD_PEIT_GRAPHS = 'ActiveProject::LOAD_PEIT_GRAPHS';
    // static LOAD_PEIT_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_PEIT_GRAPHS_SUCCEEDED';
    // static LOAD_PEIT_GRAPHS_FAILED = 'ActiveProject::LOAD_PEIT_GRAPHS_FAILED';
    // loadPeItGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entities
    //     }
    //   }
    // }
    // loadPeItGraphsSucceeded(peItGraphs: InfPersistentItem[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       peItGraphs
    //     },
    //   }
    // }
    // loadPeItGraphsFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // TeEn Graphs
    // static LOAD_TEEN_GRAPHS = 'ActiveProject::LOAD_TEEN_GRAPHS';
    // static LOAD_TEEN_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_TEEN_GRAPHS_SUCCEEDED';
    // static LOAD_TEEN_GRAPHS_FAILED = 'ActiveProject::LOAD_TEEN_GRAPHS_FAILED';
    // loadTeEnGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entities
    //     }
    //   }
    // }
    // loadTeEnGraphsSucceeded(teEnGraphs: InfTemporalEntity[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       teEnGraphs
    //     },
    //   }
    // }
    // loadTeEnGraphsFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Queries
    // static LOAD_QUERIES = 'ActiveProject::LOAD_QUERIES';
    // static LOAD_QUERIES_SUCCEEDED = 'ActiveProject::LOAD_QUERIES_SUCCEEDED';
    // static LOAD_QUERIES_FAILED = 'ActiveProject::LOAD_QUERIES_FAILED';
    // loadQueries(pk_project: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERIES,
    //     payload: null,
    //     meta: {
    //       pk_project
    //     }
    //   }
    // }
    // loadQueriesSucceeded(comQueryArray: ComQueryV[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERIES_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       comQueryArray
    //     },
    //   }
    // }
    // loadQueriesFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERIES_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Query Version
    // static LOAD_QUERY_VERSION = 'ActiveProject::LOAD_QUERY_VERSION';
    // static LOAD_QUERY_VERSION_SUCCEEDED = 'ActiveProject::LOAD_QUERY_VERSION_SUCCEEDED';
    // static LOAD_QUERY_VERSION_FAILED = 'ActiveProject::LOAD_QUERY_VERSION_FAILED';
    // loadQueryVersion(pk_project: number, pk_entity: number, entity_version: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERY_VERSION,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entity, entity_version
    //     }
    //   }
    // }
    // loadQueryVersionSucceeded(comQuery: ProQuery): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERY_VERSION_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       comQuery
    //     },
    //   }
    // }
    // loadQueryVersionFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_QUERY_VERSION_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Visuals
    // static LOAD_VISUALS = 'ActiveProject::LOAD_VISUALS';
    // static LOAD_VISUALS_SUCCEEDED = 'ActiveProject::LOAD_VISUALS_SUCCEEDED';
    // static LOAD_VISUALS_FAILED = 'ActiveProject::LOAD_VISUALS_FAILED';
    // loadVisuals(pk_project: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUALS,
    //     payload: null,
    //     meta: {
    //       pk_project
    //     }
    //   }
    // }
    // loadVisualsSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUALS_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       comVisualArray
    //     },
    //   }
    // }
    // loadVisualsFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUALS_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    // // Visual Version
    // static LOAD_VISUAL_VERSION = 'ActiveProject::LOAD_VISUAL_VERSION';
    // static LOAD_VISUAL_VERSION_SUCCEEDED = 'ActiveProject::LOAD_VISUAL_VERSION_SUCCEEDED';
    // static LOAD_VISUAL_VERSION_FAILED = 'ActiveProject::LOAD_VISUAL_VERSION_FAILED';
    // loadVisualVersion(pk_project: number, pk_entity: number, entity_version?: number): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUAL_VERSION,
    //     payload: null,
    //     meta: {
    //       pk_project, pk_entity, entity_version
    //     }
    //   }
    // }
    // loadVisualVersionSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_SUCCEEDED,
    //     payload: null,
    //     meta: {
    //       comVisualArray
    //     },
    //   }
    // }
    // loadVisualVersionFailed(error): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_FAILED,
    //     payload: null,
    //     meta: null,
    //     error
    //   }
    // }
    /**
     * *********************************************************************************
     *  Things for Mentionings / Annotations
     * **********************************************************************************
     */
    ActiveProjectActions.UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
    ActiveProjectActions.SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
    ActiveProjectActions.SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';
    /**
     * *********************************************************************************
     * Highlighting of mentionings in the gui
     * **********************************************************************************
     */
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';
    // /*********************************************************************
    //  *  Methods to manage enabling and disabling a class for the project
    //  *********************************************************************/
    // static readonly UPSERT_CLASS_PROJ_REL = 'ActiveProject::UPSERT_CLASS_PROJ_REL';
    // static readonly UPSERT_CLASS_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_SUCCEEDED';
    // static readonly UPSERT_CLASS_PROJ_REL_FAILED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_FAILED';
    // upsertClassProjRel = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL,
    //   meta: { projRel, dfh_pk_class },
    //   payload: null,
    // });
    // upsertClassProjRelSucceeded = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_SUCCEEDED,
    //   meta: { projRel, dfh_pk_class },
    //   payload: null
    // })
    // upsertClassProjRelFailed = (error, dfh_pk_class: number): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_FAILED,
    //   meta: { dfh_pk_class },
    //   payload: null,
    //   error,
    // })
    // /*********************************************************************
    //  *  Methods to manage enabling and disabling an entity for the project
    //  *********************************************************************/
    // static readonly UPSERT_ENTITY_PROJ_REL = 'ActiveProject::UPSERT_ENTITY_PROJ_REL';
    // static readonly UPSERT_ENTITY_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_SUCCEEDED';
    // static readonly UPSERT_ENTITY_PROJ_REL_FAILED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_FAILED';
    // upsertEntityProjRel = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL,
    //   meta: { infProjRel },
    //   payload: null,
    // });
    // upsertEntityProjRelSucceeded = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_SUCCEEDED,
    //   meta: { infProjRel },
    //   payload: null
    // })
    // upsertEntityProjRelFailed = (error): ActiveProjectAction => ({
    //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_FAILED,
    //   meta: null,
    //   payload: null,
    //   error,
    // })
    /**
     * *********************************************************************************
     * Destroy the active project state (on closing a project)
     * **********************************************************************************
     */
    ActiveProjectActions.DESTROY = 'ActiveProject::DESTROY';
    ActiveProjectActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ ActiveProjectActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActiveProjectActions_Factory() { return new ActiveProjectActions(); }, token: ActiveProjectActions, providedIn: "root" });
    return ActiveProjectActions;
}());
if (false) {
    /**
     * *********************************************************************************
     * CRM and Config (metadata, crm)
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.LOAD_PROJECT_BASICS;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_CONFIG;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED;
    /**
     * *********************************************************************************
     * Layout -- Tabs
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.SET_LIST_TYPE;
    /** @type {?} */
    ActiveProjectActions.SET_PANELS;
    /** @type {?} */
    ActiveProjectActions.ACTIVATE_TAB;
    /** @type {?} */
    ActiveProjectActions.MOVE_TAB;
    /** @type {?} */
    ActiveProjectActions.CLOSE_TAB;
    /** @type {?} */
    ActiveProjectActions.ADD_TAB;
    /** @type {?} */
    ActiveProjectActions.SPLIT_PANEL;
    /** @type {?} */
    ActiveProjectActions.CLOSE_PANEL;
    /** @type {?} */
    ActiveProjectActions.FOCUS_PANEL;
    /**
     * *********************************************************************************
     *  Things for Mentionings / Annotations
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.UPDATE_SELECTED_CHUNK;
    /** @type {?} */
    ActiveProjectActions.SET_REFINING_CHUNK;
    /** @type {?} */
    ActiveProjectActions.SET_CREATING_MENTIONING;
    /**
     * *********************************************************************************
     * Highlighting of mentionings in the gui
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT;
    /** @type {?} */
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE;
    /**
     * *********************************************************************************
     * Destroy the active project state (on closing a project)
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.DESTROY;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dat.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var datRoot = 'dat';
/** @type {?} */
var facetteByPk = 'by_namespace';
var ɵ0 = /**
 * @param {?} newItem
 * @param {?} oldItem
 * @return {?}
 */
function (newItem, oldItem) {
    if (!oldItem.quill_doc && newItem.quill_doc)
        return false;
    return (newItem.pk_entity === oldItem.pk_entity &&
        newItem.entity_version === oldItem.entity_version);
}, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString() + '_' + item.entity_version.toString(); }, ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_text.toString(); }, ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ5 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_text.toString(); }, ɵ6 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ7 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_digital.toString(); }, ɵ8 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ9 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_column.toString(); }, ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ11 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_entity + '_' + item.fk_system_type; }, ɵ12 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_project.toString(); };
/** @type {?} */
var datDefinitions = {
    digital: {
        equals: (ɵ0),
        indexBy: {
            keyInStore: 'pk_entity__entity_version',
            indexByFn: (ɵ1)
        },
        groupBy: [
            {
                keyInStore: 'pk_entity',
                groupByFn: (ɵ2)
            },
            {
                keyInStore: 'pk_text',
                groupByFn: (ɵ3)
            }
        ]
    },
    chunk: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ4)
        },
        groupBy: [
            {
                keyInStore: 'fk_text',
                groupByFn: (ɵ5)
            }
        ]
    },
    column: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ6)
        },
        groupBy: [
            {
                keyInStore: 'fk_digital',
                groupByFn: (ɵ7)
            }
        ]
    },
    class_column_mapping: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ8)
        },
        groupBy: [
            {
                keyInStore: 'fk_column',
                groupByFn: (ɵ9)
            }
        ]
    },
    text_property: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ10)
        },
        groupBy: [
            {
                keyInStore: 'fk_entity__fk_system_type',
                groupByFn: (ɵ11)
            }
        ]
    },
    namespace: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ12)
        },
        groupBy: [
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ13)
            }
        ]
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/schema-actions-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LoadActionMeta() { }
if (false) {
    /** @type {?} */
    LoadActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    LoadActionMeta.prototype.pk;
}
/**
 * @record
 */
function LoadVersionAction() { }
if (false) {
    /** @type {?} */
    LoadVersionAction.prototype.pkEntity;
    /** @type {?} */
    LoadVersionAction.prototype.entityVersion;
}
;
/**
 * @record
 */
function LoadByPkAndVersionActionMeta() { }
if (false) {
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    LoadByPkAndVersionActionMeta.prototype.pk;
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.pkEntity;
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.version;
}
/**
 * @record
 * @template Model
 */
function ModifyActionMeta() { }
if (false) {
    /** @type {?} */
    ModifyActionMeta.prototype.items;
    /** @type {?} */
    ModifyActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    ModifyActionMeta.prototype.pk;
}
/**
 * @record
 * @template Model
 */
function SucceedActionMeta() { }
if (false) {
    /** @type {?} */
    SucceedActionMeta.prototype.items;
    /** @type {?} */
    SucceedActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    SucceedActionMeta.prototype.pk;
}
/**
 * @record
 */
function FailActionMeta() { }
if (false) {
    /** @type {?} */
    FailActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    FailActionMeta.prototype.pk;
}
/**
 * @record
 */
function PaginateByParam() { }
/**
 * @record
 */
function LoadPageMeta() { }
if (false) {
    /** @type {?} */
    LoadPageMeta.prototype.page;
    /** @type {?|undefined} */
    LoadPageMeta.prototype.pk;
}
/**
 * @record
 */
function LoadPageSucceededMeta() { }
if (false) {
    /** @type {?} */
    LoadPageSucceededMeta.prototype.pks;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.count;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.page;
    /** @type {?|undefined} */
    LoadPageSucceededMeta.prototype.pk;
}
/**
 * @record
 * @template Model
 */
function ActionResultObservable() { }
if (false) {
    /** @type {?} */
    ActionResultObservable.prototype.pending$;
    /** @type {?} */
    ActionResultObservable.prototype.resolved$;
    /** @type {?} */
    ActionResultObservable.prototype.key;
}
/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 * @template Payload, Model
 */
var  /**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 * @template Payload, Model
 */
SchemaActionsFactory = /** @class */ (function () {
    function SchemaActionsFactory(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    SchemaActionsFactory.prototype.createCrudActions = /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    function (actionPrefix, modelName) {
        var _this = this;
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.load = (/**
         * @param {?=} suffix
         * @param {?=} pk
         * @return {?}
         */
        function (suffix, pk) {
            if (suffix === void 0) { suffix = ''; }
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
                meta: { addPending: addPending, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.loadSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
         * Call the Redux Action to upsert model instances.
         */
        this.upsert = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.upsertSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
         * this action is not model specific but pendingKey specific.
         * Reducer will add whole meta part to the resolved key
         */
        this.succeeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: 'general::UPSERT_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
        * Call the Redux Action to delete model instances.
        */
        this.delete = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::DELETE',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.deleteSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::DELETE_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        this.failed = (/**
         * @param {?} error
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (error, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::FAILED',
                meta: { removePending: removePending, pk: pk },
                payload: null,
                error: error,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPage = (/**
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        function (page, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE',
                meta: { page: page, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPageSucceeded = (/**
         * @param {?} pks
         * @param {?} count
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        function (pks, count, page, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { page: page, pks: pks, count: count, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPageFailed = (/**
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        function (page, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_FAILED',
                meta: { page: page, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        return this;
    };
    return SchemaActionsFactory;
}());
if (false) {
    /** @type {?} */
    SchemaActionsFactory.prototype.load;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.upsert;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.upsertSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.delete;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.deleteSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.failed;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadPage;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadPageSucceeded;
    /** @type {?} */
    SchemaActionsFactory.prototype.loadPageFailed;
    /**
     * this action is not model specific but pendingKey specific.
     * Reducer will add whole meta part to the resolved key.
     * @type {?}
     */
    SchemaActionsFactory.prototype.succeeded;
    /** @type {?} */
    SchemaActionsFactory.prototype.actionPrefix;
    /** @type {?} */
    SchemaActionsFactory.prototype.modelName;
    /** @type {?} */
    SchemaActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
function SchemaObjectLoadActionMeta() { }
if (false) {
    /** @type {?} */
    SchemaObjectLoadActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    SchemaObjectLoadActionMeta.prototype.pk;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DigitalActionsFactory = /** @class */ (function (_super) {
    __extends(DigitalActionsFactory, _super);
    function DigitalActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DigitalActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'digital'));
        this.loadVersion = (/**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @return {?}
         */
        function (pkEntity, entityVersion) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                meta: { addPending: addPending, pkEntity: pkEntity, entityVersion: entityVersion },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
    return DigitalActionsFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    DigitalActionsFactory.LOAD_VERSION;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    DigitalActionsFactory.prototype.loadVersion;
    /** @type {?} */
    DigitalActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
function LoadChunksOfDigitalAction() { }
if (false) {
    /** @type {?} */
    LoadChunksOfDigitalAction.prototype.pkDigital;
}
var ChunkActionsFactory = /** @class */ (function (_super) {
    __extends(ChunkActionsFactory, _super);
    function ChunkActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ChunkActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
        this.loadChunksOfDigital = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        function (pkDigital, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
    return ChunkActionsFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ChunkActionsFactory.CHUNKS_OF_DIGITAL;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ChunkActionsFactory.prototype.loadChunksOfDigital;
    /** @type {?} */
    ChunkActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
function LoadColumnsOfTableAction() { }
if (false) {
    /** @type {?} */
    LoadColumnsOfTableAction.prototype.pkDigital;
}
var ColumnActionsFactory = /** @class */ (function (_super) {
    __extends(ColumnActionsFactory, _super);
    function ColumnActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ColumnActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'column'));
        this.loadColumnsOfTable = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        function (pkDigital, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
    return ColumnActionsFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ColumnActionsFactory.COLUMNS_OF_TABLE;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ColumnActionsFactory.prototype.loadColumnsOfTable;
    /** @type {?} */
    ColumnActionsFactory.prototype.ngRedux;
}
var DatActions = /** @class */ (function () {
    function DatActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
        this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
        this.column = new ColumnActionsFactory(this.ngRedux).createActions();
        this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
        this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
        this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
    }
    DatActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DatActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DatActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatActions_Factory() { return new DatActions(ɵɵinject(NgRedux)); }, token: DatActions, providedIn: "root" });
    return DatActions;
}());
if (false) {
    /** @type {?} */
    DatActions.prototype.digital;
    /** @type {?} */
    DatActions.prototype.chunk;
    /** @type {?} */
    DatActions.prototype.column;
    /** @type {?} */
    DatActions.prototype.class_column_mapping;
    /** @type {?} */
    DatActions.prototype.namespace;
    /** @type {?} */
    DatActions.prototype.text_property;
    /** @type {?} */
    DatActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dfh.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var dfhRoot = 'dfh';
/** @type {?} */
var dfhLabelByFksKey = (/**
 * @param {?} item
 * @return {?}
 */
function (item) { return (item.type || null) + "_" + (item.language || null) + "_" + (item.fk_class || null) + "_" + (item.fk_profile || null) + "_" + (item.fk_property || null) + "_" + (item.fk_project || null); });
var ɵ0$1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_profile.toString(); }, ɵ1$1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_class.toString(); }, ɵ2$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.basic_type.toString(); }, ɵ3$1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_property + '_' + item.has_domain + '_' + item.has_range; }, ɵ4$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.pk_property.toString(); }, ɵ5$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_domain.toString(); }, ɵ6$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_range.toString(); }, ɵ7$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_domain + '_' + d.pk_property; }, ɵ8$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_range + '_' + d.pk_property; }, ɵ9$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined; }, ɵ10$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_class ? undefined : d.fk_class + "_" + d.type; }, ɵ11$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_property ? undefined : d.fk_property + "_" + d.type; }, ɵ12$1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_profile ? undefined : d.fk_profile + "_" + d.type; };
/** @type {?} */
var dfhDefinitions = {
    profile: {
        indexBy: {
            keyInStore: 'pk_profile',
            indexByFn: (ɵ0$1)
        }
    },
    klass: {
        indexBy: {
            keyInStore: 'pk_class',
            indexByFn: (ɵ1$1),
        },
        groupBy: [
            {
                keyInStore: 'basic_type',
                groupByFn: (ɵ2$1)
            },
        ]
    },
    property: {
        indexBy: {
            keyInStore: 'pk_property__has_domain__has_range',
            indexByFn: (ɵ3$1)
        },
        groupBy: [
            {
                keyInStore: 'pk_property',
                groupByFn: (ɵ4$1)
            },
            {
                keyInStore: 'has_domain',
                groupByFn: (ɵ5$1)
            },
            {
                keyInStore: 'has_range',
                groupByFn: (ɵ6$1)
            },
            {
                keyInStore: 'has_domain__fk_property',
                groupByFn: (ɵ7$1)
            },
            {
                keyInStore: 'has_range__fk_property',
                groupByFn: (ɵ8$1)
            },
            {
                keyInStore: 'is_has_type_subproperty',
                groupByFn: (ɵ9$1)
            }
        ]
    },
    label: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: dfhLabelByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fk_class__type',
                groupByFn: (ɵ10$1)
            },
            {
                keyInStore: 'fk_property__type',
                groupByFn: (ɵ11$1)
            },
            {
                keyInStore: 'fk_profile__type',
                groupByFn: (ɵ12$1)
            }
        ]
    },
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dfh.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DfhProfileActionFactory = /** @class */ (function (_super) {
    __extends(DfhProfileActionFactory, _super);
    function DfhProfileActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhProfileActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhProfileActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    DfhProfileActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhProfileActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhProfileActionFactory.prototype.ngRedux;
}
var DfhClassActionFactory = /** @class */ (function (_super) {
    __extends(DfhClassActionFactory, _super);
    function DfhClassActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhClassActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhClassActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    DfhClassActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhClassActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhClassActionFactory.prototype.ngRedux;
}
var DfhPropertyActionFactory = /** @class */ (function (_super) {
    __extends(DfhPropertyActionFactory, _super);
    function DfhPropertyActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhPropertyActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhPropertyActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    DfhPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.ngRedux;
}
var DfhLabelActionFactory = /** @class */ (function (_super) {
    __extends(DfhLabelActionFactory, _super);
    function DfhLabelActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhLabelActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhLabelActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    DfhLabelActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhLabelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhLabelActionFactory.prototype.ngRedux;
}
var DfhActions = /** @class */ (function () {
    function DfhActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
        this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
        this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
        this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
    }
    DfhActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DfhActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DfhActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhActions_Factory() { return new DfhActions(ɵɵinject(NgRedux)); }, token: DfhActions, providedIn: "root" });
    return DfhActions;
}());
if (false) {
    /** @type {?} */
    DfhActions.prototype.profile;
    /** @type {?} */
    DfhActions.prototype.klass;
    /** @type {?} */
    DfhActions.prototype.property;
    /** @type {?} */
    DfhActions.prototype.label;
    /** @type {?} */
    DfhActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/inf.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var infRoot = 'inf';
var ɵ0$2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ1$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ2$2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ3$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ4$2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ5$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementBySubject(d); }, ɵ6$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementBySubjectProperty(d); }, ɵ7$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementByObject(d); }, ɵ8$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementByObjectProperty(d); }, ɵ9$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return U.toStr0undef(d.fk_subject_data); }, ɵ10$2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ11$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_concerned_entity + '_' + d.fk_class_field; }, ɵ12$2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_concerned_entity.toString(); }, ɵ13$1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ14 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ15 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ16 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ17 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ18 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
};
/** @type {?} */
var infDefinitions = {
    persistent_item: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0$2)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ1$2)
            }
        ]
    },
    temporal_entity: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ2$2)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ3$2)
            }
        ]
    },
    statement: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ4$2)
        },
        groupBy: [
            {
                keyInStore: 'subject',
                groupByFn: (ɵ5$2)
            },
            {
                keyInStore: 'subject+property',
                groupByFn: (ɵ6$2)
            },
            {
                keyInStore: 'object',
                groupByFn: (ɵ7$2)
            },
            {
                keyInStore: 'object+property',
                groupByFn: (ɵ8$2)
            },
            {
                keyInStore: 'fk_subject_data',
                groupByFn: (ɵ9$2)
            },
        ]
    },
    text_property: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ10$2)
        },
        groupBy: [
            {
                keyInStore: 'fk_concerned_entity__fk_class_field',
                groupByFn: (ɵ11$2)
            },
            {
                keyInStore: 'fk_concerned_entity',
                groupByFn: (ɵ12$2)
            },
        ]
    },
    lang_string: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ13$1)
        },
        groupBy: []
    },
    appellation: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ14)
        },
        groupBy: []
    },
    time_primitive: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ15)
        },
        groupBy: []
    },
    place: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ16)
        },
        groupBy: []
    },
    language: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ17)
        },
        groupBy: []
    },
    dimension: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ18)
        },
        groupBy: []
    },
}
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject
 * or to retrieve statements from such a group index
 */
;
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
function indexStatementBySubject(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0');
}
/**
 * @record
 */
function IndexStatementBySubject() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_info;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_data;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_tables_row;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_tables_cell;
}
;
/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
function indexStatementByObject(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0');
}
/**
 * @record
 */
function IndexStatementByObject() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_info;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_data;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_tables_row;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_tables_cell;
}
;
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject + property
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
function indexStatementBySubjectProperty(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
}
/**
 * @record
 */
function IndexStatementBySubjectProperty() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_info;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_data;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_tables_row;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_tables_cell;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_property;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_property_of_property;
}
/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object + property
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
function indexStatementByObjectProperty(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
}
/**
 * @record
 */
function IndexStatementByObjectProperty() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_info;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_data;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_tables_row;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_tables_cell;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_property;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_property_of_property;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/inf-action-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
var InfActionFactory = /** @class */ (function (_super) {
    __extends(InfActionFactory, _super);
    function InfActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    InfActionFactory.prototype.createInfActions = /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    function (actionPrefix, modelName) {
        var _this = this;
        this.createCrudActions(actionPrefix, modelName);
        /**
         * Call the Redux Action to remove model instances from project.
         */
        this.remove = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.removeSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        return this;
    };
    InfActionFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InfActionFactory.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return InfActionFactory;
}(SchemaActionsFactory));
if (false) {
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    InfActionFactory.prototype.remove;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    InfActionFactory.prototype.removeSucceeded;
    /** @type {?} */
    InfActionFactory.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/inf.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LoadByPkMeta() { }
if (false) {
    /** @type {?} */
    LoadByPkMeta.prototype.pkEntity;
}
;
/**
 * @record
 */
function LoadTypeOfProjectAction() { }
if (false) {
    /** @type {?} */
    LoadTypeOfProjectAction.prototype.pkEntity;
}
;
var InfPersistentItemActionFactory = /** @class */ (function (_super) {
    __extends(InfPersistentItemActionFactory, _super);
    // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
    function InfPersistentItemActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    InfPersistentItemActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createInfActions(infRoot, 'persistent_item'));
        // this.loadNestedObject = (pkProject: number, pkEntity: number) => {
        //   const addPending = U.uuid();
        //   const action: FluxStandardAction<Payload, LoadByPkMeta> = {
        //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.NESTED_BY_PK,
        //     meta: { addPending, pk: pkProject, pkEntity },
        //     payload: null,
        //   };
        //   this.ngRedux.dispatch(action)
        //   return {
        //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
        //     key: addPending
        //   };
        // }
        this.loadMinimal = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @return {?}
         */
        function (pkProject, pkEntity) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.typesOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                meta: { addPending: addPending, pk: pkProject },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        // this.typeOfProject = (pkProject: number, pkEntity: number) => {
        //   const addPending = U.uuid();
        //   const action: FluxStandardAction<Payload, LoadTypeOfProjectAction> = {
        //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPE_OF_PROJECT,
        //     meta: { addPending, pk: pkProject, pkEntity },
        //     payload: null,
        //   };
        //   this.ngRedux.dispatch(action)
        //   return {
        //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
        //     key: addPending
        //   };
        // }
        return this;
    };
    // Suffixes of load action types
    // static readonly NESTED_BY_PK = 'NESTED_BY_PK';
    InfPersistentItemActionFactory.MINIMAL_BY_PK = 'MINIMAL_BY_PK';
    InfPersistentItemActionFactory.TYPES_OF_PROJECT = 'TYPES_OF_PROJECT';
    InfPersistentItemActionFactory.TYPE_OF_PROJECT = 'TYPE_OF_PROJECT';
    return InfPersistentItemActionFactory;
}(InfActionFactory));
if (false) {
    /** @type {?} */
    InfPersistentItemActionFactory.MINIMAL_BY_PK;
    /** @type {?} */
    InfPersistentItemActionFactory.TYPES_OF_PROJECT;
    /** @type {?} */
    InfPersistentItemActionFactory.TYPE_OF_PROJECT;
    /** @type {?} */
    InfPersistentItemActionFactory.prototype.loadMinimal;
    /** @type {?} */
    InfPersistentItemActionFactory.prototype.loadNestedObject;
    /** @type {?} */
    InfPersistentItemActionFactory.prototype.typesOfProject;
    /** @type {?} */
    InfPersistentItemActionFactory.prototype.ngRedux;
}
/**
 * @record
 */
function PaginatedStatementList() { }
if (false) {
    /** @type {?} */
    PaginatedStatementList.prototype.count;
    /** @type {?} */
    PaginatedStatementList.prototype.schemas;
    /** @type {?} */
    PaginatedStatementList.prototype.paginatedStatements;
}
/**
 * @record
 */
function LoadPaginatedStatementListMeta() { }
if (false) {
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.pkSourceEntity;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.pkProperty;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.fkTargetClass;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.isOutgoing;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.limit;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.offset;
    /** @type {?} */
    LoadPaginatedStatementListMeta.prototype.alternatives;
}
var InfTemporalEntityActionFactory = /** @class */ (function (_super) {
    __extends(InfTemporalEntityActionFactory, _super);
    function InfTemporalEntityActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    InfTemporalEntityActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'));
        this.loadNestedObject = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @return {?}
         */
        function (pkProject, pkEntity) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.loadPaginatedList = (/**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} fkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_LIST,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkSourceEntity: pkSourceEntity,
                    fkTargetClass: fkTargetClass,
                    pkProperty: pkProperty,
                    isOutgoing: isOutgoing,
                    limit: limit,
                    offset: offset,
                    alternatives: false
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.loadPaginatedAlternativeList = (/**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} fkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkSourceEntity: pkSourceEntity,
                    pkProperty: pkProperty,
                    fkTargetClass: fkTargetClass,
                    isOutgoing: isOutgoing,
                    limit: limit,
                    offset: offset,
                    alternatives: true
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
    InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
    InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
    return InfTemporalEntityActionFactory;
}(InfActionFactory));
if (false) {
    /** @type {?} */
    InfTemporalEntityActionFactory.OWN_PROPERTIES;
    /** @type {?} */
    InfTemporalEntityActionFactory.PAGINATED_LIST;
    /** @type {?} */
    InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST;
    /** @type {?} */
    InfTemporalEntityActionFactory.prototype.loadNestedObject;
    /** @type {?} */
    InfTemporalEntityActionFactory.prototype.loadPaginatedList;
    /** @type {?} */
    InfTemporalEntityActionFactory.prototype.loadPaginatedAlternativeList;
    /** @type {?} */
    InfTemporalEntityActionFactory.prototype.ngRedux;
}
/**
 * @record
 */
function FindStatementByParams() { }
if (false) {
    /** @type {?} */
    FindStatementByParams.prototype.ofProject;
    /** @type {?} */
    FindStatementByParams.prototype.pkEntity;
    /** @type {?} */
    FindStatementByParams.prototype.pkInfoRange;
    /** @type {?} */
    FindStatementByParams.prototype.pkInfoDomain;
    /** @type {?} */
    FindStatementByParams.prototype.pkProperty;
}
/**
 * @record
 */
function ContentTreeMeta() { }
if (false) {
    /** @type {?} */
    ContentTreeMeta.prototype.pkExpressionEntity;
}
/**
 * @record
 */
function SourcesAndDigitalsOfEntity() { }
if (false) {
    /** @type {?} */
    SourcesAndDigitalsOfEntity.prototype.ofProject;
    /** @type {?} */
    SourcesAndDigitalsOfEntity.prototype.pkEntity;
}
/**
 * @record
 */
function SourcesAndDigitalsOfEntityResult() { }
if (false) {
    /** @type {?} */
    SourcesAndDigitalsOfEntityResult.prototype.statements;
    /** @type {?} */
    SourcesAndDigitalsOfEntityResult.prototype.digitals;
}
/**
 * @record
 */
function LoadOutgoingAlternativeStatements() { }
if (false) {
    /** @type {?} */
    LoadOutgoingAlternativeStatements.prototype.pkTemporalEntity;
    /** @type {?} */
    LoadOutgoingAlternativeStatements.prototype.pkProperty;
}
;
/**
 * @record
 */
function LoadIngoingAlternativeStatements() { }
if (false) {
    /** @type {?} */
    LoadIngoingAlternativeStatements.prototype.pkEntity;
    /** @type {?} */
    LoadIngoingAlternativeStatements.prototype.pkProperty;
}
;
/**
 * @record
 */
function AddToProjectWithTeEntActionMeta() { }
if (false) {
    /** @type {?} */
    AddToProjectWithTeEntActionMeta.prototype.pkStatements;
    /** @type {?} */
    AddToProjectWithTeEntActionMeta.prototype.pk;
    /** @type {?} */
    AddToProjectWithTeEntActionMeta.prototype.addPending;
}
;
var InfStatementActionFactory = /** @class */ (function (_super) {
    __extends(InfStatementActionFactory, _super);
    function InfStatementActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    InfStatementActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createInfActions(infRoot, 'statement'));
        this.findByParams = (/**
         * @param {?} ofProject
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} pkInfoRange
         * @param {?} pkInfoDomain
         * @param {?} pkProperty
         * @return {?}
         */
        function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty) {
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
                meta: {
                    addPending: U.uuid(),
                    pk: pkProject,
                    ofProject: ofProject,
                    pkEntity: pkEntity,
                    pkInfoRange: pkInfoRange,
                    pkInfoDomain: pkInfoDomain,
                    pkProperty: pkProperty,
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
        });
        this.loadIngoingAlternatives = (/**
         * @param {?} pkEntity
         * @param {?} pkProperty
         * @param {?} pkProject
         * @return {?}
         */
        function (pkEntity, pkProperty, pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkEntity: pkEntity,
                    pkProperty: pkProperty,
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.loadPaginatedList = (/**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} fkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkSourceEntity: pkSourceEntity,
                    fkTargetClass: fkTargetClass,
                    pkProperty: pkProperty,
                    isOutgoing: isOutgoing,
                    limit: limit,
                    offset: offset,
                    alternatives: false
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        /**
        * Get an nested object with everything needed to display the
        * links made from an entity towards sources and digitals.
        */
        this.sourcesAndDigitalsOfEntity = (/**
         * @param {?} ofProject
         * @param {?} pkProject
         * @param {?} pkEntity
         * @return {?}
         */
        function (ofProject, pkProject, pkEntity) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
                meta: {
                    addPending: addPending,
                    ofProject: ofProject,
                    pk: pkProject,
                    pkEntity: pkEntity
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    // static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
    InfStatementActionFactory.ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
    // static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
    InfStatementActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
    InfStatementActionFactory.CONTENT_TREE = 'CONTENT_TREE';
    InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
    InfStatementActionFactory.BY_PARAMS = 'BY_PARAMS';
    return InfStatementActionFactory;
}(InfActionFactory));
if (false) {
    /** @type {?} */
    InfStatementActionFactory.ALTERNATIVES_INGOING;
    /** @type {?} */
    InfStatementActionFactory.PAGINATED_LIST;
    /** @type {?} */
    InfStatementActionFactory.CONTENT_TREE;
    /** @type {?} */
    InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY;
    /** @type {?} */
    InfStatementActionFactory.BY_PARAMS;
    /** @type {?} */
    InfStatementActionFactory.prototype.loadIngoingAlternatives;
    /** @type {?} */
    InfStatementActionFactory.prototype.loadPaginatedList;
    /** @type {?} */
    InfStatementActionFactory.prototype.sourcesAndDigitalsOfEntity;
    /** @type {?} */
    InfStatementActionFactory.prototype.findByParams;
    /** @type {?} */
    InfStatementActionFactory.prototype.ngRedux;
}
/**
 * @record
 */
function LoadAlternativeTextProperties() { }
if (false) {
    /** @type {?} */
    LoadAlternativeTextProperties.prototype.fkEntity;
    /** @type {?} */
    LoadAlternativeTextProperties.prototype.fkClassField;
}
;
var InfTextPropertyActionFactory = /** @class */ (function (_super) {
    __extends(InfTextPropertyActionFactory, _super);
    function InfTextPropertyActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    InfTextPropertyActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createInfActions(infRoot, 'text_property'));
        this.loadAlternatives = (/**
         * @param {?} fkEntity
         * @param {?} fkClassField
         * @param {?} pkProject
         * @return {?}
         */
        function (fkEntity, fkClassField, pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTextPropertyActionFactory.ALTERNATIVES,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    fkEntity: fkEntity,
                    fkClassField: fkClassField,
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
    return InfTextPropertyActionFactory;
}(InfActionFactory));
if (false) {
    /** @type {?} */
    InfTextPropertyActionFactory.ALTERNATIVES;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.loadAlternatives;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.ngRedux;
}
var InfActions = /** @class */ (function () {
    function InfActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.persistent_item = new InfPersistentItemActionFactory(this.ngRedux).createActions();
        this.temporal_entity = new InfTemporalEntityActionFactory(this.ngRedux).createActions();
        this.statement = new InfStatementActionFactory(this.ngRedux).createActions();
        // TODO: pimp those up to real Inf Actions!
        this.language = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'language');
        this.appellation = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'appellation');
        this.lang_string = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'lang_string');
        this.dimension = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'dimension');
        this.place = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'place');
        this.time_primitive = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'time_primitive');
        this.text_property = new InfTextPropertyActionFactory(this.ngRedux).createActions();
    }
    InfActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InfActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ InfActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function InfActions_Factory() { return new InfActions(ɵɵinject(NgRedux)); }, token: InfActions, providedIn: "root" });
    return InfActions;
}());
if (false) {
    /** @type {?} */
    InfActions.prototype.persistent_item;
    /** @type {?} */
    InfActions.prototype.temporal_entity;
    /** @type {?} */
    InfActions.prototype.statement;
    /** @type {?} */
    InfActions.prototype.language;
    /** @type {?} */
    InfActions.prototype.appellation;
    /** @type {?} */
    InfActions.prototype.lang_string;
    /** @type {?} */
    InfActions.prototype.dimension;
    /** @type {?} */
    InfActions.prototype.place;
    /** @type {?} */
    InfActions.prototype.time_primitive;
    /** @type {?} */
    InfActions.prototype.text_property;
    /** @type {?} */
    InfActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/pro.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var proRoot = 'pro';
/** @type {?} */
var textPropertyByFksKey = (/**
 * @param {?} d
 * @return {?}
 */
function (d) { return (d.fk_project || null) + "_" + (d.fk_system_type || null) + "_" + (d.fk_language || null) + "_" + (d.fk_dfh_class || null) + "_" + (d.fk_dfh_property || null) + "_" + (d.fk_dfh_property_domain || null) + "_" + (d.fk_dfh_property_range || null); });
/** @type {?} */
var textPropertyByFksWithoutLang = (/**
 * @param {?} d
 * @return {?}
 */
function (d) { return (d.fk_project || null) + "_" + (d.fk_system_type || null) + "_" + (d.fk_dfh_class || null) + "_" + (d.fk_dfh_property || null) + "_" + (d.fk_dfh_property_domain || null) + "_" + (d.fk_dfh_property_range || null); });
/** @type {?} */
var proClassFieldConfgByProjectAndClassKey = (/**
 * @param {?} d
 * @return {?}
 */
function (d) {
    /** @type {?} */
    var fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
    return (d.fk_project || null) + "_" + (fk_class || null);
});
var ɵ0$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ1$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_project.toString() + '_' + item.fk_entity.toString(); }, ɵ2$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ3$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_project + '_' + item.fk_class; }, ɵ4$3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_project + '_' + d.enabled_in_entities; }, ɵ5$3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_project.toString(); }, ɵ6$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_project + '_' + item.fk_profile; }, ɵ7$3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_project + '_' + d.enabled; }, ɵ8$3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_project.toString(); }, ɵ9$3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); };
/** @type {?} */
var proDefinitions = {
    project: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0$3)
        }
    },
    info_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_entity',
            indexByFn: (ɵ1$3)
        }
    },
    class_field_config: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ2$3)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__fk_class',
                groupByFn: proClassFieldConfgByProjectAndClassKey
            }
        ]
    },
    dfh_class_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_class',
            indexByFn: (ɵ3$3)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled_in_entities',
                groupByFn: (ɵ4$3)
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ5$3)
            }
        ],
    },
    dfh_profile_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_profile',
            indexByFn: (ɵ6$3)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled',
                groupByFn: (ɵ7$3)
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ8$3)
            }
        ],
    },
    text_property: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: textPropertyByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fks_without_lang',
                groupByFn: textPropertyByFksWithoutLang
            }
        ]
    },
    analysis: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ9$3)
        }
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/pro.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProProjectActionFactory = /** @class */ (function (_super) {
    __extends(ProProjectActionFactory, _super);
    function ProProjectActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProProjectActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'project'));
        this.loadOfAccount = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProProjectActionFactory.OF_ACCOUNT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.loadBasics = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProProjectActionFactory.LOAD_BASICS,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProProjectActionFactory.OF_ACCOUNT = 'OF_ACCOUNT';
    ProProjectActionFactory.LOAD_BASICS = 'LOAD_BASICS';
    return ProProjectActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProProjectActionFactory.OF_ACCOUNT;
    /** @type {?} */
    ProProjectActionFactory.LOAD_BASICS;
    /** @type {?} */
    ProProjectActionFactory.prototype.loadOfAccount;
    /**
     * loads the ProProject and the default InfLanguage
     * @type {?}
     */
    ProProjectActionFactory.prototype.loadBasics;
    /** @type {?} */
    ProProjectActionFactory.prototype.ngRedux;
}
/**
 * @record
 */
function MarkStatementAsFavoriteActionMeta() { }
if (false) {
    /** @type {?} */
    MarkStatementAsFavoriteActionMeta.prototype.addPending;
    /** @type {?} */
    MarkStatementAsFavoriteActionMeta.prototype.pk;
    /** @type {?} */
    MarkStatementAsFavoriteActionMeta.prototype.pkStatement;
    /** @type {?} */
    MarkStatementAsFavoriteActionMeta.prototype.isOutgoing;
}
var ProInfoProjRelActionFactory = /** @class */ (function (_super) {
    __extends(ProInfoProjRelActionFactory, _super);
    function ProInfoProjRelActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProInfoProjRelActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'info_proj_rel'));
        this.markStatementAsFavorite = (/**
         * @param {?} pkProject
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @return {?}
         */
        function (pkProject, pkStatement, isOutgoing) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkStatement: pkStatement,
                    isOutgoing: isOutgoing
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';
    return ProInfoProjRelActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.markStatementAsFavorite;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.ngRedux;
}
var ProDfhClassProjRelActionFactory = /** @class */ (function (_super) {
    __extends(ProDfhClassProjRelActionFactory, _super);
    function ProDfhClassProjRelActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProDfhClassProjRelActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_class_proj_rel'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProDfhClassProjRelActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProDfhClassProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
    return ProDfhClassProjRelActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProDfhClassProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.ngRedux;
}
var ProDfhProfileProjRelActionFactory = /** @class */ (function (_super) {
    __extends(ProDfhProfileProjRelActionFactory, _super);
    function ProDfhProfileProjRelActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProDfhProfileProjRelActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_profile_proj_rel'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProDfhProfileProjRelActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProDfhProfileProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
    return ProDfhProfileProjRelActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.ngRedux;
}
var ProClassFieldConfigActionFactory = /** @class */ (function (_super) {
    __extends(ProClassFieldConfigActionFactory, _super);
    function ProClassFieldConfigActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProClassFieldConfigActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'class_field_config'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProClassFieldConfigActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProClassFieldConfigActionFactory.OF_PROJECT = 'OF_PROJECT';
    return ProClassFieldConfigActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProClassFieldConfigActionFactory.OF_PROJECT;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.ngRedux;
}
var ProTextPropertyActionFactory = /** @class */ (function (_super) {
    __extends(ProTextPropertyActionFactory, _super);
    function ProTextPropertyActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProTextPropertyActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'text_property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProTextPropertyActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProTextPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
    return ProTextPropertyActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProTextPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.ngRedux;
}
var ProAnalysisActionFactory = /** @class */ (function (_super) {
    __extends(ProAnalysisActionFactory, _super);
    function ProAnalysisActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ProAnalysisActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(proRoot, 'analysis'));
        this.loadByIdAndVersion = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} version
         * @return {?}
         */
        function (pkProject, pkEntity, version) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProAnalysisActionFactory.BY_PK_AND_VERSION,
                meta: {
                    addPending: addPending,
                    pk: pkProject,
                    pkEntity: pkEntity,
                    version: version
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ProAnalysisActionFactory.BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';
    return ProAnalysisActionFactory;
}(SchemaActionsFactory));
if (false) {
    /** @type {?} */
    ProAnalysisActionFactory.BY_PK_AND_VERSION;
    /** @type {?} */
    ProAnalysisActionFactory.prototype.loadByIdAndVersion;
    /** @type {?} */
    ProAnalysisActionFactory.prototype.ngRedux;
}
var ProActions = /** @class */ (function () {
    function ProActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.project = new ProProjectActionFactory(this.ngRedux).createActions();
        this.info_proj_rel = new ProInfoProjRelActionFactory(this.ngRedux).createActions();
        this.text_property = new ProTextPropertyActionFactory(this.ngRedux).createActions();
        this.dfh_class_proj_rel = new ProDfhClassProjRelActionFactory(this.ngRedux).createActions();
        this.dfh_profile_proj_rel = new ProDfhProfileProjRelActionFactory(this.ngRedux).createActions();
        this.class_field_config = new ProClassFieldConfigActionFactory(this.ngRedux).createActions();
        this.analysis = new ProAnalysisActionFactory(this.ngRedux).createActions();
    }
    ProActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ ProActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProActions_Factory() { return new ProActions(ɵɵinject(NgRedux)); }, token: ProActions, providedIn: "root" });
    return ProActions;
}());
if (false) {
    /** @type {?} */
    ProActions.prototype.project;
    /** @type {?} */
    ProActions.prototype.info_proj_rel;
    /** @type {?} */
    ProActions.prototype.text_property;
    /** @type {?} */
    ProActions.prototype.dfh_class_proj_rel;
    /** @type {?} */
    ProActions.prototype.dfh_profile_proj_rel;
    /** @type {?} */
    ProActions.prototype.class_field_config;
    /** @type {?} */
    ProActions.prototype.analysis;
    /** @type {?} */
    ProActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/sys.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var sysRoot = 'sys';
var ɵ0$4 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ1$4 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ2$4 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.required_by_sources.toString(); }, ɵ3$4 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false'; }, ɵ4$4 = /**
 * @return {?}
 */
function () { return 'main'; };
/** @type {?} */
var sysDefinitions = {
    system_relevant_class: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0$4)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ1$4)
            },
            {
                keyInStore: 'required_by_sources',
                groupByFn: (ɵ2$4)
            },
            {
                keyInStore: 'required',
                groupByFn: (ɵ3$4)
            }
        ]
    },
    config: {
        indexBy: {
            keyInStore: 'main',
            indexByFn: (ɵ4$4)
        }
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/sys.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MetaData$2() { }
if (false) {
    /** @type {?|undefined} */
    MetaData$2.prototype.systemRelevantClasses;
}
;
var SysActions = /** @class */ (function () {
    function SysActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
        // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
        //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
        this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
    }
    SysActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SysActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ SysActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysActions_Factory() { return new SysActions(ɵɵinject(NgRedux)); }, token: SysActions, providedIn: "root" });
    return SysActions;
}());
if (false) {
    /** @type {?} */
    SysActions.prototype.system_relevant_class;
    /** @type {?} */
    SysActions.prototype.config;
    /** @type {?} */
    SysActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/tab.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var tabRoot = 'tab';
var ɵ0$5 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_cell.toString(); }, ɵ1$5 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_column + '_' + item.fk_row; };
/** @type {?} */
var tabDefinitions = {
    cell: {
        indexBy: {
            keyInStore: 'pk_cell',
            indexByFn: (ɵ0$5)
        },
        groupBy: [
            {
                keyInStore: 'fk_column_fk_row',
                groupByFn: (ɵ1$5)
            }
        ]
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/tab.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TabActions = /** @class */ (function () {
    function TabActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
    }
    TabActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TabActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ TabActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function TabActions_Factory() { return new TabActions(ɵɵinject(NgRedux)); }, token: TabActions, providedIn: "root" });
    return TabActions;
}());
if (false) {
    /** @type {?} */
    TabActions.prototype.cell;
    /** @type {?} */
    TabActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/war.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var warRoot = 'war';
var ɵ0$6 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); };
/** @type {?} */
var warDefinitions = {
    entity_preview: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0$6)
        }
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WarActions = /** @class */ (function () {
    function WarActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
    WarActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WarActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ WarActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function WarActions_Factory() { return new WarActions(ɵɵinject(NgRedux)); }, token: WarActions, providedIn: "root" });
    return WarActions;
}());
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/services/schema.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SchemaService = /** @class */ (function () {
    function SchemaService(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications) {
        this.api = api;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.warActions = warActions;
        this.tabActions = tabActions;
        this.dfhActions = dfhActions;
        this.sysActions = sysActions;
        this.notifications = notifications;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    SchemaService.prototype.store = /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    function (apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    };
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeGv = /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    function (apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    };
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeSchemaObject = /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    function (object, pkProject) {
        var _this = this;
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                else if (schema === 'dat')
                    actions = _this.datActions;
                else if (schema === 'war')
                    actions = _this.warActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
        }
    };
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeSchemaObjectGv = /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    function (object, pkProject) {
        var _this = this;
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                else if (schema === 'dat')
                    actions = _this.datActions;
                else if (schema === 'war')
                    actions = _this.warActions;
                else if (schema === 'tab')
                    actions = _this.tabActions;
                else if (schema === 'dfh')
                    actions = _this.dfhActions;
                else if (schema === 'sys')
                    actions = _this.sysActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
            // this.extendEntityPreviewStream(object, pkProject);
            console.warn('!!!!!!!! Need to call this.extendEntityPreviewStream(object, pkProject);');
        }
    };
    SchemaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SchemaService.ctorParameters = function () { return [
        { type: SchemaObjectApi },
        { type: InfActions },
        { type: ProActions },
        { type: DatActions },
        { type: WarActions },
        { type: TabActions },
        { type: DfhActions },
        { type: SysActions },
        { type: NotificationsAPIActions }
    ]; };
    /** @nocollapse */ SchemaService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaService_Factory() { return new SchemaService(ɵɵinject(SchemaObjectApi), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(WarActions), ɵɵinject(TabActions), ɵɵinject(DfhActions), ɵɵinject(SysActions), ɵɵinject(NotificationsAPIActions)); }, token: SchemaService, providedIn: "root" });
    return SchemaService;
}());
if (false) {
    /** @type {?} */
    SchemaService.prototype.api;
    /** @type {?} */
    SchemaService.prototype.infActions;
    /** @type {?} */
    SchemaService.prototype.proActions;
    /** @type {?} */
    SchemaService.prototype.datActions;
    /** @type {?} */
    SchemaService.prototype.warActions;
    /** @type {?} */
    SchemaService.prototype.tabActions;
    /** @type {?} */
    SchemaService.prototype.dfhActions;
    /** @type {?} */
    SchemaService.prototype.sysActions;
    /** @type {?} */
    SchemaService.prototype.notifications;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/active-project.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} textProperties
 * @param {?} fkSystemType
 * @return {?}
 */
function firstProTextPropStringOfType(textProperties, fkSystemType) {
    return (textProperties.find((/**
     * @param {?} t
     * @return {?}
     */
    function (t) { return t.fk_system_type === fkSystemType; })) || { string: '' }).string;
}
/**
 * Transform ProProject to ProjectPreview
 * @param {?} project
 * @return {?}
 */
function proProjectToProjectPreview(project) {
    return {
        label: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
        description: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
        default_language: project.default_language,
        pk_project: project.pk_entity
    };
}
var ActiveProjectEpics = /** @class */ (function () {
    function ActiveProjectEpics(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux, schemaObj) {
        this.sys = sys;
        this.dat = dat;
        this.dfh = dfh;
        this.pro = pro;
        this.inf = inf;
        this.projectApi = projectApi;
        this.actions = actions;
        this.notificationActions = notificationActions;
        this.loadingBarActions = loadingBarActions;
        this.ngRedux = ngRedux;
        this.schemaObj = schemaObj;
    }
    /**
     * @return {?}
     */
    ActiveProjectEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
    };
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     */
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectBasicsEpic = /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            /**
           * Emit the global action that activates the loading bar
           */
            globalStore.next(_this.loadingBarActions.startLoading());
            _this.projectApi.getBasics(action.meta.pk_project)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                globalStore.next(_this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
                _this.schemaObj.storeSchemaObject({
                    inf: { language: [data[0].default_language] },
                    pro: { project: [omit(['default_language'], data[0])] }
                }, action.meta.pk_project);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                globalStore.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error.message }
                }));
            }));
        })); }))); });
    };
    /**
    * This epic listenes to an action that is dispached when loading projcect succeeded
    *
    * It dispaches an action that completes the loading bar
    */
    /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectUpdatedEpic = /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), mapTo(_this.loadingBarActions.completeLoading())); });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectConfigEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            globalStore.next(_this.loadingBarActions.startLoading());
            combineLatest(_this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.sys.system_relevant_class.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.sys.config.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))))
                .pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return !res.includes(undefined); })))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                globalStore.next(_this.actions.loadProjectConfigSucceeded());
                globalStore.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            }));
        })); }))); });
    };
    /**
     * LAYOUT
     */
    /**
     * LAYOUT
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createClosePanelEpic = /**
     * LAYOUT
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                _this.ngRedux.getState().activeProject.panels.forEach((/**
                 * @param {?} panel
                 * @param {?} panelIndex
                 * @return {?}
                 */
                function (panel, panelIndex) {
                    if (panel.tabs.length === 0)
                        globalStore.next(_this.actions.closePanel(panelIndex));
                }));
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createSplitPanelActivateTabEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.SPLIT_PANEL), map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                /** @type {?} */
                var p = _this.ngRedux.getState().activeProject;
                /** @type {?} */
                var c = action.meta.currentPanelIndex;
                /** @type {?} */
                var panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                return _this.actions.activateTab(panelIndex, 0);
            })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createActivateTabFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.ACTIVATE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                    globalStore.next(_this.actions.focusPanel(action.meta.panelIndex));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createMoveTabFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.MOVE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                    globalStore.next(_this.actions.focusPanel(action.meta.currentPanelIndex));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createClosePanelFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel > (_this.ngRedux.getState().activeProject.panels.length - 1)) {
                    globalStore.next(_this.actions.focusPanel(0));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createAddTabCloseListEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.ADD_TAB), mapTo(_this.actions.setListType('')));
        });
    };
    ActiveProjectEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActiveProjectEpics.ctorParameters = function () { return [
        { type: SysActions },
        { type: DatActions },
        { type: DfhActions },
        { type: ProActions },
        { type: InfActions },
        { type: ProProjectApi },
        { type: ActiveProjectActions },
        { type: NotificationsAPIActions },
        { type: LoadingBarActions },
        { type: NgRedux },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ ActiveProjectEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(ɵɵinject(SysActions), ɵɵinject(DatActions), ɵɵinject(DfhActions), ɵɵinject(ProActions), ɵɵinject(InfActions), ɵɵinject(ProProjectApi), ɵɵinject(ActiveProjectActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(LoadingBarActions), ɵɵinject(NgRedux), ɵɵinject(SchemaService)); }, token: ActiveProjectEpics, providedIn: "root" });
    return ActiveProjectEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.sys;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.dat;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.dfh;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.pro;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.inf;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.projectApi;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.notificationActions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.ngRedux;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.schemaObj;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/loading-bar.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoadingBarEpics = /** @class */ (function () {
    function LoadingBarEpics(service) {
        this.service = service;
    }
    /**
     * @return {?}
     */
    LoadingBarEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
    };
    /**
     * @private
     * @return {?}
     */
    LoadingBarEpics.prototype.createCompleteLoadingBarEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(LoadingBarActions.COPMLETE), switchMap((/**
         * @return {?}
         */
        function () {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.service.complete();
                // observer.next(this.actions.stopLoading())
            }));
        }))); });
    };
    /**
     * @private
     * @return {?}
     */
    LoadingBarEpics.prototype.createStartLoadingBarEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(LoadingBarActions.START), switchMap((/**
         * @return {?}
         */
        function () {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.service.start();
            }));
        }))); });
    };
    LoadingBarEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LoadingBarEpics.ctorParameters = function () { return [
        { type: SlimLoadingBarService }
    ]; };
    /** @nocollapse */ LoadingBarEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadingBarEpics_Factory() { return new LoadingBarEpics(ɵɵinject(SlimLoadingBarService$1)); }, token: LoadingBarEpics, providedIn: "root" });
    return LoadingBarEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/notifications.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotificationsAPIEpics = /** @class */ (function () {
    function NotificationsAPIEpics(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
    /**
     * @return {?}
     */
    NotificationsAPIEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createAddToastEpic());
    };
    /**
     * @private
     * @return {?}
     */
    NotificationsAPIEpics.prototype.createAddToastEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            filter((/**
             * @param {?} a
             * @return {?}
             */
            function (a) {
                return a;
            })), ofType(NotificationsAPIActions.ADD_TOAST), switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /**
                 * Add Toast
                 * @type {?}
                 */
                var a = (/** @type {?} */ (action));
                if (!a.payload.options.title && !a.payload.options.msg) {
                    if (a.payload.type === 'error') {
                        a.payload.options.title = 'Oops, something went wrong!';
                    }
                }
                _this.toastyService[a.payload.type](a.payload.options);
            })); })));
        });
    };
    NotificationsAPIEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NotificationsAPIEpics.ctorParameters = function () { return [
        { type: ToastyService },
        { type: ToastyConfig }
    ]; };
    /** @nocollapse */ NotificationsAPIEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function NotificationsAPIEpics_Factory() { return new NotificationsAPIEpics(ɵɵinject(ToastyService$1), ɵɵinject(ToastyConfig$1)); }, token: NotificationsAPIEpics, providedIn: "root" });
    return NotificationsAPIEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    NotificationsAPIEpics.prototype.toastyService;
    /**
     * @type {?}
     * @private
     */
    NotificationsAPIEpics.prototype.toastyConfig;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActionResolverEpics = /** @class */ (function () {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    function ActionResolverEpics() {
        var _this = this;
        this.createEpics = (/**
         * @return {?}
         */
        function () { return combineEpics(_this.createResolveEpic()); });
    }
    /**
     * @private
     * @return {?}
     */
    ActionResolverEpics.prototype.createResolveEpic = /**
     * @private
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return !!action && !!action.meta && !!action.meta.removePending; })), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } })); }))); });
    };
    ActionResolverEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActionResolverEpics.ctorParameters = function () { return []; };
    /** @nocollapse */ ActionResolverEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
    return ActionResolverEpics;
}());
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/flattener.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
var /**
 * @template Payload, Model
 */
ModelFlattener = /** @class */ (function () {
    function ModelFlattener(actions, modelDefinition, flattenCb) {
        this.actions = actions;
        this.modelDefinition = modelDefinition;
        this.flattenCb = flattenCb;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    ModelFlattener.prototype.flatten = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (items && items.length > 0) {
            this.flattenCb(items);
            // todo remove properties of those objects, using getModelDefinition()
            /** @type {?} */
            var keysToOmit_1 = keys(this.modelDefinition.relations).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.toString(); }));
            this.items = __spread((this.items || []), (/** @type {?} */ (items.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !!item && Object.keys(item).length > 0; }))
                .map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return omit(keysToOmit_1, item); })))));
        }
        return true;
    };
    return ModelFlattener;
}());
if (false) {
    /** @type {?} */
    ModelFlattener.prototype.items;
    /** @type {?} */
    ModelFlattener.prototype.actions;
    /** @type {?} */
    ModelFlattener.prototype.modelDefinition;
    /** @type {?} */
    ModelFlattener.prototype.flattenCb;
}
/**
 * @record
 */
function FlattenerInterface() { }
/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
var  /**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
Flattener = /** @class */ (function () {
    function Flattener(infActions, datActions, proActions) {
        var _this = this;
        this.infActions = infActions;
        this.datActions = datActions;
        this.proActions = proActions;
        this.info_proj_rel = new ModelFlattener(this.proActions.info_proj_rel, ProInfoProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProInfoProjRel(item);
            }));
        }));
        this.pro_dfh_class_proj_rel = new ModelFlattener(this.proActions.dfh_class_proj_rel, ProDfhClassProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProDfhClassProjRel(item);
            }));
        }));
        this.pro_dfh_profile_proj_rel = new ModelFlattener(this.proActions.dfh_profile_proj_rel, ProDfhProfileProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProDfhProfileProjRel(item);
            }));
        }));
        this.persistent_item = new ModelFlattener(this.infActions.persistent_item, InfPersistentItem.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfPersistentItem(item);
                _this.statement.flatten(item.incoming_statements);
                _this.statement.flatten(item.outgoing_statements);
                _this.text_property.flatten(item.text_properties);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.temporal_entity = new ModelFlattener(this.infActions.temporal_entity, InfTemporalEntity.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTemporalEntity(item);
                _this.statement.flatten(item.outgoing_statements);
                _this.statement.flatten(item.incoming_statements);
                _this.text_property.flatten(item.text_properties);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.statement = new ModelFlattener(this.infActions.statement, InfStatement.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfStatement(item);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
                // Subject
                if (item.subject_temporal_entity)
                    _this.temporal_entity.flatten([item.subject_temporal_entity]);
                else if (item.subject_statement)
                    _this.statement.flatten([item.subject_statement]);
                // Object
                if (item.object_persistent_item)
                    _this.persistent_item.flatten([item.object_persistent_item]);
                else if (item.object_appellation)
                    _this.appellation.flatten([item.object_appellation]);
                else if (item.object_place)
                    _this.place.flatten([item.object_place]);
                else if (item.object_time_primitive)
                    _this.time_primitive.flatten([item.object_time_primitive]);
                else if (item.object_language)
                    _this.language.flatten([item.object_language]);
                else if (item.subject_chunk)
                    _this.chunk.flatten([item.subject_chunk]);
                else if (item.object_lang_string)
                    _this.lang_string.flatten([item.object_lang_string]);
                else if (item.object_dimension)
                    _this.dimension.flatten([item.object_dimension]);
            }));
        }));
        this.appellation = new ModelFlattener(this.infActions.appellation, InfAppellation.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfAppellation(item);
            }));
        }));
        this.place = new ModelFlattener(this.infActions.place, InfPlace.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfPlace(item);
            }));
        }));
        this.time_primitive = new ModelFlattener(this.infActions.time_primitive, InfTimePrimitive.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTimePrimitive(item);
            }));
        }));
        this.language = new ModelFlattener(this.infActions.language, InfLanguage.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfLanguage(item);
            }));
        }));
        this.lang_string = new ModelFlattener(this.infActions.lang_string, InfLangString.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfLangString(item);
                _this.language.flatten([item.language]);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.dimension = new ModelFlattener(this.infActions.dimension, InfDimension.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfDimension(item);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.text_property = new ModelFlattener(this.infActions.text_property, InfTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTextProperty(item);
                _this.language.flatten([item.language]);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.digital = new ModelFlattener(this.datActions.digital, DatDigital.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new DatDigital(item);
            }));
        }));
        this.chunk = new ModelFlattener(this.datActions.chunk, DatChunk.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new DatChunk(item);
                _this.statement.flatten(item.outgoing_statements);
            }));
        }));
        this.pro_project = new ModelFlattener(this.proActions.project, ProProject.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProProject(item);
                _this.language.flatten([item.default_language]);
            }));
        }));
        this.pro_text_property = new ModelFlattener(this.proActions.text_property, ProTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProTextProperty(item);
                _this.language.flatten([item.language]);
            }));
        }));
        this.pro_class_field_config = new ModelFlattener(this.proActions.class_field_config, ProClassFieldConfig.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProClassFieldConfig(item);
            }));
        }));
        this.analysis = new ModelFlattener(this.proActions.analysis, { relations: [] }, (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { }));
        }));
    }
    /**
     * @return {?}
     */
    Flattener.prototype.getFlattened = /**
     * @return {?}
     */
    function () {
        return {
            pro_project: this.pro_project,
            pro_text_property: this.pro_text_property,
            pro_class_field_config: this.pro_class_field_config,
            pro_dfh_profile_proj_rel: this.pro_dfh_profile_proj_rel,
            pro_dfh_class_proj_rel: this.pro_dfh_class_proj_rel,
            info_proj_rel: this.info_proj_rel,
            analysis: this.analysis,
            persistent_item: this.persistent_item,
            temporal_entity: this.temporal_entity,
            statement: this.statement,
            appellation: this.appellation,
            place: this.place,
            time_primitive: this.time_primitive,
            language: this.language,
            text_property: this.text_property,
            lang_string: this.lang_string,
            dimension: this.dimension,
            digital: this.digital,
            chunk: this.chunk,
        };
    };
    return Flattener;
}());
if (false) {
    /** @type {?} */
    Flattener.prototype.info_proj_rel;
    /** @type {?} */
    Flattener.prototype.pro_dfh_class_proj_rel;
    /** @type {?} */
    Flattener.prototype.pro_dfh_profile_proj_rel;
    /** @type {?} */
    Flattener.prototype.persistent_item;
    /** @type {?} */
    Flattener.prototype.temporal_entity;
    /** @type {?} */
    Flattener.prototype.statement;
    /** @type {?} */
    Flattener.prototype.appellation;
    /** @type {?} */
    Flattener.prototype.place;
    /** @type {?} */
    Flattener.prototype.time_primitive;
    /** @type {?} */
    Flattener.prototype.language;
    /** @type {?} */
    Flattener.prototype.lang_string;
    /** @type {?} */
    Flattener.prototype.dimension;
    /** @type {?} */
    Flattener.prototype.text_property;
    /** @type {?} */
    Flattener.prototype.digital;
    /** @type {?} */
    Flattener.prototype.chunk;
    /** @type {?} */
    Flattener.prototype.pro_project;
    /** @type {?} */
    Flattener.prototype.pro_text_property;
    /** @type {?} */
    Flattener.prototype.pro_class_field_config;
    /** @type {?} */
    Flattener.prototype.analysis;
    /** @type {?} */
    Flattener.prototype.infActions;
    /** @type {?} */
    Flattener.prototype.datActions;
    /** @type {?} */
    Flattener.prototype.proActions;
}
/** @type {?} */
var storeFlattened = (/**
 * @param {?} flattened
 * @param {?=} pk
 * @param {?=} type
 * @return {?}
 */
function (flattened, pk, type) {
    values(flattened).forEach((/**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        if (model.items) {
            if (type === 'UPSERT') {
                model.actions.upsertSucceeded(model.items, undefined, pk);
            }
            else {
                model.actions.loadSucceeded(model.items, undefined, pk);
            }
        }
    }));
});

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/schema-epics-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
var  /**
 * @template Payload, Model
 */
SchemaEpicsFactory = /** @class */ (function () {
    function SchemaEpicsFactory(actionPrefix, modelName, actions, notifications) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.actions = actions;
        this.notifications = notifications;
    }
    /**
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    SchemaEpicsFactory.prototype.createLoadEpic = /**
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, actionSuffix, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.type('LOAD', actionSuffix)), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk, meta);
                        _this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    SchemaEpicsFactory.prototype.createUpsertEpic = /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        _this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * @param {?} apiFn
     * @return {?}
     */
    SchemaEpicsFactory.prototype.createDeleteEpic = /**
     * @param {?} apiFn
     * @return {?}
     */
    function (apiFn) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::DELETE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                apiFn(action.meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    _this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * Create the string used as action.type
     */
    /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    SchemaEpicsFactory.prototype.type = /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    function (operation, actionSuffix) {
        return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '');
    };
    /**
    * Create the onError logic for standard actions
    * @param globalActions pass in the subscriber to the action$ stream
    */
    /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    SchemaEpicsFactory.prototype.onError = /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    function (globalActions, error, pendingKey, pkProject) {
        globalActions.next(this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
        }));
        this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
    };
    return SchemaEpicsFactory;
}());
if (false) {
    /** @type {?} */
    SchemaEpicsFactory.prototype.actionPrefix;
    /** @type {?} */
    SchemaEpicsFactory.prototype.modelName;
    /** @type {?} */
    SchemaEpicsFactory.prototype.actions;
    /** @type {?} */
    SchemaEpicsFactory.prototype.notifications;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dat.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatEpics = /** @class */ (function () {
    function DatEpics(notification, datActions, infActions, proActions, digitalApi, chunkApi, columnApi, namespaceApi, schemaObjectService) {
        this.notification = notification;
        this.datActions = datActions;
        this.infActions = infActions;
        this.proActions = proActions;
        this.digitalApi = digitalApi;
        this.chunkApi = chunkApi;
        this.columnApi = columnApi;
        this.namespaceApi = namespaceApi;
        this.schemaObjectService = schemaObjectService;
    }
    /**
     * @return {?}
     */
    DatEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var digitalEpicsFactory = new SchemaEpicsFactory(datRoot, 'digital', this.datActions.digital, this.notification);
        /** @type {?} */
        var chunkEpicsFactory = new SchemaEpicsFactory(datRoot, 'chunk', this.datActions.chunk, this.notification);
        /** @type {?} */
        var namespaceEpicsFactory = new SchemaEpicsFactory(datRoot, 'namespace', this.datActions.namespace, this.notification);
        /** @type {?} */
        var columnEpicsFactory = new SchemaEpicsFactory(datRoot, 'column', this.datActions.column, this.notification);
        return combineEpics(
        // Digital
        digitalEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null); }), DigitalActionsFactory.LOAD_VERSION), digitalEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.bulkUpsert(meta.pk, meta.items); })), digitalEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.bulkDelete(meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.pk_entity; }))); })), 
        // Chunk
        chunkEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.chunkApi.ofDigital(meta.pk, meta.pkDigital); }), ChunkActionsFactory.CHUNKS_OF_DIGITAL, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.chunk.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), 
        // Namespace
        namespaceEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.namespaceApi.byProject(meta.pk); }), ''), columnEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.columnApi.ofDigital(meta.pk, meta.pkDigital); }), ColumnActionsFactory.COLUMNS_OF_TABLE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    };
    DatEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DatEpics.ctorParameters = function () { return [
        { type: NotificationsAPIActions },
        { type: DatActions },
        { type: InfActions },
        { type: ProActions },
        { type: DatDigitalApi },
        { type: DatChunkApi },
        { type: DatColumnApi },
        { type: DatNamespaceApi },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ DatEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatEpics_Factory() { return new DatEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(DatActions), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatDigitalApi), ɵɵinject(DatChunkApi), ɵɵinject(DatColumnApi), ɵɵinject(DatNamespaceApi), ɵɵinject(SchemaService)); }, token: DatEpics, providedIn: "root" });
    return DatEpics;
}());
if (false) {
    /** @type {?} */
    DatEpics.prototype.notification;
    /** @type {?} */
    DatEpics.prototype.datActions;
    /** @type {?} */
    DatEpics.prototype.infActions;
    /** @type {?} */
    DatEpics.prototype.proActions;
    /** @type {?} */
    DatEpics.prototype.digitalApi;
    /** @type {?} */
    DatEpics.prototype.chunkApi;
    /** @type {?} */
    DatEpics.prototype.columnApi;
    /** @type {?} */
    DatEpics.prototype.namespaceApi;
    /**
     * @type {?}
     * @private
     */
    DatEpics.prototype.schemaObjectService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DfhEpics = /** @class */ (function () {
    function DfhEpics(actions, notification, profileApi, classApi, propertyApi, labelApi) {
        this.actions = actions;
        this.notification = notification;
        this.profileApi = profileApi;
        this.classApi = classApi;
        this.propertyApi = propertyApi;
        this.labelApi = labelApi;
    }
    /**
     * @return {?}
     */
    DfhEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dfhProfileEpicsFactory = new SchemaEpicsFactory('dfh', 'profile', this.actions.profile, this.notification);
        /** @type {?} */
        var dfhClassEpicsFactory = new SchemaEpicsFactory('dfh', 'klass', this.actions.klass, this.notification);
        /** @type {?} */
        var dfhLabelEpicsFactory = new SchemaEpicsFactory('dfh', 'label', this.actions.label, this.notification);
        /** @type {?} */
        var dfhPropertyEpicsFactory = new SchemaEpicsFactory('dfh', 'property', this.actions.property, this.notification);
        return combineEpics(
        // Profile Loaders
        dfhProfileEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileApi.ofProject(meta.pk); }), DfhProfileActionFactory.OF_PROJECT), 
        // Property Loaders
        dfhPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.propertyApi.dfhPropertyControllerOfProject(meta.pk); }), DfhPropertyActionFactory.OF_PROJECT), 
        // Class Loaders
        dfhClassEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classApi.dfhClassControllerOfProject(meta.pk); }), DfhClassActionFactory.OF_PROJECT), 
        // Label Loaders
        dfhLabelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.labelApi.ofProject(meta.pk); }), DfhLabelActionFactory.OF_PROJECT));
    };
    DfhEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DfhEpics.ctorParameters = function () { return [
        { type: DfhActions },
        { type: NotificationsAPIActions },
        { type: DfhProfileApi },
        { type: DfhClassControllerService },
        { type: DfhPropertyControllerService },
        { type: DfhLabelApi }
    ]; };
    /** @nocollapse */ DfhEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhEpics_Factory() { return new DfhEpics(ɵɵinject(DfhActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(DfhProfileApi), ɵɵinject(DfhClassControllerService), ɵɵinject(DfhPropertyControllerService), ɵɵinject(DfhLabelApi)); }, token: DfhEpics, providedIn: "root" });
    return DfhEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.profileApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.classApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.propertyApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.labelApi;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/inf-epic-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
var  /**
 * @template Payload, Model
 */
InfEpicsFactory = /** @class */ (function (_super) {
    __extends(InfEpicsFactory, _super);
    function InfEpicsFactory(actionPrefix, modelName, actions, notifications, infoProjRelApi, proActions) {
        var _this = _super.call(this, actionPrefix, modelName, actions, notifications) || this;
        _this.actionPrefix = actionPrefix;
        _this.modelName = modelName;
        _this.actions = actions;
        _this.notifications = notifications;
        _this.infoProjRelApi = infoProjRelApi;
        _this.proActions = proActions;
        return _this;
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    InfEpicsFactory.prototype.createUpsertEpic = /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ (action.meta));
                // add is_in_project true
                meta.items = meta.items.map((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return (__assign({}, i, { entity_version_project_rels: [__assign({}, pathOr({}, ['entity_version_project_rels', 0], i), { is_in_project: true })] })); }));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        _this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     */
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    InfEpicsFactory.prototype.createRemoveEpic = /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::REMOVE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                _this.infoProjRelApi.bulkUpdateEprAttributes(action.meta.pk, action.meta.items.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return ({
                    fk_entity: item.pk_entity,
                    is_in_project: false
                }); })))
                    .subscribe((/**
                 * @param {?} infoProjRels
                 * @return {?}
                 */
                function (infoProjRels) {
                    if (infoProjRels.length) {
                        _this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk);
                    }
                    _this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    InfEpicsFactory.prototype.createCustomUpsertEpic = /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, actionSuffix, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ (action.meta));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        _this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    return InfEpicsFactory;
}(SchemaEpicsFactory));
if (false) {
    /** @type {?} */
    InfEpicsFactory.prototype.actionPrefix;
    /** @type {?} */
    InfEpicsFactory.prototype.modelName;
    /** @type {?} */
    InfEpicsFactory.prototype.actions;
    /** @type {?} */
    InfEpicsFactory.prototype.notifications;
    /** @type {?} */
    InfEpicsFactory.prototype.infoProjRelApi;
    /** @type {?} */
    InfEpicsFactory.prototype.proActions;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/inf.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InfEpics = /** @class */ (function () {
    function InfEpics(notification, peItApi, teEnApi, statementApi, textPropertyApi, infActions, proActions, datActions, infoProjRelApi, schemaObjectService) {
        this.notification = notification;
        this.peItApi = peItApi;
        this.teEnApi = teEnApi;
        this.statementApi = statementApi;
        this.textPropertyApi = textPropertyApi;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.infoProjRelApi = infoProjRelApi;
        this.schemaObjectService = schemaObjectService;
    }
    /**
     * @return {?}
     */
    InfEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var infPersistentItemEpicsFactory = new InfEpicsFactory(infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infTemporalEntityEpicsFactory = new InfEpicsFactory(infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infStatementEpicsFactory = new InfEpicsFactory(infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infTextPropertyEpicsFactory = new InfEpicsFactory(infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);
        return combineEpics(
        /**
         * Perstistent Item
         *
         */
        infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.peItApi.ownProperties(meta.pk, meta.pkEntity); }), InfPersistentItemActionFactory.MINIMAL_BY_PK, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            // call action to store records
            Object.keys(schemas).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                if (actions) {
                    Object.keys(schemas[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(schemas[schema][model], undefined, pk);
                    }));
                }
            }));
        })), infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.peItApi.typesOfProject(meta.pk); }), InfPersistentItemActionFactory.TYPES_OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ (results));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), 
        // infPersistentItemEpicsFactory.createLoadEpic<LoadTypeOfProjectAction>(
        //   (meta) => this.peItApi.typeOfProject(meta.pk, meta.pkEntity),
        //   InfPersistentItemActionFactory.TYPE_OF_PROJECT,
        //   (results, pk) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.persistent_item.flatten(results);
        //     storeFlattened(flattener.getFlattened(), pk);
        //   }
        // ),
        infPersistentItemEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.peItApi
            .findOrCreateInfPersistentItems(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.persistent_item.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), infPersistentItemEpicsFactory.createRemoveEpic(), 
        /**
         * Temporal Entity
         *
         */
        infTemporalEntityEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.teEnApi.ownProperties(meta.pk, meta.pkEntity); }), InfTemporalEntityActionFactory.OWN_PROPERTIES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ (results));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), (
        /**
         * Epic to load paginated Temporal Entity List
         */
        /**
         * Epic to load paginated Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.teEnApi.temporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = meta.pk;
            _this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), (
        /**
         * Epic to load paginated Alternative Temporal Entity List
         */
        /**
         * Epic to load paginated Alternative Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.teEnApi.alternativeTemporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = null;
            _this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), infTemporalEntityEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.teEnApi
            .findOrCreateInfTemporalEntities(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.temporal_entity.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), infTemporalEntityEpicsFactory.createRemoveEpic(), 
        /**
         * Statement
         *
         */
        infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk); }), InfStatementActionFactory.ALTERNATIVES_INGOING, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infStatementEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi
            .findOrCreateInfStatements(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infStatementEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.statementApi.paginatedListTargetingEntityPreviews(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = meta.pk;
            _this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), infStatementEpicsFactory.createRemoveEpic(), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty); }), InfStatementActionFactory.BY_PARAMS, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        })), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity); }), InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var res = (/** @type {?} */ ((/** @type {?} */ (results))));
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(res.statements);
            storeFlattened(flattener.getFlattened(), pk);
            /** @type {?} */
            var flattener2 = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener2.digital.flatten(res.digitals);
            storeFlattened(flattener2.getFlattened(), pk);
        })), 
        /**
         * Text Property
         *
         */
        infTextPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi
            .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField); }), InfTextPropertyActionFactory.ALTERNATIVES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi
            .findOrCreateInfTextProperties(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), infTextPropertyEpicsFactory.createRemoveEpic());
    };
    /**
     * handles the update of store for paginated temporal entity lists.
     * @param pkProject if null, list is handled as 'repo' list
     */
    /**
     * handles the update of store for paginated temporal entity lists.
     * @private
     * @template M
     * @param {?} action
     * @param {?} epicsFactory
     * @param {?} globalActions
     * @param {?} apiCall$
     * @param {?} pkProject if null, list is handled as 'repo' list
     * @return {?}
     */
    InfEpics.prototype.handleTemporalEntityListAction = /**
     * handles the update of store for paginated temporal entity lists.
     * @private
     * @template M
     * @param {?} action
     * @param {?} epicsFactory
     * @param {?} globalActions
     * @param {?} apiCall$
     * @param {?} pkProject if null, list is handled as 'repo' list
     * @return {?}
     */
    function (action, epicsFactory, globalActions, apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var meta = action.meta;
        /** @type {?} */
        var scope = meta.alternatives ? { notInProject: pkProject } : { inProject: pkProject };
        /** @type {?} */
        var req = {
            fkSourceEntity: meta.pkSourceEntity,
            fkProperty: meta.pkProperty,
            isOutgoing: meta.isOutgoing,
            targetClass: meta.fkTargetClass,
            limit: meta.limit,
            offset: meta.offset,
            scope: scope,
        };
        /** @type {?} */
        var pendingKey = meta.addPending;
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(req, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            // call action to store records
            _this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            _this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, req, pkProject);
            // call action to conclude the pending request
            epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            // call action to handle error
            epicsFactory.onError(globalActions, error, pendingKey, pkProject);
        }));
    };
    InfEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InfEpics.ctorParameters = function () { return [
        { type: NotificationsAPIActions },
        { type: InfPersistentItemApi },
        { type: InfTemporalEntityApi },
        { type: InfStatementApi },
        { type: InfTextPropertyApi },
        { type: InfActions },
        { type: ProActions },
        { type: DatActions },
        { type: ProInfoProjRelApi },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ InfEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function InfEpics_Factory() { return new InfEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(InfPersistentItemApi), ɵɵinject(InfTemporalEntityApi), ɵɵinject(InfStatementApi), ɵɵinject(InfTextPropertyApi), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(ProInfoProjRelApi), ɵɵinject(SchemaService)); }, token: InfEpics, providedIn: "root" });
    return InfEpics;
}());
if (false) {
    /** @type {?} */
    InfEpics.prototype.notification;
    /** @type {?} */
    InfEpics.prototype.peItApi;
    /** @type {?} */
    InfEpics.prototype.teEnApi;
    /** @type {?} */
    InfEpics.prototype.statementApi;
    /** @type {?} */
    InfEpics.prototype.textPropertyApi;
    /** @type {?} */
    InfEpics.prototype.infActions;
    /** @type {?} */
    InfEpics.prototype.proActions;
    /** @type {?} */
    InfEpics.prototype.datActions;
    /** @type {?} */
    InfEpics.prototype.infoProjRelApi;
    /**
     * @type {?}
     * @private
     */
    InfEpics.prototype.schemaObjectService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/pro.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProEpics = /** @class */ (function () {
    function ProEpics(notification, infActions, proActions, datActions, projectApi, infoProjRelApi, classProjRelApi, profileProjRelApi, classFieldConfApi, textPropertyApi, analysisApi, schemaObjectService) {
        this.notification = notification;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.projectApi = projectApi;
        this.infoProjRelApi = infoProjRelApi;
        this.classProjRelApi = classProjRelApi;
        this.profileProjRelApi = profileProjRelApi;
        this.classFieldConfApi = classFieldConfApi;
        this.textPropertyApi = textPropertyApi;
        this.analysisApi = analysisApi;
        this.schemaObjectService = schemaObjectService;
    }
    /**
     * @return {?}
     */
    ProEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var proProjectEpicsFactory = new SchemaEpicsFactory(proRoot, 'project', this.proActions.project, this.notification);
        /** @type {?} */
        var proInfoProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);
        /** @type {?} */
        var proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);
        /** @type {?} */
        var proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);
        /** @type {?} */
        var proClassFieldConfigEpicsFactory = new SchemaEpicsFactory(proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);
        /** @type {?} */
        var proTextPropertyEpicsFactory = new SchemaEpicsFactory(proRoot, 'text_property', this.proActions.text_property, this.notification);
        /** @type {?} */
        var proAnalysisEpicsFactory = new SchemaEpicsFactory(proRoot, 'analysis', this.proActions.analysis, this.notification);
        return combineEpics(
        /**
        * ProProject
        */
        proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.projectApi
            .ofAccount(meta.pk); }), ProProjectActionFactory.OF_ACCOUNT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.projectApi
            .getBasics(meta.pk); }), ProProjectActionFactory.LOAD_BASICS, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), 
        /**
         * ProInfoProjRel
         */
        proInfoProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.infoProjRelApi
            .bulkUpdateEprAttributes(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), proInfoProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.infoProjRelApi
            .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing); }), ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
         * ProClassFieldConfig
         */
        proClassFieldConfigEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classFieldConfApi.ofProject(meta.pk); }), ProClassFieldConfigActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proClassFieldConfigEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classFieldConfApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
         * ProProDfhClassProjRel
         */
        proDfhClassProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classProjRelApi.ofProject(meta.pk); }), ProDfhClassProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhClassProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classProjRelApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
        * ProDfhProfileProjRel
        */
        proDfhProfileProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileProjRelApi.ofProject(meta.pk); }), ProDfhProfileProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhProfileProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileProjRelApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
        * ProTextProperty
        */
        proTextPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi.ofProject(meta.pk); }), ProTextPropertyActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi.bulkDelete(meta.pk, meta.items); })), 
        /**
        * ProAnalysis
        */
        // proAnalysisEpicsFactory.createLoadEpic<LoadByPkANsVersionActionMeta>(
        //   (meta) => this.analysisApi.analysisControllerGetVersion(meta.pk, meta.pkEntity, meta.version).pipe(map(x => [x])),
        //   ProAnalysisActionFactory.BY_PK_AND_VERSION,
        //   (results) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.analysis.flatten(results);
        //     storeFlattened(flattener.getFlattened());
        //   }
        // ),
        // proAnalysisEpicsFactory.createUpsertEpic<ModifyActionMeta<ProAnalysis>>(
        //   (meta) => this.analysisApi.analysisControllerBulkUpsert(meta.pk, meta.items),
        //   (results, pk) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.analysis.flatten(results);
        //     storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        //   }
        // ),
        proAnalysisEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.pk_entity; }))); })));
    };
    ProEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProEpics.ctorParameters = function () { return [
        { type: NotificationsAPIActions },
        { type: InfActions },
        { type: ProActions },
        { type: DatActions },
        { type: ProProjectApi },
        { type: ProInfoProjRelApi },
        { type: ProDfhClassProjRelApi },
        { type: ProDfhProfileProjRelApi },
        { type: ProClassFieldConfigApi },
        { type: ProTextPropertyApi },
        { type: AnalysisService },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ ProEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProEpics_Factory() { return new ProEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(ProProjectApi), ɵɵinject(ProInfoProjRelApi), ɵɵinject(ProDfhClassProjRelApi), ɵɵinject(ProDfhProfileProjRelApi), ɵɵinject(ProClassFieldConfigApi), ɵɵinject(ProTextPropertyApi), ɵɵinject(AnalysisService), ɵɵinject(SchemaService)); }, token: ProEpics, providedIn: "root" });
    return ProEpics;
}());
if (false) {
    /** @type {?} */
    ProEpics.prototype.notification;
    /** @type {?} */
    ProEpics.prototype.infActions;
    /** @type {?} */
    ProEpics.prototype.proActions;
    /** @type {?} */
    ProEpics.prototype.datActions;
    /** @type {?} */
    ProEpics.prototype.projectApi;
    /** @type {?} */
    ProEpics.prototype.infoProjRelApi;
    /** @type {?} */
    ProEpics.prototype.classProjRelApi;
    /** @type {?} */
    ProEpics.prototype.profileProjRelApi;
    /** @type {?} */
    ProEpics.prototype.classFieldConfApi;
    /** @type {?} */
    ProEpics.prototype.textPropertyApi;
    /** @type {?} */
    ProEpics.prototype.analysisApi;
    /**
     * @type {?}
     * @private
     */
    ProEpics.prototype.schemaObjectService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/schema.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function GvPaginationObjectActionMeta() { }
if (false) {
    /** @type {?} */
    GvPaginationObjectActionMeta.prototype.req;
}
/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
var GvSchemaActions = /** @class */ (function () {
    function GvSchemaActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * Action for loading GvSchemaObject into the store
     * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     */
    /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    GvSchemaActions.prototype.loadGvSchemaObject = /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    function (apiCall$) {
        /** @type {?} */
        var addPending = U.uuid();
        /** @type {?} */
        var action = {
            type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
            meta: { addPending: addPending },
            payload: apiCall$,
        };
        this.ngRedux.dispatch(action);
    };
    /**
   * Action for loading GvPaginationObject into the store
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
    /**
     * Action for loading GvPaginationObject into the store
     * @param {?} req
     * @return {?}
     */
    GvSchemaActions.prototype.loadGvPaginationObject = /**
     * Action for loading GvPaginationObject into the store
     * @param {?} req
     * @return {?}
     */
    function (req) {
        /** @type {?} */
        var addPending = U.uuid();
        /** @type {?} */
        var action = {
            type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
            meta: { addPending: addPending, req: req },
        };
        this.ngRedux.dispatch(action);
    };
    GvSchemaActions.GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
    GvSchemaActions.GV_PAGINATION_OBJECT_LOAD = 'GV_PAGINATION_OBJECT::LOAD';
    GvSchemaActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GvSchemaActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ GvSchemaActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function GvSchemaActions_Factory() { return new GvSchemaActions(ɵɵinject(NgRedux)); }, token: GvSchemaActions, providedIn: "root" });
    return GvSchemaActions;
}());
if (false) {
    /** @type {?} */
    GvSchemaActions.GV_SCHEMA_OBJECT_LOAD;
    /** @type {?} */
    GvSchemaActions.GV_PAGINATION_OBJECT_LOAD;
    /**
     * @type {?}
     * @private
     */
    GvSchemaActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SchemaEpics = /** @class */ (function () {
    function SchemaEpics(schemaObjectService, loadingBarActions, notificationActions, infActions, pag) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
        this.pag = pag;
    }
    /**
     * @return {?}
     */
    SchemaEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return combineEpics((
        /**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         */
        /**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        function (actionEmitter) {
            actionEmitter.next(_this.loadingBarActions.startLoading());
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.schemaObjectService.storeSchemaObjectGv(data, 0);
                actionEmitter.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                actionEmitter.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); }), (
        /**
        * Epic for loading GvPaginationObjects
        * - it subscribes to the given observable (payload), which usually triggers a REST API call
        * - on success it stores the GvPaginationObject
        * - else it toasts an error message
        */
        /**
         * Epic for loading GvPaginationObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvPaginationObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        function (actionEmitter) {
            actionEmitter.next(_this.loadingBarActions.startLoading());
            /** @type {?} */
            var pkProject = store.value.activeProject.pk_project;
            /** @type {?} */
            var meta = action.meta;
            // call action to set pagination loading on true
            _this.infActions.statement.loadPage(meta.req.page, pkProject);
            _this.pag.paginatedStatementsControllerLoadSubfieldPage(action.meta.req)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                var e_1, _a;
                // call action to store records
                _this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                try {
                    // call action to store page informations
                    for (var _b = __values(data.subfieldPages), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var subfieldPage = _c.value;
                        _this.infActions.statement.loadPageSucceeded(subfieldPage.paginatedStatements, subfieldPage.count, subfieldPage.page, pkProject);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // call action to complete loading bar
                actionEmitter.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                actionEmitter.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); }));
    };
    SchemaEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SchemaEpics.ctorParameters = function () { return [
        { type: SchemaService },
        { type: LoadingBarActions },
        { type: NotificationsAPIActions },
        { type: InfActions },
        { type: PaginatedStatementsControllerService }
    ]; };
    /** @nocollapse */ SchemaEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(ɵɵinject(SchemaService), ɵɵinject(LoadingBarActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(InfActions), ɵɵinject(PaginatedStatementsControllerService)); }, token: SchemaEpics, providedIn: "root" });
    return SchemaEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.schemaObjectService;
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.notificationActions;
    /** @type {?} */
    SchemaEpics.prototype.infActions;
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.pag;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/sys.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SysEpics = /** @class */ (function () {
    function SysEpics(actions, notification, sysRelevantClassApi, sysConfigApi) {
        this.actions = actions;
        this.notification = notification;
        this.sysRelevantClassApi = sysRelevantClassApi;
        this.sysConfigApi = sysConfigApi;
    }
    /**
     * @return {?}
     */
    SysEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var systemRelevantClassEpicsFactory = new SchemaEpicsFactory(sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);
        // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
        //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);
        /** @type {?} */
        var configEpicsFactory = new SchemaEpicsFactory(sysRoot, 'config', this.actions.config, this.notification);
        return combineEpics(
        // SystemRelevantClass Epics
        systemRelevantClassEpicsFactory.createLoadEpic((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this.sysRelevantClassApi.find(); }), ''), systemRelevantClassEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items); })), 
        // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),
        configEpicsFactory.createLoadEpic((/**
         * @return {?}
         */
        function () { return _this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return [x]; }))); }), ''));
    };
    SysEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SysEpics.ctorParameters = function () { return [
        { type: SysActions },
        { type: NotificationsAPIActions },
        { type: SysSystemRelevantClassApi },
        { type: SystemConfigurationService }
    ]; };
    /** @nocollapse */ SysEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysEpics_Factory() { return new SysEpics(ɵɵinject(SysActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(SysSystemRelevantClassApi), ɵɵinject(SystemConfigurationService)); }, token: SysEpics, providedIn: "root" });
    return SysEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.sysRelevantClassApi;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.sysConfigApi;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RootEpics = /** @class */ (function () {
    function RootEpics(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, sysEpics, dfhEpics, infEpics, datEpics, proEpics, schemaObjectEpics, actionResolver) {
        var _this = this;
        this.loadingBarEpics = loadingBarEpics;
        this.notificationEpics = notificationEpics;
        this.activeProjectEpics = activeProjectEpics;
        this.accountEpics = accountEpics;
        this.sysEpics = sysEpics;
        this.dfhEpics = dfhEpics;
        this.infEpics = infEpics;
        this.datEpics = datEpics;
        this.proEpics = proEpics;
        this.schemaObjectEpics = schemaObjectEpics;
        this.actionResolver = actionResolver;
        this.rootEpicStream$ = new BehaviorSubject(combineEpics(this.loadingBarEpics.createEpics(), this.notificationEpics.createEpics(), this.activeProjectEpics.createEpics(), this.accountEpics.createEpics(), this.sysEpics.createEpics(), this.dfhEpics.createEpics(), this.infEpics.createEpics(), this.datEpics.createEpics(), this.proEpics.createEpics(), this.schemaObjectEpics.createEpics(), 
        // important: this needs to be the last epic in
        this.actionResolver.createEpics()));
        this.rootEpic = (/**
         * @param {?} action$
         * @param {?} state$
         * @param {?=} dependencies
         * @return {?}
         */
        function (action$, state$, dependencies) {
            if (dependencies === void 0) { dependencies = undefined; }
            return _this.rootEpicStream$.pipe(mergeMap((/**
             * @param {?} epic
             * @return {?}
             */
            function (epic) { return epic(action$, state$, dependencies); })));
        });
    }
    /**
     * @return {?}
     */
    RootEpics.prototype.getRootEpic = /**
     * @return {?}
     */
    function () {
        return this.rootEpic;
    };
    /**
     * Adds an epic to the RootEpic middleware
     * @param epic that will be added to the RootEpics
     */
    /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    RootEpics.prototype.addEpic = /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    function (epic) {
        this.rootEpicStream$.next(epic);
    };
    RootEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RootEpics.ctorParameters = function () { return [
        { type: LoadingBarEpics },
        { type: NotificationsAPIEpics },
        { type: ActiveProjectEpics },
        { type: AccountEpics },
        { type: SysEpics },
        { type: DfhEpics },
        { type: InfEpics },
        { type: DatEpics },
        { type: ProEpics },
        { type: SchemaEpics },
        { type: ActionResolverEpics }
    ]; };
    /** @nocollapse */ RootEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(ɵɵinject(LoadingBarEpics), ɵɵinject(NotificationsAPIEpics), ɵɵinject(ActiveProjectEpics), ɵɵinject(AccountEpics), ɵɵinject(SysEpics), ɵɵinject(DfhEpics), ɵɵinject(InfEpics), ɵɵinject(DatEpics), ɵɵinject(ProEpics), ɵɵinject(SchemaEpics), ɵɵinject(ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
    return RootEpics;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.rootEpicStream$;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.rootEpic;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.loadingBarEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.notificationEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.activeProjectEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.accountEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.sysEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.dfhEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.infEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.datEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.proEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.schemaObjectEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.actionResolver;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
/** @type {?} */
var accountRootReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = INITIAL_STATE; }
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = __assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = __assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = __assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = __assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
});

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/loading-bar.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE$1 = {
    loading: false,
    progress: 0,
};
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function loadingBarReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE$1; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        case LoadingBarActions.START:
            return __assign({}, state, { loading: true });
        case LoadingBarActions.STOP:
            return __assign({}, state, { loading: false });
        case LoadingBarActions.COPMLETE:
            return __assign({}, state, { loading: false });
    }
    return state;
}
;

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/active-project.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE$2 = {
    label: '',
    list: '',
    uiIdSerial: 0,
    panelSerial: 0,
    focusedPanel: 0,
    panels: []
};
/** @type {?} */
var activeProjectReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (state === void 0) { state = INITIAL_STATE$2; }
    /** @type {?} */
    var pi;
    /** @type {?} */
    var ti;
    /** @type {?} */
    var ppi;
    /** @type {?} */
    var cpi;
    /** @type {?} */
    var pti;
    /** @type {?} */
    var cti;
    switch (action.type) {
        /************************************************************************************
         * Load project data (metadata, crm)
        ************************************************************************************/
        case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
            state = __assign({}, state, action.meta.projectPreview);
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG:
            state = __assign({}, state, { loadingConfigData: true });
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
            state = __assign({}, state, { configDataInitialized: true, loadingConfigData: false });
            break;
        /************************************************************************************
         * Layout -- Tabs
        ************************************************************************************/
        case ActiveProjectActions.SET_PANELS:
            state = __assign({}, state, { panels: action.meta.panels, uiIdSerial: action.meta.uiIdSerial, panelSerial: action.meta.panelSerial, focusedPanel: action.meta.focusedPanel });
            break;
        case ActiveProjectActions.SET_LIST_TYPE:
            state = __assign({}, state, { list: action.meta.list });
            break;
        case ActiveProjectActions.ACTIVATE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_a = {},
                    _a[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) {
                            tab.active = (index === ti);
                            return tab;
                        })) }),
                    _a)) });
            break;
        case ActiveProjectActions.MOVE_TAB:
            ppi = action.meta.previousPanelIndex;
            cpi = action.meta.currentPanelIndex;
            pti = action.meta.previousTabIndex;
            cti = action.meta.currentTabIndex;
            if (ppi === cpi) {
                /** @type {?} */
                var tabs = __spread(state.panels[cpi].tabs);
                moveItemInArray(tabs, pti, cti);
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_b = {},
                        _b[cpi] = __assign({}, state.panels[cpi], { tabs: tabs }),
                        _b)) });
            }
            else {
                /** @type {?} */
                var pTabs_1 = __spread(state.panels[ppi].tabs);
                /** @type {?} */
                var cTabs = __spread(state.panels[cpi].tabs);
                transferArrayItem(pTabs_1, cTabs, pti, cti);
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_c = {},
                        _c[ppi] = __assign({}, state.panels[ppi], { tabs: pTabs_1.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === (pti < pTabs_1.length ? pti : (pti - 1)));
                                return tab;
                            })) }),
                        _c[cpi] = __assign({}, state.panels[cpi], { tabs: cTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === cti);
                                return tab;
                            })) }),
                        _c)) });
            }
            break;
        case ActiveProjectActions.ADD_TAB:
            if (state.panels.length === 0) {
                state = __assign({}, state, { panels: [
                        {
                            id: state.panelSerial,
                            tabs: []
                        }
                    ], focusedPanel: 0, panelSerial: state.panelSerial + 1 });
            }
            pi = state.focusedPanel;
            state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_d = {},
                    _d[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) {
                            t.active = false;
                            return t;
                        })), [
                            __assign({}, omit(['pathSegment'], action.meta.tab), { path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()] })
                        ]) }),
                    _d)), uiIdSerial: (state.uiIdSerial + 1) });
            break;
        case ActiveProjectActions.CLOSE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            // remove the closing tab
            state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_e = {},
                    _e[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) { return index !== ti; })) }),
                    _e)) });
            // activate a sibling tab, if needed and possible
            if (!state.panels[pi].tabs.find((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.active; }))) {
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_f = {},
                        _f[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                                return tab;
                            })) }),
                        _f)) });
            }
            break;
        case ActiveProjectActions.CLOSE_PANEL:
            pi = action.meta.panelIndex;
            /** @type {?} */
            var panels = __spread(state.panels);
            panels.splice(pi, 1);
            state = __assign({}, state, { panels: panels });
            break;
        case ActiveProjectActions.FOCUS_PANEL:
            state = __assign({}, state, { focusedPanel: action.meta.panelIndex });
            break;
        case ActiveProjectActions.SPLIT_PANEL:
            ppi = action.meta.previousPanelIndex;
            ti = action.meta.tabIndex;
            cpi = action.meta.currentPanelIndex;
            /** @type {?} */
            var moveTab = state.panels[ppi].tabs[ti];
            // removes tab from old panel
            state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_g = {},
                    _g[ppi] = __assign({}, state.panels[ppi], { tabs: __spread(state.panels[ppi].tabs).filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) { return index !== ti; }))
                            .map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) {
                            if (index === 0)
                                tab.active = true;
                            return tab;
                        })) }),
                    _g)) });
            // insert a new panel at position of cpi
            /** @type {?} */
            var newPanels = __spread(state.panels);
            newPanels.splice(cpi, 0, {
                id: state.panelSerial,
                tabs: [moveTab]
            });
            state = __assign({}, state, { panels: newPanels, panelSerial: state.panelSerial + 1 });
            break;
        case ActiveProjectActions.SET_REFINING_CHUNK:
            state = __assign({}, state, { refiningChunk: action.payload.refiningChunk });
            break;
        case ActiveProjectActions.SET_CREATING_MENTIONING:
            state = __assign({}, state, { creatingMentioning: action.payload.creatingMentioning });
            break;
        /************************************************************************************
        * Highlighting of mentionings in the gui
        ************************************************************************************/
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
            state = __assign({}, state, { mentioningsFocusedInText: action.payload.mentioningsFocusedInText });
            break;
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
            state = __assign({}, state, { mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable });
            break;
        /************************************************************************************
         * Destroy the active project state (on closing a project)
        ************************************************************************************/
        case ActiveProjectActions.DESTROY:
            state = INITIAL_STATE$2;
            break;
    }
    return state;
});

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/entity-list.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Information = /** @class */ (function () {
    function Information(data) {
        Object.assign(this, data);
    }
    return Information;
}());
if (false) {
    /** @type {?} */
    Information.prototype.items;
    /** @type {?} */
    Information.prototype.loading;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/entity-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InformationAPIActions = /** @class */ (function () {
    function InformationAPIActions() {
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        function () { return ({
            type: InformationAPIActions.DESTROY,
            meta: null,
            payload: null
        }); });
    }
    InformationAPIActions.DESTROY = 'Information::DESTROY';
    InformationAPIActions.decorators = [
        { type: Injectable }
    ];
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], InformationAPIActions.prototype, "destroy", void 0);
    return InformationAPIActions;
}());
if (false) {
    /** @type {?} */
    InformationAPIActions.DESTROY;
    /**
     * ******************************************************************
     *  Method to distroy the slice of store
     * *******************************************************************
     * @type {?}
     */
    InformationAPIActions.prototype.destroy;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE$3 = new Information();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function informationReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE$3; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case InformationAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/source-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MetaData$3() { }
if (false) {
    /** @type {?|undefined} */
    MetaData$3.prototype.pkAllowedClasses;
}
;
var SourceListAPIActions = /** @class */ (function () {
    function SourceListAPIActions() {
        /**
         * ******************************************************************
         *  Actions to manage the list
         * *******************************************************************
         */
        this.initializeList = (/**
         * @param {?} pkAllowedClasses
         * @return {?}
         */
        function (pkAllowedClasses) { return ({
            type: SourceListAPIActions.INITIALIZE_LIST,
            meta: { pkAllowedClasses: pkAllowedClasses },
            payload: null
        }); });
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        function () { return ({
            type: SourceListAPIActions.DESTROY,
            meta: null,
            payload: null
        }); });
    }
    SourceListAPIActions.INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';
    SourceListAPIActions.DESTROY = 'SourceList::DESTROY';
    SourceListAPIActions.decorators = [
        { type: Injectable }
    ];
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], SourceListAPIActions.prototype, "initializeList", void 0);
    __decorate([
        dispatch(),
        __metadata("design:type", Object)
    ], SourceListAPIActions.prototype, "destroy", void 0);
    return SourceListAPIActions;
}());
if (false) {
    /** @type {?} */
    SourceListAPIActions.INITIALIZE_LIST;
    /** @type {?} */
    SourceListAPIActions.DESTROY;
    /**
     * ******************************************************************
     *  Actions to manage the list
     * *******************************************************************
     * @type {?}
     */
    SourceListAPIActions.prototype.initializeList;
    /**
     * ******************************************************************
     *  Method to distroy the slice of store
     * *******************************************************************
     * @type {?}
     */
    SourceListAPIActions.prototype.destroy;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/source-list.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
var  
// Class of this slice of store
SourceList = /** @class */ (function () {
    function SourceList(data) {
        Object.assign(this, data);
    }
    return SourceList;
}());
if (false) {
    /** @type {?} */
    SourceList.prototype.list;
    /** @type {?} */
    SourceList.prototype.loading;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE$4 = new SourceList();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function sourceListReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE$4; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = __assign({}, state, { list: {
                    pkAllowedClasses: action.meta.pkAllowedClasses
                } });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case SourceListAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/projects.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProjectsActions = /** @class */ (function () {
    function ProjectsActions() {
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    ProjectsActions.prototype.loadProjectsSucceeded = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload: payload,
            meta: null
        };
    };
    ProjectsActions.LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';
    ProjectsActions.decorators = [
        { type: Injectable }
    ];
    return ProjectsActions;
}());
if (false) {
    /** @type {?} */
    ProjectsActions.LOAD_PROJECTS_SUCCEEDED;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INITIAL_STATE$5 = {
    records: []
};
/** @type {?} */
var projectListReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = INITIAL_STATE$5; }
    switch (action.type) {
        case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return __assign({}, lastState, { records: action.payload.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return ({ record: record }); })) });
    }
    return lastState;
});
var ɵ0$7 = projectListReducer;
/** @type {?} */
var createProjectsReducer = (/**
 * @return {?}
 */
function () {
    return projectListReducer;
});

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/subfieldIdToString.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} x
 * @return {?}
 */
function subfieldIdToString(x) {
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + x.targetClass + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PR_ENTITY_MODEL_MAP = 'pkEntityModelMap';
/**
 * @record
 * @template ModelName
 */
function EntityModelAndClass() { }
if (false) {
    /** @type {?} */
    EntityModelAndClass.prototype.modelName;
    /** @type {?} */
    EntityModelAndClass.prototype.fkClass;
}
/**
 * @record
 */
function ReducerConfigCollection() { }
/**
 * @record
 */
function ReducerConfig() { }
if (false) {
    /** @type {?|undefined} */
    ReducerConfig.prototype.facetteByPk;
    /** @type {?|undefined} */
    ReducerConfig.prototype.indexBy;
    /** @type {?|undefined} */
    ReducerConfig.prototype.groupBy;
    /** @type {?|undefined} */
    ReducerConfig.prototype.equals;
}
/**
 * @record
 * @template Model
 */
function Meta() { }
if (false) {
    /** @type {?} */
    Meta.prototype.items;
    /** @type {?|undefined} */
    Meta.prototype.pk;
}
/** @type {?} */
var by = (/**
 * @param {?} name
 * @return {?}
 */
function (name) { return 'by_' + name; });
// export const paginateName = (pagBy: PaginateByParam[]) => pagBy.map(p => Object.keys(p)[0]).join('__');
// export const pag = (name: string) => 'pag_' + name;
// export const paginatedBy = (name: string) => pag(by(name));
// export const paginateKey = (pagBy: PaginateByParam[]) => pagBy.map(p => values(p)[0]).join('_');
/** @type {?} */
var paginateBy = 'by_subfield_page';
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
function getFromTo(limit, offset) {
    return getStart(limit, offset) + '_' + getEnd(limit, offset);
}
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
function getEnd(limit, offset) {
    return getStart(limit, offset) + limit;
}
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
function getStart(limit, offset) {
    return offset;
}
/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 * @template Payload, Model
 */
var  /**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 * @template Payload, Model
 */
ReducerFactory = /** @class */ (function () {
    function ReducerFactory(actionPrefix, configs) {
        this.actionPrefix = actionPrefix;
        this.configs = configs;
        this.updatingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'updating_' + by(name); });
        this.deletingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'deleting_' + by(name); });
        this.removingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'removing_' + by(name); });
    }
    /**
     * @return {?}
     */
    ReducerFactory.prototype.createReducers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var reducers = {};
        U.obj2KeyValueArr(this.configs).forEach((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            reducers[x.key] = _this.createModelReducers(x.key, x.value);
        }));
        /** @type {?} */
        var entityModelMapReducers = keys(this.configs).map((/**
         * @param {?} modelName
         * @return {?}
         */
        function (modelName) { return _this.createEntityModelMapReducers(modelName); }));
        reducers[PR_ENTITY_MODEL_MAP] = composeReducers.apply(void 0, __spread(entityModelMapReducers));
        return combineReducers(reducers);
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    ReducerFactory.prototype.createModelReducers = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    function (modelName, config) {
        var _this = this;
        /** @type {?} */
        var actionPrefix = this.actionPrefix;
        /** @type {?} */
        var reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        function (state, action) {
            if (state === void 0) { state = {}; }
            /** @type {?} */
            var facette = _this.facette(modelName, config);
            if (action.type === actionPrefix + '.' + modelName + '::LOAD') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (__assign({}, omit([by(config.indexBy.keyInStore)], innerState), { loading: true })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
                // If action state differs from
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (__assign({}, _this.mergeItemsInState(config, innerState, action), { loading: false })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (__assign({}, innerState, (_a = {}, _a[_this.updatingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (__assign({}, _this.mergeItemsInState(config, innerState, action
                    // , true
                    ), (_a = {}, _a[_this.updatingBy(config.indexBy.keyInStore)] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.updatingBy(config.indexBy.keyInStore)]), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (__assign({}, innerState, (_a = {}, _a[_this.deletingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {
                /** @type {?} */
                var deletingKey_1 = _this.deletingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    innerState = __assign({}, _this.deleteItemsFromState(config, action, innerState), (_a = {}, _a[deletingKey_1] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.deletingBy(config.indexBy.keyInStore)]), _a));
                    if (!Object.keys(innerState[deletingKey_1]).length)
                        innerState = omit([deletingKey_1], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (__assign({}, innerState, (_a = {}, _a[_this.removingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {
                /** @type {?} */
                var removingKey_1 = _this.removingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    innerState = __assign({}, _this.deleteItemsFromState(config, action, innerState), (_a = {}, _a[removingKey_1] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.removingBy(config.indexBy.keyInStore)]), _a));
                    if (!Object.keys(innerState[removingKey_1]).length)
                        innerState = omit([removingKey_1], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::FAILED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (__assign({}, innerState, omit([by(config.indexBy.keyInStore)], innerState), { loading: false })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_1 = subfieldIdToString(meta.page);
                /** @type {?} */
                var fromTo_1 = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (__assign({}, innerState, (_a = {}, _a[paginateBy] = __assign({}, innerState[paginateBy], (_b = {}, _b[key_1] = __assign({}, (innerState[paginateBy] || {})[key_1], { loading: __assign({}, ((innerState[paginateBy] || {})[key_1] || {}).loading, (_c = {}, _c[fromTo_1] = true, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_2 = subfieldIdToString(meta.page);
                /** @type {?} */
                var fromTo_2 = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (__assign({}, innerState, (_a = {}, _a[paginateBy] = __assign({}, innerState[paginateBy], (_b = {}, _b[key_2] = __assign({}, (innerState[paginateBy] || {})[key_2], { loading: __assign({}, ((innerState[paginateBy] || {})[key_2] || {}).loading, (_c = {}, _c[fromTo_2] = false, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
                /** @type {?} */
                var meta_1 = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_3 = subfieldIdToString(meta_1.page);
                /** @type {?} */
                var fromTo_3 = getFromTo(meta_1.page.limit, meta_1.page.offset);
                /** @type {?} */
                var start_1 = getStart(meta_1.page.limit, meta_1.page.offset);
                /** @type {?} */
                var rows_1 = {};
                if (meta_1.pks) {
                    meta_1.pks.forEach((/**
                     * @param {?} pk
                     * @param {?} i
                     * @return {?}
                     */
                    function (pk, i) {
                        rows_1[start_1 + i] = pk;
                    }));
                }
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (__assign({}, innerState, (_a = {}, _a[paginateBy] = __assign({}, innerState[paginateBy], (_b = {}, _b[key_3] = __assign({}, (innerState[paginateBy] || {})[key_3], { count: meta_1.count || 0, rows: __assign({}, ((innerState[paginateBy] || {})[key_3] || {}).rows, rows_1), loading: __assign({}, ((innerState[paginateBy] || {})[key_3] || {}).loading, (_c = {}, _c[fromTo_3] = false, _c)) }), _b)), _a)));
                }));
            }
            return state;
        });
        return reducer;
    };
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     */
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    ReducerFactory.prototype.createEntityModelMapReducers = /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    function (modelName) {
        /** @type {?} */
        var actionPrefix = this.actionPrefix;
        /** @type {?} */
        var reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        function (state, action) {
            if (state === void 0) { state = {}; }
            /** @type {?} */
            var modelPath = actionPrefix + '.' + modelName;
            if (!action || !action.meta || !action.meta.items || !action.meta.items.length)
                return state;
            /** @type {?} */
            var items = action.meta.items;
            switch (action.type) {
                case modelPath + '::LOAD_SUCCEEDED':
                case modelPath + '::UPSERT_SUCCEEDED':
                    /** @type {?} */
                    var idx = {};
                    for (var i = 0; i < items.length; i++) {
                        /** @type {?} */
                        var item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            idx[item.pk_entity] = {
                                modelName: modelName,
                                fkClass: item.fkClass
                            };
                        }
                    }
                    state = __assign({}, state, idx);
                    break;
                case modelPath + '::DELETE_SUCCEEDED':
                case modelPath + '::REMOVE_SUCCEEDED':
                    /** @type {?} */
                    var pkEntities = [];
                    for (var i = 0; i < items.length; i++) {
                        /** @type {?} */
                        var item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            pkEntities.push(item.pk_entity);
                        }
                    }
                    state = omit(pkEntities, state);
                    break;
                default:
                    break;
            }
            return state;
        });
        return reducer;
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    ReducerFactory.prototype.facette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    function (modelName, config) {
        var _this = this;
        return (/**
         * @param {?} action
         * @param {?} state
         * @param {?} cb
         * @return {?}
         */
        function (action, state, cb) {
            var _a;
            /** @type {?} */
            var outerState;
            (_a = _this.deFacette(modelName, config, action, outerState, state), outerState = _a.outerState, state = _a.state);
            /** @type {?} */
            var innerState = cb(state);
            return _this.enFacette(modelName, config, action, innerState, outerState);
        });
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    ReducerFactory.prototype.deFacette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    function (modelName, config, action, outerState, state) {
        if (this.isFacetteByPk(config, action)) {
            // outerState = clone(state);
            /** @type {?} */
            var pk = action.meta.pk || 'repo'
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            ;
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            /** @type {?} */
            var innerState = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            return {
                outerState: state,
                state: innerState
            };
        }
        return { outerState: outerState, state: state };
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    ReducerFactory.prototype.enFacette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    function (modelName, config, action, state, outerState) {
        var _a, _b;
        if (this.isFacetteByPk(config, action)) {
            /** @type {?} */
            var pk = action.meta.pk || 'repo';
            state = __assign({}, outerState, (_a = {}, _a[config.facetteByPk] = __assign({}, outerState[config.facetteByPk], (_b = {}, _b[pk] = state, _b)), _a));
        }
        return state;
    };
    /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    ReducerFactory.prototype.isFacetteByPk = /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    function (config, action) {
        if (config.facetteByPk) {
            if (!action.meta || action.meta.pk === undefined)
                throw Error('Facette action must provide pk for facette');
            else
                return true;
        }
        else
            return false;
    };
    /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    ReducerFactory.prototype.deleteItemsFromState = /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    function (config, action, state) {
        var _this = this;
        /** @type {?} */
        var items = action.meta.items;
        // let state = {}
        /** @type {?} */
        var groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        var groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        }); }));
        /** @type {?} */
        var mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} removedItem
         * @return {?}
         */
        function (removedItem) {
            var _a;
            // get path segments of new item
            /** @type {?} */
            var itemKey = config.indexBy.indexByFn(removedItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            var oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            // Q: Does the item exists?
            if (oldItem) {
                // A: Yes. use old item does exist
                // remove the removedItem at path in main index
                state = __assign({}, state, (_a = {}, _a[mainIndexKey] = __assign({}, omit([itemKey], state[mainIndexKey])), _a));
                // delete the removedItem at path in the group index
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                function (g) {
                    var _a, _b;
                    /** @type {?} */
                    var groupKey = _this.getGroupKeyOfItem(g.groupByFn, removedItem);
                    state = __assign({}, state, (_a = {}, _a[g.groupByKey] = __assign({}, state[g.groupByKey], (_b = {}, _b[groupKey] = __assign({}, omit([itemKey], (state[g.groupByKey] || {})[groupKey])), _b)), _a));
                    // // cleanup paginations
                    // state = this.resetPaginationsByGroup(g.groupByKey, state, groupKey);
                }));
            }
        }));
        // cleanup main index
        if (Object.keys(state[mainIndexKey]).length < 1) {
            state = __assign({}, omit([mainIndexKey], state));
        }
        // cleanup group indices
        groups.forEach((/**
         * @param {?} g
         * @return {?}
         */
        function (g) {
            // cleanup groups in group index
            Object.keys(state[g.groupByKey]).forEach((/**
             * @param {?} groupKey
             * @return {?}
             */
            function (groupKey) {
                var _a;
                if (Object.keys(state[g.groupByKey][groupKey]).length < 1) {
                    state = __assign({}, state, (_a = {}, _a[g.groupByKey] = omit([groupKey], state[g.groupByKey]), _a));
                }
            }));
            // cleanup group index
            if (Object.keys(state[g.groupByKey]).length < 1) {
                state = __assign({}, omit([g.groupByKey], state));
            }
        }));
        return state;
    };
    /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    ReducerFactory.prototype.mergeItemsInState = /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (config, state, action
    // , resetPaginations = false
    ) {
        var _this = this;
        /** @type {?} */
        var items = action.meta.items;
        /** @type {?} */
        var groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        var groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        }); }));
        /** @type {?} */
        var mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} newItem
         * @return {?}
         */
        function (newItem) {
            var _a, _b;
            // get path segments of new item
            /** @type {?} */
            var itemKey = config.indexBy.indexByFn(newItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            var oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            /** @type {?} */
            var itemToSet;
            // Q: Does the item exists, and is it deeply-equal to the new item?
            /** @type {?} */
            var equalsFn = config.equals || equals;
            if (oldItem && equalsFn(newItem, oldItem)) {
                // A: Yes. use old item as itemToSet
                itemToSet = oldItem;
            }
            else {
                // A: No. use new item as itemToSet
                itemToSet = newItem;
                // put the itemToSet at path in main index
                state = __assign({}, state, (_a = {}, _a[mainIndexKey] = __assign({}, state[mainIndexKey], (_b = {}, _b[itemKey] = itemToSet, _b)), _a));
                // iterate over the group indexes
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                function (g) {
                    var _a, _b, _c, _d, _e;
                    // remove the oldItem from all group indexes
                    /** @type {?} */
                    var oldGroupKey = _this.getGroupKeyOfItem(g.groupByFn, oldItem);
                    state = __assign({}, state, (_a = {}, _a[g.groupByKey] = __assign({}, state[g.groupByKey], (_b = {}, _b[oldGroupKey] = __assign({}, omit([itemKey], (state[g.groupByKey] || {})[oldGroupKey])), _b)), _a));
                    // add the itemToSet to all group indexes, if not undefined
                    /** @type {?} */
                    var newGroupKey = _this.getGroupKeyOfItem(g.groupByFn, itemToSet);
                    if (newGroupKey !== undefined) {
                        state = __assign({}, state, (_c = {}, _c[g.groupByKey] = __assign({}, state[g.groupByKey], (_d = {}, _d[newGroupKey] = __assign({}, (state[g.groupByKey] || {})[newGroupKey], (_e = {}, _e[itemKey] = itemToSet, _e)), _d)), _c));
                    }
                }));
            }
        }));
        return state;
    };
    // /**
    //  * resets pagination within a group, e.g. 'pag_by_fk_property'
    //  * TODO: check if can be deleted
    //  */
    // private resetPaginationsByGroup(groupByKey: string, state: any, groupKey: any, isUpsert = false) {
    //   const paginateBy = pag(groupByKey);
    //   if (state[paginateBy] && state[paginateBy][groupKey] && state[paginateBy][groupKey].count !== undefined) {
    //     state = {
    //       ...state,
    //       [paginateBy]: {
    //         ...state[paginateBy],
    //         [groupKey]: {
    //           ...state[paginateBy][groupKey],
    //           ...(!isUpsert ? {} : { count: state[paginateBy][groupKey].count + 1 }),
    //           rows: {},
    //           loading: {}
    //         }
    //       }
    //     };
    //   }
    //   return state;
    // }
    /**
     * Creates object where the key returned by the configured indexByFn
     */
    // /**
    //  * resets pagination within a group, e.g. 'pag_by_fk_property'
    //  * TODO: check if can be deleted
    //  */
    // private resetPaginationsByGroup(groupByKey: string, state: any, groupKey: any, isUpsert = false) {
    //   const paginateBy = pag(groupByKey);
    //   if (state[paginateBy] && state[paginateBy][groupKey] && state[paginateBy][groupKey].count !== undefined) {
    //     state = {
    //       ...state,
    //       [paginateBy]: {
    //         ...state[paginateBy],
    //         [groupKey]: {
    //           ...state[paginateBy][groupKey],
    //           ...(!isUpsert ? {} : { count: state[paginateBy][groupKey].count + 1 }),
    //           rows: {},
    //           loading: {}
    //         }
    //       }
    //     };
    //   }
    //   return state;
    // }
    /**
     * Creates object where the key returned by the configured indexByFn
     * @private
     * @param {?} action
     * @param {?} config
     * @return {?}
     */
    ReducerFactory.prototype.indexKeyObject = 
    // /**
    //  * resets pagination within a group, e.g. 'pag_by_fk_property'
    //  * TODO: check if can be deleted
    //  */
    // private resetPaginationsByGroup(groupByKey: string, state: any, groupKey: any, isUpsert = false) {
    //   const paginateBy = pag(groupByKey);
    //   if (state[paginateBy] && state[paginateBy][groupKey] && state[paginateBy][groupKey].count !== undefined) {
    //     state = {
    //       ...state,
    //       [paginateBy]: {
    //         ...state[paginateBy],
    //         [groupKey]: {
    //           ...state[paginateBy][groupKey],
    //           ...(!isUpsert ? {} : { count: state[paginateBy][groupKey].count + 1 }),
    //           rows: {},
    //           loading: {}
    //         }
    //       }
    //     };
    //   }
    //   return state;
    // }
    /**
     * Creates object where the key returned by the configured indexByFn
     * @private
     * @param {?} action
     * @param {?} config
     * @return {?}
     */
    function (action, config) {
        return indexBy((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return (i); }), action.meta.items
            // filter items that are not (yet) indexable. This is normally the case, when creating new items that have no pk yet.
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            try {
                config.indexBy.indexByFn(item);
                return true;
            }
            catch (error) {
                return false;
            }
        }))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return config.indexBy.indexByFn(item); })));
    };
    /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    ReducerFactory.prototype.groupBy = /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    function (items, groupByFn, indexByFn) {
        var _this = this;
        /** @type {?} */
        var groups = {};
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            var _a;
            // if the group by key is not possible to create, the item won't be added to the index
            /** @type {?} */
            var groupKey = _this.getGroupKeyOfItem(groupByFn, item);
            if (groupKey) {
                /** @type {?} */
                var indexKey = indexByFn(item);
                groups[groupKey] = __assign({}, groups[groupKey], (_a = {}, _a[indexKey] = item, _a));
            }
        }));
        return groups;
    };
    /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    ReducerFactory.prototype.getGroupKeyOfItem = /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    function (groupByFn, item) {
        /** @type {?} */
        var groupKey;
        try {
            groupKey = groupByFn(item);
        }
        catch (error) {
        }
        return groupKey;
    };
    return ReducerFactory;
}());
if (false) {
    /** @type {?} */
    ReducerFactory.prototype.updatingBy;
    /** @type {?} */
    ReducerFactory.prototype.deletingBy;
    /** @type {?} */
    ReducerFactory.prototype.removingBy;
    /** @type {?} */
    ReducerFactory.prototype.actionPrefix;
    /** @type {?} */
    ReducerFactory.prototype.configs;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/sys.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createSysReducer() {
    return new ReducerFactory(sysRoot, sysDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/dfh.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createDfhReducer() {
    return new ReducerFactory('dfh', dfhDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/inf.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createInfReducer() {
    return new ReducerFactory(infRoot, infDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/dat.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createDatReducer() {
    return new ReducerFactory(datRoot, datDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/pro.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createProReducer() {
    return new ReducerFactory(proRoot, proDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/war.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createWarReducer() {
    return new ReducerFactory(warRoot, warDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducers/tab.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createTabReducer() {
    return new ReducerFactory(tabRoot, tabDefinitions).createReducers();
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
/** @type {?} */
var sandboxStateReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = {}; }
    if (action.type === INIT_SANDBOX_STATE) {
        lastState = __assign({}, lastState, action.payload);
    }
    return lastState;
});
/** @type {?} */
var pendingRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action && action.meta && action.meta.addPending) {
        /** @type {?} */
        var uuid = action.meta.addPending;
        state = __assign({}, state, (_a = {}, _a[uuid] = true, _a));
        // console.log('add ' + uuid + ' ' + Date.now())
    }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        var uuid = action.meta.removePending;
        state = __assign({}, omit([uuid], state));
    }
    return state;
});
/** @type {?} */
var resolvedRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        var uuid = action.meta.removePending;
        state = __assign({}, state, (_a = {}, _a[uuid] = action.meta, _a));
    }
    return state;
});
/** @type {?} */
var cleanupResolved = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    if (state === void 0) { state = {}; }
    if (action && action.type === 'CLEAN_UP_RESOLVED') {
        /** @type {?} */
        var uuid = action.meta.uuid;
        state = __assign({}, omit([uuid], state));
        // console.log('resolve ' + uuid + ' ' + Date.now().toString())
    }
    return state;
});
/** @type {?} */
var SET_APP_STATE = 'SET_APP_STATE';
/** @type {?} */
var setAppState = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    if (state === void 0) { state = {}; }
    if (action && action.type === SET_APP_STATE) {
        state = action.payload;
    }
    return state;
});
/** @type {?} */
var rootReducer = composeReducers(defaultFormReducer(), combineReducers({
    account: accountRootReducer,
    loadingBar: loadingBarReducer,
    activeProject: activeProjectReducer,
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    sandboxState: sandboxStateReducer,
    projects: createProjectsReducer(),
    sys: createSysReducer(),
    dfh: createDfhReducer(),
    inf: createInfReducer(),
    dat: createDatReducer(),
    pro: createProReducer(),
    war: createWarReducer(),
    tab: createTabReducer(),
    pending: pendingRequestReducer,
    resolved: composeReducers(resolvedRequestReducer, cleanupResolved),
}), setAppState);

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/module/redux-store.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Function to use in combination with rxjs/operator .filter()
 * in order to get only actions dispached with a fractalkey
 * equal to the provided path.
 *
 * example:
 * pipe(
 *    filter(action => ofSubstore(c.basePath)(action)),
 *    ofType('Foo')
 * )
 * \@param path
 * @type {?}
 */
var ofSubstore = (/**
 * @param {?} path
 * @return {?}
 */
function (path) { return (/**
 * @param {?} action
 * @return {?}
 */
function (action) {
    if (!('@angular-redux::fractalkey' in action))
        return false;
    /** @type {?} */
    var actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    /** @type {?} */
    var bool = equals(actionPath, path);
    return bool;
}); });
/** @type {?} */
var APP_INITIAL_STATE = new InjectionToken('app.INITIAL_STATE');
/**
 * @return {?}
 */
function apiConfigFactory() {
    /** @type {?} */
    var params = {
    // set configuration parameters here.
    };
    return new Configuration(params);
}
var ReduxModule = /** @class */ (function () {
    function ReduxModule(ngRedux, devTools, rootEpics, parentModule, sdkLb3, sdkLb4, initialState) {
        this.ngRedux = ngRedux;
        /** @type {?} */
        var errors = [];
        if (parentModule)
            errors.push('ReduxModule is already loaded. Import in your base AppModule only.');
        if (!sdkLb3)
            errors.push('You need to import the SdkLb3Module in your AppModule!');
        if (!sdkLb4)
            errors.push('You need to import the SdkLb4Module in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
        if (!initialState)
            initialState = {};
        /** @type {?} */
        var epicMiddleware = createEpicMiddleware();
        // Tell Redux about our reducers and epics. If the Redux DevTools
        // chrome extension is available in the browser, tell Redux about
        // it too.
        ngRedux.configureStore(
        // RootReducer
        rootReducer, 
        // Initial state
        initialState, 
        // Middleware
        [
            // createLogger(),
            epicMiddleware,
            dynamicMiddlewares,
        ], 
        // Enhancers
        devTools.isEnabled() ? [devTools.enhancer()] : []);
        // Apply rootEpic
        epicMiddleware.run(rootEpics.getRootEpic());
        // // Enable syncing of Angular router state with our Redux store.
        // if (ngReduxRouter) {
        //     ngReduxRouter.initialize();
        // }
        // Enable syncing of Angular form state with our Redux store.
        // provideReduxForms(ngRedux);
    }
    /**
     * @return {?}
     */
    ReduxModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: ReduxModule,
            providers: [{ provide: APP_INITIAL_STATE, useValue: {} }]
        };
    };
    ReduxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        NgReduxModule,
                        // for gui-state epics
                        SlimLoadingBarModule,
                        ToastyModule.forRoot(),
                    ],
                    providers: [
                    // AccountActions,
                    // ActiveProjectActions,
                    // LoadingBarActions,
                    // NotificationsAPIActions,
                    // AccountEpics,
                    // ActiveProjectEpics,
                    // LoadingBarEpics,
                    // NotificationsAPIEpics,
                    // DatActions,
                    // DfhActions,
                    // InfActions,
                    // ProActions,
                    // SysActions,
                    // TabActions,
                    // WarActions,
                    // DatEpics,
                    // DfhEpics,
                    // InfEpics,
                    // ProEpics,
                    // SysEpics,
                    // TabEpics,
                    // WarEpics,
                    // RootEpics,
                    // // SchemaActionsFactory,
                    // SchemaObjectService,
                    // { provide: APP_INITIAL_STATE, useValue: {} }
                    ]
                },] }
    ];
    /** @nocollapse */
    ReduxModule.ctorParameters = function () { return [
        { type: NgRedux },
        { type: DevToolsExtension },
        { type: RootEpics },
        { type: ReduxModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SdkLb3Module, decorators: [{ type: Optional }] },
        { type: SdkLb4Module, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_INITIAL_STATE,] }] }
    ]; };
    return ReduxModule;
}());
if (false) {
    /** @type {?} */
    ReduxModule.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/models/model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function InfObject() { }
if (false) {
    /** @type {?|undefined} */
    InfObject.prototype.persistent_item;
    /** @type {?|undefined} */
    InfObject.prototype.temporal_entity;
    /** @type {?|undefined} */
    InfObject.prototype.statement;
    /** @type {?|undefined} */
    InfObject.prototype.place;
    /** @type {?|undefined} */
    InfObject.prototype.language;
    /** @type {?|undefined} */
    InfObject.prototype.appellation;
    /** @type {?|undefined} */
    InfObject.prototype.time_primitive;
    /** @type {?|undefined} */
    InfObject.prototype.text_property;
    /** @type {?|undefined} */
    InfObject.prototype.lang_string;
    /** @type {?|undefined} */
    InfObject.prototype.dimension;
}
/**
 * @record
 */
function ProObject() { }
if (false) {
    /** @type {?|undefined} */
    ProObject.prototype.info_proj_rel;
    /** @type {?|undefined} */
    ProObject.prototype.project;
}
/**
 * @record
 */
function DatObject() { }
if (false) {
    /** @type {?|undefined} */
    DatObject.prototype.digital;
}
/**
 * @record
 */
function WarObject() { }
if (false) {
    /** @type {?|undefined} */
    WarObject.prototype.entity_preview;
}
/**
 * @record
 */
function SchemaObject() { }
if (false) {
    /** @type {?|undefined} */
    SchemaObject.prototype.inf;
    /** @type {?|undefined} */
    SchemaObject.prototype.pro;
    /** @type {?|undefined} */
    SchemaObject.prototype.dat;
    /** @type {?|undefined} */
    SchemaObject.prototype.war;
}
/**
 * @record
 */
function PaginationObject() { }
if (false) {
    /** @type {?} */
    PaginationObject.prototype.count;
    /** @type {?} */
    PaginationObject.prototype.schemas;
    /** @type {?} */
    PaginationObject.prototype.statements;
}
/**
 * @record
 */
function IAppState() { }
if (false) {
    /** @type {?|undefined} */
    IAppState.prototype.account;
    /** @type {?|undefined} */
    IAppState.prototype.loadingBar;
    /** @type {?|undefined} */
    IAppState.prototype.projects;
    /** @type {?|undefined} */
    IAppState.prototype.sys;
    /** @type {?|undefined} */
    IAppState.prototype.dfh;
    /** @type {?|undefined} */
    IAppState.prototype.inf;
    /** @type {?|undefined} */
    IAppState.prototype.dat;
    /** @type {?|undefined} */
    IAppState.prototype.pro;
    /** @type {?|undefined} */
    IAppState.prototype.war;
    /** @type {?|undefined} */
    IAppState.prototype.tab;
    /** @type {?|undefined} */
    IAppState.prototype.activeProject;
    /** @type {?|undefined} */
    IAppState.prototype.routes;
    /** @type {?|undefined} */
    IAppState.prototype.information;
    /** @type {?|undefined} */
    IAppState.prototype.sources;
    /** @type {?|undefined} */
    IAppState.prototype.sandboxState;
    /** @type {?|undefined} */
    IAppState.prototype.pending;
}
/**
 * @record
 * @template T
 */
function ByPk() { }

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/account.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AccountRole() { }
if (false) {
    /** @type {?} */
    AccountRole.prototype.id;
    /** @type {?} */
    AccountRole.prototype.name;
}
/**
 * @record
 */
function IAccount() { }
if (false) {
    /** @type {?} */
    IAccount.prototype.account;
    /** @type {?|undefined} */
    IAccount.prototype.roles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ProjectPreview() { }
if (false) {
    /** @type {?|undefined} */
    ProjectPreview.prototype.label;
    /** @type {?|undefined} */
    ProjectPreview.prototype.description;
    /** @type {?|undefined} */
    ProjectPreview.prototype.default_language;
    /** @type {?|undefined} */
    ProjectPreview.prototype.pk_project;
}
/**
 * @record
 * @template T
 */
function EntityByPk() { }
/**
 * @record
 * @template T
 */
function VersionEntity() { }
if (false) {
    /** @type {?} */
    VersionEntity.prototype._latestVersion;
    /* Skipping unhandled member: [v: number]: T*/
}
/**
 * @record
 * @template T
 */
function EntityVersionsByPk() { }
/**
 * @record
 */
function ChunkList() { }
/**
 * @record
 */
function PeItList() { }
/**
 * @record
 */
function TeEnList() { }
/**
 * @record
 */
function PropertyList() { }
/**
 * @record
 */
function TypePeIt() { }
if (false) {
    /** @type {?} */
    TypePeIt.prototype.fk_typed_class;
}
/**
 * @record
 */
function TypesByClass() { }
/**
 * @record
 */
function TypesByPk() { }
/**
 * @record
 */
function TypePreview() { }
if (false) {
    /** @type {?} */
    TypePreview.prototype.fk_typed_class;
}
/**
 * @record
 */
function TypePreviewsByClass() { }
/**
 * @record
 */
function TypePreviewList() { }
/**
 * @record
 */
function Panel() { }
if (false) {
    /** @type {?} */
    Panel.prototype.id;
    /** @type {?} */
    Panel.prototype.tabs;
}
/**
 * @record
 * @template D
 */
function PanelTab() { }
if (false) {
    /** @type {?} */
    PanelTab.prototype.active;
    /** @type {?} */
    PanelTab.prototype.component;
    /** @type {?} */
    PanelTab.prototype.icon;
    /** @type {?|undefined} */
    PanelTab.prototype.pathSegment;
    /** @type {?|undefined} */
    PanelTab.prototype.data;
    /** @type {?|undefined} */
    PanelTab.prototype.path;
    /** @type {?|undefined} */
    PanelTab.prototype.tabTitle$;
    /** @type {?|undefined} */
    PanelTab.prototype.loading$;
}
/**
 * @record
 */
function PeItTabData() { }
if (false) {
    /** @type {?|undefined} */
    PeItTabData.prototype.peItDetailConfig;
}
/**
 * @record
 */
function AnalysisTabData() { }
if (false) {
    /** @type {?|undefined} */
    AnalysisTabData.prototype.pkEntity;
    /** @type {?|undefined} */
    AnalysisTabData.prototype.fkAnalysisType;
}
/**
 * @record
 */
function TabData() { }
if (false) {
    /** @type {?|undefined} */
    TabData.prototype.pkEntity;
    /** @type {?|undefined} */
    TabData.prototype.pkProperty;
    /** @type {?|undefined} */
    TabData.prototype.peItDetailConfig;
}
/**
 * @record
 */
function RamSource() { }
if (false) {
    /** @type {?|undefined} */
    RamSource.prototype.pkEntity;
    /** @type {?|undefined} */
    RamSource.prototype.chunk;
}
/**
 * @record
 */
function ProjectDetail() { }
if (false) {
    /**
     * ***************************************************************
     * CRM and Project Config
     * @type {?|undefined}
     */
    ProjectDetail.prototype.loadingConfigData;
    /** @type {?|undefined} */
    ProjectDetail.prototype.configDataInitialized;
    /**
     * ***************************************************************
     * Layout – Tabs
     * @type {?|undefined}
     */
    ProjectDetail.prototype.list;
    /** @type {?|undefined} */
    ProjectDetail.prototype.panels;
    /** @type {?|undefined} */
    ProjectDetail.prototype.focusedPanel;
    /** @type {?|undefined} */
    ProjectDetail.prototype.panelSerial;
    /** @type {?|undefined} */
    ProjectDetail.prototype.uiIdSerial;
    /** @type {?|undefined} */
    ProjectDetail.prototype.tabLayouts;
    /** @type {?|undefined} */
    ProjectDetail.prototype.textDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.peItDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.analysisDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.classesSettings;
    /** @type {?|undefined} */
    ProjectDetail.prototype.contrVocabSettings;
    /** @type {?|undefined} */
    ProjectDetail.prototype.ontomeProfilesSettings;
    /**
     * ***************************************************************
     * Things for Mentionings / Annotations
     * @type {?|undefined}
     */
    ProjectDetail.prototype.refiningChunk;
    /** @type {?|undefined} */
    ProjectDetail.prototype.creatingMentioning;
    /** @type {?|undefined} */
    ProjectDetail.prototype.mentioningsFocusedInText;
    /** @type {?|undefined} */
    ProjectDetail.prototype.mentioningsFocusedInTable;
}
/**
 * @record
 */
function ProjectCrm() { }
if (false) {
    /** @type {?|undefined} */
    ProjectCrm.prototype.classes;
    /** @type {?|undefined} */
    ProjectCrm.prototype.properties;
}
/**
 * @record
 */
function ClassConfigList() { }
/**
 * @record
 */
function ClassConfig() { }
if (false) {
    /** @type {?} */
    ClassConfig.prototype.pkEntity;
    /** @type {?} */
    ClassConfig.prototype.dfh_pk_class;
    /** @type {?} */
    ClassConfig.prototype.label;
    /** @type {?} */
    ClassConfig.prototype.dfh_standard_label;
    /** @type {?} */
    ClassConfig.prototype.profileLabels;
    /** @type {?} */
    ClassConfig.prototype.profilePks;
    /** @type {?|undefined} */
    ClassConfig.prototype.projRel;
    /** @type {?|undefined} */
    ClassConfig.prototype.isInProject;
    /** @type {?} */
    ClassConfig.prototype.changingProjRel;
    /** @type {?|undefined} */
    ClassConfig.prototype.subclassOf;
    /** @type {?|undefined} */
    ClassConfig.prototype.subclassOfType;
    /** @type {?} */
    ClassConfig.prototype.scopeNote;
    /** @type {?} */
    ClassConfig.prototype.dfh_identifier_in_namespace;
    /** @type {?|undefined} */
    ClassConfig.prototype.uiContexts;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_sources;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_entities;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_basics;
    /** @type {?|undefined} */
    ClassConfig.prototype.excluded_from_entities;
}
/**
 * @record
 */
function UiContext() { }
if (false) {
    /** @type {?|undefined} */
    UiContext.prototype.uiElements;
}
/**
 * @record
 */
function UiElement() { }
if (false) {
    /** @type {?|undefined} */
    UiElement.prototype.fk_property;
    /** @type {?|undefined} */
    UiElement.prototype.property_is_outgoing;
    /** @type {?|undefined} */
    UiElement.prototype.propertyFieldKey;
    /** @type {?|undefined} */
    UiElement.prototype.propSetKey;
    /** @type {?|undefined} */
    UiElement.prototype.fk_class_field;
    /** @type {?|undefined} */
    UiElement.prototype.class_field;
    /** @type {?} */
    UiElement.prototype.ord_num;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project/entity-detail.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PeItDetailList() { }
;
var EntityDetail = /** @class */ (function () {
    function EntityDetail(data) {
        /**
         * Left Panel Visibility
         */
        // the properties with information about the peIt
        this.showProperties = false;
        // the right area
        this.showRightArea = true;
        /**
         * Right panel
         */
        this.rightPanelTabs = [];
        this.rightPanelActiveTab = 0; // index of the active tab
        // index of the active tab
        // the bar to above the properties
        // showPropertiesHeader?= true;
        // the header with name of peIt
        this.showHeader = true;
        Object.assign(this, data);
    }
    return EntityDetail;
}());
if (false) {
    /** @type {?} */
    EntityDetail.prototype.pkEntity;
    /**
     * Left Panel Visibility
     * @type {?}
     */
    EntityDetail.prototype.showProperties;
    /** @type {?} */
    EntityDetail.prototype.showRightArea;
    /**
     * Right panel
     * @type {?}
     */
    EntityDetail.prototype.rightPanelTabs;
    /** @type {?} */
    EntityDetail.prototype.rightPanelActiveTab;
    /** @type {?} */
    EntityDetail.prototype.showHeader;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project/project-settings-data.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
var  
// Class of this slice of store
ProjectSettingsData = /** @class */ (function () {
    function ProjectSettingsData(data) {
        Object.assign(this, data);
    }
    return ProjectSettingsData;
}());
if (false) {
    /** @type {?} */
    ProjectSettingsData.prototype.items;
    /** @type {?} */
    ProjectSettingsData.prototype.tabTitle;
    /** @type {?} */
    ProjectSettingsData.prototype.loading;
    /** @type {?} */
    ProjectSettingsData.prototype.error;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project/tab-layout.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
var  
// Class of this slice of store
TabBase = /** @class */ (function () {
    function TabBase(data) {
        Object.assign(this, data);
    }
    return TabBase;
}());
if (false) {
    /** @type {?} */
    TabBase.prototype.pkEntity;
    /** @type {?} */
    TabBase.prototype.tabTitle;
    /** @type {?} */
    TabBase.prototype.tabTooltip;
    /** @type {?} */
    TabBase.prototype.loading;
    /** @type {?} */
    TabBase.prototype.layoutMode;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project/types.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
var  
// Class of this slice of store
Types = /** @class */ (function () {
    function Types(data) {
        Object.assign(this, data);
    }
    return Types;
}());
if (false) {
    /** @type {?} */
    Types.prototype.items;
    /** @type {?} */
    Types.prototype.edit;
    /** @type {?} */
    Types.prototype.loading;
    /** @type {?} */
    Types.prototype.error;
    /** @type {?} */
    Types.prototype.tabTitle;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/list.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
var  
// Class of this slice of store
List = /** @class */ (function () {
    function List(data) {
        Object.assign(this, data);
        if (true) {
        }
        else {
        }
    }
    return List;
}());
if (false) {
    /** @type {?} */
    List.prototype.searchString;
    /** @type {?} */
    List.prototype.pkAllowedClasses;
    /** @type {?} */
    List.prototype.collectionSize;
    /** @type {?} */
    List.prototype.items;
    /** @type {?} */
    List.prototype.loading;
    /** @type {?} */
    List.prototype.error;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/loading-bar.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LoadingBar() { }
if (false) {
    /** @type {?|undefined} */
    LoadingBar.prototype.loading;
    /** @type {?|undefined} */
    LoadingBar.prototype.progress;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/notifications.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function NotificationsI() { }
if (false) {
    /** @type {?} */
    NotificationsI.prototype.type;
    /** @type {?} */
    NotificationsI.prototype.options;
}
// Class of this slice of store
var  
// Class of this slice of store
Notifications = /** @class */ (function () {
    function Notifications(data) {
        Object.assign(this, data);
    }
    return Notifications;
}());
if (false) {
    /** @type {?} */
    Notifications.prototype.type;
    /** @type {?} */
    Notifications.prototype.options;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/projects.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IProject() { }
if (false) {
    /** @type {?} */
    IProject.prototype.record;
}
/**
 * @record
 */
function IProjectList() { }
if (false) {
    /** @type {?} */
    IProjectList.prototype.records;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/dat.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DigitalSlice = /** @class */ (function () {
    function DigitalSlice() {
    }
    return DigitalSlice;
}());
if (false) {
    /** @type {?} */
    DigitalSlice.prototype.by_pk_entity__entity_version;
    /** @type {?} */
    DigitalSlice.prototype.by_pk_entity;
    /** @type {?} */
    DigitalSlice.prototype.by_pk_text;
    /** @type {?} */
    DigitalSlice.prototype.loading;
}
var ChunkSlice = /** @class */ (function () {
    function ChunkSlice() {
    }
    return ChunkSlice;
}());
if (false) {
    /** @type {?} */
    ChunkSlice.prototype.by_pk_entity;
    /** @type {?} */
    ChunkSlice.prototype.by_fk_text;
    /** @type {?} */
    ChunkSlice.prototype.loading;
}
var ColumnSlice = /** @class */ (function () {
    function ColumnSlice() {
    }
    return ColumnSlice;
}());
if (false) {
    /** @type {?} */
    ColumnSlice.prototype.by_pk_entity;
    /** @type {?} */
    ColumnSlice.prototype.by_fk_digital;
}
var ClassColumnMappingSlice = /** @class */ (function () {
    function ClassColumnMappingSlice() {
    }
    return ClassColumnMappingSlice;
}());
if (false) {
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_pk_entity;
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_fk_column;
}
var TextPropertySlice = /** @class */ (function () {
    function TextPropertySlice() {
    }
    return TextPropertySlice;
}());
if (false) {
    /** @type {?} */
    TextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    TextPropertySlice.prototype.by_fk_digital;
}
var NamespaceSlice = /** @class */ (function () {
    function NamespaceSlice() {
    }
    return NamespaceSlice;
}());
if (false) {
    /** @type {?} */
    NamespaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    NamespaceSlice.prototype.by_fk_project;
    /** @type {?} */
    NamespaceSlice.prototype.loading;
}
/**
 * @record
 */
function Dat() { }
if (false) {
    /** @type {?|undefined} */
    Dat.prototype.digital;
    /** @type {?|undefined} */
    Dat.prototype.chunk;
    /** @type {?|undefined} */
    Dat.prototype.column;
    /** @type {?|undefined} */
    Dat.prototype.text_property;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/dfh.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DfhProfileSlice = /** @class */ (function () {
    function DfhProfileSlice() {
    }
    return DfhProfileSlice;
}());
if (false) {
    /** @type {?} */
    DfhProfileSlice.prototype.by_pk_profile;
    /** @type {?} */
    DfhProfileSlice.prototype.loading;
}
var DfhClassSlice = /** @class */ (function () {
    function DfhClassSlice() {
    }
    return DfhClassSlice;
}());
if (false) {
    /** @type {?} */
    DfhClassSlice.prototype.by_pk_class;
    /** @type {?} */
    DfhClassSlice.prototype.by_basic_type;
    /** @type {?} */
    DfhClassSlice.prototype.loading;
}
var DfhPropertySlice = /** @class */ (function () {
    function DfhPropertySlice() {
    }
    return DfhPropertySlice;
}());
if (false) {
    /** @type {?} */
    DfhPropertySlice.prototype.by_pk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_domain__fk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_range__fk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_domain;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_range;
    /** @type {?} */
    DfhPropertySlice.prototype.by_pk_property__has_domain__has_range;
    /** @type {?} */
    DfhPropertySlice.prototype.by_is_has_type_subproperty;
    /** @type {?} */
    DfhPropertySlice.prototype.loading;
}
var DfhLabelSlice = /** @class */ (function () {
    function DfhLabelSlice() {
    }
    return DfhLabelSlice;
}());
if (false) {
    /** @type {?} */
    DfhLabelSlice.prototype.by_fks;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_class__type;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_property__type;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_profile__type;
    /** @type {?} */
    DfhLabelSlice.prototype.loading;
}
/**
 * @record
 */
function Dfh() { }
if (false) {
    /** @type {?|undefined} */
    Dfh.prototype.profile;
    /** @type {?|undefined} */
    Dfh.prototype.klass;
    /** @type {?|undefined} */
    Dfh.prototype.property;
    /** @type {?|undefined} */
    Dfh.prototype.label;
    /** @type {?} */
    Dfh.prototype.pkEntityModelMap;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/inf.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PaginationInfo() { }
if (false) {
    /** @type {?} */
    PaginationInfo.prototype.loading;
    /** @type {?} */
    PaginationInfo.prototype.count;
    /** @type {?} */
    PaginationInfo.prototype.rows;
}
var InfPersistentItemSlice = /** @class */ (function () {
    function InfPersistentItemSlice() {
    }
    return InfPersistentItemSlice;
}());
if (false) {
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_fk_class;
    /** @type {?} */
    InfPersistentItemSlice.prototype.loading;
}
var InfTemporalEntitySlice = /** @class */ (function () {
    function InfTemporalEntitySlice() {
    }
    return InfTemporalEntitySlice;
}());
if (false) {
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_fk_class;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.loading;
}
var InfStatementSlice = /** @class */ (function () {
    function InfStatementSlice() {
    }
    return InfStatementSlice;
}());
if (false) {
    /** @type {?} */
    InfStatementSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfStatementSlice.prototype.by_subject;
    /** @type {?} */
    InfStatementSlice.prototype.by_object;
    /* Skipping unnamed member:
    'by_subject+property'?: ByPk<ByPk<InfStatement>>;*/
    /* Skipping unnamed member:
    'by_object+property'?: ByPk<ByPk<InfStatement>>;*/
    /** @type {?} */
    InfStatementSlice.prototype.by_fk_subject_data;
    /** @type {?} */
    InfStatementSlice.prototype.by_subfield_page;
    /** @type {?} */
    InfStatementSlice.prototype.loading;
}
var InfPlaceSlice = /** @class */ (function () {
    function InfPlaceSlice() {
    }
    return InfPlaceSlice;
}());
if (false) {
    /** @type {?} */
    InfPlaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPlaceSlice.prototype.loading;
}
var InfTimePrimitiveSlice = /** @class */ (function () {
    function InfTimePrimitiveSlice() {
    }
    return InfTimePrimitiveSlice;
}());
if (false) {
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.loading;
}
var InfLanguageSlice = /** @class */ (function () {
    function InfLanguageSlice() {
    }
    return InfLanguageSlice;
}());
if (false) {
    /** @type {?} */
    InfLanguageSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLanguageSlice.prototype.loading;
}
var InfAppellationSlice = /** @class */ (function () {
    function InfAppellationSlice() {
    }
    return InfAppellationSlice;
}());
if (false) {
    /** @type {?} */
    InfAppellationSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfAppellationSlice.prototype.loading;
}
var InfLangStringSlice = /** @class */ (function () {
    function InfLangStringSlice() {
    }
    return InfLangStringSlice;
}());
if (false) {
    /** @type {?} */
    InfLangStringSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLangStringSlice.prototype.loading;
}
var InfDimensionSlice = /** @class */ (function () {
    function InfDimensionSlice() {
    }
    return InfDimensionSlice;
}());
if (false) {
    /** @type {?} */
    InfDimensionSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfDimensionSlice.prototype.loading;
}
var InfTextPropertySlice = /** @class */ (function () {
    function InfTextPropertySlice() {
    }
    return InfTextPropertySlice;
}());
if (false) {
    /** @type {?} */
    InfTextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTextPropertySlice.prototype.by_fk_concerned_entity__fk_class_field;
    /** @type {?} */
    InfTextPropertySlice.prototype.by_fk_concerned_entity;
    /** @type {?} */
    InfTextPropertySlice.prototype.loading;
}
/**
 * @record
 */
function Inf() { }
if (false) {
    /** @type {?|undefined} */
    Inf.prototype.persistent_item;
    /** @type {?|undefined} */
    Inf.prototype.temporal_entity;
    /** @type {?|undefined} */
    Inf.prototype.statement;
    /** @type {?|undefined} */
    Inf.prototype.place;
    /** @type {?|undefined} */
    Inf.prototype.time_primitive;
    /** @type {?|undefined} */
    Inf.prototype.language;
    /** @type {?|undefined} */
    Inf.prototype.appellation;
    /** @type {?|undefined} */
    Inf.prototype.lang_string;
    /** @type {?|undefined} */
    Inf.prototype.dimension;
    /** @type {?|undefined} */
    Inf.prototype.text_property;
    /** @type {?|undefined} */
    Inf.prototype.pkEntityModelMap;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/pro.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ProProjectSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProProjectSlice.prototype.by_pk_entity;
}
/**
 * @record
 */
function ProInfoProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProInfoProjRelSlice.prototype.by_fk_project__fk_entity;
    /** @type {?|undefined} */
    ProInfoProjRelSlice.prototype.loading;
}
/**
 * @record
 */
function ProDfhClassProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.by_fk_project__fk_class;
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.by_fk_project__enabled_in_entities;
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.loading;
}
/**
 * @record
 */
function ProDfhProfileProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.by_fk_project__fk_profile;
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.by_fk_project__enabled;
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.loading;
}
/**
 * @record
 */
function ProClassFieldConfigSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProClassFieldConfigSlice.prototype.by_fk_project__fk_class;
    /** @type {?|undefined} */
    ProClassFieldConfigSlice.prototype.loading;
}
/**
 * @record
 */
function ProTextPropertySlice() { }
if (false) {
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.by_pk_entity;
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.by_fk_project__fk_property__fk_domain_class__fk_range_class;
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.loading;
}
/**
 * @record
 */
function ProAnalysisSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProAnalysisSlice.prototype.by_pk_entity;
}
/**
 * @record
 */
function Pro() { }
if (false) {
    /** @type {?|undefined} */
    Pro.prototype.info_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.dfh_profile_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.dfh_class_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.class_field_config;
    /** @type {?|undefined} */
    Pro.prototype.text_property;
    /** @type {?|undefined} */
    Pro.prototype.analysis;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/sys.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function SysRelevantClassSlice() { }
if (false) {
    /** @type {?|undefined} */
    SysRelevantClassSlice.prototype.by_pk_entity;
    /** @type {?|undefined} */
    SysRelevantClassSlice.prototype.by_fk_class;
    /** @type {?|undefined} */
    SysRelevantClassSlice.prototype.by_required_by_sources;
    /** @type {?|undefined} */
    SysRelevantClassSlice.prototype.by_required;
    /** @type {?|undefined} */
    SysRelevantClassSlice.prototype.loading;
}
/**
 * @record
 */
function SysConfigSlice() { }
if (false) {
    /** @type {?|undefined} */
    SysConfigSlice.prototype.by_main;
    /** @type {?|undefined} */
    SysConfigSlice.prototype.loading;
}
/**
 * @record
 */
function Sys() { }
if (false) {
    /** @type {?|undefined} */
    Sys.prototype.system_relevant_class;
    /** @type {?|undefined} */
    Sys.prototype.config;
    /** @type {?} */
    Sys.prototype.pkEntityModelMap;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/tab.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TabCellSlice = /** @class */ (function () {
    function TabCellSlice() {
    }
    return TabCellSlice;
}());
if (false) {
    /** @type {?} */
    TabCellSlice.prototype.by_pk_cell;
    /** @type {?} */
    TabCellSlice.prototype.by_fk_column_fk_row;
}
/**
 * @record
 */
function Tab() { }
if (false) {
    /** @type {?|undefined} */
    Tab.prototype.cell;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/war.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function WarEntityPreviewSlice() { }
if (false) {
    /** @type {?|undefined} */
    WarEntityPreviewSlice.prototype.by_pk_entity;
}
/**
 * @record
 */
function War() { }
if (false) {
    /** @type {?|undefined} */
    War.prototype.entity_preview;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-redux.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { APP_INITIAL_STATE, AccountActions, ActiveProjectActions, ChunkActionsFactory, ChunkSlice, ClassColumnMappingSlice, ColumnActionsFactory, ColumnSlice, DatActions, DfhActions, DfhClassActionFactory, DfhClassSlice, DfhLabelActionFactory, DfhLabelSlice, DfhProfileActionFactory, DfhProfileSlice, DfhPropertyActionFactory, DfhPropertySlice, DigitalActionsFactory, DigitalSlice, EntityDetail, Flattener, GvSchemaActions, INIT_SANDBOX_STATE, InfActionFactory, InfActions, InfAppellationSlice, InfDimensionSlice, InfEpicsFactory, InfLangStringSlice, InfLanguageSlice, InfPersistentItemActionFactory, InfPersistentItemSlice, InfPlaceSlice, InfStatementActionFactory, InfStatementSlice, InfTemporalEntityActionFactory, InfTemporalEntitySlice, InfTextPropertyActionFactory, InfTextPropertySlice, InfTimePrimitiveSlice, Information, List, LoadingBarActions, NamespaceSlice, Notifications, NotificationsAPIActions, PR_ENTITY_MODEL_MAP, ProActions, ProAnalysisActionFactory, ProClassFieldConfigActionFactory, ProDfhClassProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProInfoProjRelActionFactory, ProProjectActionFactory, ProTextPropertyActionFactory, ProjectSettingsData, ProjectsActions, ReducerFactory, ReduxModule, RootEpics, SET_APP_STATE, SchemaActionsFactory, SchemaEpicsFactory, SchemaService, SourceList, SysActions, TabActions, TabBase, TabCellSlice, TextPropertySlice, Types, WarActions, apiConfigFactory, by, cleanupResolved, createDatReducer, createDfhReducer, createInfReducer, createProReducer, createSysReducer, createTabReducer, createWarReducer, datDefinitions, datRoot, dfhDefinitions, dfhLabelByFksKey, dfhRoot, facetteByPk, getEnd, getFromTo, getStart, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, ofSubstore, paginateBy, pendingRequestReducer, proClassFieldConfgByProjectAndClassKey, proDefinitions, proRoot, resolvedRequestReducer, rootReducer, sandboxStateReducer, setAppState, storeFlattened, subfieldIdToString, sysDefinitions, sysRoot, tabDefinitions, tabRoot, textPropertyByFksKey, textPropertyByFksWithoutLang, warDefinitions, warRoot, LoadingBarEpics as ɵa, NotificationsAPIEpics as ɵb, ActiveProjectEpics as ɵc, AccountEpics as ɵd, SysEpics as ɵe, DfhEpics as ɵf, InfEpics as ɵg, DatEpics as ɵh, ProEpics as ɵi, SchemaEpics as ɵj, ActionResolverEpics as ɵk, accountRootReducer as ɵl, loadingBarReducer as ɵm, activeProjectReducer as ɵn, informationReducer as ɵo, sourceListReducer as ɵp, createProjectsReducer as ɵq };
//# sourceMappingURL=kleiolab-lib-redux.js.map
