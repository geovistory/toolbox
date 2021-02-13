import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
const routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: LandingPageComponent
            },
            {
                path: 'namespaces',
                component: NamespaceListComponent
            },
            {
                path: 'system-types',
                component: SystemTypeListComponent
            },
            {
                path: 'accounts',
                component: AccountListComponent
            },
            {
                path: 'warehouse',
                component: WarehouseComponent
            },
        ]
    }
];
let BackofficeRoutingModule = class BackofficeRoutingModule {
};
BackofficeRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BackofficeRoutingModule);
export { BackofficeRoutingModule };
//# sourceMappingURL=backoffice-routing.module.js.map