import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { buildModuleUrl } from 'cesium';


@NgModule()
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/assets/mdi/mdi.svg'));
  }
}


// PlaygroundModule
//   .configure({
//     selector: 'gv-root',
//     overlay: false,
//     modules: [
//       // import exactly the same modules ass AppModule except for routing
//       // since routing is different in Playground
//       APP_MODULE_DECORATOR.imports.filter(m => m !== AppRoutingModule)
//     ]
//   });


buildModuleUrl.setBaseUrl('/assets/cesium/')
Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
