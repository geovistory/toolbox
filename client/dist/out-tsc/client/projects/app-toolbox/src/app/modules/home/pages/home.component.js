import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(activeAccountService) {
        this.activeAccountService = activeAccountService;
    }
    ngOnInit() {
        this.activeAccountService.getAccount().subscribe(account => {
            this.account = account;
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map