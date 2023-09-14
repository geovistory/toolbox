import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CommunityVisibilityComponent } from './components/community-visibility/community-visibility.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListAPIActions } from './components/namespace-list/api/namespace-list.actions';
import { NamespaceListAPIEpics } from './components/namespace-list/api/namespace-list.epics';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SysConfigComponent } from './components/sys-config/sys-config.component';
import { SystemTypeListAPIActions } from './components/system-type-list/api/system-type-list.actions';
import { SystemTypeListAPIEpics } from './components/system-type-list/api/system-type-list.epics';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';



@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    BackofficeRoutingModule,
    KeysModule,
    DndModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MaterialModule,
  ],
  providers: [
    NamespaceListAPIActions,
    NamespaceListAPIEpics,
    SystemTypeListAPIActions,
    SystemTypeListAPIEpics,
  ],
  declarations: [
    MainComponent,
    NamespaceListComponent,
    SystemTypeListComponent,
    LandingPageComponent,
    AccountListComponent,
    WarehouseComponent,
    CommunityVisibilityComponent,
    SysConfigComponent,
  ]
})
export class BackofficeModule { }
