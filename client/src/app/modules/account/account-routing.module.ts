import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';


import { AccountComponent } from './pages/account/account.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AccountEmailComponent } from './pages/account-email/account-email.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';

const routes: Routes = [
  {
    path: '',
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
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }