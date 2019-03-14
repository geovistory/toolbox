import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { ClassListAPIActions } from './components/class-list/api/class-list.actions';
import { ClassListAPIEpics } from './components/class-list/api/class-list.epics';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassComponent } from './components/class/class.component';
import { MainComponent } from './components/main/main.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { KeysModule } from '../../shared/pipes/keys.module';
import { ClassAPIEpics } from './components/class/api/class.epics';
import { ClassAPIActions } from './components/class/api/class.actions';
import { DndModule } from 'ng2-dnd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassUiContextComponent } from './components/class-ui-context/class-ui-context.component';
import { ClassUiContextAPIActions } from './components/class-ui-context/api/class-ui-context.actions';
import { ClassUiContextAPIEpics } from './components/class-ui-context/api/class-ui-context.epics';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { NamespaceListAPIActions } from './components/namespace-list/api/namespace-list.actions';
import { NamespaceListAPIEpics } from './components/namespace-list/api/namespace-list.epics';
import { SystemTypeListAPIActions } from './components/system-type-list/api/system-type-list.actions';
import { SystemTypeListAPIEpics } from './components/system-type-list/api/system-type-list.epics';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { PropertyListAPIActions } from './components/property-list/api/property-list.actions';
import { PropertyListAPIEpics } from './components/property-list/api/property-list.epics';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { DfhLabelEditComponent } from './components/dfh-label-edit/dfh-label-edit.component';
import { DfhLabelEditAPIActions } from './components/dfh-label-edit/api/dfh-label-edit.actions';
import { DfhLabelEditAPIEpics } from './components/dfh-label-edit/api/dfh-label-edit.epics';
import { DfhLabelListEditComponent } from './components/dfh-label-list-edit/dfh-label-list-edit.component';
import { DfhLabelListEditAPIActions } from './components/dfh-label-list-edit/api/dfh-label-list-edit.actions';
import { DfhLabelListEditAPIEpics } from './components/dfh-label-list-edit/api/dfh-label-list-edit.epics';
import { DfhLabelCreateComponent } from './components/dfh-label-create/dfh-label-create.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UiElementWidgetComponent } from './components/ui-element-widget/ui-element-widget.component';
import { TableModule } from 'ngx-easy-table';
import { ClassFieldListComponent } from './components/class-field-list/class-field-list.component';
import { ClassFieldListAPIActions } from './components/class-field-list/api/class-field-list.actions';
import { ClassFieldListAPIEpics } from './components/class-field-list/api/class-field-list.epics';
import { ClassMainComponent } from './components/class-main/class-main.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountListAPIActions } from './components/account-list/api/account-list.actions';
import { AccountListAPIEpics } from './components/account-list/api/account-list.epics';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseAPIEpics } from './components/warehouse/api/warehouse.epics';
import { WarehouseAPIActions } from './components/warehouse/api/warehouse.actions';
import { MatButtonModule, MatDividerModule, MatCardModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    BackofficeRoutingModule,
    SlimLoadingBarModule,
    KeysModule,
    DndModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [
    ClassListAPIActions,
    ClassListAPIEpics,
    ClassAPIActions,
    ClassAPIEpics,
    ClassUiContextAPIActions,
    ClassUiContextAPIEpics,
    NamespaceListAPIActions,
    NamespaceListAPIEpics,
    SystemTypeListAPIActions,
    SystemTypeListAPIEpics,
    PropertyListAPIActions,
    PropertyListAPIEpics,
    DfhLabelEditAPIActions,
    DfhLabelEditAPIEpics,
    DfhLabelListEditAPIActions,
    DfhLabelListEditAPIEpics,
    ClassFieldListAPIActions,
    ClassFieldListAPIEpics,
    AccountListAPIActions,
    AccountListAPIEpics,
    WarehouseAPIEpics,
    WarehouseAPIActions
  ],
  declarations: [
    MainComponent,
    ClassComponent,
    PropertyListComponent,
    ClassListComponent,
    ClassUiContextComponent,
    NamespaceListComponent,
    SystemTypeListComponent,
    DfhLabelEditComponent,
    DfhLabelListEditComponent,
    DfhLabelCreateComponent,
    LandingPageComponent,
    UiElementWidgetComponent,
    ClassFieldListComponent,
    ClassMainComponent,
    AccountListComponent,
    WarehouseComponent
  ]
})
export class BackofficeModule { }
