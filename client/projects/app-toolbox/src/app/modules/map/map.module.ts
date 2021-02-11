import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { EntityPreviewModule } from 'projects/app-toolbox/src/app/shared/components/entity-preview/entity-preview.module';
import { EntityPreviewsPaginatedModule } from 'projects/app-toolbox/src/app/shared/components/entity-previews-paginated/entity-previews-paginated.module';
import { TimelineModule } from '../timeline/timeline.module';
import { MapAndTimeContComponent } from './components/map-and-time-cont/map-and-time-cont.component';
import { MapCzmlLayersComponent } from './components/map-czml-layers/map-czml-layers.component';

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
    AngularSplitModule,
    EntityPreviewsPaginatedModule,
    PassiveLinkModule,
    EntityPreviewModule,
    MaterialModule
  ]
})
export class MapModule { }
