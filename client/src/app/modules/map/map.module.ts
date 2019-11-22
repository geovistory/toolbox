import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCzmlLayersComponent } from './components/map-czml-layers/map-czml-layers.component';
import { MapAndTimeContComponent } from './components/map-and-time-cont/map-and-time-cont.component';
import { TimelineModule } from '../timeline/timeline.module';
import { AngularSplitModule } from 'angular-split';

const components = [
  MapCzmlLayersComponent,
  MapAndTimeContComponent
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TimelineModule,
    AngularSplitModule
  ]
})
export class MapModule { }
