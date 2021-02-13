import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { AccountActions } from '../../../modules/account/api/account.actions';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
let NavbarModule = class NavbarModule {
};
NavbarModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule,
            NgbModule,
            CommonModule,
            MaterialModule
        ],
        declarations: [
            NavbarComponent
        ],
        providers: [
            AccountActions
        ],
        exports: [
            NavbarComponent
        ]
    })
], NavbarModule);
export { NavbarModule };
//# sourceMappingURL=navbar.module.js.map