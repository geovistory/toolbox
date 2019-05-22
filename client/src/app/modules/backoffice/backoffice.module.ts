import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { BackofficeRoutingModule } from './backoffice-routing.module';
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
import { DfhLabelListEditComponent } from './components/dfh-label-list-edit/dfh-label-list-edit.component';
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
import { MatButtonModule, MatDividerModule, MatCardModule, MatProgressBarModule, MatTableModule, MatCheckboxModule, MatProgressSpinnerModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HasTypeComponent } from './components/has-type/has-type.component';
import { HasTypeAPIActions } from './components/has-type/api/has-type.actions';
import { HasTypeAPIEpics } from './components/has-type/api/has-type.epics';
import { DfhModule } from 'app/core/dfh/dfh.module';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    BackofficeRoutingModule,
    SlimLoadingBarModule,
    DfhModule,
    KeysModule,
    DndModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
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
    ClassFieldListAPIActions,
    ClassFieldListAPIEpics,
    AccountListAPIActions,
    AccountListAPIEpics,
    WarehouseAPIEpics,
    WarehouseAPIActions,
    HasTypeAPIEpics,
    HasTypeAPIActions
  ],
  declarations: [
    MainComponent,
    ClassComponent,
    PropertyListComponent,
    ClassListComponent,
    ClassUiContextComponent,
    NamespaceListComponent,
    SystemTypeListComponent,
    DfhLabelListEditComponent,
    DfhLabelCreateComponent,
    LandingPageComponent,
    UiElementWidgetComponent,
    ClassFieldListComponent,
    ClassMainComponent,
    AccountListComponent,
    WarehouseComponent,
    HasTypeComponent
  ]
})
export class BackofficeModule { }
