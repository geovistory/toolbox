import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitPeItEditableStateComponent } from './init-pe-it-editable-state.component';
import { StateCreatorService } from 'app/modules/information/shared/state-creator.service';
import { ClassService } from 'app/modules/information/shared/class.service';
import { PropertyService } from 'app/modules/information/shared/property.service';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { EprService } from 'app/modules/information/shared/epr.service';
import { NgReduxModule } from '@angular-redux/store';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  providers: [
    StateCreatorService,
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
