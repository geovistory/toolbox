import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCzmlLayersComponent } from './components/map-czml-layers/map-czml-layers.component';
import { MapAndTimeContComponent } from './components/map-and-time-cont/map-and-time-cont.component';
import { TimelineModule } from '../timeline/timeline.module';
import { AngularSplitModule } from 'angular-split';
import { MatButtonModule, MatTooltipModule, MatCardModule, MatIconModule } from '@angular/material';
import { EntityPreviewsPaginatedModule } from 'app/shared/components/entity-previews-paginated/entity-previews-paginated.module';
import { PassiveLinkModule } from 'app/shared';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';

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
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    EntityPreviewsPaginatedModule,
    PassiveLinkModule,
    EntityPreviewModule
  ]
})
export class MapModule { }
