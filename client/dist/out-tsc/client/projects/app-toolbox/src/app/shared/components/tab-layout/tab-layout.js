import * as tslib_1 from "tslib";
import { dispatch, select, WithSubStore } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabLayoutAcitons } from './tab-layout.actions';
import { tabBaseReducer } from './tab-layout.reducer';
;
let TabLayout = class TabLayout {
    constructor(uiId, ref, destroy$) {
        this.uiId = uiId;
        this.ref = ref;
        this.destroy$ = destroy$;
        this.defaultSizeRight = 32;
        this.useTransition = false;
        this.firstActivation = true;
        this.activated$ = new Subject();
        this.getBasePath = () => this.basePath;
        /**
         * END
         * Stuff for handling split area rendering
         */
        /*********************************************************************
        *  Set tab title
        *********************************************************************/
        this.setTabTitle = (tabTitle) => ({
            type: TabLayoutAcitons.SET_TAB_TITLE,
            meta: { tabTitle },
            payload: null,
        });
        /*********************************************************************
        *  Set tab tooltip
        *********************************************************************/
        this.setTabTooltip = (tabTooltip) => ({
            type: TabLayoutAcitons.SET_TAB_TOOLTIP,
            meta: { tabTooltip },
            payload: null,
        });
        /*********************************************************************
        *  Set tab loading
        *********************************************************************/
        this.setTabLoading = (loading) => ({
            type: TabLayoutAcitons.SET_TAB_LOADING,
            meta: { loading },
            payload: null,
        });
        /*********************************************************************
        *  Set right panel state
        *********************************************************************/
        this.setLayoutMode = (layoutMode) => ({
            type: TabLayoutAcitons.SET_LAYOUT_MODE,
            meta: { layoutMode: layoutMode },
            payload: null,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: TabLayoutAcitons.DESTROY,
            meta: null,
            payload: null
        });
        this.basePath = ['activeProject', 'tabLayouts', this.uiId];
        this.layoutMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
            this.layoutMode = mode;
            this.setSplitSize(mode);
        });
    }
    setSplitSize(mode) {
        if (mode == 'left-only') {
            this.splitSizeLeft = 100;
            this.splitSizeRight = 0;
        }
        else if (mode == 'right-only') {
            this.splitSizeLeft = 0;
            this.splitSizeRight = 100;
        }
        else {
            this.splitSizeLeft = 100 - this.defaultSizeRight;
            this.splitSizeRight = this.defaultSizeRight;
        }
    }
    onActivateTab() {
        this.activated$.next();
        if (this.firstActivation) {
            setTimeout(() => {
                this.setSplitSize(this.layoutMode);
                this.ref.detectChanges();
                this.setSplitSize(this.layoutMode);
                this.ref.detectChanges();
                setTimeout(() => {
                    this.useTransition = true;
                });
            });
            this.firstActivation = false;
        }
    }
    beforeDeactivateTab() {
        this.useTransition = false;
    }
    /**
     * When user resizes the areas
     */
    onResizeArea(event) {
        if (event.sizes[1] < 5)
            this.setLayoutMode('left-only');
        if (event.sizes[0] < 5)
            this.setLayoutMode('right-only');
    }
};
tslib_1.__decorate([
    select()
], TabLayout.prototype, "layoutMode$", void 0);
tslib_1.__decorate([
    dispatch()
], TabLayout.prototype, "setTabTitle", void 0);
tslib_1.__decorate([
    dispatch()
], TabLayout.prototype, "setTabTooltip", void 0);
tslib_1.__decorate([
    dispatch()
], TabLayout.prototype, "setTabLoading", void 0);
tslib_1.__decorate([
    dispatch()
], TabLayout.prototype, "setLayoutMode", void 0);
tslib_1.__decorate([
    dispatch()
], TabLayout.prototype, "destroy", void 0);
TabLayout = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: tabBaseReducer
    })
], TabLayout);
export { TabLayout };
//# sourceMappingURL=tab-layout.js.map