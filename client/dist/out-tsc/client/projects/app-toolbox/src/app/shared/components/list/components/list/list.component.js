import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ListAPIActions } from '../../api/list.actions';
import { listReducer } from '../../api/list.reducer';
let ListComponent = class ListComponent extends ListAPIActions {
    constructor(rootEpics, epics, ngRedux) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.ngRedux = ngRedux;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // emits pk_entity of click
        this.onOpen = new EventEmitter();
        this.limit = 10; // max number of results on a page
        this.page = 1; // current page
        // Search
        this.searchString = '';
        // Entity type (TeEn/PeIt) Filter
        this.typeOptions = [
            { value: 'peIt', label: '<i class="gv-icon gv-icon-persistent-entity"></i> Persistent' },
            { value: 'teEn', label: '<i class="fa fa-star-o"></i> Temporal' },
            { value: null, label: '<i class="gv-icon gv-icon-entity"></i> All' },
        ];
        this.selectedType = this.typeOptions[0];
        this.getBasePath = () => this.basePath;
        // listen to selecting entities for annotation
        this.selectingEntities$ = ngRedux.select(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, listReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
        combineLatest(this.ngRedux.select(['activeProject', 'pk_project']), this.pkAllowedClasses$).pipe(first((d) => (d.filter((i) => (!i)).length === 0)), takeUntil(this.destroy$))
            .subscribe(d => {
            this.projectId = d[0];
            this.pkAllowedClasses = d[1];
            // init the search
            this.searchProject();
        });
        this.collectionSize$.pipe(takeUntil(this.destroy$)).subscribe(d => { this.collectionSize = d; });
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    searchProject() {
        if (this.projectId && this.pkAllowedClasses) {
            this.search(this.projectId, this.searchString, this.pkAllowedClasses, this.selectedType.value, this.limit, this.page);
        }
    }
    // selectMentionedEntity(entity: MentionedEntity) {
    //   this.mentionedEntitiesCrtlStore.dispatch(this.mEntitiesActions.addMentionedEntity(entity))
    // }
    get hitsFrom() {
        return (this.limit * (this.page - 1)) + 1;
    }
    get hitsTo() {
        const upper = (this.limit * (this.page - 1)) + this.limit;
        return upper > this.collectionSize ? this.collectionSize : upper;
    }
    pageChange() {
        this.searchProject();
    }
    searchStringChange() {
        this.page = 1;
        this.searchProject();
    }
    searchKeydown($event) {
        if ($event.key === 'Enter') {
            this.searchStringChange();
        }
    }
    ;
    /**
     * Called when user changes to see only teEn / peIt or all classes
     */
    entityTypeChange(type) {
        if (this.selectedType !== type) {
            this.selectedType = type;
            this.searchProject();
        }
    }
};
tslib_1.__decorate([
    Input()
], ListComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], ListComponent.prototype, "showTeEnPeItFilter", void 0);
tslib_1.__decorate([
    Input()
], ListComponent.prototype, "pkAllowedClasses$", void 0);
tslib_1.__decorate([
    Output()
], ListComponent.prototype, "onOpen", void 0);
tslib_1.__decorate([
    select()
], ListComponent.prototype, "loading$", void 0);
tslib_1.__decorate([
    select()
], ListComponent.prototype, "items$", void 0);
tslib_1.__decorate([
    select()
], ListComponent.prototype, "collectionSize$", void 0);
ListComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: listReducer
    }),
    Component({
        selector: 'gv-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.css']
    })
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map