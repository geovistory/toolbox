import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AccountProfileComponent = class AccountProfileComponent {
    constructor(authService) {
        this.authService = authService;
        this.edit = false;
    }
    ngOnInit() {
        this.model = this.authService.getCurrentUserData();
    }
};
AccountProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-account-profile',
        templateUrl: './account-profile.component.html',
        styleUrls: ['./account-profile.component.scss']
    })
], AccountProfileComponent);
export { AccountProfileComponent };
//# sourceMappingURL=account-profile.component.js.map