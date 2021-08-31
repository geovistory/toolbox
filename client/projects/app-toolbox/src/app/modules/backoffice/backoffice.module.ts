import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
// import { ClassAPIEpics } from './components/class/api/class.epics';
// import { ClassAPIActions } from './components/class/api/class.actions';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
// import { UiElementWidgetComponent } from './components/ui-element-widget/ui-element-widget.component';
// import { TableModule } from 'ngx-easy-table';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
// import { ClassFieldListAPIActions } from './components/class-field-list/api/class-field-list.actions';
// import { ClassFieldListAPIEpics } from './components/class-field-list/api/class-field-list.epics';
// import { ClassMainComponent } from './components/class-main/class-main.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountListAPIActions } from './components/account-list/api/account-list.actions';
import { AccountListAPIEpics } from './components/account-list/api/account-list.epics';
// import { PropertyListAPIActions } from './components/property-list/api/property-list.actions';
// import { PropertyListAPIEpics } from './components/property-list/api/property-list.epics';
// import { PropertyListComponent } from './components/property-list/property-list.component';
// import { DfhLabelListEditComponent } from './components/dfh-label-list-edit/dfh-label-list-edit.component';
// import { DfhLabelCreateComponent } from './components/dfh-label-create/dfh-label-create.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
// import { ClassListComponent } from './components/class-list/class-list.component';
// import { ClassComponent } from './components/class/class.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListAPIActions } from './components/namespace-list/api/namespace-list.actions';
import { NamespaceListAPIEpics } from './components/namespace-list/api/namespace-list.epics';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SystemTypeListAPIActions } from './components/system-type-list/api/system-type-list.actions';
import { SystemTypeListAPIEpics } from './components/system-type-list/api/system-type-list.epics';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { CommunityVisibilityComponent } from './components/community-visibility/community-visibility.component';



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
    // TableModule,
    MaterialModule,
    // ReduxModule
  ],
  providers: [
    // ClassAPIActions,
    // ClassAPIEpics,
    NamespaceListAPIActions,
    NamespaceListAPIEpics,
    SystemTypeListAPIActions,
    SystemTypeListAPIEpics,
    // PropertyListAPIActions,
    // PropertyListAPIEpics,
    // ClassFieldListAPIActions,
    // ClassFieldListAPIEpics,
    AccountListAPIActions,
    AccountListAPIEpics,
    // WarehouseAPIEpics,
    // WarehouseAPIActions,
  ],
  declarations: [
    MainComponent,
    // ClassComponent,
    // PropertyListComponent,
    // ClassListComponent,
    NamespaceListComponent,
    SystemTypeListComponent,
    // DfhLabelListEditComponent,
    // DfhLabelCreateComponent,
    LandingPageComponent,
    // UiElementWidgetComponent,
    // ClassMainComponent,
    AccountListComponent,
    WarehouseComponent,
    CommunityVisibilityComponent,
  ]
})
export class BackofficeModule { }
