import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DfhConfig } from "@kleiolab/lib-config";
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { ProSelector } from 'projects/app-toolbox/src/app/core/pro/pro.service';
import { ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DatSelector } from '../dat/dat.service';
import { InfSelector } from '../inf/inf.service';
import { EntityDetail } from '../state/models';
import { TabSelector } from '../tab/tab.service';
let ActiveProjectService = class ActiveProjectService {
    constructor(ngRedux, actions, entityPreviewSocket, ap, dialog, dfh$, sys$, inf, shouldPause, s) {
        this.ngRedux = ngRedux;
        this.actions = actions;
        this.entityPreviewSocket = entityPreviewSocket;
        this.ap = ap;
        this.dialog = dialog;
        this.dfh$ = dfh$;
        this.sys$ = sys$;
        this.inf = inf;
        this.shouldPause = shouldPause;
        this.s = s;
        // classPksEnabledInEntities$: Observable<number[]>
        // object with pk_entity as key of classes where projRel is changing
        this.changingClassProjRel = {};
        this.changingSystemRelevantClass = {};
        /***************************************************************
         * Ram (Refers to, Annotated in, Mentioned in)
         ***************************************************************/
        this.ramOpen$ = new BehaviorSubject(false);
        this.ramSource$ = new ReplaySubject();
        this.ramProperty$ = new ReplaySubject();
        this.ramTarget$ = new ReplaySubject();
        this.ramTitle$ = new ReplaySubject();
        this.ramTitlePart2$ = new ReplaySubject();
        this.ramBoxLeft$ = new ReplaySubject();
        this.ramBoxCenter$ = new ReplaySubject();
        this.ramBoxRight$ = new ReplaySubject();
        this.ramTargetIsFix$ = new BehaviorSubject(false);
        this.requestedEntityPreviews = {};
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
        this.activeProject$ = ngRedux.select(['activeProject']);
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter(p => p !== undefined), distinctUntilChanged((x, y) => {
            return x === y;
        }));
        this.initializingProject$ = ngRedux.select(['activeProject', 'initializingProject']);
        this.defaultLanguage$ = ngRedux.select(['activeProject', 'default_language']);
        this.panels$ = ngRedux.select(['activeProject', 'panels']);
        this.uiIdSerial$ = ngRedux.select(['activeProject', 'uiIdSerial']);
        this.panelSerial$ = ngRedux.select(['activeProject', 'panelSerial']);
        this.focusedPanel$ = ngRedux.select(['activeProject', 'focusedPanel']);
        this.list$ = ngRedux.select(['activeProject', 'list']);
        this.typesByPk$ = ngRedux.select(['activeProject', 'typesByPk']);
        this.creatingMentioning$ = ngRedux.select(['activeProject', 'creatingMentioning']);
        this.inf$ = new InfSelector(ngRedux, this.pkProject$);
        this.dat$ = new DatSelector(ngRedux);
        this.pro$ = new ProSelector(ngRedux);
        this.tab$ = new TabSelector(ngRedux);
        this.initializingProject$.subscribe(bool => {
            this.shouldPause.shouldPause$.next(bool);
        });
        this.datNamespaces$ = this.pkProject$.pipe(mergeMap(pro => this.dat$.namespace$.by_fk_project$.key(pro)), map(byPk => values(byPk)));
        // emits true if no toolbox panel is opened
        this.dashboardVisible$ = combineLatest(ngRedux.select(['information']), ngRedux.select(['sources'])).pipe(map(items => items.filter(item => (!!item && Object.keys(item).length > 0)).length === 0), distinctUntilChanged());
    }
    get state() {
        return this.ngRedux.getState().activeProject;
    }
    /************************************************************************************
    * ActiveProject init and destroy
    ************************************************************************************/
    /**
     * Initialize the project in state, if the activeProject is not yet
     * in state or if the pk_project of the activeProject in state
     * is not the one provided
     *
     * @param id pk_project
     */
    initProject(id) {
        const state = this.ngRedux.getState();
        if (!state.activeProject || state.activeProject.pk_project != id) {
            this.ngRedux.dispatch(this.actions.loadProjectBasics(id));
        }
    }
    /**
     * Initialize the project configuration data
     * this will load all the classes, properties, system configs, etc.
     * needed to edit a project in the toolbox
     *
     * @param id pk_project
     */
    initProjectConfigData(id) {
        const state = this.ngRedux.getState();
        if (!state.activeProject || state.activeProject.pk_project != id || !state.activeProject.configDataInitialized) {
            this.ngRedux.dispatch(this.actions.loadProjectConfig(id));
        }
    }
    closeProject() {
        this.entityPreviewSocket.emit('leaveProjectRoom');
        this.ngRedux.dispatch(this.actions.destroy());
    }
    /************************************************************************************
    * Change Project Relations
    ************************************************************************************/
    removeEntityFromProject(pkEntity, cb) {
        this.pkProject$.pipe(first()).subscribe(pkProject => {
            const timer$ = timer(200);
            const call$ = this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject);
            let dialogRef;
            timer$.pipe(takeUntil(call$)).subscribe(() => {
                const data = {
                    title: 'Removing entity from your project',
                    hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
                };
                dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true });
            });
            call$.subscribe((schemaObject) => {
                if (cb)
                    cb(schemaObject);
                if (dialogRef)
                    dialogRef.close();
            });
        });
    }
    addEntityToProject(pkEntity, cb) {
        const s$ = new Subject();
        this.pkProject$.pipe(first()).subscribe(pkProject => {
            const timer$ = timer(200);
            const call$ = this.s.store(this.s.api.addEntityToProject(pkProject, pkEntity), pkProject);
            let dialogRef;
            timer$.pipe(takeUntil(call$)).subscribe(() => {
                const data = {
                    title: 'Adding entity to your project',
                    hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
                };
                dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true });
            });
            call$.subscribe((schemaObject) => {
                s$.next(schemaObject);
                if (cb)
                    cb(schemaObject);
                if (dialogRef)
                    dialogRef.close();
            });
        });
        return s$;
    }
    /************************************************************************************
    * Mentioning
    ************************************************************************************/
    // updateSelectedChunk(c: DatChunk) {
    //   this.ngRedux.dispatch(this.actions.updateSelectedChunk(c))
    // }
    // setRefiningChunk(bool: boolean) {
    //   this.ngRedux.dispatch(this.actions.setRefiningChunk(bool))
    // }
    // mentioningsFocusedInText(pks: number[]) {
    //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
    // }
    // mentioningsFocusedInTable(pks: number[]) {
    //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
    // }
    ramReset() {
        this.ramOpen$.next(false);
        this.ramSource$.next();
        this.ramTarget$.next();
        this.ramProperty$.next();
        this.ramTitle$.next();
        this.ramTitlePart2$.next();
        this.ramBoxLeft$.next();
        this.ramBoxCenter$.next(false);
        this.ramBoxRight$.next(false);
        this.ramTargetIsFix$.next(false);
    }
    /************************************************************************************
    * Layout -- Tabs
    ************************************************************************************/
    setPanels(panels, uiIdSerial, panelSerial, focusedPanel) {
        this.ngRedux.dispatch(this.actions.setPanels(panels, uiIdSerial, panelSerial, focusedPanel));
    }
    // List (left panel) modifications
    setListType(list) {
        this.ngRedux.dispatch(this.actions.setListType(list));
    }
    // Tab modifications
    activateTab(panelIndex, tabIndex) {
        this.ngRedux.dispatch(this.actions.activateTab(panelIndex, tabIndex));
    }
    moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex) {
        this.ngRedux.dispatch(this.actions.moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex));
    }
    closeTab(panelIndex, tabIndex) {
        this.ngRedux.dispatch(this.actions.closeTab(panelIndex, tabIndex));
    }
    addTab(tab) {
        this.ngRedux.dispatch(this.actions.addTab(tab));
    }
    focusPanel(panelIndex) {
        this.ngRedux.dispatch(this.actions.focusPanel(panelIndex));
    }
    splitPanel(previousPanelIndex, tabIndex, currentPanelIndex) {
        this.ngRedux.dispatch(this.actions.splitPanel(previousPanelIndex, tabIndex, currentPanelIndex));
    }
    // Tab data selections
    getTabTitle(path) {
        return this.ngRedux.select([...['activeProject', 'tabLayouts', path[2]], 'tabTitle']);
    }
    getTabTooltip(path) {
        return this.ngRedux.select([...['activeProject', 'tabLayouts', path[2]], 'tabTooltip']);
    }
    getTabLoading(path) {
        return this.ngRedux.select([...['activeProject', 'tabLayouts', path[2]], 'loading']);
    }
    addEntityTabWithoutClass(pkEntity) {
        this.ap.streamEntityPreview(pkEntity).pipe(first(x => !!x)).subscribe(x => {
            this.addEntityTab(x.pk_entity, x.fk_class);
        });
    }
    addEntityTab(pkEntity, pkClass) {
        if (pkClass === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
            this.addSourceExpressionPortionTab(pkEntity);
        }
        else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(pkClass)) {
            this.addSourceTab(pkEntity);
        }
        else {
            this.addEntityPeItTab(pkEntity);
        }
    }
    addSourceTab(pkEntity) {
        const peItDetail = new EntityDetail({
            showHeader: true,
            showProperties: true,
            showRightArea: false,
            rightPanelTabs: [
                'content-tree'
            ],
            rightPanelActiveTab: 0
        });
        this.addTab({
            active: true,
            component: 'entity-detail',
            icon: 'source',
            pathSegment: 'peItDetails',
            data: {
                pkEntity: pkEntity,
                peItDetailConfig: {
                    peItDetail
                }
            }
        });
    }
    addSourceExpressionPortionTab(pkEntity) {
        const peItDetail = new EntityDetail({
            showHeader: true,
            showProperties: true,
            showRightArea: false,
            rightPanelTabs: [
                'content-tree'
            ],
            rightPanelActiveTab: 0
        });
        this.addTab({
            active: true,
            component: 'entity-detail',
            icon: 'expression-portion',
            data: {
                pkEntity: pkEntity,
                peItDetailConfig: {
                    peItDetail
                }
            },
            pathSegment: 'peItDetails'
        });
    }
    addEntityPeItTab(pkEntity) {
        const peItDetail = new EntityDetail({
            showHeader: true,
            showProperties: true,
            showRightArea: false,
            rightPanelTabs: [
                'linked-sources',
                'linked-digitals'
            ],
            rightPanelActiveTab: 0
        });
        this.addTab({
            active: true,
            component: 'entity-detail',
            icon: 'persistent-entity',
            pathSegment: 'peItDetails',
            data: {
                pkEntity: pkEntity,
                peItDetailConfig: {
                    peItDetail
                }
            }
        });
    }
    addTextTab(pkEntity) {
        this.addTab({
            active: true,
            component: 'text-detail',
            icon: 'text',
            data: {
                pkEntity: pkEntity
            },
            pathSegment: 'textDetails'
        });
    }
    addTableTab(pkEntity, fkRow) {
        this.addTab({
            active: true,
            component: 'table-detail',
            icon: 'table',
            data: {
                pkEntity: pkEntity,
                filterOnRow: fkRow
            },
            pathSegment: 'tableDetails'
        });
    }
    /************************************************************************************
    * Layout -- Modals
    ************************************************************************************/
    /**
     * Opens dialog to get confirmation before removing
     * entity from project. If user confirms, the dialog
     * removes entity and closes
     */
    openRemoveEntityDialog(entityLabel, pkEntity) {
        const s = new Subject();
        const data = {
            noBtnText: 'Cancel',
            yesBtnText: 'Remove',
            yesBtnColor: 'warn',
            title: 'Remove ' + entityLabel,
            paragraphs: ['Are you sure?'],
        };
        this.pkProject$.pipe(first()).subscribe(pkProject => {
            const dialog = this.dialog.open(ConfirmDialogComponent, { data });
            dialog.afterClosed().pipe(first()).subscribe(confirmed => {
                if (confirmed) {
                    this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
                        .pipe(first(success => !!success)).subscribe(() => {
                        s.next();
                    });
                }
            });
        });
        return s;
    }
};
ActiveProjectService = tslib_1.__decorate([
    Injectable()
], ActiveProjectService);
export { ActiveProjectService };
//# sourceMappingURL=active-project.service.js.map