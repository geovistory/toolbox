import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { BackofficeRoutingModule } from './backoffice-routing.module';
// import { ClassListComponent } from './components/class-list/class-list.component';
// import { ClassComponent } from './components/class/class.component';
import { MainComponent } from './components/main/main.component';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { KeysModule } from '../../shared/pipes/keys.module';
// import { ClassAPIEpics } from './components/class/api/class.epics';
// import { ClassAPIActions } from './components/class/api/class.actions';
import { DndModule } from 'ng2-dnd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { NamespaceListAPIActions } from './components/namespace-list/api/namespace-list.actions';
import { NamespaceListAPIEpics } from './components/namespace-list/api/namespace-list.epics';
import { SystemTypeListAPIActions } from './components/system-type-list/api/system-type-list.actions';
import { SystemTypeListAPIEpics } from './components/system-type-list/api/system-type-list.epics';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
// import { PropertyListAPIActions } from './components/property-list/api/property-list.actions';
// import { PropertyListAPIEpics } from './components/property-list/api/property-list.epics';
// import { PropertyListComponent } from './components/property-list/property-list.component';
// import { DfhLabelListEditComponent } from './components/dfh-label-list-edit/dfh-label-list-edit.component';
// import { DfhLabelCreateComponent } from './components/dfh-label-create/dfh-label-create.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
// import { UiElementWidgetComponent } from './components/ui-element-widget/ui-element-widget.component';
import { TableModule } from 'ngx-easy-table';
import { ClassFieldListComponent } from './components/class-field-list/class-field-list.component';
// import { ClassFieldListAPIActions } from './components/class-field-list/api/class-field-list.actions';
// import { ClassFieldListAPIEpics } from './components/class-field-list/api/class-field-list.epics';
// import { ClassMainComponent } from './components/class-main/class-main.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountListAPIActions } from './components/account-list/api/account-list.actions';
import { AccountListAPIEpics } from './components/account-list/api/account-list.epics';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseAPIEpics } from './components/warehouse/api/warehouse.epics';
import { WarehouseAPIActions } from './components/warehouse/api/warehouse.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HasTypeComponent } from './components/has-type/has-type.component';
import { HasTypeAPIActions } from './components/has-type/api/has-type.actions';
import { HasTypeAPIEpics } from './components/has-type/api/has-type.epics';
import { DfhModule } from 'app/core/dfh/dfh.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

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
    MatInputModule,
    ScrollDispatchModule,
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
    WarehouseAPIEpics,
    WarehouseAPIActions,
    HasTypeAPIEpics,
    HasTypeAPIActions
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
    ClassFieldListComponent,
    // ClassMainComponent,
    AccountListComponent,
    WarehouseComponent,
    HasTypeComponent
  ]
})
export class BackofficeModule { }
