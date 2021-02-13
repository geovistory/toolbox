import * as tslib_1 from "tslib";
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ContentChild, Directive, HostBinding, Input, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { PanelBodyDirective } from '../../directives/panel-body.directive';
let OnActivateTabDirective = class OnActivateTabDirective {
    onActivateTab() {
        this.c.t.onActivateTab();
    }
    beforeDeactivateTab() {
        this.c.t.beforeDeactivateTab();
    }
};
tslib_1.__decorate([
    Input('onActivateTab')
], OnActivateTabDirective.prototype, "c", void 0);
OnActivateTabDirective = tslib_1.__decorate([
    Directive({
        selector: '[onActivateTab]'
    })
], OnActivateTabDirective);
export { OnActivateTabDirective };
let TabBodyComponent = class TabBodyComponent {
    constructor() {
        this.active$ = new Subject();
        this.panelId$ = new Subject();
        this.bodies$ = new Subject();
        this.destroy$ = new Subject();
        combineLatest(this.active$, this.panelId$, this.bodies$).pipe(takeUntil(this.destroy$))
            .subscribe(([active, panelId, panelBodies]) => {
            // const oldHost = this.host;
            const newHost = panelBodies.find(item => item.gvPanelId === panelId);
            if (newHost && active) {
                if (newHost.portal !== this.portal) {
                    // if host has attached detach it
                    if (newHost.hasAttached())
                        newHost.detach();
                    // if portal is attached detach it
                    if (this.portal.isAttached)
                        this.portal.detach();
                    // attatch portal to new Host
                    newHost.attach(this.portal);
                    if (this.child)
                        this.child.onActivateTab();
                }
            }
            if (!active && this.host && this.host.hasAttached() && this.host.portal === this.portal) {
                this.host.detach();
            }
            this.host = newHost;
        });
    }
    ngOnChanges(changes) {
        if (changes.active) {
            this.active$.next(changes.active.currentValue);
        }
        if (changes.panelId) {
            this.panelId$.next(changes.panelId.currentValue);
        }
    }
    ngOnInit() {
        this.panelBodies$.subscribe(d => {
            this.bodies$.next(d);
        });
    }
    ngOnDestroy() {
        if (this.host)
            this.host.detach();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], TabBodyComponent.prototype, "active", void 0);
tslib_1.__decorate([
    Input()
], TabBodyComponent.prototype, "panelId", void 0);
tslib_1.__decorate([
    Input()
], TabBodyComponent.prototype, "panelBodies$", void 0);
tslib_1.__decorate([
    ViewChild(CdkPortal, { static: true })
], TabBodyComponent.prototype, "portal", void 0);
tslib_1.__decorate([
    ContentChild(OnActivateTabDirective, /* TODO: check correctness of static flag */ { static: false })
], TabBodyComponent.prototype, "child", void 0);
TabBodyComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-tab-body',
        template: `
    <ng-container *cdkPortal>
      <ng-content> </ng-content>
    </ng-container>
  `,
    })
], TabBodyComponent);
export { TabBodyComponent };
let ProjectEditComponent = class ProjectEditComponent {
    constructor(p, activatedRoute, sdkStorage, basic // this initiates the question if geolocalization is allowed
    ) {
        this.p = p;
        this.activatedRoute = activatedRoute;
        this.sdkStorage = sdkStorage;
        this.basic = basic;
        this.full = true;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.beforeDestroy$ = new Subject();
        this.highlightPanel = {};
        this.tabDragging = false;
        this.panelBodies$ = new BehaviorSubject([]);
        const id = this.activatedRoute.snapshot.params['pkActiveProject'];
        const storagePrefix = 'Geovistory-Panels-Project-';
        // Get last panel state of this project from local storage and put it to store
        const x = this.sdkStorage.get(storagePrefix + id) || [];
        setTimeout(() => {
            if (typeof x.panels !== 'object' || typeof x.uiIdSerial !== 'number' || typeof x.panelSerial !== 'number' || typeof x.focusedPanel !== 'number') {
                this.sdkStorage.remove(storagePrefix + id);
            }
            else {
                // TODO uncomment the following line in order to activate restoring of tabs from last session.
                // this.p.setPanels(x.panels, x.uiIdSerial, x.panelSerial, x.focusedPanel)
            }
        });
        // Subscribe to the panels until just before the project edit is destroyed
        combineLatest(this.p.panels$, this.p.uiIdSerial$, this.p.panelSerial$, this.p.focusedPanel$).pipe(takeUntil(this.beforeDestroy$)).subscribe(([panels, uiIdSerial, panelSerial, focusedPanel]) => {
            // Set the panels in local storage
            this.sdkStorage.set(storagePrefix + id, { panels, uiIdSerial, panelSerial, focusedPanel });
        });
        this.p.initProject(id);
        this.p.initProjectConfigData(id);
        this.allTabs$ = this.p.panels$.pipe(map(panels => {
            let allTabs = [];
            panels.forEach((panel, panelIndex) => {
                allTabs = [...allTabs, ...[...panel.tabs].map((tab, tabIndex) => {
                        const tabBody = Object.assign({}, tab, { panelId: panel.id, tabIndex,
                            panelIndex });
                        return tabBody;
                    })];
            });
            return allTabs;
        }));
    }
    ngAfterViewInit() {
        this.panelBodies.changes.pipe(takeUntil(this.destroy$))
            .subscribe(a => {
            const b = this.panelBodies.toArray();
            this.panelBodies$.next(b);
        });
        this.list._closedStream.pipe(takeUntil(this.destroy$)).subscribe(e => {
            this.p.setListType('');
        });
        // DEV: For development of a component in a specific Tab uncomment and modify the following
        // this.p.addTableTab(2001)
    }
    trackByFn(index, item) {
        return index; // or item.id
    }
    trackByPath(index, item) {
        return item.path.join('');
    }
    setHighlightPanel(i, area) {
        this.highlightPanel[i.toString()] = area;
    }
    unsetHighlightPanel(i, area) {
        if (i === undefined && area === undefined) {
            this.highlightPanel = {};
        }
        else if (this.highlightPanel[i.toString()] === area) {
            delete this.highlightPanel[i.toString()];
        }
    }
    tabDragEnded() {
        this.unsetHighlightPanel();
        this.tabDragging = false;
    }
    tabDragStarted() {
        this.tabDragging = true;
    }
    setList(list) {
        this.p.list$.pipe(first(), takeUntil(this.destroy$)).subscribe(previousList => {
            if (previousList === list || list === '') {
                // close the drawe
                this.list.close();
            }
            else {
                // open the panel
                this.p.setListType(list);
            }
        });
    }
    dropTab(event) {
        // .data contains the panelIndex
        this.p.moveTab(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    splitPanel(newPanelIndex, event) {
        // .data contains the panelIndex
        this.p.splitPanel(event.item.data.panelIndex, event.item.data.tabIndex, newPanelIndex);
    }
    ngOnDestroy() {
        this.beforeDestroy$.next(true);
        this.p.closeProject();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-full')
], ProjectEditComponent.prototype, "full", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], ProjectEditComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    ViewChildren(PanelBodyDirective)
], ProjectEditComponent.prototype, "panelBodies", void 0);
tslib_1.__decorate([
    ViewChild('list', { static: true })
], ProjectEditComponent.prototype, "list", void 0);
ProjectEditComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-project-edit',
        templateUrl: './project-edit.component.html',
        styleUrls: ['./project-edit.component.scss']
    })
], ProjectEditComponent);
export { ProjectEditComponent };
//# sourceMappingURL=project-edit.component.js.map