import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WithSubStore, select } from '@angular-redux/store';
import { AccountListAPIActions } from './api/account-list.actions';
import { accountListReducer } from './api/account-list.reducer';
import { KeysPipe } from 'projects/app-toolbox/src/app/shared/pipes/keys.pipe';
import { first, takeUntil } from 'rxjs/operators';
let AccountListComponent = class AccountListComponent extends AccountListAPIActions {
    constructor(rootEpics, epics, ngRedux, keys) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.ngRedux = ngRedux;
        this.keys = keys;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // path to the substore
        this.basePath = ['backoffice', 'accountList'];
        this.tableConfiguration = {
            searchEnabled: true,
            headerEnabled: true,
            orderEnabled: true,
            orderEventOnly: false,
            globalSearchEnabled: true,
            paginationEnabled: true,
            exportEnabled: false,
            clickEvent: false,
            selectRow: false,
            selectCol: false,
            selectCell: false,
            rows: 10,
            additionalActions: false,
            serverPagination: false,
            isLoading: false,
            detailsTemplate: false,
            groupRows: false,
            paginationRangeEnabled: true,
            collapseAllRows: false,
            checkboxes: false,
            resizeColumn: true,
            fixedColumnWidth: false,
            horizontalScroll: false,
            draggable: false,
            logger: false,
            showDetailsArrow: false,
            showContextMenu: false,
            persistState: false,
            paginationMaxSize: 5,
            tableLayout: {
                style: 'normal',
                theme: 'normal',
                borderless: false,
                hover: true,
                striped: true,
            }
        };
        this.columns = [
            { key: 'id', title: 'Account ID' },
            { key: 'username', title: 'Username' },
            { key: 'email', title: 'Email' },
            { key: 'emailverified', title: 'Email is verified' },
            { key: 'roles', title: 'Roles', searchEnabled: false, orderEnabled: false },
            { key: 'projectrels', title: 'Projects', searchEnabled: false, orderEnabled: false },
        ];
        this.data = [];
        this.getBasePath = () => this.basePath;
        this.items$.pipe(first(items => this.keys.transform(items).length > 0), takeUntil(this.destroy$)).subscribe(items => { this.setTableData(items); });
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, accountListReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
        this.load();
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    setTableData(items) {
        this.data = this.keys.transform(items).map((item) => {
            return Object.assign({}, item.value, { key: item.key });
        });
    }
};
tslib_1.__decorate([
    select()
], AccountListComponent.prototype, "items$", void 0);
AccountListComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: accountListReducer
    }),
    Component({
        selector: 'gv-account-list',
        templateUrl: './account-list.component.html',
        styleUrls: ['./account-list.component.css'],
        providers: [KeysPipe]
    })
], AccountListComponent);
export { AccountListComponent };
//# sourceMappingURL=account-list.component.js.map