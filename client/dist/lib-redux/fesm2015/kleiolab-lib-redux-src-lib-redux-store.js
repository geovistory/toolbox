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
import { __decorate, __metadata } from 'tslib';
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
 * Generated from: state-gui/actions/account.actions.ts
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
class AccountActions {
    /**
     * @return {?}
     */
    login() {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    }
    /**
     * @param {?} account
     * @return {?}
     */
    loginSucceeded(account) {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account }
        };
    }
    /**
     * @param {?} error
     * @return {?}
     */
    loginFailed(error) {
        return {
            type: AccountActions.LOGIN_FAILED,
            payload: null,
            meta: null,
            error
        };
    }
    /**
     * @param {?} account
     * @return {?}
     */
    accountUpdated(account) {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload: null,
            meta: { account }
        };
    }
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    loadRoles(accountId) {
        return {
            type: AccountActions.LOAD_ROLES,
            payload: null,
            meta: { accountId }
        };
    }
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    loadRolesSucceeded(accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles }
        };
    }
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    loadRolesFailed(accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    }
}
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
 * Generated from: state-gui/actions/loading-bar.actions.ts
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
class LoadingBarActions {
    constructor() {
        this.startLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.START,
            meta: null,
            payload: null,
        }));
        this.stopLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.STOP,
            meta: null,
            payload: null
        }));
        this.completeLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.COPMLETE,
            meta: null,
            payload: null,
        }));
    }
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
 * Generated from: state-gui/actions/notifications.actions.ts
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
class NotificationsAPIActions {
    constructor() {
        this.addToast = (/**
         * @param {?} payload
         * @return {?}
         */
        (payload) => ({
            type: NotificationsAPIActions.ADD_TOAST,
            meta: null,
            payload
        }));
    }
}
NotificationsAPIActions.ADD_TOAST = 'Notifications::ADD_TOAST';
NotificationsAPIActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ NotificationsAPIActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function NotificationsAPIActions_Factory() { return new NotificationsAPIActions(); }, token: NotificationsAPIActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    NotificationsAPIActions.ADD_TOAST;
    /** @type {?} */
    NotificationsAPIActions.prototype.addToast;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/account.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AccountEpics {
    /**
     * @param {?} actions
     * @param {?} loadingBarActions
     * @param {?} accountApi
     * @param {?} notificationActions
     */
    constructor(actions, loadingBarActions, accountApi, notificationActions) {
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.accountApi = accountApi;
        this.notificationActions = notificationActions;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.loadRoles());
    }
    /**
     * @private
     * @return {?}
     */
    loadRoles() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(AccountActions.LOAD_ROLES), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            this.accountApi.getRoles(action.meta.accountId)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                globalStore.next(this.loadingBarActions.completeLoading());
                globalStore.next(this.actions.loadRolesSucceeded(data));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        }))))));
    }
}
AccountEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AccountEpics.ctorParameters = () => [
    { type: AccountActions },
    { type: LoadingBarActions },
    { type: PubAccountApi },
    { type: NotificationsAPIActions }
];
/** @nocollapse */ AccountEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function AccountEpics_Factory() { return new AccountEpics(ɵɵinject(AccountActions), ɵɵinject(LoadingBarActions), ɵɵinject(PubAccountApi), ɵɵinject(NotificationsAPIActions)); }, token: AccountEpics, providedIn: "root" });
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
 * Generated from: state-gui/actions/active-project.action.ts
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
class ActiveProjectActions {
    /**
     * @param {?} pk_project
     * @return {?}
     */
    loadProjectBasics(pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS,
            payload: null,
            meta: {
                pk_project
            }
        };
    }
    /**
     * @param {?} projectPreview
     * @return {?}
     */
    loadProjectBasiscsSucceded(projectPreview) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
            payload: null,
            meta: { projectPreview },
        };
    }
    /**
     * @param {?} pk_project
     * @return {?}
     */
    loadProjectConfig(pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG,
            payload: null,
            meta: {
                pk_project
            },
        };
    }
    /**
     * @return {?}
     */
    loadProjectConfigSucceeded() {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED,
            payload: {
            // crm
            },
            meta: null,
        };
    }
    /**
     * @param {?} list
     * @return {?}
     */
    setListType(list) {
        return {
            type: ActiveProjectActions.SET_LIST_TYPE,
            payload: null,
            meta: {
                list
            }
        };
    }
    /**
     * @param {?} panels
     * @param {?} uiIdSerial
     * @param {?} panelSerial
     * @param {?} focusedPanel
     * @return {?}
     */
    setPanels(panels, uiIdSerial, panelSerial, focusedPanel) {
        return {
            type: ActiveProjectActions.SET_PANELS,
            payload: null,
            meta: { panels, uiIdSerial, panelSerial, focusedPanel }
        };
    }
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    activateTab(panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.ACTIVATE_TAB,
            payload: null,
            meta: {
                panelIndex, tabIndex
            }
        };
    }
    /**
     * @param {?} previousPanelIndex
     * @param {?} currentPanelIndex
     * @param {?} previousTabIndex
     * @param {?} currentTabIndex
     * @return {?}
     */
    moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex) {
        return {
            type: ActiveProjectActions.MOVE_TAB,
            payload: null,
            meta: {
                previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex
            }
        };
    }
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    closeTab(panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.CLOSE_TAB,
            payload: null,
            meta: {
                panelIndex, tabIndex
            }
        };
    }
    /**
     * @template TabData
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        return {
            type: ActiveProjectActions.ADD_TAB,
            payload: null,
            meta: { tab }
        };
    }
    /**
     * @param {?} previousPanelIndex
     * @param {?} tabIndex
     * @param {?} currentPanelIndex
     * @return {?}
     */
    splitPanel(previousPanelIndex, tabIndex, currentPanelIndex) {
        return {
            type: ActiveProjectActions.SPLIT_PANEL,
            payload: null,
            meta: { previousPanelIndex, tabIndex, currentPanelIndex }
        };
    }
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    closePanel(panelIndex) {
        return {
            type: ActiveProjectActions.CLOSE_PANEL,
            payload: null,
            meta: { panelIndex }
        };
    }
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    focusPanel(panelIndex) {
        return {
            type: ActiveProjectActions.FOCUS_PANEL,
            payload: null,
            meta: { panelIndex }
        };
    }
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
    setRefiningChunk(refiningChunk) {
        return {
            type: ActiveProjectActions.SET_REFINING_CHUNK,
            payload: { refiningChunk },
            meta: null
        };
    }
    /**
     * @param {?} creatingMentioning
     * @return {?}
     */
    setCreatingMentioning(creatingMentioning) {
        return {
            type: ActiveProjectActions.SET_CREATING_MENTIONING,
            payload: { creatingMentioning },
            meta: null
        };
    }
    /**
     * @param {?} mentioningsFocusedInText
     * @return {?}
     */
    setMentioningsFocusedInText(mentioningsFocusedInText) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
            payload: { mentioningsFocusedInText },
            meta: null
        };
    }
    /**
     * @param {?} mentioningsFocusedInTable
     * @return {?}
     */
    setMentioningsFocusedInTable(mentioningsFocusedInTable) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
            payload: { mentioningsFocusedInTable },
            meta: null
        };
    }
    /**
     * @return {?}
     */
    destroy() {
        return {
            type: ActiveProjectActions.DESTROY,
            payload: null,
            meta: null,
        };
    }
}
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
 * Generated from: state-schema/reducer-configs/dat.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const datRoot = 'dat';
/** @type {?} */
const facetteByPk = 'by_namespace';
const ɵ0 = /**
 * @param {?} newItem
 * @param {?} oldItem
 * @return {?}
 */
(newItem, oldItem) => {
    if (!oldItem.quill_doc && newItem.quill_doc)
        return false;
    return (newItem.pk_entity === oldItem.pk_entity &&
        newItem.entity_version === oldItem.entity_version);
}, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString() + '_' + item.entity_version.toString(), ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_text.toString(), ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ5 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_text.toString(), ɵ6 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ7 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_digital.toString(), ɵ8 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ9 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_column.toString(), ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ11 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_entity + '_' + item.fk_system_type, ɵ12 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project.toString();
/** @type {?} */
const datDefinitions = {
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
 * Generated from: state-schema/_helpers/schema-actions-factory.ts
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
class SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    createCrudActions(actionPrefix, modelName) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.load = (/**
         * @param {?=} suffix
         * @param {?=} pk
         * @return {?}
         */
        (suffix = '', pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
        });
        this.loadSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        /**
         * Call the Redux Action to upsert model instances.
         */
        this.upsert = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        (items, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
        });
        this.upsertSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
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
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: 'general::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        /**
        * Call the Redux Action to delete model instances.
        */
        this.delete = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        (items, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE',
                meta: { items, addPending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        this.deleteSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        this.failed = (/**
         * @param {?} error
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (error, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::FAILED',
                meta: { removePending, pk },
                payload: null,
                error,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPage = (/**
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
                meta: { page, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPageSucceeded = (/**
         * @param {?} pks
         * @param {?} count
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (pks, count, page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { page, pks, count, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPageFailed = (/**
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
                meta: { page, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        return this;
    }
}
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
 * Generated from: state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DigitalActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'digital'));
        this.loadVersion = (/**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @return {?}
         */
        (pkEntity, entityVersion) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                meta: { addPending, pkEntity, entityVersion },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
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
class ChunkActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
        this.loadChunksOfDigital = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
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
class ColumnActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'column'));
        this.loadColumnsOfTable = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
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
class DatActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
        this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
        this.column = new ColumnActionsFactory(this.ngRedux).createActions();
        this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
        this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
        this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
    }
}
DatActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DatActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatActions_Factory() { return new DatActions(ɵɵinject(NgRedux)); }, token: DatActions, providedIn: "root" });
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
 * Generated from: state-schema/reducer-configs/dfh.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const dfhRoot = 'dfh';
/** @type {?} */
const dfhLabelByFksKey = (/**
 * @param {?} item
 * @return {?}
 */
(item) => `${item.type || null}_${item.language || null}_${item.fk_class || null}_${item.fk_profile || null}_${item.fk_property || null}_${item.fk_project || null}`);
const ɵ0$1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_profile.toString(), ɵ1$1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_class.toString(), ɵ2$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.basic_type.toString(), ɵ3$1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_property + '_' + item.has_domain + '_' + item.has_range, ɵ4$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.pk_property.toString(), ɵ5$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_domain.toString(), ɵ6$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_range.toString(), ɵ7$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_domain + '_' + d.pk_property, ɵ8$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_range + '_' + d.pk_property, ɵ9$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined, ɵ10$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_class ? undefined : `${d.fk_class}_${d.type}`, ɵ11$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_property ? undefined : `${d.fk_property}_${d.type}`, ɵ12$1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_profile ? undefined : `${d.fk_profile}_${d.type}`;
/** @type {?} */
const dfhDefinitions = {
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
 * Generated from: state-schema/actions/dfh.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfhProfileActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhProfileActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhProfileActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhProfileActionFactory.prototype.ngRedux;
}
class DfhClassActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhClassActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhClassActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhClassActionFactory.prototype.ngRedux;
}
class DfhPropertyActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.ngRedux;
}
class DfhLabelActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhLabelActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhLabelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhLabelActionFactory.prototype.ngRedux;
}
class DfhActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
        this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
        this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
        this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
    }
}
DfhActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DfhActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DfhActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhActions_Factory() { return new DfhActions(ɵɵinject(NgRedux)); }, token: DfhActions, providedIn: "root" });
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
 * Generated from: state-schema/reducer-configs/inf.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const infRoot = 'inf';
const ɵ0$2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ1$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ2$2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ3$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ4$2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ5$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementBySubject(d), ɵ6$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementBySubjectProperty(d), ɵ7$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementByObject(d), ɵ8$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementByObjectProperty(d), ɵ9$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => U.toStr0undef(d.fk_subject_data), ɵ10$2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ11$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_concerned_entity + '_' + d.fk_class_field, ɵ12$2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_concerned_entity.toString(), ɵ13$1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ14 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ15 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ16 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ17 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ18 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
};
/** @type {?} */
const infDefinitions = {
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
function indexStatementBySubject(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}`;
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
function indexStatementByObject(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}`;
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
function indexStatementBySubjectProperty(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
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
function indexStatementByObjectProperty(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
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
 * Generated from: state-schema/_helpers/inf-action-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
class InfActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    createInfActions(actionPrefix, modelName) {
        this.createCrudActions(actionPrefix, modelName);
        /**
         * Call the Redux Action to remove model instances from project.
         */
        this.remove = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        (items, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
        });
        this.removeSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::REMOVE_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        return this;
    }
}
InfActionFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InfActionFactory.ctorParameters = () => [
    { type: NgRedux }
];
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
 * Generated from: state-schema/actions/inf.actions.ts
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
class InfPersistentItemActionFactory extends InfActionFactory {
    // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
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
        (pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        this.typesOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                meta: { addPending, pk: pkProject },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
    }
}
// Suffixes of load action types
// static readonly NESTED_BY_PK = 'NESTED_BY_PK';
InfPersistentItemActionFactory.MINIMAL_BY_PK = 'MINIMAL_BY_PK';
InfPersistentItemActionFactory.TYPES_OF_PROJECT = 'TYPES_OF_PROJECT';
InfPersistentItemActionFactory.TYPE_OF_PROJECT = 'TYPE_OF_PROJECT';
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
class InfTemporalEntityActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'));
        this.loadNestedObject = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @return {?}
         */
        (pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    fkTargetClass,
                    pkProperty,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: false
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    pkProperty,
                    fkTargetClass,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: true
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
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
class InfStatementActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
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
        (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty) => {
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
                meta: {
                    addPending: U.uuid(),
                    pk: pkProject,
                    ofProject,
                    pkEntity,
                    pkInfoRange,
                    pkInfoDomain,
                    pkProperty,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
        });
        this.loadIngoingAlternatives = (/**
         * @param {?} pkEntity
         * @param {?} pkProperty
         * @param {?} pkProject
         * @return {?}
         */
        (pkEntity, pkProperty, pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkEntity,
                    pkProperty,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    fkTargetClass,
                    pkProperty,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: false
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (ofProject, pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
                meta: {
                    addPending,
                    ofProject,
                    pk: pkProject,
                    pkEntity
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
// static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
InfStatementActionFactory.ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
// static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
InfStatementActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
InfStatementActionFactory.CONTENT_TREE = 'CONTENT_TREE';
InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
InfStatementActionFactory.BY_PARAMS = 'BY_PARAMS';
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
class InfTextPropertyActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'text_property'));
        this.loadAlternatives = (/**
         * @param {?} fkEntity
         * @param {?} fkClassField
         * @param {?} pkProject
         * @return {?}
         */
        (fkEntity, fkClassField, pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTextPropertyActionFactory.ALTERNATIVES,
                meta: {
                    addPending,
                    pk: pkProject,
                    fkEntity,
                    fkClassField,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
if (false) {
    /** @type {?} */
    InfTextPropertyActionFactory.ALTERNATIVES;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.loadAlternatives;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.ngRedux;
}
class InfActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
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
}
InfActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InfActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ InfActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function InfActions_Factory() { return new InfActions(ɵɵinject(NgRedux)); }, token: InfActions, providedIn: "root" });
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
 * Generated from: state-schema/reducer-configs/pro.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const proRoot = 'pro';
/** @type {?} */
const textPropertyByFksKey = (/**
 * @param {?} d
 * @return {?}
 */
(d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_language || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`);
/** @type {?} */
const textPropertyByFksWithoutLang = (/**
 * @param {?} d
 * @return {?}
 */
(d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`);
/** @type {?} */
const proClassFieldConfgByProjectAndClassKey = (/**
 * @param {?} d
 * @return {?}
 */
(d) => {
    /** @type {?} */
    const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
    return `${d.fk_project || null}_${fk_class || null}`;
});
const ɵ0$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ1$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project.toString() + '_' + item.fk_entity.toString(), ɵ2$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ3$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project + '_' + item.fk_class, ɵ4$3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project + '_' + d.enabled_in_entities, ɵ5$3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project.toString(), ɵ6$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project + '_' + item.fk_profile, ɵ7$3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project + '_' + d.enabled, ɵ8$3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project.toString(), ɵ9$3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString();
/** @type {?} */
const proDefinitions = {
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
 * Generated from: state-schema/actions/pro.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProProjectActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'project'));
        this.loadOfAccount = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        this.loadBasics = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProProjectActionFactory.OF_ACCOUNT = 'OF_ACCOUNT';
ProProjectActionFactory.LOAD_BASICS = 'LOAD_BASICS';
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
class ProInfoProjRelActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'info_proj_rel'));
        this.markStatementAsFavorite = (/**
         * @param {?} pkProject
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @return {?}
         */
        (pkProject, pkStatement, isOutgoing) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';
if (false) {
    /** @type {?} */
    ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.markStatementAsFavorite;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.ngRedux;
}
class ProDfhClassProjRelActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_class_proj_rel'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProDfhClassProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    ProDfhClassProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.ngRedux;
}
class ProDfhProfileProjRelActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'dfh_profile_proj_rel'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProDfhProfileProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.ngRedux;
}
class ProClassFieldConfigActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'class_field_config'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProClassFieldConfigActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    ProClassFieldConfigActionFactory.OF_PROJECT;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.ngRedux;
}
class ProTextPropertyActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'text_property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProTextPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    ProTextPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.ngRedux;
}
class ProAnalysisActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(proRoot, 'analysis'));
        this.loadByIdAndVersion = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} version
         * @return {?}
         */
        (pkProject, pkEntity, version) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ProAnalysisActionFactory.BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';
if (false) {
    /** @type {?} */
    ProAnalysisActionFactory.BY_PK_AND_VERSION;
    /** @type {?} */
    ProAnalysisActionFactory.prototype.loadByIdAndVersion;
    /** @type {?} */
    ProAnalysisActionFactory.prototype.ngRedux;
}
class ProActions {
    /**
     * @param {?} ngRedux
     */
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
}
ProActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ ProActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProActions_Factory() { return new ProActions(ɵɵinject(NgRedux)); }, token: ProActions, providedIn: "root" });
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
 * Generated from: state-schema/reducer-configs/sys.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const sysRoot = 'sys';
const ɵ0$4 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ1$4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ2$4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.required_by_sources.toString(), ɵ3$4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false', ɵ4$4 = /**
 * @return {?}
 */
() => 'main';
/** @type {?} */
const sysDefinitions = {
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
 * Generated from: state-schema/actions/sys.actions.ts
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
class SysActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
        // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
        //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
        this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
    }
}
SysActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SysActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ SysActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysActions_Factory() { return new SysActions(ɵɵinject(NgRedux)); }, token: SysActions, providedIn: "root" });
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
 * Generated from: state-schema/reducer-configs/tab.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const tabRoot = 'tab';
const ɵ0$5 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_cell.toString(), ɵ1$5 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_column + '_' + item.fk_row;
/** @type {?} */
const tabDefinitions = {
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
 * Generated from: state-schema/actions/tab.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TabActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
    }
}
TabActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TabActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ TabActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function TabActions_Factory() { return new TabActions(ɵɵinject(NgRedux)); }, token: TabActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    TabActions.prototype.cell;
    /** @type {?} */
    TabActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/war.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const warRoot = 'war';
const ɵ0$6 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString();
/** @type {?} */
const warDefinitions = {
    entity_preview: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0$6)
        }
    }
};

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WarActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
}
WarActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WarActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ WarActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function WarActions_Factory() { return new WarActions(ɵɵinject(NgRedux)); }, token: WarActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/services/schema.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class to put schema objects into store
 */
class SchemaService {
    /**
     * @param {?} api
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} warActions
     * @param {?} tabActions
     * @param {?} dfhActions
     * @param {?} sysActions
     * @param {?} notifications
     */
    constructor(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications) {
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
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    store(apiCall$, pkProject) {
        /** @type {?} */
        const s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    storeGv(apiCall$, pkProject) {
        /** @type {?} */
        const s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    }
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    storeSchemaObject(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
        }
    }
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    storeSchemaObjectGv(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                else if (schema === 'tab')
                    actions = this.tabActions;
                else if (schema === 'dfh')
                    actions = this.dfhActions;
                else if (schema === 'sys')
                    actions = this.sysActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
            // this.extendEntityPreviewStream(object, pkProject);
            console.warn('!!!!!!!! Need to call this.extendEntityPreviewStream(object, pkProject);');
        }
    }
}
SchemaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaService.ctorParameters = () => [
    { type: SchemaObjectApi },
    { type: InfActions },
    { type: ProActions },
    { type: DatActions },
    { type: WarActions },
    { type: TabActions },
    { type: DfhActions },
    { type: SysActions },
    { type: NotificationsAPIActions }
];
/** @nocollapse */ SchemaService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaService_Factory() { return new SchemaService(ɵɵinject(SchemaObjectApi), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(WarActions), ɵɵinject(TabActions), ɵɵinject(DfhActions), ɵɵinject(SysActions), ɵɵinject(NotificationsAPIActions)); }, token: SchemaService, providedIn: "root" });
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
 * Generated from: state-gui/epics/active-project.epics.ts
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
    t => t.fk_system_type === fkSystemType)) || { string: '' }).string;
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
class ActiveProjectEpics {
    /**
     * @param {?} sys
     * @param {?} dat
     * @param {?} dfh
     * @param {?} pro
     * @param {?} inf
     * @param {?} projectApi
     * @param {?} actions
     * @param {?} notificationActions
     * @param {?} loadingBarActions
     * @param {?} ngRedux
     * @param {?} schemaObj
     */
    constructor(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux, schemaObj) {
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
    createEpics() {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
    }
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    createLoadProjectBasicsEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            /**
           * Emit the global action that activates the loading bar
           */
            globalStore.next(this.loadingBarActions.startLoading());
            this.projectApi.getBasics(action.meta.pk_project)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                globalStore.next(this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
                this.schemaObj.storeSchemaObject({
                    inf: { language: [data[0].default_language] },
                    pro: { project: [omit(['default_language'], data[0])] }
                }, action.meta.pk_project);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error.message }
                }));
            }));
        }))))));
    }
    /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    createLoadProjectUpdatedEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), mapTo(this.loadingBarActions.completeLoading())));
    }
    /**
     * @private
     * @return {?}
     */
    createLoadProjectConfigEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            combineLatest(this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.sys.system_relevant_class.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.sys.config.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))))
                .pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            (res) => !res.includes(undefined))))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                globalStore.next(this.actions.loadProjectConfigSucceeded());
                globalStore.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            }));
        }))))));
    }
    /**
     * LAYOUT
     * @private
     * @return {?}
     */
    createClosePanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                this.ngRedux.getState().activeProject.panels.forEach((/**
                 * @param {?} panel
                 * @param {?} panelIndex
                 * @return {?}
                 */
                (panel, panelIndex) => {
                    if (panel.tabs.length === 0)
                        globalStore.next(this.actions.closePanel(panelIndex));
                }));
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createSplitPanelActivateTabEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.SPLIT_PANEL), map((/**
             * @param {?} action
             * @return {?}
             */
            (action) => {
                /** @type {?} */
                const p = this.ngRedux.getState().activeProject;
                /** @type {?} */
                const c = action.meta.currentPanelIndex;
                /** @type {?} */
                const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                return this.actions.activateTab(panelIndex, 0);
            })));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createActivateTabFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ACTIVATE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createMoveTabFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.MOVE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createClosePanelFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel > (this.ngRedux.getState().activeProject.panels.length - 1)) {
                    globalStore.next(this.actions.focusPanel(0));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createAddTabCloseListEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ADD_TAB), mapTo(this.actions.setListType('')));
        });
    }
}
ActiveProjectEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActiveProjectEpics.ctorParameters = () => [
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
];
/** @nocollapse */ ActiveProjectEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(ɵɵinject(SysActions), ɵɵinject(DatActions), ɵɵinject(DfhActions), ɵɵinject(ProActions), ɵɵinject(InfActions), ɵɵinject(ProProjectApi), ɵɵinject(ActiveProjectActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(LoadingBarActions), ɵɵinject(NgRedux), ɵɵinject(SchemaService)); }, token: ActiveProjectEpics, providedIn: "root" });
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
 * Generated from: state-gui/epics/loading-bar.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoadingBarEpics {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
    }
    /**
     * @private
     * @return {?}
     */
    createCompleteLoadingBarEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(LoadingBarActions.COPMLETE), switchMap((/**
         * @return {?}
         */
        () => {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                this.service.complete();
                // observer.next(this.actions.stopLoading())
            }));
        }))));
    }
    /**
     * @private
     * @return {?}
     */
    createStartLoadingBarEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(LoadingBarActions.START), switchMap((/**
         * @return {?}
         */
        () => {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                this.service.start();
            }));
        }))));
    }
}
LoadingBarEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LoadingBarEpics.ctorParameters = () => [
    { type: SlimLoadingBarService }
];
/** @nocollapse */ LoadingBarEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadingBarEpics_Factory() { return new LoadingBarEpics(ɵɵinject(SlimLoadingBarService$1)); }, token: LoadingBarEpics, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/notifications.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotificationsAPIEpics {
    /**
     * @param {?} toastyService
     * @param {?} toastyConfig
     */
    constructor(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.createAddToastEpic());
    }
    /**
     * @private
     * @return {?}
     */
    createAddToastEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            filter((/**
             * @param {?} a
             * @return {?}
             */
            (a) => {
                return a;
            })), ofType(NotificationsAPIActions.ADD_TOAST), switchMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                /**
                 * Add Toast
                 * @type {?}
                 */
                const a = (/** @type {?} */ (action));
                if (!a.payload.options.title && !a.payload.options.msg) {
                    if (a.payload.type === 'error') {
                        a.payload.options.title = 'Oops, something went wrong!';
                    }
                }
                this.toastyService[a.payload.type](a.payload.options);
            })))));
        });
    }
}
NotificationsAPIEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NotificationsAPIEpics.ctorParameters = () => [
    { type: ToastyService },
    { type: ToastyConfig }
];
/** @nocollapse */ NotificationsAPIEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function NotificationsAPIEpics_Factory() { return new NotificationsAPIEpics(ɵɵinject(ToastyService$1), ɵɵinject(ToastyConfig$1)); }, token: NotificationsAPIEpics, providedIn: "root" });
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
 * Generated from: state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActionResolverEpics {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    constructor() {
        this.createEpics = (/**
         * @return {?}
         */
        () => combineEpics(this.createResolveEpic()));
    }
    /**
     * @private
     * @return {?}
     */
    createResolveEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        action => !!action && !!action.meta && !!action.meta.removePending)), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))))));
    }
}
ActionResolverEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActionResolverEpics.ctorParameters = () => [];
/** @nocollapse */ ActionResolverEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/flattener.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
class ModelFlattener {
    /**
     * @param {?} actions
     * @param {?} modelDefinition
     * @param {?} flattenCb
     */
    constructor(actions, modelDefinition, flattenCb) {
        this.actions = actions;
        this.modelDefinition = modelDefinition;
        this.flattenCb = flattenCb;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    flatten(items) {
        if (items && items.length > 0) {
            this.flattenCb(items);
            // todo remove properties of those objects, using getModelDefinition()
            /** @type {?} */
            const keysToOmit = keys(this.modelDefinition.relations).map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.toString()));
            this.items = [
                ...(this.items || []),
                ...(/** @type {?} */ (items.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => !!item && Object.keys(item).length > 0))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => omit(keysToOmit, item)))))
            ];
        }
        return true;
    }
}
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
class Flattener {
    /**
     * @param {?} infActions
     * @param {?} datActions
     * @param {?} proActions
     */
    constructor(infActions, datActions, proActions) {
        this.infActions = infActions;
        this.datActions = datActions;
        this.proActions = proActions;
        this.info_proj_rel = new ModelFlattener(this.proActions.info_proj_rel, ProInfoProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProInfoProjRel(item);
            }));
        }));
        this.pro_dfh_class_proj_rel = new ModelFlattener(this.proActions.dfh_class_proj_rel, ProDfhClassProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProDfhClassProjRel(item);
            }));
        }));
        this.pro_dfh_profile_proj_rel = new ModelFlattener(this.proActions.dfh_profile_proj_rel, ProDfhProfileProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProDfhProfileProjRel(item);
            }));
        }));
        this.persistent_item = new ModelFlattener(this.infActions.persistent_item, InfPersistentItem.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfPersistentItem(item);
                this.statement.flatten(item.incoming_statements);
                this.statement.flatten(item.outgoing_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.temporal_entity = new ModelFlattener(this.infActions.temporal_entity, InfTemporalEntity.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTemporalEntity(item);
                this.statement.flatten(item.outgoing_statements);
                this.statement.flatten(item.incoming_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.statement = new ModelFlattener(this.infActions.statement, InfStatement.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfStatement(item);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
                // Subject
                if (item.subject_temporal_entity)
                    this.temporal_entity.flatten([item.subject_temporal_entity]);
                else if (item.subject_statement)
                    this.statement.flatten([item.subject_statement]);
                // Object
                if (item.object_persistent_item)
                    this.persistent_item.flatten([item.object_persistent_item]);
                else if (item.object_appellation)
                    this.appellation.flatten([item.object_appellation]);
                else if (item.object_place)
                    this.place.flatten([item.object_place]);
                else if (item.object_time_primitive)
                    this.time_primitive.flatten([item.object_time_primitive]);
                else if (item.object_language)
                    this.language.flatten([item.object_language]);
                else if (item.subject_chunk)
                    this.chunk.flatten([item.subject_chunk]);
                else if (item.object_lang_string)
                    this.lang_string.flatten([item.object_lang_string]);
                else if (item.object_dimension)
                    this.dimension.flatten([item.object_dimension]);
            }));
        }));
        this.appellation = new ModelFlattener(this.infActions.appellation, InfAppellation.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfAppellation(item);
            }));
        }));
        this.place = new ModelFlattener(this.infActions.place, InfPlace.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfPlace(item);
            }));
        }));
        this.time_primitive = new ModelFlattener(this.infActions.time_primitive, InfTimePrimitive.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTimePrimitive(item);
            }));
        }));
        this.language = new ModelFlattener(this.infActions.language, InfLanguage.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfLanguage(item);
            }));
        }));
        this.lang_string = new ModelFlattener(this.infActions.lang_string, InfLangString.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfLangString(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.dimension = new ModelFlattener(this.infActions.dimension, InfDimension.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfDimension(item);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.text_property = new ModelFlattener(this.infActions.text_property, InfTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTextProperty(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.digital = new ModelFlattener(this.datActions.digital, DatDigital.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new DatDigital(item);
            }));
        }));
        this.chunk = new ModelFlattener(this.datActions.chunk, DatChunk.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new DatChunk(item);
                this.statement.flatten(item.outgoing_statements);
            }));
        }));
        this.pro_project = new ModelFlattener(this.proActions.project, ProProject.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProProject(item);
                this.language.flatten([item.default_language]);
            }));
        }));
        this.pro_text_property = new ModelFlattener(this.proActions.text_property, ProTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProTextProperty(item);
                this.language.flatten([item.language]);
            }));
        }));
        this.pro_class_field_config = new ModelFlattener(this.proActions.class_field_config, ProClassFieldConfig.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProClassFieldConfig(item);
            }));
        }));
        this.analysis = new ModelFlattener(this.proActions.analysis, { relations: [] }, (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => { }));
        }));
    }
    /**
     * @return {?}
     */
    getFlattened() {
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
    }
}
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
const storeFlattened = (/**
 * @param {?} flattened
 * @param {?=} pk
 * @param {?=} type
 * @return {?}
 */
(flattened, pk, type) => {
    values(flattened).forEach((/**
     * @param {?} model
     * @return {?}
     */
    model => {
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
 * Generated from: state-schema/_helpers/schema-epics-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
class SchemaEpicsFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @param {?} actions
     * @param {?} notifications
     */
    constructor(actionPrefix, modelName, actions, notifications) {
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
    createLoadEpic(apiFn, actionSuffix, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.type('LOAD', actionSuffix)), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk, meta);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    createUpsertEpic(apiFn, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * @param {?} apiFn
     * @return {?}
     */
    createDeleteEpic(apiFn) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                apiFn(action.meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    type(operation, actionSuffix) {
        return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '');
    }
    /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    onError(globalActions, error, pendingKey, pkProject) {
        globalActions.next(this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
        }));
        this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
    }
}
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
 * Generated from: state-schema/epics/dat.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatEpics {
    /**
     * @param {?} notification
     * @param {?} datActions
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} digitalApi
     * @param {?} chunkApi
     * @param {?} columnApi
     * @param {?} namespaceApi
     * @param {?} schemaObjectService
     */
    constructor(notification, datActions, infActions, proActions, digitalApi, chunkApi, columnApi, namespaceApi, schemaObjectService) {
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
    createEpics() {
        /** @type {?} */
        const digitalEpicsFactory = new SchemaEpicsFactory(datRoot, 'digital', this.datActions.digital, this.notification);
        /** @type {?} */
        const chunkEpicsFactory = new SchemaEpicsFactory(datRoot, 'chunk', this.datActions.chunk, this.notification);
        /** @type {?} */
        const namespaceEpicsFactory = new SchemaEpicsFactory(datRoot, 'namespace', this.datActions.namespace, this.notification);
        /** @type {?} */
        const columnEpicsFactory = new SchemaEpicsFactory(datRoot, 'column', this.datActions.column, this.notification);
        return combineEpics(
        // Digital
        digitalEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null)), DigitalActionsFactory.LOAD_VERSION), digitalEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items))), digitalEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.bulkDelete(meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.pk_entity))))), 
        // Chunk
        chunkEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.chunkApi.ofDigital(meta.pk, meta.pkDigital)), ChunkActionsFactory.CHUNKS_OF_DIGITAL, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.chunk.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), 
        // Namespace
        namespaceEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.namespaceApi.byProject(meta.pk)), ''), columnEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.columnApi.ofDigital(meta.pk, meta.pkDigital)), ColumnActionsFactory.COLUMNS_OF_TABLE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    }
}
DatEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatEpics.ctorParameters = () => [
    { type: NotificationsAPIActions },
    { type: DatActions },
    { type: InfActions },
    { type: ProActions },
    { type: DatDigitalApi },
    { type: DatChunkApi },
    { type: DatColumnApi },
    { type: DatNamespaceApi },
    { type: SchemaService }
];
/** @nocollapse */ DatEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatEpics_Factory() { return new DatEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(DatActions), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatDigitalApi), ɵɵinject(DatChunkApi), ɵɵinject(DatColumnApi), ɵɵinject(DatNamespaceApi), ɵɵinject(SchemaService)); }, token: DatEpics, providedIn: "root" });
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
 * Generated from: state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfhEpics {
    /**
     * @param {?} actions
     * @param {?} notification
     * @param {?} profileApi
     * @param {?} classApi
     * @param {?} propertyApi
     * @param {?} labelApi
     */
    constructor(actions, notification, profileApi, classApi, propertyApi, labelApi) {
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
    createEpics() {
        /** @type {?} */
        const dfhProfileEpicsFactory = new SchemaEpicsFactory('dfh', 'profile', this.actions.profile, this.notification);
        /** @type {?} */
        const dfhClassEpicsFactory = new SchemaEpicsFactory('dfh', 'klass', this.actions.klass, this.notification);
        /** @type {?} */
        const dfhLabelEpicsFactory = new SchemaEpicsFactory('dfh', 'label', this.actions.label, this.notification);
        /** @type {?} */
        const dfhPropertyEpicsFactory = new SchemaEpicsFactory('dfh', 'property', this.actions.property, this.notification);
        return combineEpics(
        // Profile Loaders
        dfhProfileEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.profileApi.ofProject(meta.pk)), DfhProfileActionFactory.OF_PROJECT), 
        // Property Loaders
        dfhPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.propertyApi.dfhPropertyControllerOfProject(meta.pk)), DfhPropertyActionFactory.OF_PROJECT), 
        // Class Loaders
        dfhClassEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classApi.dfhClassControllerOfProject(meta.pk)), DfhClassActionFactory.OF_PROJECT), 
        // Label Loaders
        dfhLabelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.labelApi.ofProject(meta.pk)), DfhLabelActionFactory.OF_PROJECT));
    }
}
DfhEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DfhEpics.ctorParameters = () => [
    { type: DfhActions },
    { type: NotificationsAPIActions },
    { type: DfhProfileApi },
    { type: DfhClassControllerService },
    { type: DfhPropertyControllerService },
    { type: DfhLabelApi }
];
/** @nocollapse */ DfhEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhEpics_Factory() { return new DfhEpics(ɵɵinject(DfhActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(DfhProfileApi), ɵɵinject(DfhClassControllerService), ɵɵinject(DfhPropertyControllerService), ɵɵinject(DfhLabelApi)); }, token: DfhEpics, providedIn: "root" });
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
 * Generated from: state-schema/_helpers/inf-epic-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Payload, Model
 */
class InfEpicsFactory extends SchemaEpicsFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @param {?} actions
     * @param {?} notifications
     * @param {?} infoProjRelApi
     * @param {?} proActions
     */
    constructor(actionPrefix, modelName, actions, notifications, infoProjRelApi, proActions) {
        super(actionPrefix, modelName, actions, notifications);
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.actions = actions;
        this.notifications = notifications;
        this.infoProjRelApi = infoProjRelApi;
        this.proActions = proActions;
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    createUpsertEpic(apiFn, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ (action.meta));
                // add is_in_project true
                meta.items = meta.items.map((/**
                 * @param {?} i
                 * @return {?}
                 */
                i => (Object.assign({}, i, { entity_version_project_rels: [Object.assign({}, pathOr({}, ['entity_version_project_rels', 0], i), { is_in_project: true })] }))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    createRemoveEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::REMOVE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                this.infoProjRelApi.bulkUpdateEprAttributes(action.meta.pk, action.meta.items.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => ({
                    fk_entity: item.pk_entity,
                    is_in_project: false
                }))))
                    .subscribe((/**
                 * @param {?} infoProjRels
                 * @return {?}
                 */
                (infoProjRels) => {
                    if (infoProjRels.length) {
                        this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk);
                    }
                    this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
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
    createCustomUpsertEpic(apiFn, actionSuffix, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ (action.meta));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
}
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
 * Generated from: state-schema/epics/inf.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InfEpics {
    /**
     * @param {?} notification
     * @param {?} peItApi
     * @param {?} teEnApi
     * @param {?} statementApi
     * @param {?} textPropertyApi
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} infoProjRelApi
     * @param {?} schemaObjectService
     */
    constructor(notification, peItApi, teEnApi, statementApi, textPropertyApi, infActions, proActions, datActions, infoProjRelApi, schemaObjectService) {
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
    createEpics() {
        /** @type {?} */
        const infPersistentItemEpicsFactory = new InfEpicsFactory(infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infTemporalEntityEpicsFactory = new InfEpicsFactory(infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infStatementEpicsFactory = new InfEpicsFactory(infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infTextPropertyEpicsFactory = new InfEpicsFactory(infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);
        return combineEpics(
        /**
         * Perstistent Item
         *
         */
        infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.peItApi.ownProperties(meta.pk, meta.pkEntity)), InfPersistentItemActionFactory.MINIMAL_BY_PK, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            // call action to store records
            Object.keys(schemas).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                if (actions) {
                    Object.keys(schemas[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(schemas[schema][model], undefined, pk);
                    }));
                }
            }));
        })), infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.peItApi.typesOfProject(meta.pk)), InfPersistentItemActionFactory.TYPES_OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ (results));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
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
        (meta) => this.peItApi
            .findOrCreateInfPersistentItems(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.teEnApi.ownProperties(meta.pk, meta.pkEntity)), InfTemporalEntityActionFactory.OWN_PROPERTIES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ (results));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), (/**
         * Epic to load paginated Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.teEnApi.temporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), (/**
         * Epic to load paginated Alternative Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.teEnApi.alternativeTemporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = null;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), infTemporalEntityEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.teEnApi
            .findOrCreateInfTemporalEntities(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk)), InfStatementActionFactory.ALTERNATIVES_INGOING, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infStatementEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi
            .findOrCreateInfStatements(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infStatementEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.statementApi.paginatedListTargetingEntityPreviews(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), infStatementEpicsFactory.createRemoveEpic(), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty)), InfStatementActionFactory.BY_PARAMS, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        })), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity)), InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const res = (/** @type {?} */ ((/** @type {?} */ (results))));
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(res.statements);
            storeFlattened(flattener.getFlattened(), pk);
            /** @type {?} */
            const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.textPropertyApi
            .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField)), InfTextPropertyActionFactory.ALTERNATIVES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi
            .findOrCreateInfTextProperties(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), infTextPropertyEpicsFactory.createRemoveEpic());
    }
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
    handleTemporalEntityListAction(action, epicsFactory, globalActions, apiCall$, pkProject) {
        /** @type {?} */
        const meta = action.meta;
        /** @type {?} */
        const scope = meta.alternatives ? { notInProject: pkProject } : { inProject: pkProject };
        /** @type {?} */
        const req = {
            fkSourceEntity: meta.pkSourceEntity,
            fkProperty: meta.pkProperty,
            isOutgoing: meta.isOutgoing,
            targetClass: meta.fkTargetClass,
            limit: meta.limit,
            offset: meta.offset,
            scope,
        };
        /** @type {?} */
        const pendingKey = meta.addPending;
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(req, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            // call action to store records
            this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, req, pkProject);
            // call action to conclude the pending request
            epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            // call action to handle error
            epicsFactory.onError(globalActions, error, pendingKey, pkProject);
        }));
    }
}
InfEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InfEpics.ctorParameters = () => [
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
];
/** @nocollapse */ InfEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function InfEpics_Factory() { return new InfEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(InfPersistentItemApi), ɵɵinject(InfTemporalEntityApi), ɵɵinject(InfStatementApi), ɵɵinject(InfTextPropertyApi), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(ProInfoProjRelApi), ɵɵinject(SchemaService)); }, token: InfEpics, providedIn: "root" });
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
 * Generated from: state-schema/epics/pro.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProEpics {
    /**
     * @param {?} notification
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} projectApi
     * @param {?} infoProjRelApi
     * @param {?} classProjRelApi
     * @param {?} profileProjRelApi
     * @param {?} classFieldConfApi
     * @param {?} textPropertyApi
     * @param {?} analysisApi
     * @param {?} schemaObjectService
     */
    constructor(notification, infActions, proActions, datActions, projectApi, infoProjRelApi, classProjRelApi, profileProjRelApi, classFieldConfApi, textPropertyApi, analysisApi, schemaObjectService) {
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
    createEpics() {
        /** @type {?} */
        const proProjectEpicsFactory = new SchemaEpicsFactory(proRoot, 'project', this.proActions.project, this.notification);
        /** @type {?} */
        const proInfoProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);
        /** @type {?} */
        const proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);
        /** @type {?} */
        const proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);
        /** @type {?} */
        const proClassFieldConfigEpicsFactory = new SchemaEpicsFactory(proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);
        /** @type {?} */
        const proTextPropertyEpicsFactory = new SchemaEpicsFactory(proRoot, 'text_property', this.proActions.text_property, this.notification);
        /** @type {?} */
        const proAnalysisEpicsFactory = new SchemaEpicsFactory(proRoot, 'analysis', this.proActions.analysis, this.notification);
        return combineEpics(
        /**
        * ProProject
        */
        proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.projectApi
            .ofAccount(meta.pk)), ProProjectActionFactory.OF_ACCOUNT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.projectApi
            .getBasics(meta.pk)), ProProjectActionFactory.LOAD_BASICS, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.infoProjRelApi
            .bulkUpdateEprAttributes(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), proInfoProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.infoProjRelApi
            .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing)), ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.classFieldConfApi.ofProject(meta.pk)), ProClassFieldConfigActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proClassFieldConfigEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classFieldConfApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.classProjRelApi.ofProject(meta.pk)), ProDfhClassProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhClassProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classProjRelApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.profileProjRelApi.ofProject(meta.pk)), ProDfhProfileProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhProfileProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.profileProjRelApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.textPropertyApi.ofProject(meta.pk)), ProTextPropertyActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi.bulkDelete(meta.pk, meta.items))), 
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
        (meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.pk_entity))))));
    }
}
ProEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProEpics.ctorParameters = () => [
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
];
/** @nocollapse */ ProEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProEpics_Factory() { return new ProEpics(ɵɵinject(NotificationsAPIActions), ɵɵinject(InfActions), ɵɵinject(ProActions), ɵɵinject(DatActions), ɵɵinject(ProProjectApi), ɵɵinject(ProInfoProjRelApi), ɵɵinject(ProDfhClassProjRelApi), ɵɵinject(ProDfhProfileProjRelApi), ɵɵinject(ProClassFieldConfigApi), ɵɵinject(ProTextPropertyApi), ɵɵinject(AnalysisService), ɵɵinject(SchemaService)); }, token: ProEpics, providedIn: "root" });
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
 * Generated from: state-schema/actions/schema.actions.ts
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
class GvSchemaActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    loadGvSchemaObject(apiCall$) {
        /** @type {?} */
        const addPending = U.uuid();
        /** @type {?} */
        const action = {
            type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
            meta: { addPending },
            payload: apiCall$,
        };
        this.ngRedux.dispatch(action);
    }
    /**
     * Action for loading GvPaginationObject into the store
     * @param {?} req
     * @return {?}
     */
    loadGvPaginationObject(req) {
        /** @type {?} */
        const addPending = U.uuid();
        /** @type {?} */
        const action = {
            type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
            meta: { addPending, req },
        };
        this.ngRedux.dispatch(action);
    }
}
GvSchemaActions.GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
GvSchemaActions.GV_PAGINATION_OBJECT_LOAD = 'GV_PAGINATION_OBJECT::LOAD';
GvSchemaActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
GvSchemaActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ GvSchemaActions.ngInjectableDef = ɵɵdefineInjectable({ factory: function GvSchemaActions_Factory() { return new GvSchemaActions(ɵɵinject(NgRedux)); }, token: GvSchemaActions, providedIn: "root" });
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
 * Generated from: state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SchemaEpics {
    /**
     * @param {?} schemaObjectService
     * @param {?} loadingBarActions
     * @param {?} notificationActions
     * @param {?} infActions
     * @param {?} pag
     */
    constructor(schemaObjectService, loadingBarActions, notificationActions, infActions, pag) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
        this.pag = pag;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics((/**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        (actionEmitter) => {
            actionEmitter.next(this.loadingBarActions.startLoading());
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this.schemaObjectService.storeSchemaObjectGv(data, 0);
                actionEmitter.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                actionEmitter.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })))))), (/**
         * Epic for loading GvPaginationObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvPaginationObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        (actionEmitter) => {
            actionEmitter.next(this.loadingBarActions.startLoading());
            /** @type {?} */
            const pkProject = store.value.activeProject.pk_project;
            /** @type {?} */
            const meta = action.meta;
            // call action to set pagination loading on true
            this.infActions.statement.loadPage(meta.req.page, pkProject);
            this.pag.paginatedStatementsControllerLoadSubfieldPage(action.meta.req)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                // call action to store records
                this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                // call action to store page informations
                for (const subfieldPage of data.subfieldPages) {
                    this.infActions.statement.loadPageSucceeded(subfieldPage.paginatedStatements, subfieldPage.count, subfieldPage.page, pkProject);
                }
                // call action to complete loading bar
                actionEmitter.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                actionEmitter.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })))))));
    }
}
SchemaEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaEpics.ctorParameters = () => [
    { type: SchemaService },
    { type: LoadingBarActions },
    { type: NotificationsAPIActions },
    { type: InfActions },
    { type: PaginatedStatementsControllerService }
];
/** @nocollapse */ SchemaEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(ɵɵinject(SchemaService), ɵɵinject(LoadingBarActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(InfActions), ɵɵinject(PaginatedStatementsControllerService)); }, token: SchemaEpics, providedIn: "root" });
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
 * Generated from: state-schema/epics/sys.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SysEpics {
    /**
     * @param {?} actions
     * @param {?} notification
     * @param {?} sysRelevantClassApi
     * @param {?} sysConfigApi
     */
    constructor(actions, notification, sysRelevantClassApi, sysConfigApi) {
        this.actions = actions;
        this.notification = notification;
        this.sysRelevantClassApi = sysRelevantClassApi;
        this.sysConfigApi = sysConfigApi;
    }
    /**
     * @return {?}
     */
    createEpics() {
        /** @type {?} */
        const systemRelevantClassEpicsFactory = new SchemaEpicsFactory(sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);
        // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
        //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);
        /** @type {?} */
        const configEpicsFactory = new SchemaEpicsFactory(sysRoot, 'config', this.actions.config, this.notification);
        return combineEpics(
        // SystemRelevantClass Epics
        systemRelevantClassEpicsFactory.createLoadEpic((/**
         * @param {?} action
         * @return {?}
         */
        (action) => this.sysRelevantClassApi.find()), ''), systemRelevantClassEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items))), 
        // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),
        configEpicsFactory.createLoadEpic((/**
         * @return {?}
         */
        () => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        x => [x])))), ''));
    }
}
SysEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SysEpics.ctorParameters = () => [
    { type: SysActions },
    { type: NotificationsAPIActions },
    { type: SysSystemRelevantClassApi },
    { type: SystemConfigurationService }
];
/** @nocollapse */ SysEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysEpics_Factory() { return new SysEpics(ɵɵinject(SysActions), ɵɵinject(NotificationsAPIActions), ɵɵinject(SysSystemRelevantClassApi), ɵɵinject(SystemConfigurationService)); }, token: SysEpics, providedIn: "root" });
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
 * Generated from: root/root-epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RootEpics {
    /**
     * @param {?} loadingBarEpics
     * @param {?} notificationEpics
     * @param {?} activeProjectEpics
     * @param {?} accountEpics
     * @param {?} sysEpics
     * @param {?} dfhEpics
     * @param {?} infEpics
     * @param {?} datEpics
     * @param {?} proEpics
     * @param {?} schemaObjectEpics
     * @param {?} actionResolver
     */
    constructor(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, sysEpics, dfhEpics, infEpics, datEpics, proEpics, schemaObjectEpics, actionResolver) {
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
        (action$, state$, dependencies = undefined) => {
            return this.rootEpicStream$.pipe(mergeMap((/**
             * @param {?} epic
             * @return {?}
             */
            (epic) => epic(action$, state$, dependencies))));
        });
    }
    /**
     * @return {?}
     */
    getRootEpic() {
        return this.rootEpic;
    }
    /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    addEpic(epic) {
        this.rootEpicStream$.next(epic);
    }
}
RootEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RootEpics.ctorParameters = () => [
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
];
/** @nocollapse */ RootEpics.ngInjectableDef = ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(ɵɵinject(LoadingBarEpics), ɵɵinject(NotificationsAPIEpics), ɵɵinject(ActiveProjectEpics), ɵɵinject(AccountEpics), ɵɵinject(SysEpics), ɵɵinject(DfhEpics), ɵɵinject(InfEpics), ɵɵinject(DatEpics), ɵɵinject(ProEpics), ɵɵinject(SchemaEpics), ɵɵinject(ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
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
 * Generated from: state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
/** @type {?} */
const accountRootReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = Object.assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = Object.assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
});

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/loading-bar.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE$1 = {
    loading: false,
    progress: 0,
};
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function loadingBarReducer(state = INITIAL_STATE$1, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
    switch (action.type) {
        case LoadingBarActions.START:
            return Object.assign({}, state, { loading: true });
        case LoadingBarActions.STOP:
            return Object.assign({}, state, { loading: false });
        case LoadingBarActions.COPMLETE:
            return Object.assign({}, state, { loading: false });
    }
    return state;
}
;

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/active-project.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE$2 = {
    label: '',
    list: '',
    uiIdSerial: 0,
    panelSerial: 0,
    focusedPanel: 0,
    panels: []
};
/** @type {?} */
const activeProjectReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = INITIAL_STATE$2, action) => {
    /** @type {?} */
    let pi;
    /** @type {?} */
    let ti;
    /** @type {?} */
    let ppi;
    /** @type {?} */
    let cpi;
    /** @type {?} */
    let pti;
    /** @type {?} */
    let cti;
    switch (action.type) {
        /************************************************************************************
         * Load project data (metadata, crm)
        ************************************************************************************/
        case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
            state = Object.assign({}, state, action.meta.projectPreview);
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG:
            state = Object.assign({}, state, { loadingConfigData: true });
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
            state = Object.assign({}, state, { configDataInitialized: true, loadingConfigData: false });
            break;
        /************************************************************************************
         * Layout -- Tabs
        ************************************************************************************/
        case ActiveProjectActions.SET_PANELS:
            state = Object.assign({}, state, { panels: action.meta.panels, uiIdSerial: action.meta.uiIdSerial, panelSerial: action.meta.panelSerial, focusedPanel: action.meta.focusedPanel });
            break;
        case ActiveProjectActions.SET_LIST_TYPE:
            state = Object.assign({}, state, { list: action.meta.list });
            break;
        case ActiveProjectActions.ACTIVATE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs].map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => {
                            tab.active = (index === ti);
                            return tab;
                        })) })
                }) });
            break;
        case ActiveProjectActions.MOVE_TAB:
            ppi = action.meta.previousPanelIndex;
            cpi = action.meta.currentPanelIndex;
            pti = action.meta.previousTabIndex;
            cti = action.meta.currentTabIndex;
            if (ppi === cpi) {
                /** @type {?} */
                const tabs = [...state.panels[cpi].tabs];
                moveItemInArray(tabs, pti, cti);
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [cpi]: Object.assign({}, state.panels[cpi], { tabs })
                    }) });
            }
            else {
                /** @type {?} */
                const pTabs = [...state.panels[ppi].tabs];
                /** @type {?} */
                const cTabs = [...state.panels[cpi].tabs];
                transferArrayItem(pTabs, cTabs, pti, cti);
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [ppi]: Object.assign({}, state.panels[ppi], { tabs: pTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === (pti < pTabs.length ? pti : (pti - 1)));
                                return tab;
                            })) }),
                        [cpi]: Object.assign({}, state.panels[cpi], { tabs: cTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === cti);
                                return tab;
                            })) })
                    }) });
            }
            break;
        case ActiveProjectActions.ADD_TAB:
            if (state.panels.length === 0) {
                state = Object.assign({}, state, { panels: [
                        {
                            id: state.panelSerial,
                            tabs: []
                        }
                    ], focusedPanel: 0, panelSerial: state.panelSerial + 1 });
            }
            pi = state.focusedPanel;
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [
                            ...state.panels[pi].tabs.map((/**
                             * @param {?} t
                             * @return {?}
                             */
                            t => {
                                t.active = false;
                                return t;
                            })),
                            Object.assign({}, omit(['pathSegment'], action.meta.tab), { path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()] })
                        ] })
                }), uiIdSerial: (state.uiIdSerial + 1) });
            break;
        case ActiveProjectActions.CLOSE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            // remove the closing tab
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs]
                            .filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => index !== ti)) })
                }) });
            // activate a sibling tab, if needed and possible
            if (!state.panels[pi].tabs.find((/**
             * @param {?} t
             * @return {?}
             */
            t => t.active))) {
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs]
                                .map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                                return tab;
                            })) })
                    }) });
            }
            break;
        case ActiveProjectActions.CLOSE_PANEL:
            pi = action.meta.panelIndex;
            /** @type {?} */
            const panels = [...state.panels];
            panels.splice(pi, 1);
            state = Object.assign({}, state, { panels });
            break;
        case ActiveProjectActions.FOCUS_PANEL:
            state = Object.assign({}, state, { focusedPanel: action.meta.panelIndex });
            break;
        case ActiveProjectActions.SPLIT_PANEL:
            ppi = action.meta.previousPanelIndex;
            ti = action.meta.tabIndex;
            cpi = action.meta.currentPanelIndex;
            /** @type {?} */
            const moveTab = state.panels[ppi].tabs[ti];
            // removes tab from old panel
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [ppi]: Object.assign({}, state.panels[ppi], { tabs: [...state.panels[ppi].tabs]
                            .filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => index !== ti))
                            .map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => {
                            if (index === 0)
                                tab.active = true;
                            return tab;
                        })) })
                }) });
            // insert a new panel at position of cpi
            /** @type {?} */
            const newPanels = [...state.panels];
            newPanels.splice(cpi, 0, {
                id: state.panelSerial,
                tabs: [moveTab]
            });
            state = Object.assign({}, state, { panels: newPanels, panelSerial: state.panelSerial + 1 });
            break;
        case ActiveProjectActions.SET_REFINING_CHUNK:
            state = Object.assign({}, state, { refiningChunk: action.payload.refiningChunk });
            break;
        case ActiveProjectActions.SET_CREATING_MENTIONING:
            state = Object.assign({}, state, { creatingMentioning: action.payload.creatingMentioning });
            break;
        /************************************************************************************
        * Highlighting of mentionings in the gui
        ************************************************************************************/
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
            state = Object.assign({}, state, { mentioningsFocusedInText: action.payload.mentioningsFocusedInText });
            break;
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
            state = Object.assign({}, state, { mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable });
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
 * Generated from: state-gui/models/entity-list.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Information {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
if (false) {
    /** @type {?} */
    Information.prototype.items;
    /** @type {?} */
    Information.prototype.loading;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/entity-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InformationAPIActions {
    constructor() {
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        () => ({
            type: InformationAPIActions.DESTROY,
            meta: null,
            payload: null
        }));
    }
}
InformationAPIActions.DESTROY = 'Information::DESTROY';
InformationAPIActions.decorators = [
    { type: Injectable }
];
__decorate([
    dispatch(),
    __metadata("design:type", Object)
], InformationAPIActions.prototype, "destroy", void 0);
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
 * Generated from: state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE$3 = new Information();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function informationReducer(state = INITIAL_STATE$3, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
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
 * Generated from: state-gui/actions/source-list.actions.ts
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
class SourceListAPIActions {
    constructor() {
        /**
         * ******************************************************************
         *  Actions to manage the list
         * *******************************************************************
         */
        this.initializeList = (/**
         * @param {?} pkAllowedClasses
         * @return {?}
         */
        (pkAllowedClasses) => ({
            type: SourceListAPIActions.INITIALIZE_LIST,
            meta: { pkAllowedClasses },
            payload: null
        }));
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        () => ({
            type: SourceListAPIActions.DESTROY,
            meta: null,
            payload: null
        }));
    }
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
 * Generated from: state-gui/models/source-list.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
class SourceList {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
if (false) {
    /** @type {?} */
    SourceList.prototype.list;
    /** @type {?} */
    SourceList.prototype.loading;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE$4 = new SourceList();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
function sourceListReducer(state = INITIAL_STATE$4, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = Object.assign({}, state, { list: {
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
 * Generated from: state-gui/actions/projects.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ProjectsActions {
    /**
     * @param {?} payload
     * @return {?}
     */
    loadProjectsSucceeded(payload) {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload,
            meta: null
        };
    }
}
ProjectsActions.LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';
ProjectsActions.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ProjectsActions.LOAD_PROJECTS_SUCCEEDED;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INITIAL_STATE$5 = {
    records: []
};
/** @type {?} */
const projectListReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = INITIAL_STATE$5, action) => {
    switch (action.type) {
        case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return Object.assign({}, lastState, { records: action.payload.map((/**
             * @param {?} record
             * @return {?}
             */
            (record) => ({ record: record }))) });
    }
    return lastState;
});
const ɵ0$7 = projectListReducer;
/** @type {?} */
const createProjectsReducer = (/**
 * @return {?}
 */
() => {
    return projectListReducer;
});

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/subfieldIdToString.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} x
 * @return {?}
 */
function subfieldIdToString(x) {
    return `${x.fkSourceEntity}_${x.fkProperty}_${x.isOutgoing ? 'out' : 'in'}_${x.targetClass}_${keys(x.scope)[0]}_${values(x.scope)[0]}`;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PR_ENTITY_MODEL_MAP = 'pkEntityModelMap';
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
const by = (/**
 * @param {?} name
 * @return {?}
 */
(name) => 'by_' + name);
// export const paginateName = (pagBy: PaginateByParam[]) => pagBy.map(p => Object.keys(p)[0]).join('__');
// export const pag = (name: string) => 'pag_' + name;
// export const paginatedBy = (name: string) => pag(by(name));
// export const paginateKey = (pagBy: PaginateByParam[]) => pagBy.map(p => values(p)[0]).join('_');
/** @type {?} */
const paginateBy = 'by_subfield_page';
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
class ReducerFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} configs
     */
    constructor(actionPrefix, configs) {
        this.actionPrefix = actionPrefix;
        this.configs = configs;
        this.updatingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'updating_' + by(name));
        this.deletingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'deleting_' + by(name));
        this.removingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'removing_' + by(name));
    }
    /**
     * @return {?}
     */
    createReducers() {
        /** @type {?} */
        const reducers = {};
        U.obj2KeyValueArr(this.configs).forEach((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            reducers[x.key] = this.createModelReducers(x.key, x.value);
        }));
        /** @type {?} */
        const entityModelMapReducers = keys(this.configs).map((/**
         * @param {?} modelName
         * @return {?}
         */
        modelName => this.createEntityModelMapReducers(modelName)));
        reducers[PR_ENTITY_MODEL_MAP] = composeReducers(...entityModelMapReducers);
        return combineReducers(reducers);
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    createModelReducers(modelName, config) {
        /** @type {?} */
        const actionPrefix = this.actionPrefix;
        /** @type {?} */
        const reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        (state = {}, action) => {
            /** @type {?} */
            const facette = this.facette(modelName, config);
            if (action.type === actionPrefix + '.' + modelName + '::LOAD') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, omit([by(config.indexBy.keyInStore)], innerState), { loading: true }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
                // If action state differs from
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, this.mergeItemsInState(config, innerState, action), { loading: false }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.updatingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, this.mergeItemsInState(config, innerState, action
                // , true
                ), { [this.updatingBy(config.indexBy.keyInStore)]: omit(values(this.indexKeyObject(action, config)), innerState[this.updatingBy(config.indexBy.keyInStore)]) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.deletingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {
                /** @type {?} */
                const deletingKey = this.deletingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => {
                    innerState = Object.assign({}, this.deleteItemsFromState(config, action, innerState), { [deletingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.deletingBy(config.indexBy.keyInStore)]) });
                    if (!Object.keys(innerState[deletingKey]).length)
                        innerState = omit([deletingKey], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.removingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {
                /** @type {?} */
                const removingKey = this.removingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => {
                    innerState = Object.assign({}, this.deleteItemsFromState(config, action, innerState), { [removingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.removingBy(config.indexBy.keyInStore)]) });
                    if (!Object.keys(innerState[removingKey]).length)
                        innerState = omit([removingKey], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::FAILED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, omit([by(config.indexBy.keyInStore)], innerState), { loading: false }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: true }) }) }) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: false }) }) }) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                /** @type {?} */
                const start = getStart(meta.page.limit, meta.page.offset);
                /** @type {?} */
                const rows = {};
                if (meta.pks) {
                    meta.pks.forEach((/**
                     * @param {?} pk
                     * @param {?} i
                     * @return {?}
                     */
                    (pk, i) => {
                        rows[start + i] = pk;
                    }));
                }
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { count: meta.count || 0, rows: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).rows, rows), loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: false }) }) }) }))));
            }
            return state;
        });
        return reducer;
    }
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    createEntityModelMapReducers(modelName) {
        /** @type {?} */
        const actionPrefix = this.actionPrefix;
        /** @type {?} */
        const reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        (state = {}, action) => {
            /** @type {?} */
            const modelPath = actionPrefix + '.' + modelName;
            if (!action || !action.meta || !action.meta.items || !action.meta.items.length)
                return state;
            /** @type {?} */
            const items = action.meta.items;
            switch (action.type) {
                case modelPath + '::LOAD_SUCCEEDED':
                case modelPath + '::UPSERT_SUCCEEDED':
                    /** @type {?} */
                    const idx = {};
                    for (let i = 0; i < items.length; i++) {
                        /** @type {?} */
                        const item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            idx[item.pk_entity] = {
                                modelName,
                                fkClass: item.fkClass
                            };
                        }
                    }
                    state = Object.assign({}, state, idx);
                    break;
                case modelPath + '::DELETE_SUCCEEDED':
                case modelPath + '::REMOVE_SUCCEEDED':
                    /** @type {?} */
                    const pkEntities = [];
                    for (let i = 0; i < items.length; i++) {
                        /** @type {?} */
                        const item = (/** @type {?} */ (items[i]));
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
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    facette(modelName, config) {
        return (/**
         * @param {?} action
         * @param {?} state
         * @param {?} cb
         * @return {?}
         */
        (action, state, cb) => {
            /** @type {?} */
            let outerState;
            ({ outerState, state } = this.deFacette(modelName, config, action, outerState, state));
            /** @type {?} */
            const innerState = cb(state);
            return this.enFacette(modelName, config, action, innerState, outerState);
        });
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    deFacette(modelName, config, action, outerState, state) {
        if (this.isFacetteByPk(config, action)) {
            // outerState = clone(state);
            /** @type {?} */
            const pk = action.meta.pk || 'repo'
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            ;
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            /** @type {?} */
            const innerState = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            return {
                outerState: state,
                state: innerState
            };
        }
        return { outerState, state };
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    enFacette(modelName, config, action, state, outerState) {
        if (this.isFacetteByPk(config, action)) {
            /** @type {?} */
            const pk = action.meta.pk || 'repo';
            state = Object.assign({}, outerState, { [config.facetteByPk]: Object.assign({}, outerState[config.facetteByPk], { [pk]: state }) });
        }
        return state;
    }
    /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    isFacetteByPk(config, action) {
        if (config.facetteByPk) {
            if (!action.meta || action.meta.pk === undefined)
                throw Error('Facette action must provide pk for facette');
            else
                return true;
        }
        else
            return false;
    }
    /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    deleteItemsFromState(config, action, state) {
        /** @type {?} */
        const items = action.meta.items;
        // let state = {}
        /** @type {?} */
        const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        const groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        i => ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        })));
        /** @type {?} */
        const mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} removedItem
         * @return {?}
         */
        (removedItem) => {
            // get path segments of new item
            /** @type {?} */
            const itemKey = config.indexBy.indexByFn(removedItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            // Q: Does the item exists?
            if (oldItem) {
                // A: Yes. use old item does exist
                // remove the removedItem at path in main index
                state = Object.assign({}, state, { [mainIndexKey]: Object.assign({}, omit([itemKey], state[mainIndexKey])) });
                // delete the removedItem at path in the group index
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                g => {
                    /** @type {?} */
                    const groupKey = this.getGroupKeyOfItem(g.groupByFn, removedItem);
                    state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [groupKey]: Object.assign({}, omit([itemKey], (state[g.groupByKey] || {})[groupKey])) }) });
                    // // cleanup paginations
                    // state = this.resetPaginationsByGroup(g.groupByKey, state, groupKey);
                }));
            }
        }));
        // cleanup main index
        if (Object.keys(state[mainIndexKey]).length < 1) {
            state = Object.assign({}, omit([mainIndexKey], state));
        }
        // cleanup group indices
        groups.forEach((/**
         * @param {?} g
         * @return {?}
         */
        g => {
            // cleanup groups in group index
            Object.keys(state[g.groupByKey]).forEach((/**
             * @param {?} groupKey
             * @return {?}
             */
            groupKey => {
                if (Object.keys(state[g.groupByKey][groupKey]).length < 1) {
                    state = Object.assign({}, state, { [g.groupByKey]: omit([groupKey], state[g.groupByKey]) });
                }
            }));
            // cleanup group index
            if (Object.keys(state[g.groupByKey]).length < 1) {
                state = Object.assign({}, omit([g.groupByKey], state));
            }
        }));
        return state;
    }
    /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    mergeItemsInState(config, state, action
    // , resetPaginations = false
    ) {
        /** @type {?} */
        const items = action.meta.items;
        /** @type {?} */
        const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        const groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        i => ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        })));
        /** @type {?} */
        const mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} newItem
         * @return {?}
         */
        (newItem) => {
            // get path segments of new item
            /** @type {?} */
            const itemKey = config.indexBy.indexByFn(newItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            /** @type {?} */
            let itemToSet;
            // Q: Does the item exists, and is it deeply-equal to the new item?
            /** @type {?} */
            const equalsFn = config.equals || equals;
            if (oldItem && equalsFn(newItem, oldItem)) {
                // A: Yes. use old item as itemToSet
                itemToSet = oldItem;
            }
            else {
                // A: No. use new item as itemToSet
                itemToSet = newItem;
                // put the itemToSet at path in main index
                state = Object.assign({}, state, { [mainIndexKey]: Object.assign({}, state[mainIndexKey], { [itemKey]: itemToSet }) });
                // iterate over the group indexes
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                g => {
                    // remove the oldItem from all group indexes
                    /** @type {?} */
                    const oldGroupKey = this.getGroupKeyOfItem(g.groupByFn, oldItem);
                    state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [oldGroupKey]: Object.assign({}, omit([itemKey], (state[g.groupByKey] || {})[oldGroupKey])) }) });
                    // add the itemToSet to all group indexes, if not undefined
                    /** @type {?} */
                    const newGroupKey = this.getGroupKeyOfItem(g.groupByFn, itemToSet);
                    if (newGroupKey !== undefined) {
                        state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [newGroupKey]: Object.assign({}, (state[g.groupByKey] || {})[newGroupKey], { [itemKey]: itemToSet }) }) });
                    }
                }));
            }
        }));
        return state;
    }
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
    indexKeyObject(action, config) {
        return indexBy((/**
         * @param {?} i
         * @return {?}
         */
        (i) => (i)), action.meta.items
            // filter items that are not (yet) indexable. This is normally the case, when creating new items that have no pk yet.
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
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
        item => config.indexBy.indexByFn(item))));
    }
    /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    groupBy(items, groupByFn, indexByFn) {
        /** @type {?} */
        const groups = {};
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            // if the group by key is not possible to create, the item won't be added to the index
            /** @type {?} */
            const groupKey = this.getGroupKeyOfItem(groupByFn, item);
            if (groupKey) {
                /** @type {?} */
                const indexKey = indexByFn(item);
                groups[groupKey] = Object.assign({}, groups[groupKey], { [indexKey]: item });
            }
        }));
        return groups;
    }
    /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    getGroupKeyOfItem(groupByFn, item) {
        /** @type {?} */
        let groupKey;
        try {
            groupKey = groupByFn(item);
        }
        catch (error) {
        }
        return groupKey;
    }
}
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
 * Generated from: state-schema/reducers/sys.reducer.ts
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
 * Generated from: state-schema/reducers/dfh.reducer.ts
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
 * Generated from: state-schema/reducers/inf.reducer.ts
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
 * Generated from: state-schema/reducers/dat.reducer.ts
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
 * Generated from: state-schema/reducers/pro.reducer.ts
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
 * Generated from: state-schema/reducers/war.reducer.ts
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
 * Generated from: state-schema/reducers/tab.reducer.ts
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
 * Generated from: root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
/** @type {?} */
const sandboxStateReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = {}, action) => {
    if (action.type === INIT_SANDBOX_STATE) {
        lastState = Object.assign({}, lastState, action.payload);
    }
    return lastState;
});
/** @type {?} */
const pendingRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.meta && action.meta.addPending) {
        /** @type {?} */
        const uuid = action.meta.addPending;
        state = Object.assign({}, state, { [uuid]: true });
        // console.log('add ' + uuid + ' ' + Date.now())
    }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        const uuid = action.meta.removePending;
        state = Object.assign({}, omit([uuid], state));
    }
    return state;
});
/** @type {?} */
const resolvedRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        const uuid = action.meta.removePending;
        state = Object.assign({}, state, { [uuid]: action.meta });
    }
    return state;
});
/** @type {?} */
const cleanupResolved = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.type === 'CLEAN_UP_RESOLVED') {
        /** @type {?} */
        const uuid = action.meta.uuid;
        state = Object.assign({}, omit([uuid], state));
        // console.log('resolve ' + uuid + ' ' + Date.now().toString())
    }
    return state;
});
/** @type {?} */
const SET_APP_STATE = 'SET_APP_STATE';
/** @type {?} */
const setAppState = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.type === SET_APP_STATE) {
        state = action.payload;
    }
    return state;
});
/** @type {?} */
const rootReducer = composeReducers(defaultFormReducer(), combineReducers({
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
 * Generated from: module/redux-store.module.ts
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
const ofSubstore = (/**
 * @param {?} path
 * @return {?}
 */
(path) => (/**
 * @param {?} action
 * @return {?}
 */
(action) => {
    if (!('@angular-redux::fractalkey' in action))
        return false;
    /** @type {?} */
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    /** @type {?} */
    const bool = equals(actionPath, path);
    return bool;
}));
/** @type {?} */
const APP_INITIAL_STATE = new InjectionToken('app.INITIAL_STATE');
/**
 * @return {?}
 */
function apiConfigFactory() {
    /** @type {?} */
    const params = {
    // set configuration parameters here.
    };
    return new Configuration(params);
}
class ReduxModule {
    /**
     * @param {?} ngRedux
     * @param {?} devTools
     * @param {?} rootEpics
     * @param {?=} parentModule
     * @param {?=} sdkLb3
     * @param {?=} sdkLb4
     * @param {?=} initialState
     */
    constructor(ngRedux, devTools, rootEpics, parentModule, sdkLb3, sdkLb4, initialState) {
        this.ngRedux = ngRedux;
        /** @type {?} */
        const errors = [];
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
        const epicMiddleware = createEpicMiddleware();
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
    static forRoot() {
        return {
            ngModule: ReduxModule,
            providers: [{ provide: APP_INITIAL_STATE, useValue: {} }]
        };
    }
}
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
ReduxModule.ctorParameters = () => [
    { type: NgRedux },
    { type: DevToolsExtension },
    { type: RootEpics },
    { type: ReduxModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SdkLb3Module, decorators: [{ type: Optional }] },
    { type: SdkLb4Module, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_INITIAL_STATE,] }] }
];
if (false) {
    /** @type {?} */
    ReduxModule.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: root/models/model.ts
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
 * Generated from: state-gui/models/account.model.ts
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
 * Generated from: state-gui/models/active-project.models.ts
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
 * Generated from: state-gui/models/active-project/entity-detail.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PeItDetailList() { }
;
class EntityDetail {
    /**
     * @param {?=} data
     */
    constructor(data) {
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
}
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
 * Generated from: state-gui/models/active-project/project-settings-data.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
class ProjectSettingsData {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
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
 * Generated from: state-gui/models/active-project/tab-layout.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
class TabBase {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
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
 * Generated from: state-gui/models/active-project/types.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
class Types {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
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
 * Generated from: state-gui/models/list.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Class of this slice of store
class List {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
        if (true) {
        }
        else {
        }
    }
}
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
 * Generated from: state-gui/models/loading-bar.models.ts
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
 * Generated from: state-gui/models/notifications.models.ts
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
class Notifications {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
}
if (false) {
    /** @type {?} */
    Notifications.prototype.type;
    /** @type {?} */
    Notifications.prototype.options;
}

/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/models/projects.model.ts
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
 * Generated from: state-schema/models/dat.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DigitalSlice {
}
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
class ChunkSlice {
}
if (false) {
    /** @type {?} */
    ChunkSlice.prototype.by_pk_entity;
    /** @type {?} */
    ChunkSlice.prototype.by_fk_text;
    /** @type {?} */
    ChunkSlice.prototype.loading;
}
class ColumnSlice {
}
if (false) {
    /** @type {?} */
    ColumnSlice.prototype.by_pk_entity;
    /** @type {?} */
    ColumnSlice.prototype.by_fk_digital;
}
class ClassColumnMappingSlice {
}
if (false) {
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_pk_entity;
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_fk_column;
}
class TextPropertySlice {
}
if (false) {
    /** @type {?} */
    TextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    TextPropertySlice.prototype.by_fk_digital;
}
class NamespaceSlice {
}
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
 * Generated from: state-schema/models/dfh.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfhProfileSlice {
}
if (false) {
    /** @type {?} */
    DfhProfileSlice.prototype.by_pk_profile;
    /** @type {?} */
    DfhProfileSlice.prototype.loading;
}
class DfhClassSlice {
}
if (false) {
    /** @type {?} */
    DfhClassSlice.prototype.by_pk_class;
    /** @type {?} */
    DfhClassSlice.prototype.by_basic_type;
    /** @type {?} */
    DfhClassSlice.prototype.loading;
}
class DfhPropertySlice {
}
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
class DfhLabelSlice {
}
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
 * Generated from: state-schema/models/inf.models.ts
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
class InfPersistentItemSlice {
}
if (false) {
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_fk_class;
    /** @type {?} */
    InfPersistentItemSlice.prototype.loading;
}
class InfTemporalEntitySlice {
}
if (false) {
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_fk_class;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.loading;
}
class InfStatementSlice {
}
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
class InfPlaceSlice {
}
if (false) {
    /** @type {?} */
    InfPlaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPlaceSlice.prototype.loading;
}
class InfTimePrimitiveSlice {
}
if (false) {
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.loading;
}
class InfLanguageSlice {
}
if (false) {
    /** @type {?} */
    InfLanguageSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLanguageSlice.prototype.loading;
}
class InfAppellationSlice {
}
if (false) {
    /** @type {?} */
    InfAppellationSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfAppellationSlice.prototype.loading;
}
class InfLangStringSlice {
}
if (false) {
    /** @type {?} */
    InfLangStringSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLangStringSlice.prototype.loading;
}
class InfDimensionSlice {
}
if (false) {
    /** @type {?} */
    InfDimensionSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfDimensionSlice.prototype.loading;
}
class InfTextPropertySlice {
}
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
 * Generated from: state-schema/models/pro.models.ts
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
 * Generated from: state-schema/models/sys.models.ts
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
 * Generated from: state-schema/models/tab.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TabCellSlice {
}
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
 * Generated from: state-schema/models/war.models.ts
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
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-redux-src-lib-redux-store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { APP_INITIAL_STATE, AccountActions, ActiveProjectActions, ChunkActionsFactory, ChunkSlice, ClassColumnMappingSlice, ColumnActionsFactory, ColumnSlice, DatActions, DfhActions, DfhClassActionFactory, DfhClassSlice, DfhLabelActionFactory, DfhLabelSlice, DfhProfileActionFactory, DfhProfileSlice, DfhPropertyActionFactory, DfhPropertySlice, DigitalActionsFactory, DigitalSlice, EntityDetail, Flattener, GvSchemaActions, INIT_SANDBOX_STATE, InfActionFactory, InfActions, InfAppellationSlice, InfDimensionSlice, InfEpicsFactory, InfLangStringSlice, InfLanguageSlice, InfPersistentItemActionFactory, InfPersistentItemSlice, InfPlaceSlice, InfStatementActionFactory, InfStatementSlice, InfTemporalEntityActionFactory, InfTemporalEntitySlice, InfTextPropertyActionFactory, InfTextPropertySlice, InfTimePrimitiveSlice, Information, List, LoadingBarActions, NamespaceSlice, Notifications, NotificationsAPIActions, PR_ENTITY_MODEL_MAP, ProActions, ProAnalysisActionFactory, ProClassFieldConfigActionFactory, ProDfhClassProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProInfoProjRelActionFactory, ProProjectActionFactory, ProTextPropertyActionFactory, ProjectSettingsData, ProjectsActions, ReducerFactory, ReduxModule, RootEpics, SET_APP_STATE, SchemaActionsFactory, SchemaEpicsFactory, SchemaService, SourceList, SysActions, TabActions, TabBase, TabCellSlice, TextPropertySlice, Types, WarActions, apiConfigFactory, by, cleanupResolved, createDatReducer, createDfhReducer, createInfReducer, createProReducer, createSysReducer, createTabReducer, createWarReducer, datDefinitions, datRoot, dfhDefinitions, dfhLabelByFksKey, dfhRoot, facetteByPk, getEnd, getFromTo, getStart, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, ofSubstore, paginateBy, pendingRequestReducer, proClassFieldConfgByProjectAndClassKey, proDefinitions, proRoot, resolvedRequestReducer, rootReducer, sandboxStateReducer, setAppState, storeFlattened, subfieldIdToString, sysDefinitions, sysRoot, tabDefinitions, tabRoot, textPropertyByFksKey, textPropertyByFksWithoutLang, warDefinitions, warRoot, LoadingBarEpics as ɵa, NotificationsAPIEpics as ɵb, ActiveProjectEpics as ɵc, AccountEpics as ɵd, SysEpics as ɵe, DfhEpics as ɵf, InfEpics as ɵg, DatEpics as ɵh, ProEpics as ɵi, SchemaEpics as ɵj, ActionResolverEpics as ɵk, accountRootReducer as ɵl, loadingBarReducer as ɵm, activeProjectReducer as ɵn, informationReducer as ɵo, sourceListReducer as ɵp, createProjectsReducer as ɵq };
//# sourceMappingURL=kleiolab-lib-redux-src-lib-redux-store.js.map
