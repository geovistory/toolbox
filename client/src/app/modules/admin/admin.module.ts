import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
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
import { FormsModule } from '@angular/forms';
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

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    AdminRoutingModule,
    SlimLoadingBarModule,
    KeysModule,
    DndModule,
    FormsModule
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
    PropertyListAPIEpics
  ],
  declarations: [
    MainComponent,
    ClassComponent,
    PropertyListComponent,
    ClassListComponent,
    ClassUiContextComponent,
    NamespaceListComponent,
    SystemTypeListComponent
  ]
})
export class AdminModule { }
