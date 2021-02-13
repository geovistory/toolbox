import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/app-toolbox/src/app/core/auth/auth-guard.service';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountEmailComponent } from './pages/account-email/account-email.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountComponent } from './pages/account/account.component';
const routes = [
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'email-verified',
        component: EmailVerifiedComponent
    },
    {
        path: 'access-denied',
        component: AccessDeniedComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout-confirmation',
        component: LogoutConfirmationComponent
    },
    {
        path: 'request-password-reset',
        component: RequestPasswordResetComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'account',
        canActivate: [AuthGuard],
        component: AccountComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'password',
                component: AccountPasswordComponent
            },
            {
                path: 'email',
                component: AccountEmailComponent
            },
            {
                path: 'profile',
                component: AccountProfileComponent
            }
        ]
    },
];
let AccountRoutingModule = class AccountRoutingModule {
};
AccountRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AccountRoutingModule);
export { AccountRoutingModule };
//# sourceMappingURL=account-routing.module.js.map