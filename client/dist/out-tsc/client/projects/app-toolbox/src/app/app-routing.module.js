import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/app-toolbox/src/app/core/auth/auth-guard.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { SystemAdminGuard } from 'projects/app-toolbox/src/app/core/auth/system-admin-guard.service';
export function getProjectModule() { return ProjectsModule; }
;
export function getBackofficeModule() { return BackofficeModule; }
;
const indexRoute = {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
};
const fallbackRoute = {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
};
const routes = [
    {
        path: '',
        children: [
            indexRoute,
            {
                path: 'home',
                loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
            },
            {
                path: '',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
            },
            {
                path: 'projects',
                loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule),
                // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
                canActivate: [AuthGuard]
            },
            {
                path: 'admin',
                redirectTo: 'backoffice',
                pathMatch: 'full'
            },
            {
                path: 'backoffice',
                loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),
                canActivate: [AuthGuard, SystemAdminGuard]
                // canActivate: [AdminGuard]
            },
            fallbackRoute
        ]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map