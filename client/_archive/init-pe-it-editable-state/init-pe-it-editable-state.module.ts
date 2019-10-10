import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassService } from 'app/modules/information/shared/class.service';
import { EprService } from 'app/modules/information/shared/epr.service';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { PropertyService } from 'app/modules/information/shared/property.service';
import { InitPeItEditableStateComponent } from './init-pe-it-editable-state.component';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  providers: [
    ClassService,
    PropertyService,
    PeItService,
    EprService
  ],
  declarations: [
    InitPeItEditableStateComponent
  ],
  exports: [
    InitPeItEditableStateComponent
  ]
})
export class InitPeItEditableStateModule { }
