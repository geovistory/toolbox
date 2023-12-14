import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeoColSignalComponent } from './geo-col-signal/geo-col-signal.component';
import { TimeColSignalComponent } from './time-col-signal/time-col-signal.component';
/**
 * This module contains small, stupid helper components.
 * like for example icons, label, badges, ect.
 */
const components = [
  GeoColSignalComponent,
  TimeColSignalComponent
]
@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        MatIconModule,
        ...components
    ],
    exports: components
})
export class GvHelperComponentsModule { }
