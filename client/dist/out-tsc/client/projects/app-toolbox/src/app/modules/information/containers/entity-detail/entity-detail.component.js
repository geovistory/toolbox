import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { slideInOut } from '../../shared/animations';
import { entityDetailReducer } from './api/entity-detail.reducer';
let EntityDetailComponent = class EntityDetailComponent {
    constructor(ngRedux, actions, ref, p, ap, i, b, inf, truncatePipe) {
        this.ngRedux = ngRedux;
        this.actions = actions;
        this.ref = ref;
        this.p = p;
        this.ap = ap;
        this.i = i;
        this.b = b;
        this.inf = inf;
        this.truncatePipe = truncatePipe;
        this.destroy$ = new Subject();
        this.remove = new EventEmitter();
        this.close = new EventEmitter();
        this.isViewMode$ = of(false);
        this.getBasePath = () => this.basePath;
    }
    ngOnInit() {
        this.basePath = this.getBasePath();
        this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), entityDetailReducer);
        this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
        this.t.setTabLoading(true);
        this.preview$ = this.ap.streamEntityPreview(this.pkEntity, true);
        this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            // TODO merge persistent_item and temporal_entity tables
            combineLatest(this.inf.persistent_item.loadMinimal(pkProject, this.pkEntity).resolved$, this.inf.temporal_entity.loadNestedObject(pkProject, this.pkEntity).resolved$).pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
                this.t.setTabLoading(false);
            });
        });
        this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
            this.t.setLayoutMode(b ? 'both' : 'left-only');
        });
        this.listOf = { pkEntity: this.pkEntity, type: 'entity' };
        this.localStore.dispatch(this.actions.init(this.tab.data.peItDetailConfig.peItDetail));
        this.title$ = this.i.pipeLabelOfEntity(this.pkEntity);
        this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity);
        this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity);
        this.tabTitle$ = combineLatest(this.preview$, this.classLabel$).pipe(map(([preview, classLabel]) => {
            const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
            return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ');
        }));
        this.tabTitle$.pipe(takeUntil(this.destroy$))
            .subscribe((tabTitle) => {
            this.t.setTabTitle(tabTitle);
        });
        this.tabTooltip$ = combineLatest(this.preview$, this.classLabel$).pipe(map(([preview, classLabel]) => {
            return [classLabel, preview.entity_label].filter(i => !!i).join(' - ');
        }));
        this.tabTooltip$.pipe(takeUntil(this.destroy$))
            .subscribe((tabTooltip) => {
            this.t.setTabTooltip(tabTooltip);
        });
        this.pkEntity$ = of(this.pkEntity);
        this.iconType$ = this.b.pipeIconType(this.pkEntity);
    }
    openRemoveDialog() {
        this.tabTitle$
            .pipe(first(), takeUntil(this.destroy$))
            .subscribe(tabTitle => {
            this.p.openRemoveEntityDialog(tabTitle, this.pkEntity)
                .pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.close.emit();
            });
        });
    }
    rightTabIndexChange(i) {
        this.localStore.dispatch(this.actions.setRightPanelActiveTab(i));
    }
    rightArrowClick() {
        if (this.t.layoutMode == 'right-only')
            this.t.setLayoutMode('both');
        else
            this.t.setLayoutMode('left-only');
    }
    /**
    * Method to toggle booleans of state.
    * Useful to toggle visibility of ui elements.
    */
    toggle(keyToToggle) {
        this.localStore.dispatch(this.actions.toggleBoolean(keyToToggle));
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], EntityDetailComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Output()
], EntityDetailComponent.prototype, "remove", void 0);
tslib_1.__decorate([
    Output()
], EntityDetailComponent.prototype, "close", void 0);
tslib_1.__decorate([
    Input()
], EntityDetailComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], EntityDetailComponent.prototype, "tab", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "showHeader$", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "showRightArea$", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "showProperties$", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "rightPanelActiveTab$", void 0);
tslib_1.__decorate([
    select()
], EntityDetailComponent.prototype, "rightPanelTabs$", void 0);
EntityDetailComponent = tslib_1.__decorate([
    WithSubStore({
        localReducer: entityDetailReducer,
        basePathMethodName: 'getBasePath'
    }),
    Component({
        selector: 'gv-entity-detail',
        templateUrl: './entity-detail.component.html',
        styleUrls: ['./entity-detail.component.scss'],
        animations: [slideInOut],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], EntityDetailComponent);
export { EntityDetailComponent };
//# sourceMappingURL=entity-detail.component.js.map