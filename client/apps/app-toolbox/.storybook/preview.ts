const url = 'http://localhost:4400';
window['env'] = {
  ...window['env'],
  apiUrl: url,
  assetsUrl: url,
  apiVersion: 'lb3-api'
}
import { HttpClientModule } from '@angular/common/http';
import { NgModule, importProvidersFrom } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { Preview, applicationConfig } from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(url + '/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl(url + '/assets/gv-icons.svg'));
  }
}

const preview: Preview = {
  decorators: [applicationConfig({ providers: [importProvidersFrom(MatIconRegistryModule)] })],
};

export default preview;
