import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CommunityVisibilityComponent } from './components/community-visibility/community-visibility.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SysConfigComponent } from './components/sys-config/sys-config.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';


const routes: Routes = [
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
      {
        path: 'community-visibility',
        component: CommunityVisibilityComponent
      },
      {
        path: 'sys-config',
        component: SysConfigComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
