import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/gv-icons.svg'));
  }
}
