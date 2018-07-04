import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { ClassListAPIActions } from './components/class-list/api/class-list.actions';
import { ClassListAPIEpics } from './components/class-list/api/class-list.epics';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassComponent } from './components/class/class.component';
import { MainComponent } from './components/main/main.component';
import { LoadingBarModule } from '../../core/loading-bar/loading-bar.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { KeysModule } from '../../shared/pipes/keys.module';
import { ClassAPIEpics } from './components/class/api/class.epics';
import { ClassAPIActions } from './components/class/api/class.actions';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    AdminRoutingModule,
    SlimLoadingBarModule,
    KeysModule
  ],
  providers:[
    ClassListAPIActions,
    ClassListAPIEpics,
    ClassAPIActions,
    ClassAPIEpics
  ],
  declarations: [MainComponent, ClassComponent, ClassListComponent]
})
export class AdminModule { }
