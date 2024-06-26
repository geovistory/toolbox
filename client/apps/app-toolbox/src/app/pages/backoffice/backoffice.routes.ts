import { Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CommunityVisibilityComponent } from './community-visibility/community-visibility.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { SysConfigComponent } from './sys-config/sys-config.component';
import { SystemTypeListComponent } from './system-type-list/system-type-list.component';

export const BACKOFFICE_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
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
        path: 'community-visibility',
        component: CommunityVisibilityComponent
      },
      {
        path: 'sys-config',
        component: SysConfigComponent
      },
    ]
  }
]
