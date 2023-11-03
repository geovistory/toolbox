import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MaterialModule } from '../../core/material/material.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CommunityVisibilityComponent } from './components/community-visibility/community-visibility.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { SysConfigComponent } from './components/sys-config/sys-config.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';


@NgModule({
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    KeysModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MaterialModule,
  ],
  providers: [
  ],
  declarations: [
    MainComponent,
    SystemTypeListComponent,
    LandingPageComponent,
    AccountListComponent,
    CommunityVisibilityComponent,
    SysConfigComponent,
  ]
})
export class BackofficeModule { }
