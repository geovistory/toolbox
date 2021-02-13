import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, first, map, takeUntil } from 'rxjs/operators';
let SearchExistingEntityComponent = class SearchExistingEntityComponent {
    constructor(
    // protected rootEpics: RootEpics,
    // private epics: SearchExistingEntityAPIEpics,
    // public ngRedux: NgRedux<IAppState>,
    entityPreviewApi, p) {
        this.entityPreviewApi = entityPreviewApi;
        this.p = p;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // select observables of substore properties
        this.loading$ = new BehaviorSubject(false);
        // Hits
        this.persistentItems$ = new BehaviorSubject([]);
        // Total count of hits
        this.collectionSize$ = new BehaviorSubject(0);
        this.onAddExisting = new EventEmitter();
        this.onOpenExisting = new EventEmitter();
        this.searchString = '';
        this.minSearchStringLength = 0;
        this.limit = 3; // max number of results on a page
        this.page = 1; // current page
        this.hitsFound = false;
    }
    // getBasePath = () => this.basePath;
    ngOnInit() {
        // this.localStore = this.ngRedux.configureSubStore(this.basePath, peItSearchExistingReducer);
        // this.rootEpics.addEpic(this.epics.createEpics(this));
        if (!this.pkClass)
            throw Error('please provide a pkClass');
        if (!this.searchString$)
            throw Error('please provide a searchString$');
        if (!this.alreadyInProjectBtnText)
            throw Error('please provide a alreadyInProjectBtnText');
        if (!this.notInProjectBtnText)
            throw Error('please provide a notInProjectBtnText');
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.pkProject = pkProject;
            this.searchString$.pipe(debounceTime(400), takeUntil(this.destroy$)).subscribe(newValue => {
                this.searchString = newValue;
                if (newValue.length >= this.minSearchStringLength) {
                    this.page = 1;
                    this.search();
                }
                else {
                    this.persistentItems$.next([]);
                    this.collectionSize$.next(0);
                }
            });
        });
        // set hitsFound true, once there are some hits
        this.persistentItems$.pipe(takeUntil(this.destroy$)).subscribe((i) => {
            if (i && i.length > 0)
                this.hitsFound = true;
        });
        this.hitsTo$ = this.collectionSize$.pipe(map(collectionSize => {
            const upper = (this.limit * (this.page - 1)) + this.limit;
            return upper > collectionSize ? collectionSize : upper;
        }));
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    pageChange() {
        this.search();
    }
    search() {
        const relatedStatement = !!this.disableIfHasStatement ? this.disableIfHasStatement.relatedStatement : undefined;
        const req = {
            projectId: this.pkProject,
            searchString: this.searchString,
            pkClasses: [this.pkClass],
            entityType: null,
            limit: this.limit,
            page: this.page,
            relatedStatement: relatedStatement
        };
        if (this.disableIfHasStatement) {
            this.entityPreviewApi.warEntityPreviewControllerSearchExisting(req)
                .subscribe((result) => {
                const res = result.data;
                const hits = res.map(r => {
                    const btnDisabled = (this.disableIfHasStatement && r.related_statements.length >= this.disableIfHasStatement.maxQuantity);
                    return Object.assign({}, r, { btnDisabled, btnTooltip: btnDisabled ?
                            `This ${r.class_label} can't be selected because it is already related to ${r.related_statements.length} ${this.disableIfHasStatement.sourceClassLabel} via '${this.disableIfHasStatement.propertyLabel}'.`
                            : '' });
                });
                this.persistentItems$.next(hits);
                this.collectionSize$.next(result.totalCount);
            }, error => {
                this.persistentItems$.next([]);
                this.collectionSize$.next(0);
            });
        }
        else {
            this.entityPreviewApi.warEntityPreviewControllerSearchExisting(req)
                .subscribe((result) => {
                const res = result.data;
                this.persistentItems$.next(res);
                this.collectionSize$.next(result.totalCount);
            }, error => {
                this.persistentItems$.next([]);
                this.collectionSize$.next(0);
            });
        }
    }
    hitsFrom() {
        return (this.limit * (this.page - 1)) + 1;
    }
    onAdd(pkEntity) {
        this.onAddExisting.emit(pkEntity);
    }
    onOpen(pkEntity) {
        this.onOpenExisting.emit(pkEntity);
    }
};
tslib_1.__decorate([
    Input()
], SearchExistingEntityComponent.prototype, "alreadyInProjectBtnText", void 0);
tslib_1.__decorate([
    Input()
], SearchExistingEntityComponent.prototype, "notInProjectBtnText", void 0);
tslib_1.__decorate([
    Input()
], SearchExistingEntityComponent.prototype, "pkClass", void 0);
tslib_1.__decorate([
    Input()
], SearchExistingEntityComponent.prototype, "searchString$", void 0);
tslib_1.__decorate([
    Input()
], SearchExistingEntityComponent.prototype, "disableIfHasStatement", void 0);
tslib_1.__decorate([
    Output()
], SearchExistingEntityComponent.prototype, "onAddExisting", void 0);
tslib_1.__decorate([
    Output()
], SearchExistingEntityComponent.prototype, "onOpenExisting", void 0);
SearchExistingEntityComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-search-existing-entity',
        templateUrl: './search-existing-entity.component.html',
        styleUrls: ['./search-existing-entity.component.css']
    })
], SearchExistingEntityComponent);
export { SearchExistingEntityComponent };
//# sourceMappingURL=search-existing-entity.component.js.map