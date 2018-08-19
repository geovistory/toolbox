// import 'hammerjs';
import { NgModule } from '@angular/core';
import {
    AngularCesiumModule,
    AngularCesiumWidgetsModule,
    AcMapComponent,
    AcLayerComponent,
    AcMapLayerProviderComponent,
    PolygonsEditorComponent
} from './angular-cesium-fork';
import { AcCzmlDescComponent } from './angular-cesium-fork/src/angular-cesium/components/ac-czml-desc/ac-czml-desc.component';


@NgModule({
    declarations: [
    ],
    imports: [
        AngularCesiumModule,
        AngularCesiumWidgetsModule,
        // ApolloModule.forRoot(getApolloClient),
    ],
    exports: [
        AcMapComponent,
        AcLayerComponent,
        AcMapLayerProviderComponent,
        AcCzmlDescComponent,
        PolygonsEditorComponent
    ]
})
export class GvAngularCesiumModule {
}
